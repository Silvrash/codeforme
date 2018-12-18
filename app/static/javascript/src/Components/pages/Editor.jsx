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
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
// import {io} from "../../resources/client";
import AceEditor from '../AceEditor'
import PyConsole from '../PyConsole';

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
            paddingTop: theme.spacing.unit * 3,
        },
        [theme.breakpoints.up('sm')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            paddingTop: theme.spacing.unit * 3,
        }
    },
    contentShift: {
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
            paddingTop: theme.spacing.unit * 3,
            paddingRight: drawerWidth,
        },

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
    }

    render() {
        const { classes } = this.props;
        const {
            // theme,
            language,
        } = this.state.settings;

        return (
            <div className={classes.root} style={{
                // backgroundColor: (theme === 'dark') ? '#272822' : '#524d68'
            }}>
                <CssBaseline />
                <Header handleDrawerToggle={this.handleDrawerToggle}
                    handleDrawerMobileToggle={this.handleDrawerMobileToggle}
                    language={language}
                    languageSelect={this.languageSelect('language')} />
                <div className={classes.toolbar} />
                <Hidden mdUp>
                    <NavDrawer
                        variant="temporary"
                        open={this.state.mobile}
                        onClose={this.toggleDrawer('mobile', false)}
                        selectedTabIndex={this.state.selectedTabIndex}
                        handleTabChange={this.handleTabChange}
                    />
                </Hidden>
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
                })}>

                    <PyConsole />
                    {/* <AceEditor/> */}

                </main>
                <Button style={{ display: 'flex' }}>
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
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: {
        theme: state.settings.theme,
        tabSize: state.settings.tabSize,
        fontSize: state.settings.fontSize,
        lazyMode: state.settings.lazyMode,
        lineNumbers: state.settings.lineNumbers,
        splits: state.settings.splits,
        language: state.settings.language,
        orientation: state.settings.orientation
    }
})

const mapDispatchToProps = {
    handleSettingsChange
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Editor));
