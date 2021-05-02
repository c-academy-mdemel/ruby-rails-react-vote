import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";
import Materix from "../components/Materix";
import ColorChangingMatrix from "../components/ColorChangingMatrix";
import Pairs from "../components/Pairs";
import Sorted from "../components/Sorted";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 10,
    },
    paper: {
        padding: 30,
        width: 700,

    },
    head: {
        fontSize: 20,
        fontWeight: 700,
    },
}))

function Algo(props) {
    const classes = useStyles()
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <Grid item style={{textAlign: "center"}}>
                        <Typography className={classes.head}>Final Result</Typography>
                    </Grid>

                    <Grid item style={{textAlign: "left", margin: 20}}>
                        <Typography>Pairs</Typography>
                        <Pairs/>
                    </Grid>
                    <Grid item style={{textAlign: "left", margin: 20}}>
                        <Typography>Sorted</Typography>
                        <Sorted/>
                    </Grid>
                    <Grid item style={{textAlign: "left", margin: 20}}>
                        <Typography>Arrow Lock</Typography>
                        <Materix data={res.data.arrow_lock}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Algo;
