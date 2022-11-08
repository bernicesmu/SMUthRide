import { get_ride_details, find_user_profile, find_name_from_username, format_date, formatAMPM, create_chat } from "../../../index.js";

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const rideid = urlParams.get('rideid')
// get_ride_details(rideid)
// var driver_username = localStorage.getItem("driver_username")
// document.getElementById("username").innerHTML = `@${driver_username}`
// find_name_from_username(driver_username)
// document.getElementById("displayname").innerHTML = localStorage.getItem("displayname")
// find_user_profile(driver_username)
// var degree = localStorage.getItem("degree")
// var year = localStorage.getItem("year")
// document.getElementById("year_degree").innerHTML = `${year}, ${degree}`
// document.getElementById("user_address").innerHTML = localStorage.getItem("user_address")
// var cost = localStorage.getItem("cost")
// document.getElementById("costperpax").innerHTML = `$${cost} per pax`
// var max_capacity = localStorage.getItem("max_capacity")
// var capacity = localStorage.getItem("users_offered").split(",").length
// document.getElementById("capacity").innerHTML = `${capacity} / ${max_capacity} seats available`
// var date = format_date(localStorage.getItem("date"))
// var time = formatAMPM(localStorage.getItem("time"))
// document.getElementById("date_time").innerHTML = `${date[1]} (${date[0]}), ${time}`

// var username = localStorage.getItem("username_x")
// localStorage.clear()
// localStorage.setItem("username_x", username)

// document.getElementById("gotochat").addEventListener("submit", gotochat)

// function gotochat() { 
//     let your_username = localStorage.getItem("username_x")
//     create_chat(driver_username, your_username)
//     localStorage.setItem("driver_username", driver_username)


// }


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";


const app = Vue.createApp({
    data(){
        return{
            rideid : "",
            driver_username: "",
            driver_name : "",
            picture_url: "hi",
            cost_per_pax : 0,
            current_riders : [],
            max_capacity : "",
            address : "",
            degree :"",
            time: "",
            date : "",
            to_from : "",
            smu_location: ""
        }
    },
    computed:{
       
        getName(){
            const database = getDatabase(); 
            const user = ref(database, `users/${this.driver_username}`)
            onValue(user, (snapshot) => { 
                console.log(snapshot.val())
                let details = snapshot.val()
                this.driver_name = details.name
                this.picture_url = details.profile_url

                // year 2 information systems NOT in
               
            })
        }
       
        

    },
    methods:{
        getData(){
            const database = getDatabase(); 
            const ride_details = ref(database, `rides/${this.rideid}`)
            onValue(ride_details, (snapshot) => { 
                console.log(snapshot.val())
                let details = snapshot.val()
            
                this.driver_username = details.driver_username
                this.getName
                this.cost_per_pax = details.cost
                this.current_riders = details.users_offered
                this.max_capacity = details.max_capacity
                this.address = details.user_address
                this.time = details.time
                this.time = formatAMPM(this.time)
                this.date = details.date
                this.date = format_date(this.date)
                this.smu_location = details.smu_location
                this.to_from = details.to_from
            })
        }
        
    },
    created(){
        // console.log(window.location.href)
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const rideid = urlParams.get('rideid')
        this.rideid = rideid
        this.getData()
    }
});

app.mount('#main')