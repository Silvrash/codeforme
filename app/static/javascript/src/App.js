import React, {Fragment} from 'react';
import backgroundImg from './Assets/wbg.png';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {withStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button";
import sample1 from './Assets/sample.gif'
import sample2 from './Assets/sample2.gif'
import happyDude from './Assets/speech.gif'
import Hidden from "@material-ui/core/Hidden";


const styles = theme => ({
    root: {
        backgroundColor: '#282c34',
        backgroundImage: `url(${backgroundImg})`,
        minHeight: '100vh',
        width: '100%',
        // filter: 'blur(5px)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontSize: `calc(10px + 2vmin)`,
        color: 'white'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '25vh',
        flexDirection: 'column'
    },
    landingHeaderText: {
        padding: '5px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '30px',
        },
    },
    landingSubText: {
        textAlign: 'center',
        paddingTop: '5px'
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: '50px',
        backgroundColor: '#ec3360',
        '&:hover': {
            backgroundColor: '#c42749'
        }
    },
    images: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    moreImages: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column'
    },
    shortDescriptions: {
        marginTop: '100px',
        width: '100%',
        // height: '300px',
        display: 'flex',
        padding: '10px',
        flexDirection: 'row',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
        textAlign: 'left',
        backgroundColor: '#2e2c35'
    },
    descriptionTitle: {
        fontWeight: '200',
        padding: '20px'
    },
    descriptionItem: {
        padding: '5px',
        width: '30%',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    descriptionSub: {
        padding: '5px',
    },
    gridList: {
        width: '50%',
        transform: 'translateZ(0)',
    },
    title: {
        fontFamily: "'Courgette', cursive"
    },
    footer: {
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30353e',
        color: '#8e9095'
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    codeIcon: {
        fontWeight: 600,
        marginRight: 10
    }
})
const App = ({classes, history}) => (

    <Fragment>
        <CssBaseline/>
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                <div className={classes.titleContainer}>
                    <Typography className={classes.codeIcon} variant="h5" color="inherit" noWrap>
                        {"</>"}
                    </Typography>
                    <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                        CodeForMe
                    </Typography>
                </div>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <Typography className={classes.landingHeaderText} variant={"h3"} color={"inherit"}>
                    Natural language to code in Real-time
                </Typography>
                <Typography className={classes.landingSubText} variant={'body2'} color={'inherit'}>
                    An online code editor for learning with natural language support
                </Typography>
                <Button variant="contained" color="primary" size="large" className={classes.button}
                        onClick={() => history.push('/code')}>
                    Code Now
                </Button>
                <div className={classes.images}>
                    <Hidden mdUp>
                        <img src={sample2} alt="sample-1" style={{marginTop: '50px', padding: 10}}
                             width={'100%'} height={'50%'}/>
                    </Hidden>
                    <Hidden xsDown={true} smDown={true}>
                        <img src={sample2} alt="sample-1h" style={{marginTop: '50px', padding: 10}}
                             width={522} height={330}/>
                        <div className={classes.moreImages}>
                            <img src={sample1} style={{marginTop: '50px', padding: 10}} alt="sample-2"
                                 width={'252px'}
                                 height={'150px'}/>
                            <img src={happyDude} style={{marginTop: '20px', padding: 10}} alt="sample-3"
                                 width={'252px'}
                                 height={'150px'}/>
                        </div>
                    </Hidden>
                </div>
                <div className={classes.shortDescriptions}>
                    <div className={classes.descriptionItem}>
                        <Typography className={classes.descriptionTitle} variant={'h4'} color={'inherit'}>
                            Teach yourself code
                        </Typography>
                        <Typography className={classes.descriptionSub} variant={'subtitle1'} color={'inherit'}>
                            Coding made easy with the help of our engine which can take your commands in natural
                            language and suggest to you the corresponding code snippet
                        </Typography>
                    </div>
                    <div className={classes.descriptionItem}>
                        <Typography className={classes.descriptionTitle} variant={'h4'} color={'inherit'}>
                            Lazy coding
                        </Typography>
                        <Typography className={classes.descriptionSub} variant={'subtitle1'} color={'inherit'}>
                            Sit back and relax whiles we do the typing for you. Just talk, we can take care of the
                            typing.
                        </Typography>
                    </div>
                    <div className={classes.descriptionItem}>
                        <Typography className={classes.descriptionTitle} variant={'h4'} color={'inherit'}>
                            In-built Intepreter
                        </Typography>
                        <Typography className={classes.descriptionSub} variant={'subtitle1'} color={'inherit'}>
                            View the output of your commands as you execute each line using the PyConsole option. 
                        </Typography>
                    </div>
                </div>
                <Typography variant={"caption"} className={classes.footer}>
                    Created by Benjamin Arko Afrasah, Opara Obinna G. and Alfred Sarpong Adjei. For help and support please send us an
                    email
                </Typography>

            </div>
        </div>

    </Fragment>
);

export default withStyles(styles)(App);
