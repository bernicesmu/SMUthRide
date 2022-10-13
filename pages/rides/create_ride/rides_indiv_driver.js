import {write_ride, find_rid} from '../../../index.js'

document.getElementById('rides').addEventListener('submit', write_ride_local) 

var username = "rferefvc" // to use session management to dynamically retrieve the username
var rideid = find_rid(username) 
console.log(rideid)



// writeUserData(1, username, email, "regine.com")

function write_ride_local() {
    var inputs = document.getElementsByTagName('input')
    var address = inputs.address.value 
    var cost = inputs.cost.value
    var capacity = inputs.capacity.value
    var frequency = document.querySelector('input[name="frequency"]:checked').value
    var date = inputs.date.value
    var time = inputs.time.value 
    write_ride(username, rideid, address, cost, capacity, frequency, date, time)
}
