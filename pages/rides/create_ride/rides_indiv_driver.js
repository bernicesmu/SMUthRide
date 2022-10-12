import {write_ride} from '../../../index.js'

document.getElementById('rides').addEventListener('submit', write_ride) 

var inputs = document.getElementsByTagName('input')
var address = inputs.address.value 
var cost = inputs.cost.value
var capacity = inputs.capacity.value
var frequency = inputs.frequency.value
var date = inputs.date.value
var time = inputs.time.value 

var username = sessionStorage.getItem('username')
console.log(username)
var rideid = 1



// db.ref("rides/" + username).set({
//     username,
//     message,
//   });

// writeUserData(1, username, email, "regine.com")

write_ride(username, rideid, address, cost, capacity, frequency, date, time)
