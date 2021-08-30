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
          My Projects Page
        </Typography>

        <Typography className={classes.projectIntros} gutterBottom>
          Click through the interface to learn about my projects.
          <hr />
          <br />
          <br />
        </Typography>
        <Typography variant="body2" component="p">
          This interface was inspired by Jira. Each ticke represents a small
          project that I have undertaken, with a small blurb of infomration
          about that project. To learn more about a project select that ticket
          just as you would in Jira.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.closeButton} onClick={handleAlertClose}>
          Close
        </Button>
      </CardActions>
    </Dialog>
  );
}
