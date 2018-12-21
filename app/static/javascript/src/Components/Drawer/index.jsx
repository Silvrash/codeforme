import React from 'react';
import Drawer from "@material-ui/core/Drawer/Drawer";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Hidden from "@material-ui/core/Hidden/Hidden";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import ProjectMenu from "../Menu/ProjectMenu";
import SettingsMenu from "../Menu/SettingsMenu";
import Typography from "@material-ui/core/Typography/Typography";

const drawerWidth = 240;
const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ color: 'white' }}>
            {props.children}
        </Typography>
    );
}
const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
    },
    toolbar: theme.mixins.toolbar,
    sideTabs: { color: 'white', fontWeight: 400 },
    title: {
        // padding: 20,
        // display: 'flex',
        fontFamily: "'Courgette', cursive",
        color: 'white'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-evenly'
    },
    codeIcon: {
        color: theme.palette.secondary.main,
        fontWeight: 600
    }
});


const NavDrawer = (props) => {
    const {
        open,
        classes,
        variant,
        onClose,
        selectedTabIndex,
        handleTabChange
    } = props;
    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            classes={{
                paper: classes.drawerPaper
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <Hidden smDown implementation="css">
                {/* <div className={classes.toolbar} /> */}
                <div className={classes.titleContainer}>
                    <Typography className={classes.codeIcon} variant="h5" color="inherit" noWrap>
                        {"</>"}
                    </Typography>
                    <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                        CodeForMe
                    </Typography>
                </div>
            </Hidden>

            <div className={classes.sideTabs}>
                <Tabs value={selectedTabIndex} onChange={handleTabChange}
                    textColor="inherit"
                    scrollable
                    scrollButtons="off">
                    <Tab value={0} label="Projects" className={classes.tabItem} />
                    <Tab value={1} label="Settings" className={classes.tabItem} />
                </Tabs>
                {/* <SettingsMenu /> */}
            </div>
            {selectedTabIndex === 0 && <TabContainer><ProjectMenu /></TabContainer>}
            {selectedTabIndex === 1 && <TabContainer><SettingsMenu /></TabContainer>}
        </Drawer>
    );
};

NavDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object,
    variant: PropTypes.string.isRequired,
    onClose: PropTypes.func,
}

export default withStyles(styles)(NavDrawer);