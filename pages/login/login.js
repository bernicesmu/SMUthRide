import { writeUserData, signin_user, find_email_from_username } from '../../index.js'
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

const login_toggle_password = document.querySelector(".login-toggle-password")

login_toggle_password.addEventListener('click', () => {
    login_toggle_password.classList.toggle("fa-eye-slash");   
    var input = document.querySelector('#login-pwd-field')
    if (input.getAttribute("type") == "password") {
        input.setAttribute("type", "text")
    } else {
        input.setAttribute("type", "password");
    }
})

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
            all_usernames: [],
            registration_confirmation: "",
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

        eyeicon_toggle(fieldclass, fieldtoggleid) {
            var fieldclass = document.querySelector(fieldclass)
            fieldclass.classList.toggle("fa-eye-slash");                                               
            var input = document.querySelector(fieldtoggleid)
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text")
            } else {
                input.setAttribute("type", "password");
            }
        },
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