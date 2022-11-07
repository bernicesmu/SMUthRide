   import {writeUserData, write_ride, find_rid} from '../../../index.js'
// writeUserData(username, "regine@hello.com", 1)


const form_alerts = Vue.createApp({
    data() {
        return {
            date: "",
            drop_off: "",
            today: new Date().toISOString().split("T")[0],
            location_input: "",
            location_alert: false,
            school_input: document.getElementById("smulocation"),

        }
    },
    methods:{
        check_date(){
            if (this.date===""){return false}
            let selected_date = this.date.split("-")
            selected_date = new Date(selected_date)
            const today = new Date()
            let res = selected_date - today >= 1000 * 60 * 60 * 24 * 365;
            console.log(res)
            return res
        },
        check_drop_off(){
            if (this.drop_off===""){return true}
            return false;
        }
    },
    watch: {
        school_input(val,oldVal) {
        console.log(val)
        },
        location_input: {
            handler(value, oldValue) {
                this.location_alert = value === "" && oldValue !== "";
            },
            deep: true
        }
    }
})

form_alerts.mount('#form_alerts')

document.getElementById('rides').addEventListener('submit', event => {
    event.preventDefault()
    write_ride_local()

}
    )

var username = "ber7" // to use session management to dynamically retrieve the username


// writeUserData(1, username, email, "regine.com")

function write_ride_local() {

    find_rid()
    var rideid = parseInt(localStorage.getItem("rideid")) + 1

    var username = localStorage.getItem("username_x")

    var inputs = document.getElementsByTagName('input')
    
    var user_address = inputs.location_field.value

    var smu_location = document.getElementById("smulocation").options[document.getElementById("smulocation").selectedIndex].text;
    var cost = parseFloat(inputs.cost.value)
    var max_capacity = parseInt(inputs.capacity.value)
    var date = inputs.date.value
    var time = inputs.time.value 
    var users_offered = [""]
    var area = "Changi Prison"
    console.log(smu_position)
    console.log(rideid)
    write_ride(smu_location,smu_position,username,rideid,user_address,cost,max_capacity,date,time,users_offered,area)

}
