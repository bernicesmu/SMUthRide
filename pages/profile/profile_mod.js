import {
    find_name_from_username,
    find_user_profile,
    write_user_profile,
} from "../../index.js";

var username = localStorage.getItem("username_x");

find_user_profile(username);
find_name_from_username(username);

let elem = document.getElementById("profile_form");
if (elem) {
    elem.addEventListener("submit", update_user_database);
}

function update_user_database() {
    var inputs = document.getElementsByClassName("target-input");
    var cca_options = document.getElementsByClassName('cca_options');
    console.log(inputs);
    console.log(cca_options);

    var displayname = inputs.displayname.value;
    var age = String(inputs.age.value);
    var bio = inputs.bio.value;
    var comfort = inputs.prefComfort.value;
    var convenience = inputs.prefConvenience.value;
    var degree = inputs.degree.value;
    var facebook = inputs.facebook.value;
    var instagram = inputs.instagram.value;
    var linkedin = inputs.linkedin.value;
    var location_user = "Jurong"; //hardcoded. softcode after regine is done
    var mbti = inputs.mbti.value;
    var price = inputs.prefPrice.value;
    var speed = inputs.prefSpeed.value;
    var rs_status = inputs.status.value;
    var year = inputs.year.value;

    var cca = []
    for (var cca_op of cca_options) { 
        if (cca_op.value != "") { 
            cca.push(cca_op.value)
        }
    }

    write_user_profile(
        username,
        displayname,
        age,
        bio,
        cca,
        comfort,
        convenience,
        degree,
        facebook,
        instagram,
        linkedin,
        location_user,
        mbti,
        price,
        speed,
        rs_status,
        year
    );
}
