/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import Hidden from "@material-ui/core/Hidden";
import NavDrawer from "../Drawer"
import Header from "../Header/index"
import classNames from 'classnames';
import connect from "react-redux/es/connect/connect";
import { handleSettingsChange } from "../../resources/redux/actions/settings";
import AceEditor from '../AceEditor'
import PyConsole from '../PyConsole';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography'
import Recoder from '../Recorder'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { socket } from '../../resources/client'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';



// let langTools = ace.acequire('ace/ext/language_tools');
const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: "100vh",
        height: "100vh",
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        height: '90%',
        width: '100%',
        flexGrow: 1,

        // padding: 5,
        //#e8e8e8
        [theme.breakpoints.down('xs')]: {
            // paddingTop: theme.spacing.unit * 3,
        },
        [theme.breakpoints.up('sm')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            // paddingTop: theme.spacing.unit * 3,
        }
    },
    contentShift: {
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
            // paddingTop: theme.spacing.unit * 3,
            paddingRight: drawerWidth,
        },
    },
    recoderContent: {
        backgroundColor: 'rgb(45, 45, 45)',
        [theme.breakpoints.up('md')]: {
            width: '20%'
        }
    },
    snackBarMargin: {
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '150px',
        }
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});


class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile: false,
            side: true,
            console: false,
            selectedTabIndex: 1,
            settings: {
                ...props.settings
            },
            error: null
        };
    }

    handleTabChange = (event, selectedTabIndex) => {
        this.setState({ selectedTabIndex });
    };

    toggleDrawer = (type, open) => () => {
        this.setState({
            [type]: open,
        });
    };

    handleErrorClose = () => this.setState({error: null})

    handleDrawerMobileToggle = () => {
        this.setState(state => ({ mobile: !state.mobile }));
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ side: !state.side }));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                settings: {
                    ...nextProps.settings
                }
            })
        }
    }

    languageSelect = (name) => event => {
        this.props.handleSettingsChange(name, event.target.value)
    };

    componentDidMount() {
        // const customMode = new CustomSqlMode();
        // console.log(this.refs.aceEditor.editor)
        // this.refs.aceEditor.editor.getSession().setMode(customMode);
        socket.on('stt-error', (data) => {
            this.setState({error: data.error})
        })
    }

    render() {
        const { classes } = this.props;
        const vertical = 'bottom';
        const horizontal = 'right';
        const {
            theme,
            language,
            editorMode,
            lazyMode
        } = this.state.settings;

        return (
            <div className={classes.root} style={{
                backgroundColor: (theme === 'dark') ? '#272822' : '#fff'
            }}>
                <CssBaseline />
                <Header handleDrawerToggle={this.handleDrawerToggle}
                    apptheme={theme}
                    handleDrawerMobileToggle={this.handleDrawerMobileToggle}
                    language={language}
                    languageSelect={this.languageSelect('language')} />
                <Hidden mdUp>
                    <NavDrawer
                        variant="temporary"
                        open={this.state.mobile}
                        onClose={this.toggleDrawer('mobile', false)}
                        selectedTabIndex={this.state.selectedTabIndex}
                        handleTabChange={this.handleTabChange}
                    />

                </Hidden>
                <div className={classes.toolbar} />
                <Hidden smDown implementation="css">
                    <NavDrawer
                        variant="persistent"
                        open={this.state.side}
                        onClose={this.toggleDrawer('side', false)}
                        selectedTabIndex={this.state.selectedTabIndex}
                        handleTabChange={this.handleTabChange}
                    >
                    </NavDrawer>
                </Hidden>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: this.state.side,
                    [classes.snackBarMargin]: lazyMode
                })}>
                    {editorMode === 'pyconsole' && <PyConsole />}

                    {editorMode === 'editor' && <AceEditor />}

                </main>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={lazyMode}
                >
                    <SnackbarContent
                        className={classes.recoderContent}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <Recoder />
                            </span>
                        }
                    />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.error)}
                    onClose={this.handleErrorClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.error}</span>}
                >
                <SnackbarContent
                    className={classes.error}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                        <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
                        <Typography variant='subtitle2' style={{color: 'white'}}>
                        {this.state.error}
                        </Typography>
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleErrorClose}
                            >
                         <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                    />
                </Snackbar>
                
                {/* <Button style={{ display: 'flex' }}>
                    <Typography variant={'button'} color={"secondary"} onClick={this.toggleDrawer('console', true)}>
                        Console
                    </Typography>
                </Button>

                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.console}
                    onClose={this.toggleDrawer('console', false)}
                    onOpen={this.toggleDrawer('console', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('console', false)}
                        onKeyDown={this.toggleDrawer('console', false)}
                        style={{ height: '30vh', marginLeft: drawerWidth }}
                    >
                        {/*hey*/}
                {/*{fullList}*/}
                {/* </div> */}
                {/* </SwipeableDrawer> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: {
        ...state.settings
    }
})

const mapDispatchToProps = {
    handleSettingsChange
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Editor));
