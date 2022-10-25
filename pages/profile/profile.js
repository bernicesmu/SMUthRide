Vue.createApp({
    data() {
        return {
            displayname: "Tan Ah Gao",
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
            ccas: ["Ellipsis", ".Hack", ""],
            linkedinLink: "https://www.linkedin.com/in/",
            facebookLink: "https://www.facebook.com/",
            instagramLink: "https://www.instagram.com/",

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
        };
    },
    methods: {
        create_new_cca() {
            this.ccas.pop();
            this.ccas.push(this.ccaInput);
            this.ccas.push("");
            console.log(this.ccas);
            console.log(this.ccaInput);
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
    },
    created() {
        // @bernice I have temporarily hardcoded values
        // can you connect to database here and get all the values in the data
        // you can refer to the pseudocode in this site https://www.w3docs.com/snippets/vue-js/what-is-the-difference-between-the-created-and-mounted-hooks-in-vue-js.html
        // feel free to change all the values to null if needed
        username = localStorage.getItem("username_x");
        displayname = localStorage.getItem("displayname");
        age = localStorage.getItem("age");
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

        this.displayname = displayname;
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
        this.ccas = ["Ellipsis", ".Hack", ""]; //unhardcode later
        this.linkedinLink = linkedin;
        this.facebookLink = facebook;
        this.instagramLink = instagram;
    },
    mounted() {
        for (let element of document.getElementsByClassName("preference")) {
            console.log(element.classList[1].slice(1));
            element.style.width = element.classList[1].slice(1) + "%";
        }
    },
}).mount("#profileVue");
