const fetch = require('isomorphic-fetch');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));

let attendees = [];
let bringMoreItems = true;

const fetchAttendees = ()=> {
    // Will bring a page of attendee (up to 50)
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
                config.urlAPI += "?continuation="+data.pagination.continuation;
            }

            return result;
        })
        .catch( error => console.log(error) )
};

const fetchAllAttendeesWithStatus = async (status)=>{
    // Will bring all attendees with certain status

    while(bringMoreItems){
        let fetchedAttendees = await fetchAttendees();
        await fetchedAttendees
            .filter((attendee)=> attendee.status === status)
            .forEach((attendee)=>{
                attendees.push(attendee)
            })
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const selectRandomAttendee = () => {
    let randomKey = getRandomInt(0,attendees.length);
    let randomAttendee = attendees[randomKey];
    return randomAttendee.profile.first_name+' '+randomAttendee.profile.last_name;
}

const getRandomAttendee = () => {
    // 'Checked In' | 'Attending' | 'Not Attending'
    return fetchAllAttendeesWithStatus('Checked In').then(()=> selectRandomAttendee());
}

module.exports.getRandomAttendee = getRandomAttendee;