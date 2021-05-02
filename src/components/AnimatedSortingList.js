import React, {useState} from "react";
import {useTransition, animated} from "react-spring";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    btnWrapper: {
        display: "grid",
        height: "100%",
        placeContent: "center",
        placeItems: "center",
    },
    btn: {
        margin: 10,
        backgroundColor: "teal"
    },
    cell: {
        width: 100,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 0.5,
        borderRadius: 0,
        borderColor: "lightgray",
    },
    row: {
        display: "flex",
    }
}))

function AnimatedSortingList({sorted, notSorted}) {
    const classes = useStyles()
    const [rows, set] = useState(notSorted);
    const height = 52;
    const transitions = useTransition(
        rows.map((d, i) => ({...d, y: i * height})),
        d => d.id,
        {
            from: {position: "absolute", opacity: 0},
            leave: {height: 0, opacity: 0},
            enter: ({y}) => ({y, opacity: 1}),
            update: ({y}) => ({y})
        }
    );
    // console.log({sorted, notSorted})
    return (
        <div className={classes.root}>
            <div className={classes.btnWrapper}>
                <Button className={classes.btn} onClick={() => set(sorted)}>Sort</Button>
            </div>

            <Paper elevation={5}>
                {transitions.map(({item, props: {y, ...rest}, key}, index) => (
                    <animated.div
                        key={key}
                        style={{
                            transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                            ...rest
                        }}
                    >
                        <div className={classes.row}>
                            <div className={classes.cell}>
                                <Typography>winner : {item.winnerName}</Typography>
                                <Typography>index : {item.winnerIndex}</Typography>
                            </div>
                            <div className={classes.cell}>
                                <Typography>loser : {item.loserName}</Typography>
                                <Typography>index : {item.loserIndex}</Typography>
                            </div>
                            <div className={classes.cell}>
                                <Typography> value : {item.value}</Typography>
                            </div>
                        </div>
                    </animated.div>
                ))}
            </Paper>
        </div>

    );
}

export default AnimatedSortingList
