
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


var locations = ['Boat Quay', 'Raffles Place', 'Marina', 'Chinatown', 'Tanjong Pagar', 'Alexandra', 'Commonwealth', 'Harbourfront', 'Telok Blangah', 'Buona Vista', 'West Coast', 'Clementi New Town', 'City Hall', 'Clarke Quay', 'Beach Road', 'Bugis', 'Rochor', 'Farrer Park', 'Serangoon', 'Orchard', 'River Valley', 'Tanglin', 'Holland', 'Bukit Timah', 'Newton', 'Novena', 'Balestier', 'Toa Payoh', 'Macpherson', 'Potong Pasir', 'Eunos', 'Geylang', 'Paya Lebar', 'East Coast', 'Marine Parade', 'Bedok', 'Upper East Coast', 'Changi', 'Pasir Ris', 'Tampines', 'Hougang', 'Punggol', 'Sengkang', 'Ang Mo Kio', 'Bishan', 'Thomson', 'Clementi Park', 'Upper Bukit Timah', 'Boon Lay', 'Jurong', 'Tuas', 'Dairy Farm', 'Bukit Panjang', 'Choa Chu Kang', 'Lim Chu Kang', 'Tengah', 'Admiralty', 'Woodlands', 'Mandai', 'Upper Thomson', 'Sembawang', 'Yishun', 'Seletar', 'Yio Chu Kang']

const listings = Vue.createApp({
    data() {
        return{
            users: [],
            listings: [],
            to_from : "From",
            display_listings: [],
            search: '',
            results: [],
            possible_locations: locations

        }
    },
    methods: {
        searchResults() {

            this.results = this.possible_locations.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            if (this.search == '') {
                this.results = []
            }

            // this.isOpen ? document.getElementsByClassName('dropdown')[0].classList.add("dropdown_ani"): document.getElementsByClassName('dropdown')[0].classList.remove("dropdown_ani");
        },
        selectResult(location){
            this.search = location
            this.searchResults()
            document.getElementsByClassName('dropdown')[0].classList.remove("dropdown_ani_forward");
            document.getElementsByClassName('dropdown')[0].classList.add("dropdown_ani_backward");
            setTimeout(function () {this.results = []}, 100);
        },
        change_direction(){
            this.to_from = this.to_from === "To" ? "From" : "To";
            this.check_and_populate()
        },
        check_and_populate(){
            console.log(this.to_from)
            console.log(this.listings)
            this.listings = Object.values(this.listings)

            if (this.to_from === "To"){
                this.display_listings = this.listings.filter(x => x.smu_to_from.toLowerCase() == "to" &&(x.max_capacity - x.users_offered.length >-1));
            } else if (this.to_from === "From"){
                this.display_listings = this.listings.filter(x => x.smu_to_from.toLowerCase() == "from" &&(x.max_capacity - x.users_offered.length >-1));
            }
            console.log(this.display_listings)
        },
        formatAMPM(date) {

            let hours = Number(date.split(":")[0]);
            let minutes = Number(date.split(":")[1]);
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the h`our '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;

        },
        format_date(date){
            date = date.split("-")
            let day = new Date(date[0], date[1], date[2]).toDateString().split(" ")
            return [day[0],`${day[2]} ${day[1]} ${day[3]}`]
        },
        get_user_name(username){
            return this.users[username].name
        },
        get_url(username){
            return this.users[username].profile_url
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
            console.log(snapshot.val())
            console.log(this.listings)
            this.check_and_populate()
        })


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
        search:{
            handler(value,oldValue) {
                if (value !== '') {
                    this.display_listings = this.listings.filter(x => x.smu_to_from == this.to_from && "users_offered" in x && x.area.toLowerCase().indexOf(value.toLowerCase()) > -1);
                }else if (oldValue !== '' && value === ''){
                    this.check_and_populate()
                }
            },
            deep: true
        }
    }
})
// listings.component('autocomplete', {})


listings.mount('#populate_listings')