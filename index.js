const fetch = require('isomorphic-fetch');
const fs = require('fs');
const configFile = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));

const fetchAttendees = ()=> {
    //let bringMoreItems = true;
    return fetch(configFile.urlAPI,configFile.settings)
        .then( response => {return response.json()})
        .then( data => {
            console.log(data.pagination);
            bringMoreItems = data.pagination.has_more_items;
            let attendees = data.attendees;
            attendees.forEach(attendee => {
                result.push(attendee);
            });
            return attendees;
        })
        .catch( error => console.log(error))
};

fetchAttendees()
    .then((attendees)=>console.log(attendees));