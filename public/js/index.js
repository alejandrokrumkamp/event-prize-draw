const getRandomAttendee = ()=>{
    fetch("http://localhost:3000/randomAttendee")
        .then(response => response.json())
        .then(data => data.randomAttendee)
        .then(randomAttendee => alert("Congratulations "+randomAttendee+"! You won!"))
}