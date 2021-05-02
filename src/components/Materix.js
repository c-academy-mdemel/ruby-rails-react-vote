import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import FadeIn from 'react-fade-in';
import ReactLoading from "react-loading";


function Materix({data}) {
    return (
        data ? <FadeIn> <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {data.map((row) => (

                            <TableRow key={Math.random()} style={{transition: "transform 300ms ease"}}>
                                {row.map(col =>
                                    <TableCell
                                        align="right"
                                        key={Math.random()}
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
            <div style={{marginRight:50}}>
               <ReactLoading type="bars" color="#00bcd4" height={20}/>
            </div>
    );
}

export default Materix;
