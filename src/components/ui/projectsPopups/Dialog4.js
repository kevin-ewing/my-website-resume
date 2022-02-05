import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Highlight from "react-highlight";

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
          Using Clojure, a Lisp language on the JVM, I created a command line
          tool for querying files. While normally compiled on the JVM and run as
          a .jar file, Babashka is a Clojure interpreter that allows for much
          faster startup as an alternative for Clojure scripting compared to
          sluggish JVM Clojure. In order to achieve this, increased startup
          speed, it sacrifices a general performance as compared to executing
          compiled Clojure code. Another sacrifice Babaska makes is that the sci
          interpreter is only compatible a "substantial subset of Clojure." If
          you are interested I would encourage you to check out the link to
          Babaska's git page below. Below I have also included a sample usage of
          babashka-search.
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
        <Button className={classes.closeButton} onClick={handleAlertClose}>
          Close
        </Button>
        <Button
          className={classes.button}
          component={"a"}
          href="https://github.com/kevin-ewing/babashka_search"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Repo
        </Button>
        <Button
          className={classes.button}
          component={"a"}
          href="https://github.com/babashka/babashka"
          rel="noopener noreferrer"
          target="_blank"
        >
          More info on Babashka
        </Button>
      </CardActions>
    </Dialog>
  );
}
