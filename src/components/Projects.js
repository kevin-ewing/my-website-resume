import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Highlight from 'react-highlight'

const useStyles = makeStyles(theme => ({
    background: {
        marginTop: "2.5rem",
        backgroundColor: theme.palette.secondary.light,
        [theme.breakpoints.down('sm')]: {
            marginTop: ".1rem",
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: "0rem",
        },
        flexGrow: 1,
    },
    TopAndBottomMargin: {
        padding: "3rem"
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(1.5)',
        color: theme.palette.common.purple,
        marginRight: "1rem"
    },
    title: {
        fontFamily: "Source+Sans+Pro",
        fontWeight: 200,
        fontSize: "2rem",
    },
    languages: {
        marginBottom: 12,
        color: theme.palette.common.purple,
    },
    comingSoon: {
        fontFamily: "Source+Sans+Pro",
        fontWeight: 200,
        fontSize: "2rem",
        color: theme.palette.secondary.dark,
    },
    projectIntros: {
        fontWeight: 300,
        fontSize: "1.3rem",
        color: theme.palette.text.secondary,
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
    },
}))

export default function LandingPage() {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className={classes.background}>
            <Grid container spacing={10} justify="center" className={classes.TopAndBottomMargin}>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                My Web Resume
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                You already know what this is... you are visiting it right now.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in Javascript with React and Material UI.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                            <Highlight language="javascript">
                                {`function foo() { return 'bar' }`}
                            </Highlight>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Sentiment Analasys of Harry Potter
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Graphical tracking of sentiment over the course of the seven Harry Potter books.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in R with RStudio's Shinny.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly.
                                <br />
                                well meaning and kindly.
                                <br />
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Babashka Search
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Command line tool for querying information from home directory files.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in Clojure implementing the Babashka interpreter
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Browser Trumpet
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Web app to interactivly play the trumpet by scaling the browser window.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in Javascript with React.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Exploring Tick Density
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Web app with geographical representations of tick population densities.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in R with RStudio's Shinny.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                well meaning and kindly.
                                <br />
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Exploring Tick-Borne Pathogens
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Web app with geographical representations of tick-borne pathogen distrabutions.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in R with RStudio's Shinny.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Lockscreen Shortcut
                            </Typography>
                            <Typography className={classes.projectIntros} gutterBottom>
                                Scheduled nighlty-changing-lockscreen shortcut for my iphone.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bull} Written in the Apple shortcuts app.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button}>Visit the Repo</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                    <Typography className={classes.comingSoon}>
                        More coming soon!..
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}