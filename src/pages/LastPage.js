import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";
import Pairs from "../components/Pairs";
import Sorted from "../components/Sorted";
import Arrow from "./Arrow";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Materix from "../components/ColorChangingMatrix";

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
        background: "#00bcd4",
        height: 40,
        fontFamily:"serif",
        fontSize:15
    }
}))

function LastPage(props) {
    const classes = useStyles()
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))
    const lastMatrices = res.data.intermediates[res.data.intermediates.length - 1].intermediate
    const lastMatrix = lastMatrices[lastMatrices.length - 1]
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                    spacing={5}
                >
                    <Grid item style={{textAlign: "center"}}   container  alignItems="stretch">
                        <div style={{width:"100%",textAlign:'left'}}
                             >
                            <Typography className={classes.head}>Final Result ( 2 )</Typography>
                            <Button
                                className={classes.nxtBtn}
                                onClick={() => {
                                    window.location.reload(false);
                                }}
                                startIcon={<PlayArrowIcon/>}
                            >Replay</Button>
                        </div>

                    </Grid>
                    <div style={{backgroundColor:"lightgray",height:1,width:"100%",margin:5}}/>
                    <Grid item container
                          direction="row"
                          justify="space-around"
                          alignItems="flex-start"
                          spacing={10}
                    >
                        <Grid item>
                            <Grid item>
                                <Typography className={classes.title}>Sorted (Step 1)</Typography>
                                <Sorted/>
                            </Grid>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.title}>Matrix (Step 2)</Typography>
                            <Materix data={lastMatrix} />
                        </Grid>
                    </Grid>
                    <Grid item>

                            <Typography className={classes.title}>Arrow Lock (Step 3)</Typography>
                            <Arrow/>

                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default LastPage;
