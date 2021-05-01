import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";
import Materix from "../components/Materix";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 100,
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
    console.log(res.data)
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
                    <Grid item style={{textAlign: "left",margin:20}}>
                        <Typography>Arrow Lock</Typography>
                        <Materix data={res.data.arrow_lock}/>
                    </Grid>
                    <Grid item style={{textAlign: "left",margin:20}}>
                        <Typography>Pairs</Typography>
                        <Materix data={res.data.pairs.map(i=>(
                            [`winner : ${i.winner}`,`looser : ${i.loser}`,`value : ${i.value}`,]
                        ))}/>
                    </Grid>
                    <Grid item style={{textAlign: "left",margin:20}}>
                        <Typography>Sorted</Typography>
                        <Materix data={res.data.sorted.map(i=>(
                            [`winner : ${i.winner}`,`looser : ${i.loser}`,`value : ${i.value}`,]
                        ))}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Algo;
