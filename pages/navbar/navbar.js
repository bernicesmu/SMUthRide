let prevScrollpos = window.pageYOffset;

const navbar = Vue.createApp({
    data() {
        return {
            navbar_html: `
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
                                <a class="nav-link" href="../chats/chat.html">Chat</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../rides/rides_list/listing.html">See Ride Listings</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../profile/profile.html">Profile</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            `,
        };
    },
    methods: {
        nav_animation() {
            console.log("working");
            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
                document.getElementById("navbar").style.transitionDelay =
                    "0.2s";
            } else {
                document.getElementById("navbar").style.top = "-350px";
            }
            prevScrollpos = currentScrollPos;
            if (currentScrollPos == 0) {
                document
                    .getElementById("navbar")
                    .classList.remove("navbar-down");
                document.getElementById("navbar").classList.add("navbar-top");
            } else {
                document
                    .getElementById("navbar")
                    .classList.remove("navbar-top");
                document.getElementById("navbar").classList.add("navbar-down");
            }
        },
    },
    mounted() {
        window.addEventListener("scroll", this.nav_animation);
    },
});

navbar.mount("#navbarVue");
