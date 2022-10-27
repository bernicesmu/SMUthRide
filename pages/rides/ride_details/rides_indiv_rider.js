import { get_ride_details, find_user_profile, find_name_from_username, format_date, formatAMPM } from "../../../index.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const rideid = urlParams.get('rideid')
get_ride_details(rideid)
var driver_username = localStorage.getItem("driver_username")
document.getElementById("username").innerHTML = `@${driver_username}`
find_name_from_username(driver_username)
document.getElementById("displayname").innerHTML = localStorage.getItem("displayname")
find_user_profile(driver_username)
var degree = localStorage.getItem("degree")
var year = localStorage.getItem("year")
document.getElementById("year_degree").innerHTML = `${year}, ${degree}`
document.getElementById("user_address").innerHTML = localStorage.getItem("user_address")
var cost = localStorage.getItem("cost")
document.getElementById("costperpax").innerHTML = `$${cost} per pax`
var max_capacity = localStorage.getItem("max_capacity")
var capacity = localStorage.getItem("users_offered").split(",").length
document.getElementById("capacity").innerHTML = `${capacity} / ${max_capacity} seats available`
var date = format_date(localStorage.getItem("date"))
var time = formatAMPM(localStorage.getItem("time"))
document.getElementById("date_time").innerHTML = `${date[1]} (${date[0]}), ${time}`

var username = localStorage.getItem("username_x")
localStorage.clear()
localStorage.setItem("username_x", username)

document.getElementById("gotochat").addEventListener("submit", gotochat)

function gotochat() { 
    localStorage.setItem("driver_username", driver_username)
}
