import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:"-5rem",
    },
    blackBox: {
        width: "100%",
        height: "75rem",
        backgroundColor: "black"
    },
    blueBox: {
        width: "100%",
        height: "75rem",
        backgroundColor: theme.palette.primary.light
    },
    greenBox: {
        width: "100%",
        height: "75rem",
        backgroundColor: theme.palette.secondary.light
    },
}));

export default function ResponsiveDrawer(props) {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Box className={classes.blackBox}>


            </Box>
            <Box className={classes.blueBox}>


            </Box>
            <Box className={classes.blackBox}>


            </Box>
            <Box className={classes.greenBox}>


            </Box>
        </div>
    );
}