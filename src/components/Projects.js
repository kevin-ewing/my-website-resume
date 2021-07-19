import React from 'react';
import background from '../assets/landingBackground.svg';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    background: {
        marginTop: "2.5rem",
        backgroundColor: theme.palette.primary.light,
        [theme.breakpoints.down('sm')]: {
            marginTop: ".1rem",
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: "0rem",
        },
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    TopAndBottomMargin: {
        padding:"3rem"
    }
}))

export default function LandingPage() {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <Grid container spacing={3} className={classes.TopAndBottomMargin}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <   Paper className={classes.paper}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>xs=6 sm=3</Paper>
                </Grid>
            </Grid>
        </div>
    )
}