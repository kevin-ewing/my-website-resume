import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  phoneCard: {
    height: "35rem",
    width: "20rem",
    borderRadius: "2rem",
  },
  lockscreen: {
    height: "100%",
    paddingTop: "2rem",
  },
  time: {
    color: "white",
    fontFamily: "Source+Sans+Pro",
    fontWeight: 200,
    fontSize: "4rem",
  },
  date: {
    color: "white",
    fontFamily: "Source+Sans+Pro",
    fontWeight: 200,
    fontSize: "1rem",
  },
  app: {
    height: "50px",
    width: "50px",
  },
  rowMargin: {
    marginLeft: "1.5rem",
  },
}));

export default function SamplePhoneShortcut(props) {
  const classes = useStyles();
  var today = new Date();
  var dateOptions = { weekday: "long" };

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Card className={classes.phoneCard} elevation={24}>
            <CardMedia className={classes.lockscreen} image={props.image}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item>
                  <Typography className={classes.time}>
                    {today.getHours() + ":" + today.getMinutes()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.date}>
                    {new Intl.DateTimeFormat("en-US", dateOptions).format(
                      today
                    ) +
                      ", " +
                      today.toLocaleString("default", { month: "long" }) +
                      " " +
                      today.getDate()}
                  </Typography>
                </Grid>
              </Grid>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.phoneCard} elevation={24}>
            <CardMedia className={classes.lockscreen} image={props.image}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item className={classes.rowMargin}>
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                    <Grid item>
                      <Card className={classes.app} elevation={0} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
