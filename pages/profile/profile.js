import {
    find_name_from_username,
    find_user_profile,
    write_user_profile,
} from "../../index.js";

import { GetProfilePicUrl, UploadProcess } from "./profile_mod_2.js";

// firebase storage
// import {
//     getStorage,
//     ref as sRef,
//     uploadBytesResumable,
//     getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";

// database
// import {
//     getDatabase,
//     ref,
//     set,
//     child,
//     get,
//     update,
//     remove,
//     onValue,
// } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

// var username = localStorage.getItem("username_x");

const url = window.location.href;

let username = "";
if (url.includes("profile_edit.html")) {
    username = localStorage.getItem("username_x");
    let username_elem = document.createElement("input");
    username_elem.setAttribute("type", "hidden");
    username_elem.setAttribute("name", "user");
    username_elem.setAttribute("value", username);
    document.getElementById("profile_form").appendChild(username_elem);
} else {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    username = urlParams.get("user");
    GetProfilePicUrl(username);
    if (username != localStorage.getItem("username_x")) {
        document.getElementById("edit-profile").innerHTML = "";
    }
}

// console.log(username, "oiewfjewo");
find_user_profile(username);
find_name_from_username(username);

Vue.createApp({
    data() {
        return {
            displayname: "Tan Ah Gao",
            profile_url:
                "https://firebasestorage.googleapis.com/v0/b/wad2-smuth-ride.appspot.com/o/Users%2FFrame%2031.png?alt=media&token=6fe4afa6-2c7d-4a44-b5a6-706a33ac17ca",
            degree: "Accountancy",
            yearOfStudy: "Year 2",
            age: "20",
            gender: "Male",
            // location_user: "lalaland",
            mbti: "INTP",
            bio: "lorem ipsum",
            // prefPrice: "70",
            // prefComfort: "40",
            // prefConvenience: "60",
            // prefSpeed: "90",
            ccas: ["Ellipsis", ".Hack"],
            linkedinLink: "https://www.linkedin.com/in/",
            facebookLink: "https://www.facebook.com/",
            instagramLink: "https://www.instagram.com/",
            linkedinLinkInput: "",
            facebookLinkInput: "",
            instagramLinkInput: "",
            selectedFile: null,

            ccaInput: "",

            majorList: [
                "Business",
                "Accountancy",
                "Economics",
                "Social Science",
                "Information Systems",
                "Computer Science",
                "Computing & Law",
                "Software Engineer",
                "Law",
                "CIS",
                "Bachelor",
            ],
            yearOfStudyList: [
                "Year 1",
                "Year 2",
                "Year 3",
                "Year 4",
                "Year 5",
                "Alumni",
                "Year X",
            ],
            genderList: ["Male", "Female"],
            mbtiList: [
                "INTJ",
                "INTP",
                "ENTJ",
                "ENTP",
                "INFJ",
                "INFP",
                "ENFJ",
                "ENFP",
                "ISTJ",
                "ISFJ",
                "ESTJ",
                "ESFJ",
                "ISTP",
                "ISFP",
                "ESTP",
                "ESFP",
                "ABCD",
            ],
            picture_link: "",
        };
    },
    computed: {
        showSocials() {
            if (
                this.linkedinLinkInput !== "" ||
                this.facebookLinkInput !== "" ||
                this.instagramLinkInput !== ""
            ) {
                return true;
            } else {
                return false;
            }
        },
        fullFacebookLink() {
            return this.facebookLink + this.facebookLinkInput;
        },
        fullInstagramLink() {
            return this.instagramLink + this.instagramLinkInput;
        },
        fullLinkedinLink() {
            return this.linkedinLink + this.linkedinLinkInput;
        },
    },
    methods: {
        create_new_cca() {
            if (this.ccaInput !== "" && !this.ccas.includes(this.ccaInput)) {
                this.ccas.pop();
                this.ccas.push(this.ccaInput);
                this.ccas.push("");
                this.ccaInput = "";
            }
        },
        ccaInputModel(event) {
            this.ccaInput = event.target.value;
        },
        remove_cca(cca) {
            let index = this.ccas.indexOf(cca);
            if (index !== -1) {
                this.ccas.splice(index, 1);
            }
            var cca_options = document.getElementsByClassName("cca_options");
            console.log(cca_options);
        },
        auto_grow() {
            element = this.$refs.bio;
            element.style.height = "5px";
            element.style.height = element.scrollHeight + "px";
        },
        update_user_database() {
            var inputs = document.getElementsByClassName("target-input");
            var cca_options = document.getElementsByClassName("cca_options");
            var displayname = inputs.displayname.value;
            var age = String(inputs.age.value);
            var bio = inputs.bio.value;
            var degree = inputs.degree.value;
            var facebook = inputs.facebook.value;
            var instagram = inputs.instagram.value;
            var linkedin = inputs.linkedin.value;
            var mbti = inputs.mbti.value;
            var gender = inputs.gender.value;
            var year = inputs.year.value;

            var cca = [];
            for (var cca_op of cca_options) {
                if (cca_op.value != "") {
                    cca.push(cca_op.value);
                }
            }

            if (cca.length == 0) {
                cca = [""];
            }

            write_user_profile(
                username,
                displayname,
                age,
                bio,
                cca,
                degree,
                facebook,
                instagram,
                linkedin,
                mbti,
                gender,
                year
            );
        },
        uploadImage(event) {
            let files = [];
            let reader = new FileReader();

            files = event.target.files;
            reader.readAsDataURL(files[0]);

            reader.onload = function () {
                this.profile_url = reader.result;
            };
            UploadProcess(files);
        },

        // onFileSelect(event){
        //     console.log(event.target.files[0])
        //     this.selectedFile= event.target.files[0]
        // },
        // uploadImage(){
        //     const ref = firebase.storage().ref()

        //     const file = document.querySelector("#photo").files[0]

        //     const name = new Date() + '-' + file.name

        //     const metadata = {
        //         contentType:file.type
        //     }

        //     const task = ref.child(name).put(file,metadata)

        //     task
        //     .then(snapshot => {
        //         snapshot.ref.getDownloadURL()
        //     })
        //     .then(url => {
        //         console.log(url)
        //     })
        // }
    },
    beforeCreate() {},
    created() {
        // @bernice I have temporarily hardcoded values
        // can you connect to database here and get all the values in the data
        // you can refer to the pseudocode in this site https://www.w3docs.com/snippets/vue-js/what-is-the-difference-between-the-created-and-mounted-hooks-in-vue-js.html
        // feel free to change all the values to null if needed
        // let price = localStorage.getItem("price");
        // let speed = localStorage.getItem("speed");
        // let comfort = localStorage.getItem("comfort");
        // let convenience = localStorage.getItem("convenience");
        // let location_user = localStorage.getItem("location_user");
        // console.log(location_user);
        // console.log(facebook);
        // console.log(this.fullFacebookLink);
        let username = localStorage.getItem("username_x");
        let displayname = localStorage.getItem("displayname");
        let age = String(localStorage.getItem("age"));
        let bio = localStorage.getItem("bio");
        let cca = localStorage.getItem("cca");
        let degree = localStorage.getItem("degree");
        let facebook = localStorage.getItem("facebook");
        let instagram = localStorage.getItem("instagram");
        let linkedin = localStorage.getItem("linkedin");
        let mbti = localStorage.getItem("mbti");
        let gender = localStorage.getItem("gender");
        let year = localStorage.getItem("year");

        if (cca != "") {
            cca = cca.split(",");
            cca.push("");
        } else {
            cca = [""];
        }

        let db_profile_url = localStorage.getItem("profile_url");
        if (db_profile_url != "undefined") {
            this.profile_url = db_profile_url;
        }

        // this.prefPrice = price;
        // this.prefComfort = comfort;
        // this.prefConvenience = convenience;
        // this.prefSpeed = speed;
        // this.location_user = location_user;
        this.username = username;
        this.displayname = displayname;
        this.degree = degree;
        this.yearOfStudy = year;
        this.age = age;
        this.gender = gender;
        this.mbti = mbti;
        this.bio = bio;
        this.ccas = cca;
        this.linkedinLinkInput += linkedin;
        this.facebookLinkInput += facebook;
        this.instagramLinkInput += instagram;
    },
    // mounted() {
    //     for (let element of document.getElementsByClassName("preference")) {
    //         console.log(element.classList[1].slice(1));
    //         element.style.width = element.classList[1].slice(1) + "%";
    //     }
    // },
}).mount("#profileVue");
