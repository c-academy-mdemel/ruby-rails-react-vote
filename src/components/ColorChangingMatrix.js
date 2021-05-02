import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import FadeIn from 'react-fade-in';
import ReactLoading from "react-loading";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    white: {
        backgroundColor: "white"
    },
    yellow: {
        backgroundColor: "yellow"
    },
}))

function Materix({data, X, Y}) {
    const classes = useStyles()
    const [color, setColor] = useState(false)

    React.useEffect(() => {
        // Move on to the next message every `n` milliseconds
        let timeout;
        setColor(true)

        timeout = setTimeout(
            () => {
                setColor(false)
            }
            , 1000);

        return () => {
            clearTimeout(timeout);

        };
    }, [data, X, Y]);
    // useEffect(() => {
    //     setColor(false)
    // }, [data])
    console.log(data, X, Y, color)
    return (
        data ? <FadeIn> <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {data.map((row, y) => (

                            <TableRow key={Math.random()}>
                                {row.map((col, x) =>
                                    <TableCell
                                        align="right"
                                        key={Math.random()}
                                        className={color && X === x && Y === y ? classes.yellow : classes.white}
                                        style={{
                                            borderStyle: "solid",
                                            borderWidth: 0.5,
                                            borderRadius: 0,
                                            borderColor: "lightgray",
                                        }}
                                    >{col.toString()}
                                    </TableCell>
                                )}
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer></FadeIn> :
            <div style={{marginRight: 50}}>
                <ReactLoading type="bars" color="#00bcd4" height={20}/>
            </div>
    );
}

export default Materix;
