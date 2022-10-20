
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
            to_from : "To",
            display_listings: []
        }
    },
    methods: {
        change_direction(){
            this.to_from = this.to_from == "To" ? "From" : "To";
            this.check_and_populate()
        },
        check_and_populate(){
            if (this.to_from == "To"){
                this.display_listings = this.listings.filter(x => x.smu_pick_or_drop == "drop");
            } else if (this.to_from == "From"){
                this.display_listings = this.listings.filter(x => x.smu_pick_or_drop == "pick");
            }
        }
    },
    mounted() {

        const db = getDatabase();
        const rides = ref(db, `rides/`)
        onValue(rides, (snapshot) => {

            this.listings = snapshot.val()
            this.listings.splice(0, 1)
            this.check_and_populate()
        })
        }
})

listings.mount('#populate_listings')