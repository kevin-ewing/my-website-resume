import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Highlight from 'react-highlight';
import SamplePhoneShortcut from './ui/LockscreenApp';

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
        "&:hover": {
            color: theme.palette.common.orange
        },
    },
}))

export default function LandingPage() {
    const classes = useStyles()
    const bullet = <span className={classes.bullet}>•</span>;
    const [image, setImage] = useState("https://source.unsplash.com/collection/33032665/");

    const updateApp = () => {
        if (image === "https://source.unsplash.com/collection/33032665/") {
            setImage("https://source.unsplash.com/collection/11407617/");
        }
        else {
            setImage("https://source.unsplash.com/collection/33032665/");
        }
    };


    return (
        <div className={classes.background}>
            <Grid container spacing={10} justify="center" className={classes.TopAndBottomMargin}>
                <Grid item xs={12} lg={6}>
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
                                {bullet} Written in Javascript with React and Material UI.
                            </Typography>
                            <Typography variant="body2" component="p">
                                I was perusing the internet one day when I noticed that the domain with my name was
                                available. I had never done any sort of web design with javascript or react but was
                                eager to tackle the challange and do something interesting with the domain. After
                                brianstorming for a bit, I settled on creating a web resume. It would provide me with
                                a space to show off some of my projects and interests. But it would also provide a challange
                                as a multi-page website. Since starting I have learned tons about web design, JavaScript,
                                React and Material UI. I have found it extrmemely satisfying to build this project from my
                                imagination. If you have any feedback or suggetions, feel free to leave them by selecting
                                the bug icon in the right corner of the app bar. Also feel free to checkout my code in the
                                repo linked below.
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/my-website-resume" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
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
                                {bullet} Written in R with RStudio's Shinny.
                            </Typography>
                            <Typography variant="body2" component="p">
                                The Harry Potter series has always been one of my favorite book series of all time. And so,
                                I wanted to see how the linguistic sentiment changes over the coures of the books. To do this
                                I wrote a simple app using RStudio's Shiny. Shiny is an R package that makes it easy to build
                                interactive web apps straight from R. For this project I used the well known R packages of the
                                Tidyverse to plot the data. In order to analyze the sentiment of these books I used the sentiment
                                lexicons of AFINN and Bing et al. To explore the results head over to the github repo to view the
                                code or visit the shinyapp.io hosted web app directly.
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/harry-potter-sentiment" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
                            <Button className={classes.button} component={"a"} href="https://kevin-ewing.shinyapps.io/HarryPotterAnalysis/" rel="noopener noreferrer" target="_blank">
                                Visit the Web App
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
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
                                {bullet} Written in Clojure implementing the Babashka interpreter
                            </Typography>
                            <Typography variant="body2" component="p">
                                Using Clojure, a Lisp language on the JVM, I created a command line tool for querying files. While normally
                                compiled on the JVM and run as a .jar file, Babashka is a Clojure interpreter that allows for much faster
                                startup as an alternative for Clojure scripting compared to slugish JVM Clojure. In order to acheive this,
                                increased startup speed, it sacrafices a general performance as compaired to executing compiled Clojure code.
                                Another safrafice Babaska makes is that the sci interpreter is only compatable a "substantial subset of Clojure."
                                If you are interested I would encorange you to check out the link to Babaska's git page below. Below I have also
                                included a sample usage of babashka-search.
                                <br />
                                <Highlight language="bash">
                                    {"$ bbsearch 'test.py'"}
                                    <br />
                                    <br />
                                    {"test.py"}
                                    <br />
                                    {"  Path: /Users/kewing/one/test.py"}
                                    <br />
                                    {"  Modified: 2021-01-01"}
                                    <br />
                                    {"  Size: 48096 bytes"}
                                    <br />
                                    {"test.py"}
                                    <br />
                                    {"  Path: /Users/kewing/two/test.py"}
                                    <br />
                                    {"  Modified: 2021-01-01"}
                                    <br />
                                    {"  Size: 9490 bytes"}
                                    <br />
                                    {"test.py"}
                                    <br />
                                    {"  Path: /Users/kewing/three/test.py"}
                                    <br />
                                    {"  Modified: 2021-01-01"}
                                    <br />
                                    {"  Size: 222 bytes"}
                                    <br />
                                    {"test.py"}
                                    <br />
                                    {"  Path: /Users/kewing/four/test.py"}
                                    <br />
                                    {"  Modified: 2021-01-01"}
                                    <br />
                                    {"  Size: 9490 bytes"}
                                </Highlight>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/babashka_search" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
                            <Button className={classes.button} component={"a"} href="https://github.com/babashka/babashka" rel="noopener noreferrer" target="_blank">
                                More info on Babashka
                            </Button>
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
                                Nighlty changing lockscreen shortcut for my iPhone.
                                <hr />
                                <br />
                                <br />
                            </Typography>
                            <Typography className={classes.languages} color="textSecondary">
                                {bullet} Written in the Apple shortcuts app.
                            </Typography>
                            <Grid container spacing={1} justify="center">
                                <Grid item xs={12} lg={5}>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly. well meaning and kindly.
                                        <br />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <SamplePhoneShortcut image={image} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://www.icloud.com/shortcuts/09ff9068fe074cc19ddf99afbb8f232c" rel="noopener noreferrer" target="_blank">
                                Download the Shortcut
                            </Button>
                            <Button className={classes.button} onClick={updateApp}>
                                Refresh
                            </Button>
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
                                {bullet} Written in R with RStudio's Shinny.
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
                            <Button className={classes.button}>Visit the Repo</Button>
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
                                {bullet} Written in R with RStudio's Shinny.
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button}>Visit the Repo</Button>
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
                                {bullet} Written in Javascript with React.
                            </Typography>
                            <Typography variant="body2" component="p">
                                In progress at the moment! Check up on the progress by visiting the repo below.
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/browser-instruments" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
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