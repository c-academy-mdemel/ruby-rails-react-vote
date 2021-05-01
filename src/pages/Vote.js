import React, {useState} from 'react';
import SortableListWrapper from "../components/SortableList";
import {
    Grid, Typography, Paper, TextField, Button, List,
    ListItem,
    ListItemText, Divider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getData} from "../util/api";

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
    title: {
        fontSize: 15,
        fontWeight: 700,
    },
    addBtn: {
        background: "#00bcd4",
        height: 40
    },
    listHead: {
        fontSize: 15,
        fontWeight: 700,
        paddingLeft: 15
    },
    listItem: {
        fontSize: 12,
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
    const [choices, setChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const [sortedChoices, setSortedChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const [isSorted, setIsSorted] = useState(false)
    const [votes, setVotes] = useState({})
    const classes = useStyles()

    function getNewArray(array) {

        setSortedChoices(array)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setVoterName("")
        setSortedChoices(choices)
        let tempVotes = {}
        if (isSorted) {
            tempVotes = {...votes, [voterName]: sortedChoices}
        } else {
            tempVotes = {...votes, [voterName]: sortedChoices.map((item, index) => ({choice: item, index}))}
        }
        setVotes(tempVotes)
        setIsSorted(false)

    }

    async function handleFinalSubmit() {
        const data = await getData("gf")
        console.log(data)
    }

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
                        <Typography className={classes.head}>Vote</Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Grid item style={{margin: 10}}>
                            <TextField
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
                            <Grid item style={{margin: 10}}>
                                <Typography className={classes.title}>Select Choice Order (Drag and Drop)</Typography>
                                <SortableListWrapper initialItems={sortedChoices} getNewArray={getNewArray}
                                                     setIsSorted={setIsSorted}/>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid item style={{margin: 10}}>
                             uj
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item style={{margin:20}}>
                        <Divider orientation="horizontal"/>
                    </Grid>
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
                                >
                                    Submit
                                </Button> :
                                <Button
                                    onClick={handleFinalSubmit}
                                    className={classes.addBtn}
                                >
                                    Go to Results
                                </Button>}
                        </Grid>
                        {Object.keys(votes).length < voterCount && <Grid item>
                            <Typography style={{color: "red"}}>
                                {voterName === "" ? "Enter Voter Name" : ""}
                            </Typography>
                        </Grid>}
                        <Grid item>
                            <Typography style={{color: "red"}}>
                                {Object.keys(votes).length < voterCount ? `${voterCount - Object.keys(votes).length} Votes Remain` : "Voters Count Reached"}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid item style={{margin:20}}>
                        <Divider orientation="horizontal"/>
                    </Grid>
                    <Grid item>
                        <div style={{display: "flex", marginTop: 20}}>
                            {Object.keys(votes).map(v => {
                                return (
                                    <List key={Math.random()}>
                                        <Typography className={classes.listHead}>{v}</Typography>
                                        {votes[v].map((choice) => (
                                            < ListItem key={choice.index}>
                                                < ListItemText primary={choice.choice} className={classes.listItem}/>
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
