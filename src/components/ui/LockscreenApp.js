import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



const useStyles = makeStyles((theme) => ({
    phoneCard: {
        height: "35rem",
        width: "20rem",
    }
}))



export default function SamplePhoneShortcut() {

    const classes = useStyles();
  const [image, setImage] = useState("");


    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ugid=8e402fcac4097b78bacf9cc0d44987025427626");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://source.unsplash.com/collection/33032665/?client_id=cKakzKM1cx44BUYBnEIrrgN_gnGqt81UcE7GstJEils", requestOptions)
        .then(response => response.text())
        .then(result => setImage(result))
        .catch(error => console.log('error', error));

    return (
        <div>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Card className={classes.phoneCard} elevation={12}>
                        <CardMedia image={image}>

                        </CardMedia>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className={classes.phoneCard} elevation={12}>
                        <CardMedia>

                        </CardMedia>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}