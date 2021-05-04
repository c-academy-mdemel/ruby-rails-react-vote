import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";
import Pairs from "../components/Pairs";
import Sorted from "../components/Sorted";
import Arrow from "./Arrow";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 20,
        background: "linear-gradient(169deg, rgba(6,110,221,1) 0%, rgba(244,124,124,1) 0%, rgba(238,199,193,1) 27%, rgba(255,255,255,1) 67%)"

    },
    paper: {
        padding: 30,
        width: "90vw",

    },
    head: {
        fontSize: 28,
        fontWeight: 700,
        fontFamily:"serif"
    },
    title: {
        fontFamily:"serif",
        fontSize: 15,
        fontWeight: 700,
    },
    nxtBtn:{
        marginLeft:10,
        backgroundColor: "#ef9a9a",
        height: 40,
        fontFamily:"serif",
        fontSize:15
    }
}))

function Algo(props) {
    const classes = useStyles()
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))
    const history = useHistory();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={5}
                >
                    <Grid item style={{textAlign: "center"}}>
                        <Typography className={classes.head}>Final Result ( 1 )</Typography>
                        <Button
                            className={classes.nxtBtn}
                            onClick={() => {
                                window.location.reload(false);
                            }}
                            startIcon={<PlayArrowIcon/>}
                        >Replay</Button>
                        <Button
                            className={classes.nxtBtn}
                            onClick={() => {
                                history.push("/last");
                            }}
                            endIcon={<ArrowForwardIcon/>}
                        >Next</Button>
                    </Grid>
                    <div style={{backgroundColor:"lightgray",height:1,width:"100%",margin:5}}/>
                    <Grid item container
                          direction="row"
                          justify="flex-start"
                          spacing={2}
                          alignItems="flex-start">
                        <Grid item>
                            <Typography className={classes.title}>Pairs (Step 1)</Typography>
                            <Pairs/>
                        </Grid>
                        <Grid item style={{}}>
                            <Typography className={classes.title}>Sorted (Step 2)</Typography>
                            <Sorted/>
                        </Grid>
                    </Grid>
                    <Grid item container
                          direction="row"
                          justify="flex-start"
                          spacing={2}
                          alignItems="flex-start">
                        <Grid item>
                            <Typography className={classes.title}>Arrow Lock (Step 3)</Typography>
                            <Arrow/>
                        </Grid>

                    </Grid>


                </Grid>

            </Paper>
        </div>
    );
}

export default Algo;
