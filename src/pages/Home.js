import React, {useEffect, useState} from 'react';
import {Paper, Typography, Grid, TextField, Button, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import splash from "../assets/splash2.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        background: "linear-gradient(169deg, rgba(6,110,221,1) 0%, rgba(244,124,124,1) 0%, rgba(238,199,193,1) 27%, rgba(255,255,255,1) 67%)",
        fontFamily: "serif"
    },
    fadeOut: {
        opacity: 0,
        transform: 'translate3d(-100px, 0, 0)',
        transition: 'opacity 250ms ease-out, transform 250ms ease-out',
    },
    fadeIn: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
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
    addBtn: {
        backgroundColor: "#ef9a9a",
        marginLeft: 10,
        height: 50,
        fontFamily: "serif",
        textTransform: "none",
        fontSize: 17
    },
    listItem: {
        display: "flex",
        margin: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "beige",
        padding: 5,
        width: 250,
        fontFamily: "serif"
    },
}))

function Home(props) {
    const history = useHistory();
    const classes = useStyles()
    const [choiceCount, setChoiceCount] = useState(0)
    const [voterCount, setVoterCount] = useState(0)
    const [choices, setChoices] = useState([])
    const [choiceInput, setChoiceInput] = useState("")
    const [splashShowed, setSplashShowed] = useState(true)


    function handleChoiceAdd(e) {
        e.preventDefault()

        if (choiceInput !== "") {
            setChoices([...choices, choiceInput])
            setChoiceInput("")
        }

    }

    function handleDelete(index) {
        const temp = [...choices]
        temp.splice(index, 1)
        setChoices(temp)
    }

    function handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem('choiceCount', choiceCount.toString())
        localStorage.setItem('voterCount', voterCount.toString())
        localStorage.setItem('choices', JSON.stringify(choices))
        history.push("/vote");
    }

    useEffect(() => {
        // Move on to the next message every `n` milliseconds
        let timeout;
        if (splashShowed) {
            timeout = setTimeout(
                () => {
                    setSplashShowed(false)
                }
                , 4000);
        }

        return () => {
            clearTimeout(timeout);

        };
    },);

    console.log(splashShowed)
    return (
        splashShowed ?
            <div className={classes.root} style={{paddingTop: splashShowed ? 0 : 20,}}>
                {<img className={splashShowed ? 'fadeIn' : 'fadeOut'} alt={"splash"} src={splash}/>}
            </div>
            : <div className={classes.root} style={{paddingTop: splashShowed ? 0 : 20,}}>
                {splashShowed && <img className={splashShowed ? 'fadeIn' : 'fadeOut'} alt={"splash"} src={splash}/>}
                <Paper className={classes.paper}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                    >
                        <Grid item style={{textAlign: "center"}}>
                            <Typography className={classes.head}>Ruby Tideman With Coder Academy</Typography>
                        </Grid>
                        <div style={{backgroundColor: "lightgray", height: 1, width: "100%", margin: 10}}/>
                        <Grid item style={{margin: 10}}>
                            <TextField
                                value={choiceCount}
                                label="Enter Number of Choices"
                                type="number"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setChoiceCount(parseInt(e.target.value))
                                }}
                            />
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <form style={{display: "flex"}} onSubmit={handleChoiceAdd}>
                                <TextField
                                    disabled={choices.length >= choiceCount}
                                    label="Enter Choice"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    value={choiceInput}
                                    onChange={(e) => {
                                        setChoiceInput((e.target.value))
                                    }}
                                    helperText={choices.length === 0 ? "Choice Count Is Zero" : choices.length >= choiceCount ? "Choice Count Reached" : ""}
                                />
                                <Button
                                    size="small"
                                    className={classes.addBtn}
                                    disabled={choices.length >= choiceCount || choiceInput === ""}
                                    type={"submit"}
                                >
                                    Add
                                </Button>
                            </form>
                        </Grid>
                        <Grid item>
                            {/*<TransferList choices={choices} />*/}
                            <div style={{display: "block", margin: 15}}>
                                {choices.map((choice, index) => (
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                            className={classes.listItem}
                                            key={index}
                                        >
                                            {/*<div className={classes.listItem}>*/}
                                            <Grid item> <Typography>{choice}</Typography></Grid>
                                            <Grid item>
                                                <IconButton
                                                    aria-label="delete" size="small" style={{marginTop: -4, marginLeft: 8}}
                                                    id={choice} name={choice}
                                                    onClick={(e) => handleDelete(index)}
                                                >
                                                    <DeleteIcon fontSize="small" style={{color: "red"}}/>
                                                </IconButton>
                                            </Grid>


                                            {/*</div>*/}
                                        </Grid>
                                    )
                                )}
                            </div>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <TextField
                                value={voterCount}
                                label="Enter Number of Voters"
                                type="number"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setVoterCount(parseInt(e.target.value))
                                }}
                            />
                        </Grid>
                        <Grid item
                              container
                              direction="row"
                              justify="space-around"
                              alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    onClick={handleSubmit}
                                    className={classes.addBtn}
                                    disabled={choices.length !== choiceCount}
                                    endIcon={<ArrowForwardIcon/>}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography style={{color: "red", fontFamily: "serif", fontSize: 17}}>
                                    {choices.length < choiceCount ? `Enter ${choiceCount - choices.length} more choice` : choiceCount <= 0 ? "Choice Count is not valid" : voterCount <= 0 ? "Voter Count is not valid" : ""}
                                </Typography>
                            </Grid>


                        </Grid>

                    </Grid>


                </Paper>


            </div>
    );
}

export default Home;
