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
            is_offer : false
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

                for(var chat in all_chats){
                    // console.log(chat)
                    let usernames_in_chat = chat.split(";")
                    if(usernames_in_chat.includes(this.user)){
                        this.chat_array.push(chat)
                    }
                    
                }
            })
            
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
            
            set(ref(db, `messages/${this.current_chatid}/${this.new_mid}`), {
                message: this.message_to_send,
                username: this.user
               
              })
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




        }
    },
    created(){
        this.user = localStorage.getItem("username_x")
        // console.log(user)
        this.get_related_chats
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
            image_url : ""

        }
    },
    props: ['chat_id'],

    emits: ['get_chat'],

    template: `<div :id="chat_id" class="chatbox" style="padding:10px; display: flex;" v-on:click="$emit('get_chat',chat_id)">
    <div id="photo">
        <img :src="image_url" class="img-fluid rounded-circle">
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

        }



    },

    created(){
        this.username = localStorage.getItem("username_x")
        this.get_latest_message
        this.get_other_user
        this.get_userimage
        
        

        // find the latest message
    }
})

chat_left.mount('#chatroom')