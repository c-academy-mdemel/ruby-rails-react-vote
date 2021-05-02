import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";
import Materix from "../components/Materix";
import ColorChangingMatrix from "../components/ColorChangingMatrix";
import Pairs from "../components/Pairs";
import Sorted from "../components/Sorted";
import Arrow from "./Arrow";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 10,
        background: "linear-gradient(169deg, rgba(6,110,221,1) 0%, rgba(96,153,229,1) 0%, rgba(193,199,238,1) 16%, rgba(255,255,255,1) 67%)"

    },
    paper: {
        padding: 30,
        width: 1100,

    },
    head: {
        fontSize: 20,
        fontWeight: 700,
    },
    title: {
        fontSize: 15,
        fontWeight: 700,
    }
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
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item style={{textAlign: "center"}}>
                        <Typography className={classes.head}>Final Result</Typography>
                        <Button
                            onClick={()=>{window.location.reload(false);}}
                            startIcon={<PlayArrowIcon/>}
                        >Replay</Button>
                    </Grid>

                    <Grid item container
                          direction="row"
                          justify="flex-start"
                          spacing={2}
                          alignItems="flex-start">
                        <Grid item>
                            <Typography className={classes.title}>Pairs</Typography>
                            <Pairs/>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title}>Sorted</Typography>
                            <Sorted/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title}>Arrow Lock</Typography>
                        <Arrow/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Algo;
