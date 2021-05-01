import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";

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
                        <Typography className={classes.head}>Ruby Tideman With C-Academy</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Algo;
