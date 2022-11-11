import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update,get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";




const chat_left = Vue.createApp({
    data(){
        return{
            chat_array:[],
            user: "",
            messages: [],
            current_chatid : "",
            message_to_send: "",
            new_mid : 0,
            other_user: "",
            image_url:"",
            offer_price: "",
            offer_template: "",
            is_offer : false,
            swapping: false,
            message_time : "",
            selected_driver: "",
            relevant_rides : [],
            selected_ride : "",
            offered_person_id : 0,
            counter : 0,
            selected_room: ""
        }
    },
    computed:{
        // find all chats
        get_related_chats(){
            const db = getDatabase()
            const reference = ref(db, 'messages')
    
            
            onValue(reference, (snapshot) => {
                this.chat_array = []
                let all_chats = snapshot.val()
                // console.log(all_chats)
                console.log(all_chats)
                for(var chat in all_chats){
                    // console.log(chat)
                    let usernames_in_chat = chat.split(";")
                    if(usernames_in_chat.includes(this.user)){
                        // check the timing
                        console.log(all_chats[chat])

                        // implementation of timing 
                        const timing = ref(db,`messages/${chat}`)
                        onValue(timing,(snapshot)=>{

                            // console.log(snapshot.val())
                            let all_message = snapshot.val()
                            let latest_message = all_message[all_message.length -1]
                            // console.log(latest_message)
                            let timing_of_latest_message = latest_message.message_time
                            console.log(timing_of_latest_message)
                            let chat_object = {
                                chat_id : chat,
                                timing : timing_of_latest_message
                            }
                            this.chat_array.push(chat_object)


                        })
                        // this.chat_array.push(chat)
                    }
                    
                }
                this.chat_array.sort(function(a, b) {
                    return parseInt(b.timing) - parseInt(a.timing);
                });
                console.log(this.chat_array)
                // sort by timing 
            })
            
        },
        window(){
            if ($(window).width() < 960) {
                alert('Less than 960');
             }
             else {
                alert('More than 960');
             }
        }
       


    },
    methods:{
        retreive_chat(chatid){
            const db = getDatabase()

            let users = chatid.split(";")

            for(var user of users){
                if(user != this.user){
                    this.other_user = user
                    this.get_userimage()
                }
            }
            
            const reference = ref(db, `messages/${chatid}`)
            this.current_chatid = chatid
        
            onValue(reference, (snapshot) => {
                this.messages = []
                let all_messages = snapshot.val()
                // console.log(all_chats)
                // console.log(all_messages)
                if(all_messages.length > 0){
                    for(var message of all_messages){
                        // console.log(message)
                        this.messages.push(message)
                    }
                }
                
                
            })
            this.swapping = false
            document.getElementById("chat").className = ""

        },
        send_message(){
            // console.log("hello")
            const db = getDatabase()
            
            const reference = ref(db, 'messages/' + this.current_chatid)
            onValue(reference, (snapshot) => {

                // console.log(snapshot.val())
                let all_messages = snapshot.val()

                this.new_mid = all_messages.length
                

            })
            console.log(this.message_to_send)
            if(this.message_to_send.trim().length > 0){
                this.message_time =  Date.now()
               
                set(ref(db, `messages/${this.current_chatid}/${this.new_mid}`), {
                    message: this.message_to_send,
                    username: this.user,
                    type : "message",
                    accepted : "message",
                    message_time : this.message_time,
                    mid : this.new_mid
                  })

                // let current_time = new Date()
                // console.log(current_time)
                // add to database the last message timing

            }
           
            this.message_to_send = ""
              
            this.retreive_chat(this.current_chatid)

        },
        send_offer(){
            // console.log("hello")
            const db = getDatabase()
            
            console.log(this.offer_template)

            const reference = ref(db, 'messages/' + this.current_chatid)
            onValue(reference, (snapshot) => {

                // console.log(snapshot.val())
                let all_messages = snapshot.val()

                this.new_mid = all_messages.length
                

            })
            // console.log(this.selected_ride)
            const location = ref(db, 'rides/' + this.selected_ride)
            onValue(location, (snapshot) =>{

                let ride_details = snapshot.val()
                let smu_location = ride_details.smu_location
                let to_from = ride_details.smu_to_from
                let neighbourhood = ride_details.neighbourhood
                let ride_string = ""
                if(to_from.toLowerCase() == "to"){
                    ride_string = `${neighbourhood} to ${smu_location}`
                }
                else{
                    ride_string = `${smu_location} to ${neighbourhood}`
                }
                this.offer_template = `I am offering $${this.offer_price} for ${ride_string}`

                

            })

            set(ref(db, `messages/${this.current_chatid}/${this.new_mid}`), {
                message: this.offer_template,
                username: this.user,
                type : "offer",
                accepted : "pending",
                message_time : Date.now(),
                selected_ride : this.selected_ride,
                mid : this.new_mid
              })
            
            this.offer_price = ""
            this.selected_driver = ""
            this.selected_ride = ""


           


            // const db = getDatabase()
            
            // const reference = ref(db, 'messages/' + this.current_chatid)
            // onValue(reference, (snapshot) => {
            //     var all_messages = snapshot.val()
            //     this.new_mid = all_messages.length
            //     // localStorage.setItem("aaa", this.new_mid)
            // })

            // if(message.trim().length > 0){
            //     set(ref(db, `messages/${chat_id}/${this.new_mid}`), {
            //         message: message,
            //         username: user   
            //       })

            // }
        },
        get_userimage(){
            const db = getDatabase()
            const reference = ref(db, 'users/' + this.other_user)

            onValue(reference, (snapshot) => {
                console.log(snapshot.val())
                // console.log(snapshot.val())
                let user_profile = snapshot.val()
                let image = user_profile["profile_url"]
                this.image_url = image
            })

        },
   
        swap(){
            this.swapping = true
            console.log(window.screen.width)
            document.getElementById("leftbar").className = "d-md-block"
            document.getElementById("chat").className = "d-none"
        },

        message_formatted(message) { 
            return `<b>${message.username}</b>: ${message.message}`
        },
        // offer_formatted(message){
        //     // return `<button v->${message.username}</b>: ${message.message}`
            
        //     console.log(message.username)
        //     let username = message.username
        //     if(this.user == username){
        //         let display_message = `<b>${message.username}</b>: ${message.message}<br>Status: <b>${message.accepted}</b>`
        //         return display_message
        //     }
        //     else{
        //         //display with the button
        //         let display_message = `<b>${message.username}</b>: ${message.message}<br>
        //         <button class="btn btn-success" id="accept_${message.selected_ride}_${this.user}" onclick="accept(this)">Accept Offer</button><button class="btn btn-danger" v-on:click="decline">Decline Offer</button>`

        //         return display_message

        //     }
        // },
        // accept(){
        //     console.log("YEA")
        // },

        // decline(){

        // },

        get_relevant_rides(){
            this.relevant_rides = []
            let driver = this.selected_driver
            const db = getDatabase()
            const reference = ref(db, 'rides/')
            // this.selected_driver = ""
            this.selected_ride = ""
            this.offer_price = ""

            onValue(reference, (snapshot) => {
                // console.log(snapshot.val())
                // console.log(snapshot.val())
                let all_rides= snapshot.val()
                console.log(all_rides)
                for(var rider in all_rides){
                    if(rider != null){
                        
                        let ride = all_rides[rider]
                        console.log(ride)
                        let driver = ride.driver_username
                        if(driver == this.selected_driver){
                            let ride_date = ride.date
                            let users_offered_length = ride.users_offered.length
                            let max_capacity = ride.max_capacity
                            let current_date = new Date()
                            let to_from = ride.smu_to_from
                            let ride_date_array = ride_date.split("-")
                            let ride_id = ride.ride_id 


                            let ride_year = ride_date_array[0]
                            let ride_month = ride_date_array[1]
                            let ride_day = ride_date_array[2]


                            let current_year = current_date.getFullYear()
                            let current_month = current_date.getMonth() + 1
                            let current_day = current_date.getDate()

                           
                            if(users_offered_length < max_capacity){
                                if(Number(ride_year) > current_year){
                                    // means ok
                                   
                                    // it is from then smu_location to area
                                    // else area to smu_location
                                    console.log("HI")
                                    let result = this.to_from(to_from,ride)
                                    let final_output = [result, ride_id]
                                    this.relevant_rides.push(final_output)
                                    // this.offer_price = ride.cost
                                }
                                else if(Number(ride_year) == current_year){
                                    if(Number(ride_month) > current_month){
                                        // ok 
                                        console.log("HI")
                                        let result = this.to_from(to_from,ride)
                                        let final_output = [result, ride_id]
                                        this.relevant_rides.push(final_output)
                                        // this.offer_price = ride.cost
                                    }
                                    else if(Number(ride_month) == current_month){
                                        if(Number(ride_day) > current_day){
                                            // pl
                                            console.log("HI")
                                            let result = this.to_from(to_from,ride)
                                            let final_output = [result, ride_id]
                                            this.relevant_rides.push(final_output)
                                            // this.offer_price = ride.cost
                                        }
                                        else if(Number(ride_day) == current_day){
                                            // ok
                                            console.log("HI")
                                            let result = this.to_from(to_from,ride)
                                            let final_output = [result, ride_id]
                                            this.relevant_rides.push(final_output)
                                            // this.offer_price = ride.cost
                                        }
                                    }
                                }
                            }
                            
                            
                        }
                        
                    }
                  
                    
                }
                console.log(this.relevant_rides)
               
            })



        },
        get_price(){
            let ride = this.selected_ride
            this.offer_price = ""
            // console.log(ride)
            const db = getDatabase()
            const reference = ref(db, `rides/${ride}`)

            onValue(reference, (snapshot)=>{
                let ride_details = snapshot.val()
                // console.log(ride_details)
                if(ride_details != null){
                    this.offer_price = ride_details.cost
                }
                
            })

        },


        to_from(to_from, ride){
            let text = ""
            if(to_from == "from"){
                text = `${ride.smu_location} to ${ride.user_address}`

            }
            else{
                text = `${ride.user_address} to ${ride.smu_location}`
            }
            return text
        },
        accept(selected_ride,user,length,mid){
            console.log(length + "YYY")
            const db = getDatabase()
            // set(ref(db, `rides/${selected_ride}/users_offered/${length}`), {
            //     person : user
            //  })
            const updates = {};
            updates[`messages/${this.current_chatid}/${mid}/accepted`] = "accepted"
            updates[`rides/${selected_ride}/users_offered/${length}`] = user
            return update(ref(db), updates)
        },
        decline(mid) { 
            console.log("ewiufh decline")
            const db = getDatabase()
            const updates = {};
            updates[`messages/${this.current_chatid}/${mid}/accepted`] = "declined"
            return update(ref(db), updates)
        },
        change_counter : function(){
            var time = this
            setInterval(function(){
                time.counter = Date.now()
                
            },1000)
        },
        selected_chatroom(chat_id){
            this.selected_room = chat_id
        }
     

    },
    watch :{
        counter : function(){
            const db = getDatabase()
            const reference = ref(db, 'messages')
    
            
            onValue(reference, (snapshot) => {
                this.chat_array = []
                let all_chats = snapshot.val()
                // console.log(all_chats)
                // console.log(all_chats)
                for(var chat in all_chats){
                    // console.log(chat)
                    let usernames_in_chat = chat.split(";")
                    if(usernames_in_chat.includes(this.user)){
                        // check the timing
                        // console.log(all_chats[chat])

                        // implementation of timing 
                        const timing = ref(db,`messages/${chat}`)
                        onValue(timing,(snapshot)=>{

                            // console.log(snapshot.val())
                            let all_message = snapshot.val()
                            let latest_message = all_message[all_message.length -1]
                            // console.log(latest_message)
                            let timing_of_latest_message = latest_message.message_time
                            // console.log(timing_of_latest_message)
                            let chat_object = {
                                chat_id : chat,
                                timing : timing_of_latest_message
                            }
                            this.chat_array.push(chat_object)


                        })
                        // this.chat_array.push(chat)
                    }
                    
                }
                this.chat_array.sort(function(a, b) {
                    return parseInt(b.timing) - parseInt(a.timing);
                });
                // console.log(this.chat_array)
                // sort by timing 
            })
            
        }
    },
    created(){
        this.user = localStorage.getItem("username_x")
        // console.log(user)
        this.get_related_chats
        // this.retreive_chat(this.chat_array[0])
        this.get_userimage
        // console.log(this.messages)
        // setInterval(function(){this.counter = this.counter+ 1}, 1000)
    },
    mounted(){
        this.change_counter()
    }
});


