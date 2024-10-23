// let express = require('express');
// require vs import to use lowdb
// install and load DB
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

let app = express();

// Glitch
let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('listening at ', port);
});

process.env.API-KEY
process.env.MONGODB-URL


//DB - 1 - connect to the DB
const defaultData = { ritualTrackerData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//to parse JSON
app.use(express.json());

let ritualTracker = [];

// II. add a route on server that is listening for a post request 

app.post('/rituals', (req, res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        Rituals: req.body.Rituals
    }
    // no longer saving to the server 
    // ritualTracker.push(obj);
    // console.log(ritualTracker);
    

 //DB - 2 - add value to the DB
 db.data.ritualTrackerData.push(obj);
 db.write()
     .then(() => {
         res.json({ task: "success" });
     })
})

app.use('/', express.static('public'));

app.listen(5001, ()=> {
    console.log('listening at5001')
})

// add route to get all ritual tracking information 
app.get('/progress', (req,res)=>{
    //DB - 3 - fetch from the DB
    db.read()
    .then(() =>{
        let obj = {data: db.data.ritualTrackerData}
        res.json(obj);
    })
})