import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

export default function ResponsiveDrawer(props) {
    
    const classes = useStyles();
    

    return (
        <div className={classes.root}>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
            Hello <br/>
        </div>
    );
}