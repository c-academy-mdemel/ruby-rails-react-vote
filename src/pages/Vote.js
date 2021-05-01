import React, {useState} from 'react';
import SortableListWrapper from "../components/SortableList";
import {
    Grid, Typography, Paper, TextField, Button, List,
    ListItem,
    ListItemText, Divider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getData, getDataDummy} from "../util/api";
import MatrixWrapper from "../components/MatrixWrapper";
import ReactLoading from 'react-loading';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 20,
        background:"linear-gradient(169deg, rgba(6,110,221,1) 0%, rgba(96,153,229,1) 0%, rgba(193,199,238,1) 16%, rgba(255,255,255,1) 67%)"
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
        setSortedChoices(choices)
        let tempVotes = {}
        if (isSorted) {
            tempVotes = {...votes, [voterName]: sortedChoices}
        } else {
            tempVotes = {...votes, [voterName]: sortedChoices.map((item, index) => ({choice: item, index}))}
        }
        setVotes(tempVotes)
        setIsSorted(false)

        const res = await getDataDummy(
            {
                cc: choiceCount,
                vc: voterCount,
                vs: Object.keys(tempVotes).map((voter) => (
                    {name: voter, votes: tempVotes[voter].map(choice => (choice.index))}
                ))
            }
        )

        setIntermediateMatrices(
          res.data.intermediates[res.data.intermediates.length-1].intermediate
            //res.data.intermediates[Object.keys(tempVotes).length].intermediate
        )

        setLoading(false)
    }

    async function handleFinalSubmit() {
        setLoading(true)
        const data = await getDataDummy("gf")
        localStorage.setItem("finalResult",JSON.stringify(data))
        setLoading(false)
        history.push("/algo");
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
                    <Grid item style={{textAlign: "center", display: "flex"}}>
                        <Typography className={classes.head}>Vote </Typography>

                        <div style={{marginTop: -18,marginLeft:20}}>
                            {loading && <ReactLoading type="bars" color="#00bcd4" height={20}/>}
                        </div>
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
                                <MatrixWrapper intermediateMatrices={intermediateMatrices}/>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item style={{margin: 20}}>
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
                    <Grid item style={{margin: 20}}>
                        <Divider orientation="horizontal"/>
                    </Grid>
                    <Grid item>
                        <div style={{display: "flex", marginTop: 20,width:700,overflowX:"auto"}}>
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