chat_left.component('offer-button',{
    data(){
        return{
            length : 0,
        }
    },

    props: ["message", "selected_ride", "user", "message_status"],

    emits: ['accept', 'decline'],

    template: `<b>{{ message.username }}</b>: {{message.message}}<br>
    <div id="acc_dec_buttons" v-if="message_status == 'pending'">
        <button class="btn btn-success" v-on:click="$emit('accept',selected_ride, user,length, message.mid)">
            Accept Offer
        </button>
        <button class="btn btn-danger" v-on:click="$emit('decline',message.mid)">
            Decline Offer
        </button>
    </div>
    <div v-else class="offer-status" :style="result_status_bg_colour(message_status)"> 
        <span :style="result_status_colour(message_status)">
        {{message_status.charAt(0).toUpperCase() + message_status.substr(1).toLowerCase()}}
        </span>
    </div>`,

    methods: {
     
        get_length(selected_ride){
            const db = getDatabase()
            const reference = ref(db, 'rides/' + selected_ride)

            // console.log(this.selected_ride)
            onValue(reference, (snapshot) => {
                // console.log(snapshot.val())
                // console.log(snapshot.val())
                let ride = snapshot.val()
                let offered_people = ride.users_offered
                // offered_people.push(this.user)
                console.log(offered_people.length)
                // console.log(offered_people)
                
                this.length = offered_people.length
           
            })
        },

        result_status_bg_colour(value) { 
            if (value == "accepted") { 
                return "background-color: #BFACD3"
            }
            else { 
                return "background-color: #F3D8D8"
            }
        },

        result_status_colour(value) {
            if (value == "accepted") { 
                return "color: #451F6A"
            }
            else { 
                return "color: #894949"
            }
        },

        
    },
    created(){
        this.get_length(this.selected_ride) 
    }
})

