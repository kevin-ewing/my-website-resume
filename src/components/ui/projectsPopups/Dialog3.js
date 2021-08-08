import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SamplePhoneShortcut from '../LockscreenApp';

const useStyles = makeStyles(theme => ({
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
        color: theme.palette.primary.dark,
    },
    languages: {
        marginBottom: 12,
        color: theme.palette.common.purple,
    },
    projectIntros: {
        fontWeight: 300,
        fontSize: "1.3rem",
        color: theme.palette.text.secondary,
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: ".5rem",
        color: "white",
    },
    closeButton: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: ".5rem",
        color: "white",
    }
}));

export default function SimpleDialogDemo(props) {
    const classes = useStyles()
    const bullet = <span className={classes.bullet}>•</span>;
    const [image] = useState("https://source.unsplash.com/collection/33032665/");


    const { alertShow, handleAlertClose } = props;

    return (
        <Dialog open={alertShow} onClose={handleAlertClose} aria-labelledby="simple-dialog-title" style={{ zIndex: 1500 }} className={classes.root}>
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
                <Typography variant="body2" component="p" style={{marginBottom:"2rem"}}>
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
                <SamplePhoneShortcut image={image} />
            </CardContent>
            <CardActions>
                <Button className={classes.closeButton} onClick={handleAlertClose}>
                    Close
                </Button>
                <Button className={classes.button} component={"a"} href="https://www.icloud.com/shortcuts/09ff9068fe074cc19ddf99afbb8f232c" rel="noopener noreferrer" target="_blank">
                    Download the Shortcut
                </Button>
                <Button className={classes.button} component={"a"} href="https://unsplash.com/collections/33032665/naturewallpapers" rel="noopener noreferrer" target="_blank">
                    Unsplash Collection
                </Button>
            </CardActions>
        </Dialog>
    );
}