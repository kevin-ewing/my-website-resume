import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LinkedIn from '@material-ui/icons/LinkedIn'
import GitHub from '@material-ui/icons/GitHub'
import ViewWeekIcon from '@material-ui/icons/ViewWeek';


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: "#ffffff",
    },
    topMargin: {
        marginTop: "2.5rem",
        [theme.breakpoints.down('sm')]: {
            marginTop: ".1rem",
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: "0rem",
        },
    },
    sidebarColor: {
        backgroundColor: "#f1f3f5",
        borderWidth: "2px",
        borderColor: "#eaecef",
        height: "100%",
        width: "25rem",
        [theme.breakpoints.down('lg')]: {
            width: "20rem",
        },
        [theme.breakpoints.down('md')]: {
            width: "15rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "0rem",
        },
    },
    sidebarFont: {
        color: "#53627b",
        fontWeight: "500",
        fontSize: "1rem",
        fontFamily: "Montserrat",
        textTransform: "none",
    },
    selectedSidebarFont: {
        color: "#0052cc",
        fontWeight: "500",
        fontSize: "1rem",
        fontFamily: "Montserrat",
        textTransform: "none",
    },
    button: {
        width: "23",
        height: "5rem",
        borderRadius: ".5rem",
        marginLeft: "1rem",
        [theme.breakpoints.down('lg')]: {
            width: "18rem",
        },
        [theme.breakpoints.down('md')]: {
            width: "13rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "0rem",
        },
    },
    selected: {
        height: "5rem",
        backgroundColor: "#ebecf0",
        borderRadius: ".5rem",
        marginLeft: "1rem",
        [theme.breakpoints.down('lg')]: {
            width: "18rem",
        },
        [theme.breakpoints.down('md')]: {
            width: "13rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "0rem",
        },
    },
    sidebarIcons: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        size: "large",
        marginRight: "1rem",
    }
}))

export default function LandingPage() {
    const classes = useStyles()

    return (
        <div lassName={classes.background} >
            <Grid container className={classes.topMargin}>
                <Grid item>
                    <Box className={classes.sidebarColor} border={1}>
                        <Grid container direction={"column"} spacing={1} style={{ paddingTop: "1rem" }}>
                            <Grid item>
                                <Button className={classes.button}>
                                    <Typography className={classes.sidebarFont}>
                                        <GitHub className={classes.sidebarIcons} /> Visit my Github
                                    </Typography>
                                </Button>

                            </Grid>
                            <Grid item>
                                <Button className={classes.button}>
                                    <Typography className={classes.sidebarFont}>
                                        <LinkedIn className={classes.sidebarIcons} /> Visit my LinkedIn
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.selected}>
                                    <Typography className={classes.selectedSidebarFont}>
                                        <ViewWeekIcon className={classes.sidebarIcons} /> Active sprints
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid item>
                        <Grid container direction={"column"}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>



    )
}