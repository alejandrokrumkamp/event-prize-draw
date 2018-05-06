const express = require('express');
const getRandomAttendee = require('./src/core').getRandomAttendee;

const app = express();
const path = require("path");
const listenPort = 3000;


app.use('/', express.static(__dirname + '/public/html'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

app.get('/randomAttendee',(req,res)=>{
    getRandomAttendee()
        .then((randomAttendee)=>{res.json({randomAttendee:randomAttendee})})
})


app.listen(listenPort, () => {
    console.log('Event Prize Draw is running on http://localhost:'+listenPort);
});

