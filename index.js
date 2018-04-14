const fetch = require('isomorphic-fetch');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('auth.cfg', 'utf8'));

let bringMoreItems = true;

// Bring all attendees to populate an array of full names of attendees
const fetchAttendees = ()=> {
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
                console.log("Next url to bring items:"+ config.urlAPI)
            }

            return result;
        })
        .catch( error => console.log(error))
};

const fetchAllAttendees = async ()=>{
    let counter = 0;
    while(bringMoreItems){
        let attendees = await fetchAttendees();
        attendees.forEach((attendee)=>{
            counter++;
            console.log(attendee.profile.first_name+" "+attendee.profile.last_name)
            console.log(attendee.status)
        })

        console.log(counter);
    }
    /*fetchAttendees()
        .then((attendees)=>attendees.forEach((attendee)=>{
            counter++;
            console.log(attendee.profile.first_name+" "+attendee.profile.last_name)
        }))
        .then(()=>console.log(counter));*/
}

fetchAllAttendees();