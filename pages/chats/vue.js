import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";


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
            relevant_rides : []
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
                        this.chat_array.push(chat)
                    }
                    
                }
                console.log(this.chat_array)
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
                    message_time : this.message_time
                   
                  })

                // let current_time = new Date()
                // console.log(current_time)
                // add to database the last message timing

            }
           
            this.message_to_send = ""
              
            this.retreive_chat(this.current_chatid)

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
        send_offer(){
            this.offer_template = ""

            this.offer_template = false
            let offer_price = this.offer_price

            this.offer_template = `
            
       
                <div>
                    I am offering a price of $${offer_price}!
                </div>
                <div>
                <button class="btn btn-success">Accept Offer</button>
                <button class="btn btn-danger">Decline Offer</button>
                </div>

        
            
    
    
           `
            // send as a normal message but with an additional attribute called status. If status, then we will add the buttons as necessary
            this.is_offer = true
            


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
        get_relevant_rides(){
            this.relevant_rides = []
            let driver = this.selected_driver
            const db = getDatabase()
            const reference = ref(db, 'rides/')

            onValue(reference, (snapshot) => {
                // console.log(snapshot.val())
                // console.log(snapshot.val())
                let all_rides= snapshot.val()
                console.log(all_rides)
                for(var ride of all_rides){
                    if(ride != null){
                        console.log(ride)
                        let driver = ride.driver_username
                        if(driver == this.selected_driver){
                            let ride_date = ride.date
                            let users_offered_length = ride.users_offered.length
                            let max_capacity = ride.max_capacity
                            let current_date = new Date()
                            let to_from = ride.smu_to_from
                            let ride_date_array = ride_date.split("-")


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
                                    let result = this.to_from(to_from,ride)
                                    this.relevant_rides.push(result)
                                    this.offer_price = ride.cost
                                }
                                else if(Number(ride_year) == current_year){
                                    if(Number(ride_month) > current_month){
                                        // ok 
                                        let result = this.to_from(to_from,ride)
                                        this.relevant_rides.push(result)
                                        this.offer_price = ride.cost
                                    }
                                    else if(Number(ride_month) == current_month){
                                        if(Number(ride_day) > current_day){
                                            // pl
                                            let result = this.to_from(to_from,ride)
                                            this.relevant_rides.push(result)
                                            this.offer_price = ride.cost
                                        }
                                        else if(Number(ride_day) == current_day){
                                            // ok
                                            let result = this.to_from(to_from,ride)
                                            this.relevant_rides.push(result)
                                            this.offer_price = ride.cost
                                        }
                                    }
                                }
                            }
                            
                            
                        }
                        
                    }
                  
                    
                }
               
            })



        },
        to_from(to_from, ride){
            let text = ""
            if(to_from == "from"){
                text = `${ride.smu_location} to ${ride.area}`

            }
            else{
                text = `${ride.area} to ${ride.smu_location}`
            }
            return text
        }
    },
    created(){
        this.user = localStorage.getItem("username_x")
        // console.log(user)
        this.get_related_chats
        // this.retreive_chat(this.chat_array[0])
        this.get_userimage
    }
});



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

    emits: ['get_chat'],

    template: `<div :id="chat_id" class="chatbox" style="padding:10px; display: flex;" v-on:click="$emit('get_chat',chat_id)" @click="selected_chat(chat_id)">
    <div id="photo">
        <img :src="image_url" class="profile-pic img-fluid rounded-circle"
        style="object-fit: fill; height: 50px; width: 50px; object-position: 50% 50%;" >
    </div>
    <div style="margin-left: 20px;align-self: start;width: 70%;"> 
      <b>{{ receipient_username }}</b>
      <div v-if="latest_message != ''" style="text-overflow: ellipsis; display: block; width:50%;white-space: nowrap; width: 100%; overflow: hidden;">
        {{ sender_latest_message }}: {{ latest_message }}
      </div>
    </div>
</div>`,

    computed:{
        //get latest message
        get_latest_message(){
            const db = getDatabase()
            const reference = ref(db, 'messages/' + this.chat_id)
            console.log(reference)
            onValue(reference, (snapshot) => {
                console.log(snapshot.val())
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
                console.log(snapshot.val())
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
            var to_style = `color: #8A6F42;
            background-color: #d8c7a3;
            padding:10px; 
            display: flex;`
            if (chat_id == last_chat) { 
                to_style += 'border-radius: 0px 0px 30px 30px;'
            }
            document.getElementById(chat_id).style = to_style
        },
    }
})

chat_left.mount('#chatroom')