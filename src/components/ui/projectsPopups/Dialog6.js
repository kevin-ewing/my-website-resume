import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 20,
    borderColor: theme.palette.common.purple,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1.5)",
    color: theme.palette.common.purple,
    marginRight: "1rem",
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
  },
}));

export default function SimpleDialogDemo(props) {
  const classes = useStyles();
  const bullet = <span className={classes.bullet}>•</span>;

  const { alertShow, handleAlertClose } = props;

  return (
    <Dialog
      open={alertShow}
      onClose={handleAlertClose}
      aria-labelledby="simple-dialog-title"
      style={{ zIndex: 1500 }}
      className={classes.root}
    >
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
          I was perusing the internet one day when I noticed that the domain
          with my name was available. I had never done any sort of web design
          with javascript or react but was eager to tackle the challange and do
          something interesting with the domain. After brianstorming for a bit,
          I settled on creating a web resume. It would provide me with a space
          to show off some of my projects and interests. But it would also
          provide a challange as a multi-page website. Since starting I have
          learned tons about web design, JavaScript, React and Material UI. I
          have found it extrmemely satisfying to build this project from my
          imagination. If you have any feedback or suggetions, feel free to
          leave them by selecting the bug icon in the right corner of the app
          bar. Also feel free to checkout my code in the repo linked below.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.closeButton} onClick={handleAlertClose}>
          Close
        </Button>
        <Button
          className={classes.button}
          component={"a"}
          href="https://github.com/kevin-ewing/my-website-resume"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Repo
        </Button>
      </CardActions>
    </Dialog>
  );
}
