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
                <!-- <img
                    class=""
                    src=""
                    alt="brand_logo"
                /> -->
                BRAND
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
                        <a class="nav-link nav-item-top" :href="relativePath + 'pages/rides/rides_list/rides_listing.html'">Rides</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" href="#">Offers</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href="relativePath + 'pages/chats/chat.html'">Chat</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-top" :href="relativePath + 'pages/profile/profile.html'"><img src="/pages/profile/ded.png" class="profile-img"/></a>
                    </li>
                </ul>
            </div>
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
            } else {
                document
                    .getElementById("navbar")
                    .classList.remove("navbar-top");
                document.getElementById("navbar").classList.add("navbar-down");
                document
                    .querySelectorAll("#navbarSupportedContent li a")
                    .forEach((currentValue) => {
                        currentValue.classList.remove("nav-item-top");
                        currentValue.classList.add("nav-item-down");
                    });
            }
        },
    },
    mounted() {
        window.addEventListener("scroll", this.nav_animation);

        for (const elem of document.getElementsByClassName("nav-link")) {
            if (elem.innerText.toLowerCase() === this.page) {
                elem.classList.add("active-page");
            }
        }
    },
});

navbar.mount("#navbarVue");
