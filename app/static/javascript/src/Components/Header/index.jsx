import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        // display: 'flex',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'block',
        padding: 5,
        fontFamily: "'Courgette', cursive",
        color: theme.palette.secondary.main,
    },
    languageSelect: {
        display: 'block',
        padding: 5,
        fontFamily: "'Courgette', sans-serif",
    },

    appBar: {
        alignContent: 'center',
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('md')]: {
            // padding: theme.spacing.unit,
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: 'white'
        },
    },
});

const Header = ({ classes, theme, apptheme, handleDrawerToggle, handleDrawerMobileToggle, languageSelect, language }) => (
    <div className={classes.root}>
        <AppBar color={'primary'} className={classes.appBar} style={(apptheme === 'dark')? {backgroundColor: theme.palette.primary.main}: {}}>

            <Toolbar disableGutters={true}>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerMobileToggle}
                    >
                        <MenuIcon style={{color: theme.palette.secondary.main}} />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                        CodeForMe
                    </Typography>
                </Hidden>
                {/*<Hidden smDown implementation="css">*/}
                {/*<IconButton*/}
                {/*color="inherit"*/}
                {/*aria-label="Open drawer"*/}
                {/*onClick={handleDrawerToggle}*/}
                {/*>*/}
                {/*<MenuIcon/>*/}
                {/*</IconButton>*/}
                {/*</Hidden>*/}

                <div className={classes.grow} />
                <Select
                    value={language}
                    variant={'filled'}
                    style={{ color: 'white' }}
                    onChange={languageSelect}
                >
                    <MenuItem value={'python'}>
                        <Typography className={classes.languageSelect} variant="body1" color="secondary" noWrap>
                            Python
                        </Typography>
                    </MenuItem>
                    {/*<MenuItem value={'javascript'}>*/}
                    {/*<Typography className={classes.languageSelect} variant="subheading" color="secondary" noWrap>*/}
                    {/*Javascript*/}
                    {/*</Typography>*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem value={'java'}>*/}
                    {/*<Typography className={classes.languageSelect} variant="subheading" color="secondary" noWrap>*/}
                    {/*Java*/}
                    {/*</Typography>*/}
                    {/*</MenuItem>*/}
                </Select>
            </Toolbar>
        </AppBar>
    </div>
);

export default withStyles(styles, { withTheme: true })(Header);