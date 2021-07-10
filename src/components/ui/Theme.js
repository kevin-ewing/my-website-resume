import { createMuiTheme } from "@material-ui/core/styles";

const lightBlue = "#29b6f6";
const blue = "#03a9f4";
const darkBlue = "#0e90d8";
const lightGreen = "#9ccc65";
const green = "#8bc34a";
const darkGreen = "#7cb342";
const purple = "#8b6ca1";
const orange = "#c99c30";
const white = "#ffffff";

export default createMuiTheme({
    palette: {
        common: {
            lightBlue: `${lightBlue}`,
            blue: `${blue}`,
            darkBlue: `${darkBlue}`,
            green: `${green}`,
            lightGreen: `${lightGreen}`,
            darkGreen: `${darkGreen}`,
            purple: `${purple}`,
            orange: `${orange}`,
            white: `${white}`
        },
        primary: {
            light: lightBlue,
            main: blue,
            dark: darkBlue
        },
        secondary: {
            light: lightGreen,
            main: green,
            dark: darkGreen
        }
    },
    mixins: {
        toolbar: {
            minHeight: 70
        }
    }
});