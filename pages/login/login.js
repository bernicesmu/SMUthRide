import {writeUserData, create_user, signin_user, get_all_usernames} from '../../index.js'
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

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

document.getElementById('registration').addEventListener('submit', register_user)
document.getElementById('login').addEventListener('submit', login_user)

function register_user() {
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

    get_all_usernames()
    var all_usernames = localStorage.getItem("all_usernames")
    if (all_usernames.includes(username)) {
        alert("Someone else has the same username! Please choose another one.")
        valid = false
    }

    if (valid) {
        create_user(email, password)
        writeUserData(username, name, email)
        localStorage.clear()
        localStorage.setItem("username_x", username)
    }
}

function find_email_from_username(username) {
    const db = getDatabase();
    const users = ref(db, `users/${username}`)
    onValue(users, (snapshot) => {
        const data = snapshot.val();
        var email = data.email
        localStorage.setItem("email", email)
    })
}

function login_user() {
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
            email: '',
            password: '',
            cfmpassword: '',
            rules: [
                { message:'One lowercase letter required.', regex:/[a-z]+/ },
                { message:"One uppercase letter required.",  regex:/[A-Z]+/ },
                { message:"8 characters minimum.", regex:/.{8,}/ },
                { message:"One number required.", regex:/[0-9]+/ }
            ],
        }
    },
    methods: {
        check_username() {
            if (this.username.includes(";") | this.username.includes(",")) {
                return true
            } return false
        },
        check_email() {
            if (!this.email.includes('smu.edu.sg')) {
                return true
            }   return false
        },
        check_password_match() {
            if (this.password != this.cfmpassword) {
                return true
            }   return false
        }
    },
    computed: {
        passwordValidation () {
            let errors = []
            for (let condition of this.rules) {
                if (!condition.regex.test(this.password)) {
                    errors.push(condition.message)
                }
            }
            if (errors.length === 0) {
                return { valid:true, errors }
            } else {
                return { valid:false, errors }
            }
        }
    },

    watch: {
        username(oldValue, newValue) {
            if (oldValue == "" && newValue != "") {
                this.check_username()
            }
        },
        email(oldValue, newValue) {
            if (oldValue == "" && newValue != "") {
                this.check_email()
            }
        },
        password(oldValue, newValue) {
            if (oldValue == "" && newValue != "") {
                this.check_password()
            }
        },
        cfm_password(oldValue, newValue) {
            if (oldValue == "" && newValue != "") {
                this.check_password_match()
            }
        }
    }
})

registration_check.mount('#registration')

