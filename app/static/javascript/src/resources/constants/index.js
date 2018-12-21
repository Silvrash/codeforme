import {createMuiTheme} from '@material-ui/core/styles';

const baseUrl = `https://${document.domain}:${location.port}`;
// const baseUrl = 'https://codeforme.herokuapp.com'
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2c353e'
        },
        secondary: {
            main: '#17D4FE'
        },
        type: "light"
    },
    typography: {
        "fontFamily": "\"Poppins\", \"Helvetica\", \"Arial\", sans-serif",
        useNextVariants: true,
        color: '#4f5f6f'
    }
});

export {
    baseUrl,
    theme
};