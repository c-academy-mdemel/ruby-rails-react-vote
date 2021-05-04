import React, { useState } from 'react';
import SortableListWrapper from "../components/SortableList";
import {
    Grid, Typography, Paper, TextField, Button, List,
    ListItem,
    ListItemText, Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from "../util/api";
import MatrixWrapper from "../components/MatrixWrapper";
import ReactLoading from 'react-loading';
import { useHistory } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SaveIcon from '@material-ui/icons/Save';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

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
        minHeight: "85vh"
    },
    head: {
        fontSize: 28,
        fontWeight: 700,
        fontFamily: "serif"
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "serif"
    },
    addBtn: {
        backgroundColor: "#ef9a9a",
        height: 40,
        fontSize: 17,
        fontFamily: "serif"
    },
    listHead: {
        fontWeight: 700,
        paddingLeft: 15,
        fontSize: 18,
        fontFamily: "serif"
    },
    listItem: {
        fontSize: 15,
        fontFamily: "serif",
        fontWeight: 400,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "teal",
        padding: 1
    }
}))

function Vote(props) {
    const [choiceCount, setChoiceCount] = useState(parseInt(localStorage.getItem("choiceCount")))
    const [voterCount, setVoterCount] = useState(parseInt(localStorage.getItem("voterCount")))
    const [voterName, setVoterName] = useState("")
    const [loading, setLoading] = useState(false)
    const [choices, setChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const [sortedChoices, setSortedChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const [isSorted, setIsSorted] = useState(false)
    const [votes, setVotes] = useState({})

    //results
    const [intermediateMatrices, setIntermediateMatrices] = useState([])
    const classes = useStyles()
    const history = useHistory();
    function getNewArray(array) {

        setSortedChoices(array)
    }

    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        setVoterName("")

        let tempVotes = {}


        tempVotes = { ...votes, [voterName]: choices.map((item, index) => ({ choice: sortedChoices[index], index: sortedChoices.indexOf(item) })) }


        setSortedChoices(choices)

        setVotes(tempVotes)
        setIsSorted(false)

        const res = await getData(
            {
                cc: choiceCount,
                vc: Object.keys(tempVotes).length,
                vs: Object.keys(tempVotes).map((voter) => (
                    { name: voter, votes: tempVotes[voter].map(choice => (choice.index)) }
                ))
            }
        )

        setIntermediateMatrices(
            res.data.intermediates[res.data.intermediates.length - 1].intermediate
            //res.data.intermediates[Object.keys(tempVotes).length].intermediate
        )

        setLoading(false)
    }

    async function handleFinalSubmit() {
        setLoading(true)
        const data = await getData(
            {
                cc: choiceCount,
                vc: Object.keys(votes).length,
                vs: Object.keys(votes).map((voter) => (
                    { name: voter, votes: votes[voter].map(choice => (choice.index)) }
                ))
            }
        )
        localStorage.setItem("finalResult", JSON.stringify(data))
        setLoading(false)
        history.push("/algo");
    }

    let onSortEnd = ({ oldIndex, newIndex }) => {

        setSortedChoices(arrayMove(sortedChoices, oldIndex, newIndex));
    };

    //console.log(sortedChoices);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item style={{ textAlign: "center", display: "flex" }}>
                        <Typography className={classes.head}>Vote </Typography>
                        <div style={{ marginTop: -18, marginLeft: 20 }}>
                            {loading && <ReactLoading type="bars" color="#00bcd4" height={20} />}
                        </div>
                    </Grid>
                    <div style={{ backgroundColor: "lightgray", height: 1, width: "100%", margin: 10 }} />
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <Grid item>

                            <Grid item style={{ margin: 10 }}>
                                <TextField
                                    variant="outlined"
                                    value={voterName}
                                    label="Enter Voter Name"
                                    type="text"
                                    disabled={Object.keys(votes).length >= voterCount}
                                    fullWidth
                                    onChange={(e) => {
                                        setVoterName(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item style={{ margin: 10 }}>
                                <Typography className={classes.title}>Select Choice Order (Drag and Drop)</Typography>
                                {/* <SortableListWrapper initialItems={sortedChoices} getNewArray={getNewArray}
                                    setIsSorted={setIsSorted} /> */}
                                <SortableContainer onSortEnd={onSortEnd}>
                                    {sortedChoices.map((value, index) => (
                                        <SortableItem key={`item-${value}`} index={index} value={value} />
                                    ))}
                                </SortableContainer>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid item style={{ margin: 10 }}>
                                <MatrixWrapper intermediateMatrices={intermediateMatrices} />
                            </Grid>
                        </Grid>

                    </Grid>
                    <div style={{ backgroundColor: "lightgray", height: 1, width: "100%", margin: 10 }} />
                    <Grid item
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <Grid item>
                            {Object.keys(votes).length < voterCount ?
                                <Button
                                    onClick={handleSubmit}
                                    className={classes.addBtn}
                                    disabled={voterName === ""}
                                    endIcon={<SaveIcon />}
                                >
                                    Submit
                                </Button> :
                                <Button
                                    onClick={handleFinalSubmit}
                                    className={classes.addBtn}
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Go to Results
                                </Button>}
                        </Grid>

                        {Object.keys(votes).length < voterCount && <Grid item>
                            <Typography style={{
                                color: "red", fontSize: 18,
                                fontFamily: "serif"
                            }}>
                                {voterName === "" ? "Enter Voter Name" : ""}
                            </Typography>
                        </Grid>}
                        <Grid item>
                            <Typography style={{
                                color: "red", fontSize: 18,
                                fontFamily: "serif"
                            }}>
                                {Object.keys(votes).length < voterCount ? `${voterCount - Object.keys(votes).length} Votes Remain` : "Voters Count Reached"}
                            </Typography>
                        </Grid>

                    </Grid>

                    <Grid item>
                        <div style={{ display: "flex", marginTop: 20, width: 700, overflowX: "auto" }}>
                            {Object.keys(votes).map(v => {
                                console.log(votes)
                                return (
                                    <List key={Math.random()}>
                                        <Typography className={classes.listHead}>{v}</Typography>
                                        {votes[v].map((choice) => (
                                            < ListItem key={choice.index}>
                                                < ListItemText primary={choice.choice} className={classes.listItem} />
                                            </ListItem>
                                        ))
                                        }
                                    </List>
                                )
                            })}
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>

    );
}

export default Vote;
