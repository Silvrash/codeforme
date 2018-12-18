import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

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
    },
    languageSelect: {
        display: 'block',
        padding: 5,
        fontFamily: "'Courgette', sans-serif",
    },

    appBar: {
        alignContent: 'center',
        borderColor: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
    },
});

const Header = ({classes, handleDrawerToggle, handleDrawerMobileToggle, languageSelect, language}) => (
    <div className={classes.root}>
        <AppBar color={"primary"} className={classes.appBar}>
            <Toolbar disableGutters={true}>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerMobileToggle}
                    >
                        <MenuIcon/>
                    </IconButton>
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
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                    CodeForMe
                </Typography>
                <div className={classes.grow}/>
                <Select
                    value={language}
                    variant={'filled'}
                    style={{color: 'white'}}
                    onChange={languageSelect}
                >
                    <MenuItem value={'python'}>
                        <Typography className={classes.languageSelect} variant="subheading" color="secondary" noWrap>
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

export default withStyles(styles, {withTheme: true})(Header);