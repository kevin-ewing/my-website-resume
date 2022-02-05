import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
import ViewWeekOutlined from "@material-ui/icons/ViewWeekOutlined";
import Grid from "@material-ui/core/Grid";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BuildIcon from "@material-ui/icons/Build";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import Dialog0 from "./ui/projectsPopups/Dialog0";
import Dialog1 from "./ui/projectsPopups/Dialog1";
import Dialog2 from "./ui/projectsPopups/Dialog2";
import Dialog3 from "./ui/projectsPopups/Dialog3";
import Dialog4 from "./ui/projectsPopups/Dialog4";
import Dialog5 from "./ui/projectsPopups/Dialog5";
import Dialog6 from "./ui/projectsPopups/Dialog6";
import Dialog7 from "./ui/projectsPopups/Dialog7";
import Dialog8 from "./ui/projectsPopups/Dialog8";
import Dialog9 from "./ui/projectsPopups/Dialog9";

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  marginTop: {
    marginTop: "6rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "4rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "3rem",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.dark,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.common.orange,
    },
  },
  moreButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.common.orange,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#fafbfc",
  },
  mainPage: {
    marginTop: "-5rem",
    flexGrow: 1,
    padding: theme.spacing(5),
    backgroundColor: "white",
    paddingTop: "3rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2rem",
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0rem",
      padding: theme.spacing(2),
    },
    paddingLeft: "1rem",
  },
  sideBarButton: {
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.common.orange,
    },
    color: "#475772",
  },
  sidebarFont: {
    fontSize: "1rem",
    textTransform: "none",
  },
  selectedSidebarFont: {
    fontSize: "1rem",
    textTransform: "none",
    color: theme.palette.primary.dark,
  },
  boardTitle: {
    fontSize: "2rem",
    color: theme.palette.primary.dark,
    fontFamily: "Noto sans,sans-serif",
  },
  boardDescripton: {
    fontSize: "1rem",
    color: "#475772",
    fontFamily: "Noto sans,sans-serif",
  },
  mainColumns: {
    height: "65rem",
    width: "15rem",
    backgroundColor: "#f1f3f5",
    borderColor: "white",
    borderRadius: ".5rem",
  },
  columnTopText: {
    fontSize: ".9rem",
    color: "#778298",
  },
  columnTopSpacing: {
    paddingTop: "1rem",
    paddingLeft: "1rem",
  },
  ticket: {
    height: "10rem",
    width: "14.5rem",
    marginLeft: "-.8rem",
    marginBottom: ".5rem",
    textTransform: "none",
    borderRadius: ".5rem",
    borderColor: "#f1f3f5",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#fafbfc",
      color: theme.palette.secondary.dark,
    },
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
  },
  ticketDescription: {
    fontSize: ".9rem",
    color: "#475772",
    fontFamily: "Noto sans,sans-serif",
    alignText: "left",
    justifyContent: "left",
    margin: ".5rem",
    marginBottom: "1.5rem",
  },
  Languages: {
    marginLeft: ".5rem",
    borderRadius: ".2rem",
    marginBottom: "1rem",
  },
  ticketLanguageDescription: {
    fontSize: ".75rem",
    color: "white",
    fontFamily: "Noto sans,sans-serif",
    alignText: "left",
    justifyContent: "left",
  },
  ticketNumber: {
    fontSize: ".75rem",
    color: "#bbc1ce",
    fontFamily: "Noto sans,sans-serif",
    alignText: "left",
    justifyContent: "left",
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [alertShow0, setAlertShow0] = React.useState(false);
  const handleAlertOpen0 = () => {
    setAlertShow0(true);
  };

  const handleAlertClose0 = () => {
    setAlertShow0(false);
  };

  const [alertShow1, setAlertShow1] = React.useState(false);
  const handleAlertOpen1 = () => {
    setAlertShow1(true);
  };

  const handleAlertClose1 = () => {
    setAlertShow1(false);
  };

  const [alertShow2, setAlertShow2] = React.useState(false);
  const handleAlertOpen2 = () => {
    setAlertShow2(true);
  };

  const handleAlertClose2 = () => {
    setAlertShow2(false);
  };

  const [alertShow3, setAlertShow3] = React.useState(false);
  const handleAlertOpen3 = () => {
    setAlertShow3(true);
  };

  const handleAlertClose3 = () => {
    setAlertShow3(false);
  };

  const [alertShow4, setAlertShow4] = React.useState(false);
  const handleAlertOpen4 = () => {
    setAlertShow4(true);
  };

  const handleAlertClose4 = () => {
    setAlertShow4(false);
  };

  const [alertShow5, setAlertShow5] = React.useState(false);
  const handleAlertOpen5 = () => {
    setAlertShow5(true);
  };

  const handleAlertClose5 = () => {
    setAlertShow5(false);
  };

  const [alertShow6, setAlertShow6] = React.useState(false);
  const handleAlertOpen6 = () => {
    setAlertShow6(true);
  };

  const handleAlertClose6 = () => {
    setAlertShow6(false);
  };

  const [alertShow7, setAlertShow7] = React.useState(false);
  const handleAlertOpen7 = () => {
    setAlertShow7(true);
  };

  const handleAlertClose7 = () => {
    setAlertShow7(false);
  };

  const [alertShow8, setAlertShow8] = React.useState(false);
  const handleAlertOpen8 = () => {
    setAlertShow8(true);
  };

  const handleAlertClose8 = () => {
    setAlertShow8(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [alertShow9, setAlertShow9] = React.useState(false);
  const handleAlertOpen9 = () => {
    setAlertShow9(true);
  };

  const handleAlertClose9 = () => {
    setAlertShow9(false);
  };

  const drawer = (
    <div>
      <div className={classes.marginTop} />
      <Divider />
      <List>
        <ListItem>
          <Button
            className={classes.sideBarButton}
            disableRipple
            component={"a"}
            href="https://github.com/kevin-ewing"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Typography className={classes.sidebarFont}>
              <GitHub
                style={{
                  verticalAlign: "middle",
                  display: "inline-flex",
                  fontSize: "1.6rem",
                }}
              />{" "}
              Visit my GitHub
            </Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className={classes.sideBarButton}
            disableRipple
            component={"a"}
            href="https://www.linkedin.com/in/kevin-ewing-4294301a1"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Typography className={classes.sidebarFont}>
              <LinkedIn
                style={{
                  verticalAlign: "middle",
                  display: "inline-flex",
                  fontSize: "1.6rem",
                }}
              />{" "}
              Visit my LinkedIn
            </Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button className={classes.sideBarButton} disableRipple>
            <Typography className={classes.selectedSidebarFont}>
              <ViewWeekOutlined
                style={{
                  verticalAlign: "middle",
                  display: "inline-flex",
                  fontSize: "1.6rem",
                }}
              />{" "}
              Active Sprints
            </Typography>
          </Button>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.mainPage}>
        <Grid
          container
          direction={"row"}
          style={{ justifyContent: "space-between", marginBottom: ".5rem" }}
        >
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              disableRipple
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.boardTitle}>
              My Project Board
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="More information"
              edge="start"
              className={classes.moreButton}
              disableRipple
            >
              <HelpOutlineOutlinedIcon onClick={handleAlertOpen0} />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          className={classes.boardDescripton}
          style={{ marginBottom: "2rem" }}
        >
          Select a ticket below to learn more information about that project.
        </Typography>

        <Grid
          container
          direction={"row"}
          spacing={1}
          style={{ justifyContent: "center" }}
        >
          <Grid item>
            <Card className={classes.mainColumns} variant="outlined">
              <div className={classes.columnTopSpacing}>
                <Typography className={classes.columnTopText}>
                  <b>TO DO</b> 1
                </Typography>
              </div>
              <CardContent>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen8}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Keep learning, experimenting and asking questions
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10.5rem", backgroundColor: "#8b6ca1" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>ANY AND ALL LANGUAGES</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <CheckBoxIcon
                          style={{
                            color: "#23aafa",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <ArrowUpwardIcon
                          style={{
                            color: "#d41a1b",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-8</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.mainColumns} variant="outlined">
              <div className={classes.columnTopSpacing}>
                <Typography className={classes.columnTopText}>
                  <b>IN PROGRESS</b> 2
                </Typography>
              </div>
              <CardContent>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen7}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Interactively play a trumpet by scaling the browser
                        window
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10rem", backgroundColor: "#c99c30" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>JAVASCRIPT WITH REACT</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <BuildIcon
                          style={{
                            color: "#AD2998",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                            fontSize: "1.2rem",
                          }}
                        />
                        <MoreVertOutlinedIcon
                          style={{
                            color: "#899B46",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-7</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen9}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                         Independent Study Creating Generative Art
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10rem", backgroundColor: "#60ab83" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>PYTHON WITH BLENDER</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <BuildIcon
                          style={{
                            color: "#AD2998",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                            fontSize: "1.2rem",
                          }}
                        />
                        <ArrowUpwardIcon
                          style={{
                            color: "#d41a1b",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-9</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.mainColumns} variant="outlined">
              <div className={classes.columnTopSpacing}>
                <Typography className={classes.columnTopText}>
                  <b>CODE REVIEW</b> 1
                </Typography>
              </div>
              <CardContent>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen6}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Bug fixes on this, my website resume
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10rem", backgroundColor: "#c99c30" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>JAVASCRIPT WITH REACT</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <BuildIcon
                          style={{
                            color: "#AD2998",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                            fontSize: "1.2rem",
                          }}
                        />
                        <ArrowUpwardIcon
                          style={{
                            color: "#d41a1b",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-6</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.mainColumns} variant="outlined">
              <div className={classes.columnTopSpacing}>
                <Typography className={classes.columnTopText}>
                  <b>DONE</b> 5
                </Typography>
              </div>
              <CardContent>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen5}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Graphically analyze the sentiment of Harry Potter
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "6rem", backgroundColor: "#0e90d8" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>R WITH SHINY</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <NotInterestedOutlinedIcon
                          style={{
                            color: "#FCA273",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <BookmarkIcon
                          style={{
                            color: "#85E633",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <RemoveCircleOutlinedIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-5</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen4}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Babashka command line tool for querying files
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10rem", backgroundColor: "#8bc34a" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>CLOJURE WITH BABASHKA</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <CheckBoxIcon
                          style={{
                            color: "#23aafa",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <ArrowUpwardIcon
                          style={{
                            color: "#d41a1b",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-4</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen3}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Nighlty changing lockscreen shortcut for my iPhone
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "10rem", backgroundColor: "#ec8a85" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>APPLE SHORTCUTS SCRIPT</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <CheckBoxIcon
                          style={{
                            color: "#23aafa",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <BookmarkIcon
                          style={{
                            color: "#85E633",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-3</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen2}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Interactively map geographic tick population densities
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "6rem", backgroundColor: "#0e90d8" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>R WITH SHINY</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <BuildIcon
                          style={{
                            color: "#AD2998",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                            fontSize: "1.2rem",
                          }}
                        />
                        <ArrowUpwardIcon
                          style={{
                            color: "#d41a1b",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <AddCircleIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-2</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
                <ButtonBase
                  className={classes.ticket}
                  variant="outlined"
                  onClick={handleAlertOpen1}
                >
                  <Grid
                    contianer
                    direction={"column"}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography className={classes.ticketDescription}>
                        Eplore geographic tick-borne pathogen distributions
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Box
                        className={classes.Languages}
                        style={{ width: "6rem", backgroundColor: "#0e90d8" }}
                      >
                        <Typography
                          className={classes.ticketLanguageDescription}
                        >
                          <b>R WITH SHINY</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.ticketNumber}>
                        <BuildIcon
                          style={{
                            color: "#AD2998",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                            fontSize: "1.2rem",
                          }}
                        />
                        <MoreVertOutlinedIcon
                          style={{
                            color: "#899B46",
                            marginRight: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <RemoveCircleOutlinedIcon
                          style={{
                            color: "#78758e",
                            marginRight: "5rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                        <b>KEV-1</b>
                        <AccountCircleIcon
                          style={{
                            color: "#78758e",
                            marginLeft: ".25rem",
                            verticalAlign: "middle",
                            display: "inline-flex",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ButtonBase>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
      <Dialog0 alertShow={alertShow0} handleAlertClose={handleAlertClose0} />
      <Dialog1 alertShow={alertShow1} handleAlertClose={handleAlertClose1} />
      <Dialog2 alertShow={alertShow2} handleAlertClose={handleAlertClose2} />
      <Dialog3 alertShow={alertShow3} handleAlertClose={handleAlertClose3} />
      <Dialog4 alertShow={alertShow4} handleAlertClose={handleAlertClose4} />
      <Dialog5 alertShow={alertShow5} handleAlertClose={handleAlertClose5} />
      <Dialog6 alertShow={alertShow6} handleAlertClose={handleAlertClose6} />
      <Dialog7 alertShow={alertShow7} handleAlertClose={handleAlertClose7} />
      <Dialog8 alertShow={alertShow8} handleAlertClose={handleAlertClose8} />
      <Dialog9 alertShow={alertShow9} handleAlertClose={handleAlertClose9} />
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
