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
                                <a class="nav-link" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/rides/rides_list/listing.html">Rides</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/chats/chat.html">Chat</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/profile/profile.html">Profile</a>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            `,
        };
    },
    methods: {
        nav_animation() {
            console.log("nav animation working");
            let currentScrollPos = window.pageYOffset;
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
