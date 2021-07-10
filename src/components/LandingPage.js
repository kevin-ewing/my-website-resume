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
            fontSize: "3.5rem"
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
        marginTop: "25rem",
        [theme.breakpoints.down("sm")]:{
            marginTop: "20rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: "17rem",
        }
    },
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
                </Grid>
            </div>
            <div style={{height: '1000px'}}>
            </div>
        </div>
        
    )
}