import {writeUserData} from '../../../index.js'
writeUserData(1, username, "regine@hello.com", "regine.com")

const ride_form = Vue.createApp({
    data() {
        return {
            date: "",

        }
    },
    methods:{
        check_date(){
            let selected_date = this.date.split("-")
            selected_date = new Date(selected_date[0], selected_date[1], selected_date[2])
            const today = new Date()
            return selected_date - today >= 1000 * 60 * 60 * 24 * 365;
        }
    }
})
ride_form.mount('#ride_form')