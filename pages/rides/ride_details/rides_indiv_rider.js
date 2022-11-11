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
            neighbourhood: "",
            degree :"Information Systems",
            year: "Year 1",
            time: "",
            date : "",
            to_from : "",
            smu_location: "",
            new_mid: 0,
            user: "",
            msg_length: 0
        }
    },
    computed:{
       

    },
    methods:{
        getData(){
            const database = getDatabase(); 
            const ride_details = ref(database, `rides/${this.rideid}`)
            onValue(ride_details, (snapshot) => { 
                console.log(snapshot.val())
                let details = snapshot.val()
            
                this.driver_username = details.driver_username
                this.cost_per_pax = details.cost
                this.current_riders = details.users_offered
                this.max_capacity = details.max_capacity
                this.address = details.formatted_address
                this.neighbourhood = details.neighbourhood
                console.log(this.address)
                this.time = details.time
                this.time = formatAMPM(this.time)
                this.date = details.date
                this.date = format_date(this.date)
                this.smu_location = details.smu_location
                this.to_from = details.to_from

                var map;
                var chosenloc = this.address;
                console.log(this.address)
                var prof_loc = encodeURI(chosenloc);
        
                var url =
                "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                prof_loc +
                "&key=AIzaSyAv4TSlT_Tm-4Pi6x6_bkUZKgsfr_iFe5Q";
        
                axios.get(url)
                .then(response => {
                    var results = response.data.results[0]
                    var lat = results.geometry.location.lat
                    var lng = results.geometry.location.lng
                    var coords = [lat, lng]
                    this.initMap(coords)
                })
            })
        },

        gotochat(driver,user,length) { 

            console.log(driver)
            console.log(user)
            console.log(length)
            // var your_username = localStorage.getItem("username_x")
            if (this.to_from == 'from') { 
                var chat_message_details = `Hello! I am interested in a ride <a class="ride_url" href="../rides/ride_details/rides_indiv_rider.html?rideid=${this.rideid}">from ${this.smu_location} to ${this.address} on ${this.date[1]} (${this.date[0]}), ${this.time}!</a>`
            }
            else { 
                var chat_message_details = `Hello! I am interested in a ride <a class="ride_url" href="../rides/ride_details/rides_indiv_rider.html?rideid=${this.rideid}">from ${this.address} to ${this.smu_location} on ${this.date[1]} (${this.date[0]}), ${this.time}!</a>`
            }
            // create_chat(this.driver_username, your_username)
            if(driver != user){
                var list_for_chatid = [driver, user]
                list_for_chatid = list_for_chatid.sort().join(";")
                console.log(list_for_chatid)
                this.send_message(list_for_chatid, user, chat_message_details, length)

                
                // console.log(chatid)
                // var chatid = `${list_for_chatid[0]};${list_for_chatid[1]}`
                // this.send_message(chatid, your_username, chat_message_details)
                // localStorage.setItem("driver_username", driver_username)
            }
           
        },
        
        initMap(coords) {
            var map = new google.maps.Map(
                document.getElementById("map"),
                {
                    center: { lat: coords[0], lng: coords[1] },
                    zoom: 17,
                    mapTypeControl: false,
                    //mapTypeID: google.maps.mapTypeID
                }
            );
            var marker = new google.maps.Marker({
                map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: { lat: coords[0], lng: coords[1]},
                preserveViewport: true,
            });
        },

        getName(){
            const database = getDatabase(); 
            const user = ref(database, `users/${this.driver_username}`)
            onValue(user, (snapshot) => { 
                console.log(snapshot.val())
                let details = snapshot.val()
                console.log(details[this.driver_username]['profile_url'])
                this.driver_name = details[this.driver_username]['name']
                this.picture_url = details[this.driver_username]['profile_url']

                // year 2 information systems NOT in
                this.year = details[this.driver_username]['userprofile']['year']
                this.degree = details[this.driver_username]['userprofile']['degree']
               
            })
        },

        send_message(chat_id, user, message,length){
            // console.log("hello")
            const db = getDatabase()
            
            // const reference = ref(db, 'messages/' + chat_id)
            // onValue(reference, (snapshot) => {
            //     var all_messages = snapshot.val()
            //     console.log(all_messages.length)
            //     this.new_mid = all_messages.length
            //     // localStorage.setItem("aaa", this.new_mid)
                
            // })

            if(message.trim().length > 0){
                console.log(length)
               console.log("YES")
               let time = Date.now()
                set(ref(db, `messages/${chat_id}/${length}`), {
                    message: message,
                    username: user,
                    type: "message",
                    accepted : "message",
                    message_time : time,
                    mid : length
                    
                  })

            }
        },



        // get_length(){
        //     var you = localStorage.getItem("username_x")
        //     let driver = this.driver_username
        //     let list = [driver, you]
        //     let chat_id = list.sort().join(";")
        //     console.log(chat_id)
        //     const db = getDatabase()
            
        //     const reference = ref(db,`messages/${chat_id}`)
        //     onValue(reference, (snapshot) => {
        //         var all_messages = snapshot.val()
        //         console.log(all_messages)
        //         if(all_messages != null){
        //             this.msg_length = all_messages.length
        //         }
        //         else{
        //             this.msg_length = 0
        //         }
        //         // console.log(all_messages.length)
        //         // this.new_mid = all_messages.length
        //         // localStorage.setItem("aaa", this.new_mid)
                
        //     })

            
        // },
        
    },
    created(){
        // console.log(window.location.href)
        this.user = localStorage.getItem("username_x")
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const rideid = urlParams.get('rideid')
        this.rideid = rideid
        this.getData()
        this.getName()
        // this.get_length()
    }
});


app.component('send-button',{
    data(){
        return{
            length : 0,
            // chatid : "",
            user : "",
        }
    },

    props: ['driver','user'],

    emits: ['gotochat'],

    template: ` <form
                    id="gotochat"
                    method="post"
                    :action="find_action_path()"
                >
                <button v-if="!driver_is_user()" type="submit" class="btn btn-lg chat-button" v-on:click="$emit('gotochat',driver, user,length)" v-on:mouseover="get_length">
                    Chat for more
                </button>
                <button v-else class="btn btn-lg my-offer-button">
                    My offers
                </button>
                </form>`,

    methods: {
     
        get_length(){
            var you = this.user
            let driver = this.driver
            console.log(driver)
            let list = [driver, you]
            let chat_id = list.sort().join(";")
            console.log(chat_id)
            const db = getDatabase()
            
            const reference = ref(db,`messages/${chat_id}`)
            onValue(reference, (snapshot) => {
                var all_messages = snapshot.val()
                console.log(all_messages)
                if(all_messages != null){
                    this.length = all_messages.length
                }
                else{
                    this.length = 0
                }
                // console.log(all_messages.length)
                // this.new_mid = all_messages.length
                // localStorage.setItem("aaa", this.new_mid)
                
            })
        },

        driver_is_user() { 
            if (this.driver == this.user) { 
                return true
            }
            else { 
                return false
            }
        },

        find_action_path() { 
            if (this.driver == this.user) { 
                return "../../offers/offers.html"
            }
            else { 
                return "../../chats/chat.html"
            }
        }

       

        
    },
    created(){
        // get the chat id out first
    
        this.user = localStorage.getItem("username_x")
        // this.get_length()

        if (this.driver_is_user()) { 
            this.driver_user = true 
        }
        else { 
            this.driver_user = false 
        }

        console.log(this.driver_user)
    }
})



app.mount('#main')