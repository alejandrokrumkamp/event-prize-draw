const request = require('request');
const fs = require('fs');
const configFile = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));

request.get(configFile.urlAPI, {
    'auth': {
        'bearer': configFile.bearer
    }

}).on('response', function(response) {
    console.log(response.statusCode) // 200
}).on('data', function(data) {
    let parsedData = JSON.parse(data);
    let attendees = parsedData.attendees;
    attendees.forEach(attendee => {
        console.log(attendee.profile.first_name);
    console.log(attendee.profile.last_name);
    })
});