   import {writeUserData, write_ride, find_rid} from '../../../index.js'

//    import { main_map_function } from './vanilla_js_rides_indiv_driver.js'
// writeUserData(username, "regine@hello.com", 1)


const form_alerts = Vue.createApp({
    data() {
        return {
            date: ((new Date()).getFullYear()) + '-' + (((new Date()).getMonth()+1).toString()).padStart(2, '0') + '-' + ((new Date()).getDate().toString()).padStart(2, '0'),
            drop_off: "",

            today: new Date().toISOString().split("T")[0],

            time: ((parseInt(new Date().toLocaleTimeString('en-GB').split(":")[0])+1)).toString() + ":" + new Date().toLocaleTimeString('en-GB').split(":")[1],

            time_now: new Date().toLocaleTimeString('en-GB').split(":").slice(0, 2).join(":"),

            location_input: "",
            location_alert: false,
            date_alert: false,
            just_stop: '',
            change_date: false,
            school_input: "Select School",
            formatted_address : ""
        }
    },
    methods:{
        check_time(){
            var time = new Date().toLocaleTimeString('en-GB').split(":").slice(0, 2).join(":")

            console.log(this.date)
            console.log(this.time)
            if (this.time < time){
                return true
            } return false
        },
        check_date(){
            if (this.date===""){return false}
            let selected_date = this.date.split("-")
            let selected_year = selected_date[0]
            selected_date = new Date(selected_date)

            const today = new Date()
            let verify_year = today.getFullYear()
            console.log(selected_date - today)
            let res = (selected_date - today >= 1000 * 60 * 60 * 24 * 365) || (selected_date - today <= 1000 * 60 * 60 * 24 * -1) || (selected_year - verify_year < 0)

            if (res){this.just_stop = 'no'}
            else {this.just_stop = ''}

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
        },

        date: {
            handler(new_date, old_date) {
                this.change_date = new_date === "";
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
                    v-html="get_hour()"
                >
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
                    v-html="get_ampm()"
                >
                </select>
                </div>`,

    methods: { 
        get_hour() { 
            var today = new Date()
            var now_hour = today.getHours()
            console.log(now_hour)
            var next_hour = now_hour + 1 
            var selected = ""
            var to_return = ""
            if (next_hour > 12) { 
                next_hour -= 12
            }
            for (var i of Array(12).keys()) { 
                if (i+1 == next_hour) { 
                    selected = "selected"
                }
                to_return += `<option value="${i+1}" ${selected}>${i+1}</option>`
                selected = ""
            }
            return to_return
        },

        get_ampm() {
            var today = new Date()
            var now_hour = today.getHours()
            console.log(now_hour)
            var next_hour = now_hour + 1 
            var selected = ""
            var to_return = ""
            var ampm = 'am'
            if (next_hour > 11) { 
                ampm = 'pm'
            }
            for (var i of ['am', 'pm']) { 
                if (i == ampm) { 
                    selected = "selected"
                }
                to_return += `<option value="${i}" ${selected}>${i.toUpperCase()}</option>`
                selected = ""
            }
            return to_return
        }
    }
})

form_alerts.mount('#form_alerts')

document.getElementById('rides').addEventListener('click',event => {
    event.preventDefault()
    write_ride_local()
})

find_rid()
async function write_ride_local() {
    console.log('=== START ===')
    
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