chat_left.component('status-check',{
    data(){
        return{
        }
    },

    props: ["message"],

    template: `<b>{{ message.username }}</b>: {{message.message}}<br>
    <div class="offer-status" :style="offer_status_bg_colour(message.accepted)">
        <span :style="offer_status_colour(message.accepted)">
            {{message.accepted.charAt(0).toUpperCase() + message.accepted.substr(1).toLowerCase()}}
        </span>
    </div>`,

    methods: {
        offer_status_bg_colour(value) { 
            if (value == "pending") { 
                return "background-color: #BDBDBD"
            }
            else if (value == "accepted") { 
                return "background-color: #BFACD3"
            }
            else { 
                return "background-color: #F3D8D8"
            }
        },

        offer_status_colour(value) {
            if (value == "pending") { 
                return "color: #888888"
            }
            else if (value == "accepted") { 
                return "color: #451F6A"
            }
            else { 
                return "color: #894949"
            }
        }
        
    },
})



chat_left.component('chat-box', {
    data() {
        return {
            username: "",
            receipient_username: "",
            latest_message:"",
            sender_latest_message: "",
            image_url : "",
            selected_chatroom: "",

        }
    },
    props: ['chat_id'],

    emits: ['get_chat','selected_chatroom'],
    // @click="selected_chat(chat_id)"
    template: `<div :id="chat_id" class="chatbox" style="padding:10px; display: flex;" v-on:click="$emit('get_chat',chat_id)" v-on:click="$emit('selected_chatroom',chat_id)">
    <div id="photo">
        <img :src="image_url" class="profile-pic img-fluid rounded-circle"
        style="object-fit: cover; height: 50px; width: 50px; object-position: 50% 50%;">
    </div>
    <div style="margin-left: 20px;align-self: start;width: 70%;"> 
      <b>{{ receipient_username }}</b>
      <div v-if="latest_message != ''" style="text-overflow: ellipsis; display: block; width:50%;white-space: nowrap; width: 100%; overflow: hidden;">
        <span v-html="message_formatted(sender_latest_message, latest_message)"></span>
      </div>
    </div>
</div>`,

    computed:{
        //get latest message
        get_latest_message(){
            const db = getDatabase()
            const reference = ref(db, 'messages/' + this.chat_id)
            // console.log(reference)
            onValue(reference, (snapshot) => {
                // console.log(snapshot.val())
                // console.log(snapshot.val())
                let all_messages = snapshot.val()
                
                if(all_messages.length > 0){
                    let latest_message = all_messages[all_messages.length - 1]
                    this.latest_message = latest_message.message
                    this.sender_latest_message = latest_message.username
                }
                

            })

        },

        //get other_user
        get_other_user(){
            let users = this.chat_id.split(";")
            for(var user of users){
                
                if(user != this.username){
                    this.receipient_username = user
                }
            }
        },

        get_userimage(){
            const db = getDatabase()
            const reference = ref(db, 'users/' + this.receipient_username)

            onValue(reference, (snapshot) => {
                // console.log(snapshot.val())
                // console.log(snapshot.val())
                let user_profile = snapshot.val()
                let image = user_profile["profile_url"]
                this.image_url = image
            })
        },



    },

    created(){
        this.username = localStorage.getItem("username_x")
        this.get_latest_message
        this.get_other_user
        this.get_userimage
        
        

        // find the latest message
    },

    methods: {
        selected_chat(chat_id) { 
            var chatboxes = document.getElementsByClassName("chatbox")
            for (var chatbox of chatboxes) { 
                chatbox.style = "padding:10px; display: flex;"
            }

            var last_chat = chatboxes[chatboxes.length-1]['id']
            this.selected_chatroom = chat_id;
            // var to_style = `color: #8A6F42;
            // background-color: #d8c7a3;
            // padding:10px; 
            // display: flex;`
            if (chat_id == last_chat) { 
                to_style += 'border-radius: 0px 0px 30px 30px;'
            }
            document.getElementById(chat_id).style = to_style
        },
        message_formatted(sender, message) { 
            return `${sender}: ${message}`
        },
    }
})

chat_left.mount('#chatroom')

