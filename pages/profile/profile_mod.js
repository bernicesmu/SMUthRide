import {
    find_name_from_username,
    find_user_profile,
    write_user_profile,
} from "../../index.js";

import {getStorage,ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js"

// var username = localStorage.getItem("username_x");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('user')

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

   


    // function uploadImage(e){
    //     console.log("hello")
    //     const storage = getStorage()
    //     const storageReference = storageReference(storage, 'public/myfile')
    //     uploadTask.value = uploadBytesResumable(storageReference, e.target.files[0]);
    //     // uploadTask.value.on{
    //     //     "state_changed"
    //     // }

    //     console.log(uploadTask)
    // }

    // document.getElementById("upload").addEventListener("click",uploadImage)
  
}

var files = []
var reader = new FileReader()

var SelBtn = document.getElementById("selbtn")
var UpBtn = document.getElementById("upbtn")
var myimg = document.getElementById("myimg")

var input = document.createElement("input")



input.type = "file"

document.getElementById("buttons").appendChild(input)

input.onchange = e =>{
    files = e.target.files

    // var extension = GetFileExt(files[0])
    // var name = GetFileName(files[0])
    reader.readAsDataURL(files[0])

}

reader.onload = function(){
    myimg.src = reader.result
    
    console.log(files[0].name)
}


function GetFileExt(file){
    var temp = file.name.split(".")
    var ext = temp.slice
}

async function UploadProcess(){
    var ImgToUpload = files[0]

    var ImgName = files[0].name
    const metadata = {
        contenType: ImgToUpload.type
    }
    const storage = getStorage()
    const storageRef = sRef(storage, "Users/" + ImgName)

    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload,metadata)

    UploadTask.on('state-changed',(snapshot)=>{
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
    },
    (error) =>{
        alert("error: img not uploaded")
    },
    ()=>{
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
            console.log(downloadURL)
        })
    })


}

UpBtn.onclick = UploadProcess