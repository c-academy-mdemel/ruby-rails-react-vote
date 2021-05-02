import React, {useState} from "react";
import {useTransition, animated} from "react-spring";


const pairs = [{winner: 2, loser: 0, value: 2}, {
    winner: 25,
    loser: 0,
    value: 2
}, {winner:0, loser: 1, value: 2},{winner: 15, loser: 1, value: 2}]
const sorted = [{winner: 0, loser: 0, value: 2}, {
    winner: 2,
    loser: 9,
    value: 2
}, {winner: 15, loser: 11, value: 2},{winner: 25, loser: 11, value: 2}]


function AnimatedSortingList(props) {
    const [rows, set] = useState(pairs);
    const height = 20;
    const transitions = useTransition(
        rows.map((d, i) => ({ ...d, y: i * height })),
        d => d.winner,
        {
            from: { position: "absolute", opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y }) => ({ y, opacity: 1 }),
            update: ({ y }) => ({ y })
        }
    );
    console.log(transitions)
    return (
        <div class="list">
            <button onClick={() => set(sorted)}>shuffle</button>

            {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
                <animated.div
                    key={key}
                    class="card"
                    style={{
                        transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                        ...rest
                    }}
                >
                    <div style={{display:"flex"}}>
                        <div style={{margin:10}}> {item.winner} </div>
                        <div style={{margin:10}}> {item.loser} </div>
                        <div style={{margin:10}}> {item.value} </div>
                    </div>
                </animated.div>
            ))}
        </div>
    );
}

export default AnimatedSortingList
