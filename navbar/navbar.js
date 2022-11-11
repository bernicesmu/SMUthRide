import {
    getDatabase,
    ref,
    set,
    child,
    get,
    update,
    remove,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

import "../index.js";

const pageData = document.querySelector("#navbarVue div").dataset.page;

const navbar = Vue.createApp({
    data() {
        return {
            page: pageData,
            url: "",
        };
    },
    template: `
        <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-down">
            <a class="navbar-brand" :href=" homeURL ">
                <div id="div-car">
                    <img
                        class=""
                        :src=" relativePath + 'navbar/car_side_v2.svg'"
                        id="side-car"
                    /> 
                    <img
                        class="tyre"
                        :src=" relativePath + 'navbar/tyre.svg'"
                        id="tyre-back"
                    /> 
                    <img
                        class="tyre"
                        :src=" relativePath + 'navbar/tyre.svg'"
                        id="tyre-front"
                    /> 
                </div>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link nav-item-down" :href=" homeURL ">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-down" :href=" rideURL ">Rides</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-down" :href=" offerURL ">Offers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-down" :href=" chatURL ">Chat</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-down" :href=" profileURL "><img :src="url" class="img-fluid rounded-circle"
                        style="width:2.4rem;height:2.4rem;object-fit:cover;border:black solid 1px"
                     v-on:load="profilePic"/></a>
                    </li>
                </ul>
            </div>
            <div id="street" class="street"></div>
            <div id="street-stripe" class="street-stripe"></div>
        </nav>
    `,
    computed: {
        relativePath() {
            if (
                this.page === "profile" ||
                this.page === "chat" ||
                this.page === "offers" ||
                this.page === "home"
            ) {
                return "../../";
            } else {
                return "../../../";
            }
        },
        isLoggedIn() {
            return localStorage.getItem("username_x");
        },
        homeURL() {
            return this.relativePath + "pages/home/home.html";
        },
        rideURL() {
            if (this.isLoggedIn) {
                return (
                    this.relativePath +
                    "pages/rides/rides_list/rides_listing.html"
                );
            } else {
                return this.relativePath + "pages/login/login.html";
            }
        },
        offerURL() {
            if (this.isLoggedIn) {
                return this.relativePath + "pages/offers/offers.html";
            } else {
                return this.relativePath + "pages/login/login.html";
            }
        },
        chatURL() {
            if (this.isLoggedIn) {
                return this.relativePath + "pages/chats/chat.html";
            } else {
                return this.relativePath + "pages/login/login.html";
            }
        },
        profileURL() {
            if (this.isLoggedIn) {
                return (
                    this.relativePath +
                    "pages/profile/profile.html?user=" +
                    localStorage.getItem("username_x")
                );
            } else {
                return this.relativePath + "pages/login/login.html";
            }
        },
        profilePic() {
            let username = localStorage.getItem("username_x");
            // console.log(username);
            const db = getDatabase();

            const data = ref(db, "users/" + username);
            onValue(data, (snapshot) => {
                // console.log(snapshot);
                // console.log(snapshot.val().profile_url);
                // SHOULD NOT BE RETURNING
                // return snapshot.val().profile_url
                if (snapshot.val().profile_url) {
                    this.url = snapshot.val().profile_url;
                } else {
                    if (
                        this.page === "profile" ||
                        this.page === "chat" ||
                        this.page === "offers" ||
                        this.page === "home"
                    ) {
                        this.url = "../../pages/profile/default_profile.png";
                    } else {
                        this.url = "../../../pages/profile/default_profile.png";
                    }
                }
                // document
                //     .getElementById("profile-picture")
                //     .setAttribute("src", snapshot.val().profile_url);
            });
        },
    },
    // methods: {
    // nav_animation() {
    // let currentScrollPos = window.pageYOffset;
    // if (elem.innerText.toLowerCase() === this.page) {
    //     elem.classList.add("active-page-down");
    //     elem.classList.remove("active-page-top");
    // }
    // if (currentScrollPos == 0) {
    //     document
    //         .getElementById("navbar")
    //         .classList.remove("navbar-down");
    //     document.getElementById("navbar").classList.add("navbar-top");
    //     document
    //         .querySelectorAll("#navbarSupportedContent li a")
    //         .forEach((currentValue) => {
    //             currentValue.classList.remove("nav-item-down");
    //             currentValue.classList.add("nav-item-top");
    //         });
    //     document.getElementById("street").classList.remove("street");
    //     document.getElementById("street-stripe").classList.remove("street-stripe");
    //     for (const elem of document.getElementsByClassName("nav-link")) {
    //         if (elem.innerText.toLowerCase() === this.page) {
    //             elem.classList.add("active-page-top");
    //             elem.classList.remove("active-page-down");
    //         }
    //     }
    // } else {
    //     document
    //         .getElementById("navbar")
    //         .classList.remove("navbar-top");
    //     document.getElementById("navbar").classList.add("navbar-down");
    //     document.getElementById("street").classList.add("street");
    //     document.getElementById("street-stripe").classList.add("street-stripe");
    //     document
    //         .querySelectorAll("#navbarSupportedContent li a")
    //         .forEach((currentValue) => {
    //             currentValue.classList.remove("nav-item-top");
    //             currentValue.classList.add("nav-item-down");
    //         });
    //     for (const elem of document.getElementsByClassName("nav-link")) {
    //         if (elem.innerText.toLowerCase() === this.page) {
    //             elem.classList.add("active-page-down");
    //             elem.classList.remove("active-page-top");
    //         }
    //     }
    // }
    // },
    // },
    mounted() {
        window.addEventListener("scroll", this.nav_animation);

        for (const elem of document.getElementsByClassName("nav-link")) {
            if (elem.innerText.toLowerCase() === this.page) {
                let currentScrollPos = window.pageYOffset;
                elem.classList.add("active-page-top");
            }
        }
    },
});

navbar.mount("#navbarVue");
