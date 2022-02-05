import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import pythonLogo from "../assets/pythonLogo.svg";
import javascriptLogo from "../assets/javascriptLogo.svg";
import rLogo from "../assets/rLogo.svg";
import clojureLogo from "../assets/clojureLogo.svg";
import cLogo from "../assets/cLogo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-5rem",
  },
  lightBlueBox: {
    width: "100%",
    height: "60rem",
    backgroundColor: theme.palette.primary.light,
  },
  darkBlueBox: {
    width: "100%",
    height: "60rem",
    backgroundColor: theme.palette.primary.dark,
  },
  lightGreenBox: {
    width: "100%",
    height: "60rem",
    backgroundColor: theme.palette.secondary.light,
  },
  darkGreenBox: {
    width: "100%",
    height: "60rem",
    backgroundColor: theme.palette.secondary.dark,
  },
  headerTypography: {
    fontFamily: "Noto sans,sans-serif",
    color: "white",
    fontSize: "8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4rem",
    },
  },
  languageLogo: {
    height: "20rem",
    width: "20rem",
  },
  logoButton: {
    padding: "2rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  langageName: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    fontFamily: "Noto sans,sans-serif",
    fontSize: "5rem",
    color: "white",
  },
  packages: {
    color: "white",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginTop: "-1rem",
    fontSize: "1.5rem",
  },
}));

export default function ResponsiveDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.lightBlueBox}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              className={classes.logoButton}
              component={"a"}
              href="https://www.python.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="python logo"
                src={pythonLogo}
                className={classes.languageLogo}
              />
            </Button>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Typography className={classes.langageName}>Python</Typography>
            <Typography className={classes.packages}>
              Libraries: <br />
              Openpyxl, Pandas, Boto3, Scapy, Unittest, Blender
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.lightGreenBox}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              className={classes.logoButton}
              component={"a"}
              href="https://www.javascript.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="javascript logo"
                src={javascriptLogo}
                className={classes.languageLogo}
              />
            </Button>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Typography className={classes.langageName}>JavaScript</Typography>
            <Typography className={classes.packages}>
              Frameworks: <br />
              React (Material UI)
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.darkBlueBox}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              className={classes.logoButton}
              component={"a"}
              href="https://www.cprogramming.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="c logo" src={cLogo} className={classes.languageLogo} />
            </Button>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Typography className={classes.langageName}>C</Typography>
            <Typography className={classes.packages}>
              Experience: <br />
              Re-wrote a handful of C standard library functions-- available at my github.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.darkGreenBox}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              className={classes.logoButton}
              component={"a"}
              href="https://www.r-project.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="r logo" src={rLogo} className={classes.languageLogo} />
            </Button>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Typography className={classes.langageName}>R</Typography>
            <Typography className={classes.packages}>
              Packages: <br />
              Ggplot2, Tidyr, Dplyr, Leaflet, Shiny, Plotly, Stringr, Sentimentr
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.lightBlueBox}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              className={classes.logoButton}
              component={"a"}
              href="https://clojure.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt="clojure logo"
                src={clojureLogo}
                className={classes.languageLogo}
              />
            </Button>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Typography className={classes.langageName}>Clojure</Typography>
            <Typography className={classes.packages}>
              Libraries: <br />
              Cognitect-labs/aws-api, Http-kit, Compojure, Quil
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
