   import {writeUserData, write_ride, find_rid} from '../../../index.js'

//    import { main_map_function } from './vanilla_js_rides_indiv_driver.js'
// writeUserData(username, "regine@hello.com", 1)


const form_alerts = Vue.createApp({
    data() {
        return {
            date: new Date().toISOString().split("T")[0],
            drop_off: "",
            today: new Date().toISOString().split("T")[0],
            //time: new Date().toLocaleTimeString('en-GB').split(":").slice(0, 2).join(":"),
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

        
        // addHoursToDate(date, hours) {
        //     return new Date(new Date(date).setHours(date.getHours() + hours));
        //   }
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
});

form_alerts.component('time-input', { 
    data() { 
        return { 

        }
    },

    template: ` <div class='time-input'> 
                <select
                    name="time_hour"
                    id="time_hour"
                    class="dropdowns dropdown-time"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                :
                <select
                    name="time_min"
                    id="time_min"
                    class="dropdowns dropdown-time"
                >
                    <option value='00'>00</option>
                    <option value='05'>05</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                    <option value='25'>25</option>
                    <option value='30'>30</option>
                    <option value='35'>35</option>
                    <option value='40'>40</option>
                    <option value='45'>45</option>
                    <option value='50'>50</option>
                    <option value='55'>55</option>
                </select>
                &nbsp;
                <select
                    name="time_ampm"
                    id="time_ampm"
                    class="dropdowns dropdown-time"
                >
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
                </div>`,

    methods: { 

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
    var users_offered = [""]
    var area = document.getElementById("hidden_formatted_address").value
    var neighbourhood = document.getElementById("hidden_neighbourhood").value 
    var time_hour = document.getElementById("time_hour").value 
    var time_min = document.getElementById("time_min").value
    var time_ampm = document.getElementById("time_ampm").value
    if (time_ampm == "pm") { 
        time_hour = parseInt(time_hour) + 12 
    }
    var time = String(time_hour) + ":" + time_min

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
