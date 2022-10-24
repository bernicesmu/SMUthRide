import {writeUserData, write_ride, find_rid} from '../../../index.js'
writeUserData(1, username, "regine@hello.com", "regine.com")

const ride_form = Vue.createApp({
    data() {
        return {
            date: "",

        }
    },
    methods:{
        check_date(){
            if (date===""){return true}
            let selected_date = this.date.split("-")
            selected_date = new Date(selected_date[0], selected_date[1], selected_date[2])
            const today = new Date()
            return selected_date - today >= 1000 * 60 * 60 * 24 * 365;
        }
    }
})
ride_form.mount('#ride_form')

document.getElementById('rides').addEventListener('submit', write_ride_local) 

var username = "rferefvc" // to use session management to dynamically retrieve the username
find_rid(username)
var rideid = parseInt(localStorage.getItem("rideid")) + 1

// writeUserData(1, username, email, "regine.com")

function write_ride_local() {
    var username = localStorage.getItem("username")

    const database = getDatabase(); 
    const chats = ref(database, `users/${username}`)
    onValue(chats, (snapshot) => { 
      
      const data = snapshot.val();
      console.log(data)
    })

    var inputs = document.getElementsByTagName('input')
    
    var address = inputs.address.value 
    console.log(address)
    var cost = inputs.cost.value
    var capacity = inputs.capacity.value
    var frequency = document.querySelector('input[name="frequency"]:checked').value
    var date = inputs.date.value
    var time = inputs.time.value 
    var users_offered = []
    write_ride(username, rideid, address, cost, capacity, frequency, date, time, users_offered)

    smu_location, smu_to_from,driver_id, rideid, user_address, area
}
