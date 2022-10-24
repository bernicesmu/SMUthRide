Vue.createApp({
    data() {
        return {
            username: "Tan Ah Gao",
            major: "Accountancy",
            yearOfStudy: "Year 2",
            age: "20",
            status: "Single",
            location: "Jurong",
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
            ],
            yearOfStudyList: [
                "Year 1",
                "Year 2",
                "Year 3",
                "Year 4",
                "Year 5",
                "Alumni",
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
            ],
        };
    },
    created() {
        // @bernice I have temporarily hardcoded values
        // can you connect to database here and get all the values in the data
        // you can refer to the pseudocode in this site https://www.w3docs.com/snippets/vue-js/what-is-the-difference-between-the-created-and-mounted-hooks-in-vue-js.html
        // feel free to change all the values to null if needed
    },
    mounted() {
        for (let element of document.getElementsByClassName("preference")) {
            console.log(element.classList[1].slice(1));
            element.style.width = element.classList[1].slice(1) + "%";
        }
    },
}).mount("#profileVue");
