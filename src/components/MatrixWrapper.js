import React, {useEffect, useState} from 'react';
import Materix from "./Materix";
import ReactLoading from 'react-loading';

const dummy = [
    [[25, 26, 82, 32],
        [65, 26, 82, 14],
        [8, 32, 42, 82],
        [185, 26, 86, 79],],
    [[25, 26, 82, 867],
        [34, 26, 82, 14],
        [8, 324, 42, 66],
        [7, 252, 86, 79]],
    [[98, 26, 56, 32],
        [65, 26, 82, 14],
        [8, 66, 42, 82],
        [185, 7, 86, 89],]

]
const s = {
    "status": "SUCCESS",
    "data": {
        "intermediates": [{
            "current_vote": [0, 1, 2],
            "intermediate": [[[0, 0, 0], [1, 0, 0], [0, 0, 0]], [[0, 0, 0], [1, 0, 0], [1, 0, 0]], [[0, 0, 0], [1, 0, 0], [1, 1, 0]]]
        }, {
            "current_vote": [0, 1, 2],
            "intermediate": [[[0, 0, 0], [2, 0, 0], [1, 1, 0]], [[0, 0, 0], [2, 0, 0], [2, 1, 0]], [[0, 0, 0], [2, 0, 0], [2, 2, 0]]]
        }, {
            "current_vote": [2, 1, 0],
            "intermediate": [[[0, 0, 0], [2, 0, 1], [2, 2, 0]], [[0, 0, 1], [2, 0, 1], [2, 2, 0]], [[0, 1, 1], [2, 0, 1], [2, 2, 0]]]
        }, {
            "current_vote": [2, 1, 0],
            "intermediate": [[[0, 1, 1], [2, 0, 2], [2, 2, 0]], [[0, 1, 2], [2, 0, 2], [2, 2, 0]], [[0, 2, 2], [2, 0, 2], [2, 2, 0]]]
        }],
        "pairs": [{"winner": 1, "loser": 0, "value": 2}, {"winner": 2, "loser": 0, "value": 2}, {
            "winner": 2,
            "loser": 1,
            "value": 2
        }],
        "sorted": [{"winner": 2, "loser": 0, "value": 2}, {"winner": 2, "loser": 1, "value": 2}, {
            "winner": 1,
            "loser": 0,
            "value": 2
        }],
        "arrow_lock": [[false, true, true], [false, false, true], [false, false, false]]
    }
}

function MatrixWrapper({intermediateMatrices}) {
    const [currentIndex, setCurrentIndex] = useState(0)



    useEffect(() => {
        // Move on to the next message every `n` milliseconds
        let timeout;
        if (intermediateMatrices) {
            if (currentIndex < intermediateMatrices.length - 1) {
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
    }, [intermediateMatrices, currentIndex]);
    useEffect(()=>{
        setCurrentIndex(0)
    },[intermediateMatrices])

    return (
        intermediateMatrices ?
            <Materix data={intermediateMatrices[currentIndex]}/> :
            <div style={{marginTop: -18, marginLeft: 20}}>
                <ReactLoading type="bars" color="#00bcd4" height={20}/>
            </div>
    );
}

export default MatrixWrapper;
