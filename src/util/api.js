import axios from 'axios';

export const getData = async (data) => {
   return await axios.get(`https://chami-rails-backend.herokuapp.com/api/processor`, {
       params:{
           "cc": 3,
           "vc": 5,
           "vs": [
               {
                   "name": "chamika",
                   "votes": [0,1,2]
               },
               {
                   "name": "sampath",
                   "votes": [0,1,2]
               },
               {
                   "name": "mane",
                   "votes": [2,1,0]
               },
               {
                   "name": "ssad",
                   "votes": [0,1,2]
               },
               {
                   "name": "asd",
                   "votes": [1,2,0]
               }
           ]
       }
   })

}
