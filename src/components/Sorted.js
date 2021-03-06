import React, { useState} from 'react';
import AnimatedSortingList from "./AnimatedSortingList";

function Sorted(props) {
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))
    const [choices, setChoices] = useState(JSON.parse(localStorage.getItem("choices")))
    const sortedRaw = res.data.sorted
    const notSortedRaw = res.data.pairs

    const sorted = sortedRaw.map((item, index) => (
        {
            id:item.id,
            winnerName: choices[item.winner],
            winnerIndex: item.winner,
            loserName: choices[item.loser],
            loserIndex: item.loser,
            value:  item.value
        }
    ))
    const notSorted = notSortedRaw.map((item, index) => (
        {
            id:item.id,
            winnerName: choices[item.winner],
            winnerIndex: item.winner,
            loserName: choices[item.loser],
            loserIndex: item.loser,
            value:  item.value
        }
    ))
    console.log({sortedRaw, notSortedRaw})
    return (
        <AnimatedSortingList sorted={sorted} notSorted={notSorted}/>
    );
}

export default Sorted
