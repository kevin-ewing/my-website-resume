import React from 'react';
import background from '../assets/landingBackground.svg';
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    Background: {
        backgroundImage: `url(${background})`,
        backgroundRepeat:'repeat-x',
        height: '1920px',
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
        }
    },
    BigFont: {
        color: "white",
        fontWeight: 200,
        fontFamily: "Source+Sans+Pro",
        fontSize: "5rem",
        textDecoration: "none",
        textTransfrom: "Capitalize",
        [theme.breakpoints.down("sm")]:{
            fontSize: "3.4rem"
        },
        [theme.breakpoints.down("xs")]:{
            fontSize: "2.5rem",
        }
    },
    DescriptionFont: {
        color: "white",
        fontWeight: 200,
        fontFamily: "Tillium+Web",
        fontSize: "2rem",
        textDecoration: "none",
        textTransfrom: "Capitalize",
        [theme.breakpoints.down("sm")]:{
            fontSize: "1.5rem"
        },
        [theme.breakpoints.down("xs")]:{
            fontSize: "1.3rem",
        }
    },
    gridTop:{
        marginTop: "23rem",
        [theme.breakpoints.down("sm")]:{
            marginTop: "20rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: "17rem",
        }
    },
    padding: {
        marginTop: "5rem",
        marginBottom: "5rem",
        margin: "1rem",
        [theme.breakpoints.down("xs")]:{
            marginTop: "10rem",
        }
    },
    RightBottom: {
        marginTop: "17rem",
        paddingLeft: "25rem",
        [theme.breakpoints.down("xl")]:{
            marginTop: "15rem",
            paddingLeft: "30rem",
        },
        [theme.breakpoints.down("lg")]:{
            marginTop: "15rem",
            paddingLeft: "20rem",
        },
        [theme.breakpoints.down("md")]:{
            marginTop: "17rem",
            paddingLeft: "15rem",
        },
        [theme.breakpoints.down("sm")]:{
            marginTop: "15rem",
            paddingLeft: "10rem",
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: "10rem",
            paddingLeft: "7rem",
        }
    },
    Left: {
        marginTop: "15rem",
        paddingRight: "25rem",
        [theme.breakpoints.down("xl")]:{
            paddingRight: "30rem",
        },
        [theme.breakpoints.down("lg")]:{
            paddingRight: "20rem",
        },
        [theme.breakpoints.down("md")]:{
            paddingRight: "15rem",
        },
        [theme.breakpoints.down("sm")]:{
            paddingRight: "10rem",
        },
        [theme.breakpoints.down("xs")]:{
            paddingRight: "5rem",
        }
    },
    GreenFont: {
        color: "white",
        fontWeight: 200,
        fontFamily: "Tillium+Web",
        fontSize: "2rem",
        textDecoration: "none",
        textTransfrom: "Capitalize",
        [theme.breakpoints.down("md")]:{
            fontSize: "1.5rem"
        },
        [theme.breakpoints.down("md")]:{
            fontSize: "1.4rem"
        },
        [theme.breakpoints.down("xs")]:{
            fontSize: "1rem",
        }
    }
}))

export default function LandingPage() {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.Background}>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                    <Grid item className={classes.gridTop}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography className={classes.BigFont}>
                                    Hello, I am Kevin Ewing
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.DescriptionFont} align="center">
                                    And welcome to my website resume.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.padding}>
                        <Typography className={classes.DescriptionFont} align="center">
                            <br />
                            <br />
                            I am a junior at Middlebury College majoring in Computer Science. <br /> Interested in exploring the ever-growing connections between biology, statistics, and computer science.
                        </Typography>
                    </Grid>

                    <Grid item className={classes.padding}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <Grid item className={classes.Left}>
                                <Typography className={classes.GreenFont}>
                                    And so, if you are here on purpose, or have stumbled apon this page by accident, hello.
                                    Feel free to explore and I hope you learn a little about me.
                                </Typography>
                            </Grid>
                            <Grid item className={classes.RightBottom} justifyContent="flex-end">
                                <Typography className={classes.GreenFont}>
                                    About the logo:
                                    The logo in the header, is an exclusive or venn diagram. With the exclusive or being a logic operation by which all 
                                    other logic can be derived, it represensts my commitiment to exploring the two discaplines of 
                                    computer science and biology in the hopes of building connections.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
        
    )
}