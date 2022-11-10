import {writeUserData, signin_user, find_email_from_username} from '../../index.js'
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

var firebaseConfig = {
    apiKey: "AIzaSyCCVjpCi9lziMF130jj2UtJGiPc0MamUkY",
    authDomain: "wad2-smuth-ride.firebaseapp.com",
    projectId: "wad2-smuth-ride",
    storageBucket: "wad2-smuth-ride.appspot.com",
    messagingSenderId: "738000465812",
    appId: "1:738000465812:web:9d74b4f15684ed2a83a981",
    measurementId: "G-E7M5LHMTL8",
    databaseURL: "https://wad2-smuth-ride-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const sign_in_btn = document.querySelector("#sign-in-btn");
const register_btn = document.querySelector("#register-btn");
const container = document.querySelector(".container")

register_btn.addEventListener('click', () => {
    container.classList.add("register-mode");
})

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("register-mode");
})

document.getElementById('login').addEventListener('submit', login_user)

function login_user() {
    console.log("ewfjnueiowfioe")
    var inputs = document.getElementsByTagName('input')
    var username = inputs.useroremail.value //name of the input in the HTML form is useroremail, but for now we leave it as username only
    var password = inputs.password.value

    find_email_from_username(username)
    var email = localStorage.getItem("email")

    signin_user(email, password)
    localStorage.clear()
    localStorage.setItem("username_x", username)
}

const registration_check = Vue.createApp({
    data() {
        return {
            username: '',
            display_name: '',
            email: '',
            password: '',
            cfmpassword: '',
            errorMessages: {
                username: [],
                email: [],
                password: [],
                cfmpassword: [],

            },
            all_usernames: [],
            registration_confirmation: "",
            degree: '',
            year: '',
            age: 0,
            gender: '',
        }
    },
    methods: {
        check_username() {
            this.errorMessages.username = []
            if (this.username.includes(";") | this.username.includes(",")) {
                this.errorMessages.username.push("Username cannot contain ; or ,")
            }

        },
        check_email() {
            this.errorMessages.email = []
            if (!this.email.includes('smu.edu.sg')) {
                this.errorMessages.email.push("Please register with a SMU email")
            }
        },
        check_password_match() {
            console.log("check password match")
            this.errorMessages.cfmpassword = []
            if (this.password != this.cfmpassword) {
                this.errorMessages.cfmpassword.push("Passwords do not match")
            }
        },
        check_same_name(){
            if (this.all_usernames.includes(this.username) && this.errorMessages.username.includes("Username already exists")===false) {
                this.errorMessages.username.push("Username already exists")
            } else {
                this.errorMessages.username = []
            }
        },
        check_password() {
            this.errorMessages.password = []
            if (this.password.length < 8) {
                this.errorMessages.password.push("Password must be at least 8 characters long")
            } else{ this.errorMessages.password = []}
        },

        register_user() {
            var inputs = document.getElementsByTagName('input')
            var name = inputs.name.value
            var username = inputs.username.value
            var email = inputs.email.value
            var password = inputs.pw.value
            var cfmpassword = inputs.cfmpassword.value
        
            var valid = true
            if (!email.includes('smu.edu.sg')) {
                alert("You must have a valid SMU email address to register on SMUth Ride.")
                valid = false
            }
        
            if (password != cfmpassword) {
                alert("The passwords do not match! Please try again.")
                valid = false
            }
        
            if (username.includes(";") | username.includes(",")) {
                alert("Username cannot contain comma (,) or semicolon (;).")
                valid = false
            }
        
            this.get_all_usernames()
            // var all_usernames = localStorage.getItem("all_usernames")
            if (this.all_usernames.includes(username)) {
                alert("Someone else has the same username! Please choose another one.")
                valid = false
            }
        
            if (valid) {
                this.create_user(email, password)
                this.writeUserData(username, name, email)
                localStorage.clear()
                localStorage.setItem("username_x", username)
                this.registration_confirmation = "Registration successful! Please log in to your account."
                console.log("wiufhewuf")
            }
        },

        get_all_usernames() { 
            const db = getDatabase();
            const users = ref(db, `users`)
            onValue(users, (snapshot) => {
              const data = snapshot.val();
              this.all_usernames = Object.keys(data)
            //   localStorage.setItem("all_usernames", Object.keys(data))
            });
        },

        create_user(email, password) { 
            console.log("create userwereewfw")
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
        },

        writeUserData(username, name, email) {
            const db = getDatabase();
            set(ref(db, `users/${username}`), {
                name: name,
                email: email,
                profile_url: "https://firebasestorage.googleapis.com/v0/b/wad2-smuth-ride.appspot.com/o/Users%2FFrame%2031.png?alt=media&token=6fe4afa6-2c7d-4a44-b5a6-706a33ac17ca"
            });
            set(ref(db, `users/${username}/userprofile`), {
              degree: "Bachelor",
              year: "Year X",
              status: "It's Complicated",
              location_user: "Singapore", 
              mbti: "ABCD",
              age: 0,
              bio: "I have no bio", 
              price: 0,
              comfort: 0,
              convenience: 0, 
              speed: 0, 
              cca: [""],
              linkedin: "",
              facebook: "",
              instagram: "",
            }) 
          },
    },

    watch: {
        username(oldValue, newValue) {
            if(oldValue=="" || oldValue!=newValue) {
                this.check_username()
            }
        },
        email(oldValue, newValue) {
            if (oldValue == "" || newValue !="") {
                this.check_email()
            }
        },
        password(oldValue, newValue) {
            if (oldValue == "" || newValue !="") {
                this.check_password()
            }
        },
        cfm_password(oldValue, newValue) {
            if (oldValue == "" || newValue !="") {
                this.check_password_match()
            }
        }
    }
})

registration_check.mount('#registration')
