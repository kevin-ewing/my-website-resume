import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Facebook from '@material-ui/icons/Facebook';
import GitHub from '@material-ui/icons/GitHub';
import docker from '../../assets/docker.svg';


const useStyles = makeStyles (theme => ({
    footer: {
        backgroundColor: theme.palette.primary.dark,
        zIndex: 1302,
        width: "100%",
        position: "relative",
    },
    topBar: {
        width: "100%",
        height: "3rem",
        zIndex: 1302,
        position: "relative",
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            height: "2rem",
        },
        [theme.breakpoints.down("xs")]: {
            height: "1rem",
        }
    },
    background: {
        width: "100%",
        height: "20rem",
        zIndex: 1302,
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        [theme.breakpoints.down("sm")]: {
            height: "15rem",
        },
        [theme.breakpoints.down("xs")]: {
            height: "25rem",
        }
    },
    copyright: {
        marginLeft: "1rem",
        paddingBottom: ".5rem",
        fontFamily: "Source+Sans+Pro",
        fontWeight: 300,
        fontSize: "1rem",
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            fontSize: ".8rem"
        },
        [theme.breakpoints.down("xs")]: {
            height: ".75rem"
        }
    },
    container: {
        position: "absolute", 
        marginRight: "2rem",
    },
    item: {
        color: "white",
        fontWeight: 200,
        fontFamily: "Source+Sans+Pro",
        fontSize: "1.5rem",
        textDecoration: "none",
        textTransfrom: "Capitalize",
        [theme.breakpoints.down("sm")]:{
            fontSize: "1rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: ".9rem",
        },
        "&:hover" :{
            color: theme.palette.common.orange,
        },
    },
    icons: {
        color: "white",
        fontFamily: "Tillium+Web",
        fontWeight: 100,
        fontSize: "2rem",
        WebkitTextDecorationColor: theme.palette.secondary.main,
    },
    memmo: {
        color: "white",
        fontFamily: "Source+Sans+Pro",
        fontWeight: 300,
        fontSize: "1rem",
        [theme.breakpoints.down("sm")]:{
            fontSize: ".77rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: ".7rem",
        }
    },
    gridTop:{
        margin: "2.5rem",
        [theme.breakpoints.down("sm")]:{
            marginTop: "1rem"
        },
        [theme.breakpoints.down("xs")]:{
            marginTop: ".25rem",
        }
    },
    widgit: {
        "&:hover" :{
            backgroundColor: "transparent"
        },
        color: theme.palette.secondary.dark,
        '& svg': {
            fontSize: "2rem"
        },
        [theme.breakpoints.down("sm")]:{
            '& svg': {
                fontSize: "1.5rem"
            }
        },
    },
    docker: {
        marginTop: "5px",
        height: "2.2rem",
        width: "2.2rem",
        [theme.breakpoints.down("sm")]:{
            height: "2rem",
            width: "2rem",
        },
    }
}))

export default function Footer(props) {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Box className={classes.topBar} />
            <Box className={classes.background}>
                <Grid container justify="space-around" className={classes.container}>
                    <Grid item className={classes.gridTop}>
                        <Typography className={classes.memmo}>
                            I am alwasy learning and looking for new projects! <br />
                            Leave a suggestion for a new feature, report a bug, <br />
                            or give your feedback by selecting the bug icon <br />
                            in the top left corner.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridTop}>
                        <Grid container direction = "column" alignItems="flex-end" spacing={2}>
                            <Grid item>
                                <Typography item component={Link} onClick={() => props.setValue(0)} to = "/" className={classes.item}>Home</Typography>
                            </Grid>
                            <Grid item>
                                <Typography item component={Link} onClick={() => props.setValue(1)} to = "/projects" className={classes.item}>Projects</Typography>
                            </Grid>
                            <Grid item>
                                <Typography item component={Link} onClick={() => props.setValue(2)} to = "/experience" className={classes.item}>Experience</Typography>
                            </Grid>
                            <Grid item>
                                <Typography item component={Link} onClick={() => props.setValue(3)} to = "/interests" className={classes.item}>Interests</Typography>
                            </Grid>
                            <Grid item className={classes.icons}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <IconButton className={classes.widgit} component={"a"} href="https://www.linkedin.com/in/kevin-ewing-4294301a1" rel="noopener noreferrer" target="_blank">
                                            <LinkedIn />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.widgit} component={"a"} href="https://www.facebook.com/profile.php?id=100008674630754" rel="noopener noreferrer" target="_blank">
                                            <Facebook />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.widgit} component={"a"} href="https://github.com/kevin-ewing" rel="noopener noreferrer" target="_blank">
                                            <GitHub />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Button className={classes.widgit} component={"a"} href="https://hub.docker.com/u/kevinewing" rel="noopener noreferrer" target="_blank">
                                        <img alt= "docker" src={docker} className={classes.docker}/>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Typography className={classes.copyright}>
                Kevin Ewing's Website Resume, 2021.
            </Typography>
        </footer>
    )
}