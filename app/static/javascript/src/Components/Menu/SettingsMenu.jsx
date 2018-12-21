import React, { Component, Fragment } from 'react';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Switch from "@material-ui/core/Switch/Switch";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import { connect } from 'react-redux';
import { handleSettingsChange } from "../../resources/redux/actions/settings";

const styles = theme => ({
    menuItem: {
        color: 'white'
    },
    textField: {
        width: '40%',
        height: '40px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        backgroundColor: 'white',
        borderRadius: 5
    },
    themeField: {
        // width: '0%',
        height: '40px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        backgroundColor: 'white',
        borderRadius: 5
    }
});

class SettingsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.settings
        };
    }

    handleChange = (name, checked) => event => {
        if (checked)
            this.props.handleSettingsChange(name, event.target.checked)
        else this.props.handleSettingsChange(name, event.target.value)
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({ ...nextProps.settings })
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <List style={{ width: '100%', margin: 0 }}>
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Language
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.language}
                            onChange={this.handleChange('language')}
                            input={
                                <OutlinedInput
                                    className={classes.themeField}
                                    labelWidth={0}
                                />
                            }
                        >
                            <MenuItem value={'python'}>Python</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Theme
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.theme}
                            onChange={this.handleChange('theme')}
                            input={
                                <OutlinedInput
                                    className={classes.themeField}
                                    labelWidth={0}
                                />
                            }
                        >
                            <MenuItem value="light">
                                Light
                            </MenuItem>
                            <MenuItem value={'dark'}>Dark</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Tab size
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <TextField
                        className={classes.textField}
                        defaultValue={this.state.tabSize}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('tabSize')}
                        type="number"

                    />
                </ListItem>
                {/* <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Font size
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <TextField
                        className={classes.textField}
                        defaultValue={this.state.fontSize}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('fontSize')}
                        type="number"

                    />
                </ListItem> */}
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Lazy Mode
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Switch
                        checked={this.state.lazyMode}
                        onChange={this.handleChange('lazyMode', true)}
                    />
                </ListItem>
                {/* <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Line numbers
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Checkbox
                        checked={this.state.lineNumbers}
                        onChange={this.handleChange('lineNumbers', true)}
                    />
                </ListItem> */}
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Mode
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.editorMode}
                            onChange={this.handleChange('editorMode')}
                            input={
                                <OutlinedInput
                                    className={classes.themeField}
                                    labelWidth={0}
                                />
                            }
                        >
                            <MenuItem value={'pyconsole'}>PyConsole</MenuItem>
                            <MenuItem value={'editor'}>Editor</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                {this.state.editorMode === 'editor' && <Fragment>
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Splits
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.splits}
                            onChange={this.handleChange('splits')}
                            input={
                                <OutlinedInput
                                    className={classes.themeField}
                                    labelWidth={0}
                                />
                            }
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <Typography variant={'body2'} color={'inherit'}>
                        Orientation
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.orientation}
                            onChange={this.handleChange('orientation')}
                            input={
                                <OutlinedInput
                                    className={classes.themeField}
                                    labelWidth={0}
                                />
                            }
                        >
                            <MenuItem value={"beside"}>Beside</MenuItem>
                            <MenuItem value={"below"}>Below</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                </Fragment>}
            </List>
        );
    }
}

const mapStateToProps = state => ({
    settings: {
        theme: state.settings.theme,
        tabSize: state.settings.tabSize,
        fontSize: state.settings.fontSize,
        lazyMode: state.settings.lazyMode,
        editorMode: state.settings.editorMode,
        lineNumbers: state.settings.lineNumbers,
        splits: state.settings.splits,
        language: state.settings.language,
        orientation: state.settings.orientation
    }
})

const mapDispatchToProps = {
    handleSettingsChange
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsMenu));