import React, { Component } from 'react'
import { ReactMic } from 'react-mic';
import { withStyles } from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import MicIcon from '@material-ui/icons/MicRounded'
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import { socket } from '../../resources/client'


class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            secondsElapsed: 0,
            lastClearedIncrementer: null,
            persmission: false
        }
        this.incrementer = null

    }

    startRecording = async () => {
        let stream = null;
        if (!this.state.persmission) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        if (stream.active)
            this.incrementer = setInterval(() =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1,
                    record: true,
                    persmission: stream.active
                })
                , 1000);
    }

    stopRecording = async () => {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
            record: false,
            persmission: false
        });
    }

    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob);
        // socket.emit('speech-to-intents', { blob: recordedBlob, size: recordedBlob})
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        socket.emit('speech-to-intents', { blob: recordedBlob.blob})
    }


    formattedSeconds = (sec) => Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ReactMic
                    record={this.state.record}
                    className={classes.soundWave}
                    onStop={this.onStop}
                    visualSetting="sinewave"
                    mimeType={'audio/wav'}
                    audioBitsPerSecond={128000}
                    onData={this.onData}
                    strokeColor="#FF4081"
                    backgroundColor='rgb(49, 49, 49)'
                />
                <div className={classes.controls}>
                    <Typography className={classes.timer}>
                        {this.formattedSeconds(this.state.secondsElapsed)}
                    </Typography>
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.mic}
                        onClick={!this.state.record ? this.startRecording : this.stopRecording}
                    >
                        {(!this.state.record) ? <MicIcon className={classes.icon} /> : <PauseIcon className={classes.icon} />}
                    </IconButton>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    settings: {
        ...state.settings
    }
})


export default connect(mapStateToProps)(withStyles(styles)(Recorder));