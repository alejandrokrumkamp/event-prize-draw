const fetch = require('isomorphic-fetch');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));

// Bring all attendees to populate an array of full names of attendees
const fetchAttendees = ()=> {
    let bringMoreItems = true;
    let result = [];

    return fetch(config.urlAPI,config.settings)
        .then( response => {return response.json()})
        .then( data => {
            bringMoreItems = data.pagination.has_more_items;
            let attendees = data.attendees;
            attendees.forEach(attendee => {
                result.push(attendee);
            });

            if(bringMoreItems){
                config.settings.headers.Authorization = "Bearer "+data.pagination.continuation;
                console.log("Next token to bring items:"+ config.settings.headers.Authorization)
            }

            return result;
        })
        .catch( error => console.log(error))
};
let counter = 0;
fetchAttendees()
    .then((attendees)=>attendees.forEach((attendee)=>{
        counter++;
        console.log(attendee.profile.first_name+" "+attendee.profile.last_name)
    }))
    .then(()=>console.log(counter));