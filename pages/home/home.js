// const { TabsPlugin } = require("bootstrap-vue");

document.getElementById("swap").addEventListener("click", swap_to_frm);

function swap_to_frm() {
    var from = document.getElementById("from");
    var to = document.getElementById("to");
    var sen = document.getElementById("trip-sen");

    if (from.innerHTML == "SMU") {
        from.innerHTML = "Location";
        to.innerHTML = "SMU";
        sen.innerHTML = "Booking a ride to SMU";
    } else {
        from.innerHTML = "SMU";
        to.innerHTML = "Location";
        sen.innerHTML = "Booking a ride from SMU";
    }
}
