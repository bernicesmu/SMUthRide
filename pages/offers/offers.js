import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCVjpCi9lziMF130jj2UtJGiPc0MamUkY",
    authDomain: "wad2-smuth-ride.firebaseapp.com",
    projectId: "wad2-smuth-ride",
    storageBucket: "wad2-smuth-ride.appspot.com",
    messagingSenderId: "738000465812",
    appId: "1:738000465812:web:9d74b4f15684ed2a83a981",
    measurementId: "G-E7M5LHMTL8",
    databaseURL: "https://wad2-smuth-ride-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const listings = Vue.createApp({
    data() {
        return{
            listings: [],
            to_from : "From",
            display_listings: [],
            driver_listings:[],
            rider_listings: []
        }
    },
    methods: {
        change_direction(){
            this.to_from = this.to_from === "To" ? "From" : "To";
            console.log(this.to_from)
            this.check_and_populate()
        },
        check_and_populate(){
<<<<<<< Updated upstream
            if (this.to_from === "To"){
                this.display_listings = this.listings.filter(x => x.smu_to_from === "To");
            } else if (this.to_from === "From"){
                this.display_listings = this.listings.filter(x => x.smu_to_from === "From");
            }
            this.driver_listings= this.display_listings.filter(x=> x.driver_username === localStorage.getItem("user"))
            this.rider_listings=  this.display_listings.filter(x=> x.users_offered.includes(localStorage.getItem('user')))
=======
            this.driver_listings= this.listings.filter(x=>
                x.driver_username === this.user).sort((a,b) => a.time.localeCompare(b.time));
            this.rider_listings=  this.listings.filter(x=> x.users_offered!= undefined &&
                x.users_offered.includes(this.user)).sort((a,b) => a.time.localeCompare(b.time));
>>>>>>> Stashed changes
            console.log(this.rider_listings)
        },
        formatAMPM(date){

            let hours = Number(date.split(":")[0]);
            let minutes = Number(date.split(":")[1]);
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;

        },
        format_date(date){
            date = date.split("-")
            let day = new Date(date[0], date[1], date[2]).toDateString().split(" ")
            return [day[0],`${day[1]} ${day[2]} ${day[3]}`]
        },
        get_user_name(username){
            return this.users[username].name
        }
    },
    mounted() {
        const db = getDatabase();
        const rides = ref(db, `rides/`)
        const users = ref(db, `users/`)
        onValue(users, (snapshot) => {
            this.users = snapshot.val();
        });

        onValue(rides, (snapshot) => {

            this.listings = snapshot.val()

            this.check_and_populate()
        })


    }

})

listings.mount('#populate_listings')