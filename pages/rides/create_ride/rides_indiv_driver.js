import {writeUserData, write_ride, find_rid} from '../../../index.js'
// writeUserData(username, "regine@hello.com", 1)

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
// ride_form.mount('#ride_form')

document.getElementById('rides').addEventListener('click', write_ride_local) 

var username = "rferefvc" // to use session management to dynamically retrieve the username
find_rid(username)
var rideid = parseInt(localStorage.getItem("rideid")) + 1

// writeUserData(1, username, email, "regine.com")

function write_ride_local() {
    
    var username = localStorage.getItem("username_x")

    // const database = getDatabase(); 
    // const chats = ref(database, `users/${username}`)
    // onValue(chats, (snapshot) => { 
      
    //   const data = snapshot.val();
    //   var userid
        
    // })
    var rideid = find_rid() + 1

    var inputs = document.getElementsByTagName('input')

    if (document.getElementById("location_from").innerHTML == "SMU"){
        var smu_to_from = "From"
    }
    else{
        var smu_to_from = "To"
    }
    
    var user_address = inputs.address.value 
    // console.log(address)
    var smu_location = document.getElementById("smulocation").options[document.getElementById("smulocation").selectedIndex].text;
    var cost = parseFloat(inputs.cost.value)
    var max_capacity = parseInt(inputs.capacity.value)
    var frequency = document.querySelector('input[name="frequency"]:checked').value
    var date = inputs.date.value
    var time = inputs.time.value 
    var users_offered = [""]
    var area = "Changi Prison"
    write_ride(smu_location,smu_to_from,username,rideid,user_address,cost,max_capacity,date,time,users_offered,area)

}
