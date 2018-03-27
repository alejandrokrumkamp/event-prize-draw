const request = require('request');
const fs = require('fs');
const configFile = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));
let token = configFile.bearer;
let bringMoreItems = true;

function fetchAttendees(){
    let result = [];
    request.get(configFile.urlAPI
        ,{
        'auth': {
            'bearer': token
        }
    }).on('response', function(response) {
        console.log(response.statusCode) // 200
    }).on('data', function(data) {
        let parsedData = JSON.parse(data);
        console.log(parsedData.pagination);
        bringMoreItems = parsedData.pagination.has_more_items;
        let attendees = parsedData.attendees;
        attendees.forEach(attendee => {
            result.push(attendee);
        });
        return result;
    });
}