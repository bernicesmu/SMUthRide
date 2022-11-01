const pageData = document.querySelector("#navbarVue div").dataset.page;

const navbar = Vue.createApp({
    data() {
        return {
            page: pageData,
        };
    },
    template: `
        <nav id="navbar" class="navbar navbar-expand-md fixed-top">
            <a class="navbar-brand" href="#">
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
                        <a class="nav-link nav-item-top" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href=" relativePath +
                        'pages/rides/rides_list/rides_listing.html' ">Rides</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href=" offerURL ">Offers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href=" chatURL ">Chat</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href=" profileURL "><img :src="relativePath + 'pages/profile/ded.png'" class="profile-img"/></a>
                    </li>
                </ul>
            </div>
            <div id="street"></div>
            <div id="street-stripe"></div>
        </nav>
    `,
    computed: {
        relativePath() {
            if (
                this.page === "profile" ||
                this.page === "chat" ||
                this.page === "offers"
            ) {
                return "../../";
            } else {
                return "../../../";
            }
        },
        isLoggedIn() {
            return localStorage.getItem("username_x");
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
    },
    methods: {
        nav_animation() {
            let currentScrollPos = window.pageYOffset;
            if (currentScrollPos == 0) {
                document
                    .getElementById("navbar")
                    .classList.remove("navbar-down");
                document.getElementById("navbar").classList.add("navbar-top");
                document
                    .querySelectorAll("#navbarSupportedContent li a")
                    .forEach((currentValue) => {
                        currentValue.classList.remove("nav-item-down");
                        currentValue.classList.add("nav-item-top");
                    });
                document.getElementById("street").classList.remove("street");
                document.getElementById("street-stripe").classList.remove("street-stripe");
                for (const elem of document.getElementsByClassName("nav-link")) {
                    if (elem.innerText.toLowerCase() === this.page) {
                        elem.classList.add("active-page-top");
                        elem.classList.remove("active-page-down");
                    }
                }
                
            } else {
                document
                    .getElementById("navbar")
                    .classList.remove("navbar-top");
                document.getElementById("navbar").classList.add("navbar-down");
                document.getElementById("street").classList.add("street");
                document.getElementById("street-stripe").classList.add("street-stripe");
                document
                    .querySelectorAll("#navbarSupportedContent li a")
                    .forEach((currentValue) => {
                        currentValue.classList.remove("nav-item-top");
                        currentValue.classList.add("nav-item-down");
                    });
                for (const elem of document.getElementsByClassName("nav-link")) {
                    if (elem.innerText.toLowerCase() === this.page) {
                        elem.classList.add("active-page-down");
                        elem.classList.remove("active-page-top");
                    }
                }
            }
        },
    },
    mounted() {
        window.addEventListener("scroll", this.nav_animation);

        for (const elem of document.getElementsByClassName("nav-link")) {
            if (elem.innerText.toLowerCase() === this.page) {
                let currentScrollPos = window.pageYOffset;
                if (currentScrollPos == 0) {
                    elem.classList.add("active-page-top");
                    elem.classList.remove("active-page-down");
                } 
                else { 
                    elem.classList.add("active-page-down");
                    elem.classList.remove("active-page-top");
                }
            }
        }
    },
});

navbar.mount("#navbarVue");
