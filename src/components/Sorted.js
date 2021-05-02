import React, {useEffect, useState} from 'react';
import ColorChangingMatrix from "./ColorChangingMatrix";
import Grid from "@material-ui/core/Grid";
import Materix from "./ColorChangingMatrix";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Sorted(props) {
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))
    const lastMatrices = res.data.intermediates[res.data.intermediates.length - 1].intermediate
    const lastMatrix = lastMatrices[lastMatrices.length - 1]
    const sorted = res.data.sorted
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Move on to the next message every `n` milliseconds
        let timeout;
        if (sorted) {
            if (currentIndex < sorted.length - 1) {
                timeout = setTimeout(
                    () => {
                        setCurrentIndex(currentIndex + 1)

                    }

                    , 1000);
            }
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [sorted, currentIndex]);
    useEffect(() => {
        setCurrentIndex(0)
    }, [sorted])
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <Materix
                    data={
                        sorted.slice(0, currentIndex + 1).map(i => (
                                [`winner : ${i.winner}`, `looser : ${i.loser}`, `value : ${i.value}`]
                            )
                        )
                    }
                />
            </Grid>
            <Grid item style={{marginLeft:20,marginRight:20}}>
                <ArrowForwardIcon/>
            </Grid>
            <Grid item>
                <ColorChangingMatrix data={lastMatrix} X={sorted[currentIndex].loser} Y={sorted[currentIndex].winner}/>
            </Grid>
        </Grid>
    );
}

export default Sorted