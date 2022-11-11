   import {writeUserData, write_ride, find_rid} from '../../../index.js'

//    import { main_map_function } from './vanilla_js_rides_indiv_driver.js'
// writeUserData(username, "regine@hello.com", 1)


const form_alerts = Vue.createApp({
    data() {
        return {
            date: new Date().toISOString().split("T")[0],
            drop_off: "",
            today: new Date().toISOString().split("T")[0],
            time: ((parseInt(new Date().toLocaleTimeString('en-GB').split(":")[0])+1)).toString() + ":" + new Date().toLocaleTimeString('en-GB').split(":")[1],
            location_input: "",
            location_alert: false,
            school_input: "Select School",
            formatted_address : ""

        }
    },
    methods:{
        check_time(){
            var time = new Date().toLocaleTimeString('en-GB').split(":").slice(0, 2).join(":")
            if (this.time < time){
                return true
            } return false
        },
        check_date(){
            if (this.date===""){return false}
            let selected_date = this.date.split("-")
            selected_date = new Date(selected_date)
            const today = new Date()
            let res = selected_date - today >= 1000 * 60 * 60 * 24 * 365;

            return res
        },
        check_drop_off(){
            if (this.drop_off===""){return true}
            return false;
        },



       
    },
    watch: {
        school_input(val,oldVal) {

        },
        location_input: {
            handler(value, oldValue) {
                this.location_alert = value === "" && oldValue !== "";
            },
            deep: true
        }
    },
    created()  {
        // main_map_function()
    },
    computed:{
       
    }
})

form_alerts.mount('#form_alerts')

document.getElementById('rides').addEventListener('click',event => {
    event.preventDefault()
    write_ride_local()
})
find_rid()
async function write_ride_local() {
    
    var username = localStorage.getItem("username_x")

    var rideid = parseInt(localStorage.getItem("rideid")) + 1

    var inputs = document.getElementsByTagName('input')
    
    var user_address = inputs.location_field.value

    var smu_location = document.getElementById("smulocation").options[document.getElementById("smulocation").selectedIndex].text;
    var cost = parseFloat(inputs.cost.value)
    var max_capacity = parseInt(inputs.capacity.value)
    var date = inputs.date.value
    var time = inputs.time.value 
    var users_offered = [""]
    var area = document.getElementById("hidden_formatted_address").value
    var neighbourhood = document.getElementById("hidden_neighbourhood").value 
    

    let check = await write_ride(smu_location,smu_position,username,rideid,user_address,cost,max_capacity,date,time,users_offered,area,neighbourhood)
    console.log(check)
    if (check){
        console.log("success")
        document.getElementById("backdrop").style.display = "block"
        document.getElementById("exampleModal").style.display = "block"
        document.getElementById("exampleModal").classList.add("show")
    }
    // window.location.href = "./../rides_list/rides_list.html"

}
