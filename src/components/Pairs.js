import React, {useEffect, useState} from 'react';
import ColorChangingMatrix from "./ColorChangingMatrix";
import Grid from "@material-ui/core/Grid";
import Materix from "./ColorChangingMatrix";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


function Pairs(props) {
    const [choices, setChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))
    const lastMatrices = res.data.intermediates[res.data.intermediates.length - 1].intermediate
    const lastMatrix = lastMatrices[lastMatrices.length - 1]
    const pairs = res.data.pairs
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Move on to the next message every `n` milliseconds
        let timeout;
        if (pairs) {
            if (currentIndex < pairs.length - 1) {
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
    }, [pairs, currentIndex]);
    useEffect(() => {
        setCurrentIndex(0)
    }, [pairs])
    return (
        <div><Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <Materix
                    data={
                        pairs.slice(0, currentIndex + 1).map(i => (
                                [`winner : ${choices[i.winner]}`, `looser : ${choices[i.loser]}`, `value : ${i.value}`]
                            )
                        )
                    }
                />
            </Grid>
            <Grid item style={{marginLeft: 5, marginRight: 5}}>
                <ArrowForwardIcon/>
            </Grid>
            <Grid item>
                <ColorChangingMatrix data={lastMatrix} Y={pairs[currentIndex].loser} X={pairs[currentIndex].winner}/>
            </Grid>
            <Grid item style={{marginLeft: 5, marginRight: 5}}>
                <ArrowForwardIcon/>
            </Grid>
        </Grid>
        </div>

    );
}

export default Pairs
