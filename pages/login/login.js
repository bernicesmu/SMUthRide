import { writeUserData, signin_user } from "../../index.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

var firebaseConfig = {
    apiKey: "AIzaSyCCVjpCi9lziMF130jj2UtJGiPc0MamUkY",
    authDomain: "wad2-smuth-ride.firebaseapp.com",
    projectId: "wad2-smuth-ride",
    storageBucket: "wad2-smuth-ride.appspot.com",
    messagingSenderId: "738000465812",
    appId: "1:738000465812:web:9d74b4f15684ed2a83a981",
    measurementId: "G-E7M5LHMTL8",
    databaseURL:
        "https://wad2-smuth-ride-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const sign_in_btn = document.querySelector("#sign-in-btn");
const register_btn = document.querySelector("#register-btn");
const container = document.querySelector(".container");

register_btn.addEventListener("click", () => {
    container.classList.add("register-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("register-mode");
});

// document.getElementById('login').addEventListener('submit', login_user)

const login_check = Vue.createApp({
    data() {
        return {
            username: "",
            email: "",
            password: "",
            success: "",
        };
    },

    methods: {
        async login_user() {
            console.log("ewfjnueiowfioe");
            var inputs = document.getElementsByTagName("input");
            this.username = inputs.useroremail.value; //name of the input in the HTML form is useroremail, but for now we leave it as username only
            this.password = inputs.password.value;

            await this.find_email_from_username();
            await this.sleep(0.1 * 1000);
            await this.signin_user();
        },

        async find_email_from_username() {
            var username = this.username;
            const db = getDatabase();
            const users = ref(db, `users/${username}`);
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                try {
                    this.email = data.email;
                } catch (error) {
                    this.success = false;
                }
            });
        },

        async signin_user() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    this.success = true;
                    if (this.success) {
                        console.log("user login success");
                        localStorage.clear();
                        localStorage.setItem("username_x", this.username);
                        window.location.href = "../../index.html";
                    } else {
                        console.log("user login fail");
                    }
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    this.success = false;
                });
        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
    },
});

login_check.mount("#login");

const login_toggle_password = document.querySelector(".login-toggle-password");

login_toggle_password.addEventListener("click", () => {
    login_toggle_password.classList.toggle("fa-eye-slash");
    var input = document.querySelector("#login-pwd-field");
    if (input.getAttribute("type") == "password") {
        input.setAttribute("type", "text");
    } else {
        input.setAttribute("type", "password");
    }
});

const registration_check = Vue.createApp({
    data() {
        return {
            username: "",
            display_name: "",
            email: "",
            password: "",
            cfmpassword: "",
            errorMessages: {
                username: [],
                email: [],
                password: [],
                cfmpassword: [],
            },
            all_usernames: [],
            registration_confirmation: "",
            degree: "",
            year: "",
            age: 0,
            gender: "",
        };
    },
    methods: {
        check_username() {
            this.errorMessages.username = [];
            if (this.username.includes(";") | this.username.includes(",")) {
                this.errorMessages.username.push(
                    "Username cannot contain ; or ,"
                );
            }
        },
        check_email() {
            this.errorMessages.email = [];
            if (!this.email.includes("smu.edu.sg")) {
                this.errorMessages.email.push(
                    "Please register with a SMU email"
                );
            }
        },
        check_password_match() {
            console.log("check password match");
            this.errorMessages.cfmpassword = [];
            if (this.password != this.cfmpassword) {
                this.errorMessages.cfmpassword.push("Passwords do not match");
            }
        },
        check_same_name() {
            if (
                this.all_usernames.includes(this.username) &&
                this.errorMessages.username.includes(
                    "Username already exists"
                ) === false
            ) {
                this.errorMessages.username.push("Username already exists");
            } else {
                this.errorMessages.username = [];
            }
        },
        check_password() {
            this.errorMessages.password = [];
            if (this.password.length < 8) {
                this.errorMessages.password.push(
                    "Password must be at least 8 characters long"
                );
            } else {
                this.errorMessages.password = [];
            }
        },

        async register_user() {
            var inputs = document.getElementsByTagName("input");
            var name = inputs.name.value;
            var username = inputs.username.value;
            var email = inputs.email.value;
            var password = inputs.pw.value;
            var cfmpassword = inputs.cfmpassword.value;
            var degree = document.getElementById("degree").value;
            var year = document.getElementById("year").value;
            var age = inputs.age.value;
            var gender = document.getElementById("gender").value;

            for (alertt of this.errorMessages){
                if (alertt.length != 0){

                    return;
                }
            }

            if (valid) {
                await this.create_user(email, password);
                await this.sleep(0.3 * 1000);
                await this.writeUserData(
                    username,
                    name,
                    email,
                    degree,
                    year,
                    age,
                    gender
                );
                await this.sleep(0.6 * 1000);
                localStorage.clear();
                localStorage.setItem("username_x", username);
                this.registration_confirmation =
                    "Registration successful! Please log in to your account.";
                console.log("wiufhewuf");
                window.location.href = "../../index.html";
            }
        },

        get_all_usernames() {
            const db = getDatabase();
            const users = ref(db, `users`);
            onValue(users, (snapshot) => {
                const data = snapshot.val();
                this.all_usernames = Object.keys(data);
                //   localStorage.setItem("all_usernames", Object.keys(data))
            });
        },

        async create_user(email, password) {
            console.log("create userwereewfw");
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
                    console.log(errorCode, errorMessage);
                    // ..
                });
        },

        async writeUserData(username, name, email, degree, year, age, gender) {
            const db = getDatabase();
            set(ref(db, `users/${username}`), {
                name: name,
                email: email,
                profile_url:
                    "https://firebasestorage.googleapis.com/v0/b/wad2-smuth-ride.appspot.com/o/Users%2FFrame%2031.png?alt=media&token=6fe4afa6-2c7d-4a44-b5a6-706a33ac17ca",
            });
            set(ref(db, `users/${username}/userprofile`), {
                degree: degree,
                year: year,
                gender: gender,
                location_user: "Singapore",
                mbti: "ABCD",
                age: age,
                bio: "I have no bio",
                price: 0,
                comfort: 0,
                convenience: 0,
                speed: 0,
                cca: [""],
                linkedin: "",
                facebook: "",
                instagram: "",
            });
        },

        eyeicon_toggle(fieldclass, fieldtoggleid) {
            var fieldclass = document.querySelector(fieldclass);
            fieldclass.classList.toggle("fa-eye-slash");
            var input = document.querySelector(fieldtoggleid);
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
            } else {
                input.setAttribute("type", "password");
            }
        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
    },

    watch: {
        username(oldValue, newValue) {
            if (oldValue == "" || oldValue != newValue) {
                this.check_username();
            }
        },
        email(oldValue, newValue) {
            if (oldValue == "" || newValue != "") {
                this.check_email();
            }
        },
        password(oldValue, newValue) {
            if (oldValue == "" || newValue != "") {
                this.check_password();
            }
        },
        cfm_password(oldValue, newValue) {
            if (oldValue == "" || newValue != "") {
                this.check_password_match();
            }
        },
    },
});

registration_check.mount("#registration");
