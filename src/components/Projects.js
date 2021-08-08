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
        borderRadius: 20, 
        borderColor: theme.palette.common.purple
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
        borderRadius: 20,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.common.orange
        },
    },
}))

export default function LandingPage() {
    const classes = useStyles()
    const bullet = <span className={classes.bullet}>•</span>;
    const [image] = useState("https://source.unsplash.com/collection/33032665/");


    return (
        <div className={classes.background} style={{ padding: 30 }}>
            <Grid container spacing={7} justify="center" className={classes.TopAndBottomMargin}>
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
                                <Grid item xs={12} lg={4}>
                                    <Typography variant="body2" component="p">
                                        Ever since the release of iPhone shortcuts app with iOS 13 I was trying to come up with
                                        interesting and helpful shorcuts. After playing around with the simple scripting you
                                        can write within these shortcuts, I created this lockscreen changing shortcut. Every night
                                        at 3:00 this automation is run on my phone which grabs a random image from my Unsplashed
                                        colection of nature photos and sets that to my wallpaper. Though quite a simple task,
                                        it is extrmememly pleasant to wake up each morning to a different beautiful wallpaper.
                                        And, while it is not a very techincally impressive project, due tjo how much I interact
                                        with it, it is one of my favorite. I have included a sample of what my lockscreen and
                                        wallpaper looks like for today! Please note that in order to download the shortcut, you must
                                        be on a moble Apple device.
                                        <br />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                    <SamplePhoneShortcut image={image} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://www.icloud.com/shortcuts/09ff9068fe074cc19ddf99afbb8f232c" rel="noopener noreferrer" target="_blank">
                                Download the Shortcut
                            </Button>
                            <Button className={classes.button} component={"a"} href="https://unsplash.com/collections/33032665/naturewallpapers" rel="noopener noreferrer" target="_blank">
                                Unsplash Collection
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
                                An app used to explore the population of ticks over time in the United States. Using data
                                collected by NEON over the past six years, this app alows users to ask questions of the data
                                and intuativly explore the results of those questions on there own. With interactive options
                                and filters for the data, as well as beausitful visuals made with the R packagas of the
                                Tidyverse and Leaflet, select button below to view the hosted app on shinyapps.io and explore
                                the data for yourself.
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/tick-density-data-exploration" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
                            <Button className={classes.button} component={"a"} href="https://kevin-ewing.shinyapps.io/FinalTickPathogen/" rel="noopener noreferrer" target="_blank">
                                Visit the Web App
                            </Button>
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
                                This app similarly uses NEON data to explore tick populations. However this app is focused on the pathogens
                                that those ticks can spread. This Shiny app again uses Tidyverse and Leaflet to visual and graphically display
                                the data, so feel free to select select button below to view the hosted app on shinyapps.io and explore
                                tick pathogen trends yourself.
                                <br />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} component={"a"} href="https://github.com/kevin-ewing/tick-density-data-exploration" rel="noopener noreferrer" target="_blank">
                                Visit the Repo
                            </Button>
                            <Button className={classes.button} component={"a"} href="https://kevin-ewing.shinyapps.io/FinalTickPathogen/" rel="noopener noreferrer" target="_blank">
                                Visit the Web App
                            </Button>
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
                                Currently working on this! Check up on the progress by visiting the repo below.
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