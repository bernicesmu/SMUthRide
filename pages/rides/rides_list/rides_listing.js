
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

<<<<<<< Updated upstream
=======
var locations = ['Boat Quay', 'Raffles Place', 'Marina', 'Chinatown', 'Tanjong Pagar', 'Alexandra', 'Commonwealth', 'Harbourfront', 'Telok Blangah', 'Buona Vista', 'West Coast', 'Clementi New Town', 'City Hall', 'Clarke Quay', 'Beach Road', 'Bugis', 'Rochor', 'Farrer Park', 'Serangoon', 'Orchard', 'River Valley', 'Tanglin', 'Holland', 'Bukit Timah', 'Newton', 'Novena', 'Balestier', 'Toa Payoh', 'Macpherson', 'Potong Pasir', 'Eunos', 'Geylang', 'Paya Lebar', 'East Coast', 'Marine Parade', 'Bedok', 'Upper East Coast', 'Changi', 'Pasir Ris', 'Tampines', 'Hougang', 'Punggol', 'Sengkang', 'Ang Mo Kio', 'Bishan', 'Thomson', 'Clementi Park', 'Upper Bukit Timah', 'Boon Lay', 'Jurong', 'Tuas', 'Dairy Farm', 'Bukit Panjang', 'Choa Chu Kang', 'Lim Chu Kang', 'Tengah', 'Admiralty', 'Woodlands', 'Mandai', 'Upper Thomson', 'Sembawang', 'Yishun', 'Seletar', 'Yio Chu Kang']

>>>>>>> Stashed changes
const listings = Vue.createApp({
    data() {
        return{
            users: [],
            listings: [],
            to_from : "From",
            display_listings: [],

        }
    },
    methods: {
        change_direction(){
            this.to_from = this.to_from === "To" ? "From" : "To";
            this.check_and_populate()
        },
        check_and_populate(){

            if (this.to_from === "To"){
                this.display_listings = this.listings.filter(x => x.smu_to_from === "To");
            } else if (this.to_from === "From"){
                this.display_listings = this.listings.filter(x => x.smu_to_from === "From");
            }

        },
        formatAMPM(date) {

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

            let user = this.users.filter(x => x.user_name === username)
            return user[0].name
        }
    },
    mounted() {

        const db = getDatabase();
        const rides = ref(db, `rides/`)
        const users = ref(db, `users/`)
        onValue(users, (snapshot) => {
            for (const key in snapshot.val()){
                this.users.push(snapshot.val()[key])
            }
        });

        onValue(rides, (snapshot) => {

            this.listings = snapshot.val()
            this.listings.splice(0, 1)
            console.log(this.listings)
            this.check_and_populate()
        })
<<<<<<< Updated upstream
=======

        },
    watch: {
        results(value,oldValue){
            // console.log( typeof value)
            // console.log(typeof oldValue)
            // console.log(document.getElementsByClassName('dropdown')[0])
            if (Object.keys(oldValue) == 0 && Object.keys(value) != 0){
                document.getElementsByClassName('dropdown')[0].classList.remove("dropdown_ani_backward")
                document.getElementsByClassName('dropdown')[0].classList.add("dropdown_ani_forward");
            }
        },
        search(value,oldValue){
            if (value !== ''){
                this.display_listings = this.listings.filter(x => x.smu_to_from == this.to_from && "users_offered" in x && x.area.toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
>>>>>>> Stashed changes
        }
})

listings.mount('#populate_listings')