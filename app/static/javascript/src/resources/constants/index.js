import {createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const baseUrl = 'http://127.0.0.1:8080';
// const baseUrl = 'https://codeforme.herokuapp.com'
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3a1d1d'
        },
        secondary: green,
        type: "light"
    },
    typography: {
        "fontFamily": "\"Poppins\", \"Helvetica\", \"Arial\", sans-serif",
        useNextVariants: true
    }
});

export {
    baseUrl,
    theme
};