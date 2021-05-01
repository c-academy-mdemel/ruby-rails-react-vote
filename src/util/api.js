import axios from 'axios';

export const getData = async (data) => {
    return await axios.get(`https://chami-rails-backend.herokuapp.com/api/processor`, {
        params: {
            "cc": 3,
            "vc": 5,
            "vs": [
                {
                    "name": "chamika",
                    "votes": [0, 1, 2]
                },
                {
                    "name": "sampath",
                    "votes": [0, 1, 2]
                },
                {
                    "name": "mane",
                    "votes": [2, 1, 0]
                },
                {
                    "name": "ssad",
                    "votes": [0, 1, 2]
                },
                {
                    "name": "asd",
                    "votes": [1, 2, 0]
                }
            ]
        }
    })

}
export const getDataDummy = (passes) => new Promise((resolve, reject) => {
    const act = () => {
        console.log(passes)
        if (passes) resolve(
            {
                status: "SUCCESS",
                data: {
                    intermediates: [{
                        current_vote: [0, 1, 2],
                        intermediate: [[[0, 5, 1], [2, 8, 2], [2, 7, 0]], [[0, 7, 2], [2, 1, 2], [2, 7, 0]], [[0, 2, 2], [2, 0, 2], [1, 2, 0]]]
                    }, {
                        current_vote: [0, 1, 2],
                        intermediate: [[[0, 5, 1], [2, 8, 2], [2, 7, 0]], [[0, 7, 2], [2, 1, 2], [2, 7, 0]], [[0, 2, 2], [2, 8, 2], [7, 2, 0]]]
                    }, {
                        current_vote: [2, 1, 0],
                        intermediate: [[[0, 5, 1], [2, 8, 2], [2, 7, 0]], [[0, 7, 2], [2, 1, 2], [2, 7, 0]], [[0, 2, 9], [2, 0, 2], [7, 2, 0]]]
                    }, {
                        current_vote: [2, 1, 0],
                        intermediate: [[[0, 5, 1], [2, 8, 2], [2, 7, 0]], [[0, 7, 2], [2, 1, 2], [2, 7, 0]], [[0, 2, 2], [2, 1, 2], [7, 9, 0]]]
                    }],
                    pairs: [{winner: 1, loser: 0, value: 2}, {
                        winner: 2,
                        loser: 0,
                        value: 2
                    }, {winner: 2, loser: 1, value: 2}],
                    sorted: [{winner: 2, loser: 0, value: 2}, {
                        winner: 2,
                        loser: 1,
                        value: 2
                    }, {winner: 1, loser: 0, value: 2}],
                    arrow_lock: [[false, true, true], [false, false, true], [false, false, false]]
                }
            }
        )
        else reject(new Error('nothing'))
    }

    console.log('in the promise definition')

    setTimeout(act, 2000)
})
