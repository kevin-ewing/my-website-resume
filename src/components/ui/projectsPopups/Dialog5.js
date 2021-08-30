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
          Sentiment Analasys of Harry Potter
        </Typography>
        <Typography className={classes.projectIntros} gutterBottom>
          Graphical tracking of sentiment over the course of the seven Harry
          Potter books.
          <hr />
          <br />
          <br />
        </Typography>
        <Typography className={classes.languages} color="textSecondary">
          {bullet} Written in R with RStudio's Shinny.
        </Typography>
        <Typography variant="body2" component="p">
          The Harry Potter series has always been one of my favorite book series
          of all time. And so, I wanted to see how the linguistic sentiment
          changes over the coures of the books. To do this I wrote a simple app
          using RStudio's Shiny. Shiny is an R package that makes it easy to
          build interactive web apps straight from R. For this project I used
          the well known R packages of the Tidyverse to plot the data. In order
          to analyze the sentiment of these books I used the sentiment lexicons
          of AFINN and Bing et al. To explore the results head over to the
          github repo to view the code or visit the shinyapp.io hosted web app
          directly.
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
          href="https://github.com/kevin-ewing/harry-potter-sentiment"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Repo
        </Button>
        <Button
          className={classes.button}
          component={"a"}
          href="https://kevin-ewing.shinyapps.io/HarryPotterAnalysis/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Web App
        </Button>
      </CardActions>
    </Dialog>
  );
}
