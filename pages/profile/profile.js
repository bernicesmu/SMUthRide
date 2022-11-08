Vue.createApp({
    data() {
        return {
            displayname: "Tan Ah Gao",
            profile_url: "./edit_button.png",
            degree: "Accountancy",
            yearOfStudy: "Year 2",
            age: "20",
            status: "Single",
            location_user: "Jurong",
            mbti: "INTP",
            bio: "lorem ipsum",
            prefPrice: "70",
            prefComfort: "40",
            prefConvenience: "60",
            prefSpeed: "90",
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
            statusList: ["Single", "Attached", "Married", "It's Complicated"],
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
            picture_link : ""
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
        },
        auto_grow() {
            element = this.$refs.bio;
            element.style.height = "5px";
            element.style.height = element.scrollHeight + "px";
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
    created() {
        // @bernice I have temporarily hardcoded values
        // can you connect to database here and get all the values in the data
        // you can refer to the pseudocode in this site https://www.w3docs.com/snippets/vue-js/what-is-the-difference-between-the-created-and-mounted-hooks-in-vue-js.html
        // feel free to change all the values to null if needed
        username = localStorage.getItem("username_x");
        displayname = localStorage.getItem("displayname");
        profile_url = localStorage.getItem("profile_url")
        age = String(localStorage.getItem("age"));
        bio = localStorage.getItem("bio");
        cca = localStorage.getItem("cca");
        comfort = localStorage.getItem("comfort");
        convenience = localStorage.getItem("convenience");
        degree = localStorage.getItem("degree");
        facebook = localStorage.getItem("facebook");
        instagram = localStorage.getItem("instagram");
        linkedin = localStorage.getItem("linkedin");
        location_user = localStorage.getItem("location_user");
        mbti = localStorage.getItem("mbti");
        price = localStorage.getItem("price");
        speed = localStorage.getItem("speed");
        rs_status = localStorage.getItem("status");
        year = localStorage.getItem("year");
        // console.log(facebook);
        // console.log(this.fullFacebookLink);

        
        if (cca != "") { 
            cca = cca.split(",");
            cca.push("");
        }

        this.username = username
        this.displayname = displayname;
        this.profile_url = profile_url;
        this.degree = degree;
        this.yearOfStudy = year;
        this.age = age;
        this.status = rs_status;
        this.location_user = location_user;
        this.mbti = mbti;
        this.bio = bio;
        this.prefPrice = price;
        this.prefComfort = comfort;
        this.prefConvenience = convenience;
        this.prefSpeed = speed;
        this.ccas = cca;
        this.linkedinLinkInput += linkedin;
        this.facebookLinkInput += facebook;
        this.instagramLinkInput += instagram;
    },
    mounted() {
        for (let element of document.getElementsByClassName("preference")) {
            console.log(element.classList[1].slice(1));
            element.style.width = element.classList[1].slice(1) + "%";
        }
    },
}).mount("#profileVue");
