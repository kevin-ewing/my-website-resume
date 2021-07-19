import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BugReport from '@material-ui/icons/BugReport';
import PersonAdd from '@material-ui/icons/PersonAdd';
import leafVen from '../../assets/LeafVen.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
        },
        },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 100,
    alignItems: 'flex-start',
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]:{
        minHeight: 60
    }
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  logo: {
      height: '5em',
      [theme.breakpoints.down("sm")]:{
          height: "3em"
      },
      [theme.breakpoints.down("xs")]:{
        height: "2em"
      }
  },
  tabContainer: {
      marginLeft: "auto",
      marginTop: "auto",
  },
  title: {
        alignContent: "center",
        marginTop: "2.5rem",
        paddingLeft: "1rem",
        fontFamily: "Source+Sans+Pro",
        fontWeight: 200,
        fontSize: "2rem",
        textTransfrom: "Capitalize",
        color: "#363636",
        [theme.breakpoints.down("sm")]:{
            marginTop: "2rem",
            fontSize: "1.5rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: "1.5rem",
            fontSize: "1rem"
        }
  },
  tab: {
        fontFamily: "Tillium+Web",
        fontWeight: 200,
        textTransform: "none",
        fontSize: "1rem",
        minWidth: 10,
        marginLeft: "20px",
        "&:hover": {
            color: theme.palette.secondary.light
            },
  },
  buttonSettings: {
      height: "20px",
      width: "20px",
      margin: "5px",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.secondary.main
        }
  },
  logoContainer: {
    paddingLeft: "1em",
    paddingTop: "1em",
    "&:hover": {
        backgroundColor: "transparent"
    }
  },
  menuButtonSettings: {
      marginLeft: "auto",
      marginTop: "auto",
      height: "50px",
      width: "50px"
  },
  drawerItems: {
    fontFamily: "Tillium+Web",
    fontWeight: 200,
    textTransform: "none",
    fontSize: ".75rem",
    marginRight: "1rem",
    opacity: 0.70,
  },
  appbar: {
      zIndex: theme.zIndex.modal+1
  }
}));

function ElevationScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

export default function ProminentAppBar(props) {
    
  const classes = useStyles();
  const theme = useTheme();
  const matches =useMediaQuery(theme.breakpoints.down("sm"))
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = (e, newValue) => {
      props.setValue(newValue);
  }
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(()=> {
    if (window.location.pathname === "/" && props.value !== 0){
          props.setValue(0);
    }
    else if (window.location.pathname === "/projects" && props.value !== 1){
        props.setValue(1);
    }
    else if (window.location.pathname === "/experience" && props.value !== 2){
        props.setValue(2);
    }
    else if (window.location.pathname === "/interests" && props.value !== 3){
        props.setValue(3);
    }
  });

  const tabs = (
      <React.Fragment>
          <Tabs value={props.value} 
                onChange={handleChange} 
                className={classes.tabContainer} 
                indicatorColor="secondary">
                <Tab className={classes.tab} disableRipple component={Link} to="/" label="Home" />
                <Tab className={classes.tab} disableRipple component={Link} to="/projects" label="Projects"/>
                <Tab className={classes.tab} disableRipple component={Link} to="/experience" label="Experience"/>
                <Tab className={classes.tab} disableRipple component={Link} to="/interests" label="Interests" />
            </Tabs>
      </React.Fragment>
  )

  const widgits = (
    <React.Fragment >
        <IconButton color= "primary" aria-label="Connect" className={classes.buttonSettings}>
            <PersonAdd />
        </IconButton>
        <IconButton color= "primary" aria-label="Report a Bug" className={classes.buttonSettings}>
            <BugReport />
        </IconButton>
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment >
        <SwipeableDrawer disableBackdropTransition={!iOS} 
                        disableDiscovery={iOS} 
                        open={openDrawer} 
                        onClose={()=>setOpenDrawer(false)} 
                        onOpen={()=>setOpenDrawer(true)}>
            <div className = {classes.toolbarMargin} />
            <List disablePadding>
                <ListItem selected={props.value === 0} onClick={()=> {setOpenDrawer(false); props.setValue(0)}} divider button component={Link} to="/">
                    <ListItemText className={classes.drawerItems}>
                        Home
                    </ListItemText>
                </ListItem>
                <ListItem selected={props.value === 1} onClick={()=> {setOpenDrawer(false); props.setValue(1)}} divider button component={Link} to="/projects">
                    <ListItemText className={classes.drawerItems}>
                        Projects
                    </ListItemText>
                </ListItem>
                <ListItem selected={props.value === 2} onClick={()=> {setOpenDrawer(false); props.setValue(2)}} divider button component={Link} to="/experience">
                    <ListItemText className={classes.drawerItems}>
                        Experience
                    </ListItemText>
                </ListItem>
                <ListItem selected={props.value === 3} onClick={()=> {setOpenDrawer(false); props.setValue(3)}} divider button component={Link} to="/interests">
                    <ListItemText className={props.value === 3 ? 
                        classes.drawerSelectedItem : 
                        classes.drawerItems}>
                        Interests
                    </ListItemText>
                </ListItem>
            </List>

        </SwipeableDrawer>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.menuButtonSettings}>
            <MenuIcon />
        </ IconButton>
    </React.Fragment>
  )

  return (
      <React.Fragment>
          <ElevationScroll>
            <AppBar position="fixed" color = {theme.palette.common.white} className={classes.appbar}>
                <Toolbar className={classes.toolbar} disableGutters>
                <Button component={Link} to="/" className={classes.logoContainer} onClick={() => props.setValue(0)} disableRipple>
                    <img alt= "Kevin Nor Logo" className={classes.logo} src={leafVen} />
                </Button>
                <Typography variant="h5" component="h2" className={classes.title}>
                    My Website Resume
                </Typography>
                {matches ? drawer : tabs}
                {widgits}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className = {classes.toolbarMargin} />
      </React.Fragment>
  );
}
