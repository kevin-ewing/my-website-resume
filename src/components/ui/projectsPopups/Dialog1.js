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
          Exploring Tick-Borne Pathogens
        </Typography>
        <Typography className={classes.projectIntros} gutterBottom>
          Web app with geographical representations of tick-borne pathogen
          distrabutions.
          <hr />
          <br />
          <br />
        </Typography>
        <Typography className={classes.languages} color="textSecondary">
          {bullet} Written in R with RStudio's Shinny.
        </Typography>
        <Typography variant="body2" component="p">
          This app similarly uses NEON data to explore tick populations. However
          this app is focused on the pathogens that those ticks can spread. This
          Shiny app again uses Tidyverse and Leaflet to visual and graphically
          display the data, so feel free to select select button below to view
          the hosted app on shinyapps.io and explore tick pathogen trends
          yourself.
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
          href="https://github.com/kevin-ewing/tick-pathogen-data-exploration"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Repo
        </Button>
        <Button
          className={classes.button}
          component={"a"}
          href="https://kevin-ewing.shinyapps.io/FinalTickPathogen/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit the Web App
        </Button>
      </CardActions>
    </Dialog>
  );
}
