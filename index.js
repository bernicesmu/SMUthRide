// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCVjpCi9lziMF130jj2UtJGiPc0MamUkY",
  authDomain: "wad2-smuth-ride.firebaseapp.com",
  projectId: "wad2-smuth-ride",
  storageBucket: "wad2-smuth-ride.appspot.com",
  messagingSenderId: "738000465812",
  appId: "1:738000465812:web:9d74b4f15684ed2a83a981",
  measurementId: "G-E7M5LHMTL8",
  databaseURL: "https://wad2-smuth-ride-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function retrieve_rides_list() {
  const db = getDatabase();
  const rides = ref(db, `rides/`)
  onValue(rides, (snapshot) => {
    return snapshot.val()

  })

}

export function writeUserData(username, name, email) {
  const db = getDatabase();
  const users = ref(db, `users`)
  onValue(users, (snapshot) => {
    const data = snapshot.val();
    var uid = 0
    for (var i of Object.values(data)) { 
      if (i.userid > uid) { 
        uid = i.userid
      }
    }
    localStorage.setItem("userid", uid)
  });
  var str_uid = String(parseInt(localStorage.getItem("userid")) + 1)
  var latest_uid = "0".repeat(3-str_uid.length) + str_uid 
  set(ref(db, `users/${username}`), {
      userid: latest_uid,
      name: name,
      email: email,
  });
  set(ref(db, `users/${username}/userprofile`), {
    degree: "Bachelor",
    year: "Year X",
    status: "It's Complicated",
    location_user: "Singapore", 
    mbti: "ABCD",
    age: 0,
    bio: "I have no bio", 
    price: 0,
    comfort: 0,
    convenience: 0, 
    speed: 0, 
    cca: [""],
    linkedin: "https://www.linkedin.com/in/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  }) 
}


export function write_ride(smu_location,smu_to_from,username,rideid,user_address,cost,max_capacity,date,time,users_offered,area) { 
  const db = getDatabase();
  set(ref(db, `rides/${rideid}`), {
    smu_location: smu_location, 
    smu_to_from : smu_to_from, 
    driver_username: username, 
    user_address: user_address, 
    cost : cost, 
    area: area, 
    max_capacity: max_capacity, 
    // frequency,
    date: date, 
    time: time, 
    users_offered: users_offered 
  })
}

export function find_rid() { 
  const db = getDatabase();
  const rides = ref(db, `rides/`)
  onValue(rides, (snapshot) => {
    const data = snapshot.val();
    var rid = 0
    for (var i of Object.keys(data)) { 
      rid = i 
    }
    localStorage.setItem("rideid", rid)
  });
}

export function create_chat(uid1, uid2) { 
  const db = getDatabase();
  set(ref(db, `messages/${uid1};${uid2}/`), {
    text: "hello world",
    user: "kenming",
    datetime: "13/10 5:49PM"
  })
}

export function create_user(email, password) { 
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // ..
  });
};

export function signin_user(email, password) { 
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("username", user)
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}

export function find_chat(username){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  var final_output = []
// Attach an asynchronous callback to read the data at our posts reference
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    var values = Object.entries(data)

    for(var entry of values){
      let username_array = []
      let chat_usernames = entry[0]
    if(chat_usernames.includes(username)){   
      var chat_id = "ber7;joleneusername" // hardcode1010   
      find_last_chat_message(chat_id)
      let message = localStorage.getItem("latest_message")
      // console.log(message)
      var chatid_ids = chat_id.split(";")
      for (var id of chatid_ids) { 
        if (id != username) { 
          var other_username = id
        }
      }
      find_name_from_username(other_username)
      let other_user = localStorage.getItem("displayname")
      localStorage.removeItem("displayname")
      // NO PROFILE PAGE
      print_user(message,other_user)
      localStorage.removeItem("latest_message")
      localStorage.removeItem("other_user_name")
  }
}

});

}

//NEED TO UPDATE WITH VUE FOR DYNAMIC RETREIVAL
export function find_last_chat_message(paired_usernames){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    // paired_id = '001_002'
    for(var id in data){
      if(id == paired_usernames){
        let messages = data[id]
        let last_message = messages[messages.length - 1]
        localStorage.setItem("latest_message", last_message.message)
      }
      
    }
  });
}

export function print_user(message,other_user){
  // var username = "joleneusername" // hardcoded for now 
  var all_chatrooms = document.getElementsByClassName("chatbox")
  var exist = false
  for (var cr of all_chatrooms) { 
    if (cr.id == other_user) { 
      exist = true 
    }
  }
  if (exist) { 
    let html_string =
    `<div id="photo"></div>
      <div style="margin-left: 20px;align-self: start;width: 70%;"> 
        <b>${other_user}</b>
        <div style="text-overflow: ellipsis; display: block; width:50%;white-space: nowrap; width: 100%; overflow: hidden;">
          ${message}
        </div>
      </div>`
    document.getElementById(other_user).innerHTML = html_string
  }
  else { 
    let html_string =
    `<div id="${other_user}" class="chatbox" style="padding:10px; display: flex;">
        <div id="photo"></div>
        <div style="margin-left: 20px;align-self: start;width: 70%;"> 
          <b>${other_user}</b>
          <div style="text-overflow: ellipsis; display: block; width:50%;white-space: nowrap; width: 100%; overflow: hidden;">
            ${message}
          </div>
        </div>
    </div>`
    document.getElementById("chatroom").innerHTML += html_string
  }
}

export function find_user_profile(username) { 
  const db = getDatabase();
  const userprof = ref(db, `users/${username}/userprofile`)
  onValue(userprof, (snapshot) => {
    const data = snapshot.val();
    var k = "";
    var v = "";
    for ([k, v] of Object.entries(data)) { 
      localStorage.setItem(k, v)
    }
  });
}

export function find_name_from_username(username) { 
  const db = getDatabase();
  const userprof = ref(db, `users/${username}/name`)
  onValue(userprof, (snapshot) => {
    const data = snapshot.val();
    localStorage.setItem("displayname", data)
  });
}

export function write_user_profile(username, displayname, age, bio, cca, comfort, convenience, degree, facebook, instagram, linkedin, location_user, mbti, price, speed, rs_status, year) { 
  const db = getDatabase(); 
  set(ref(db, `users/${username}/userprofile`), {
    degree: degree,
    year: year,
    status: rs_status,
    location_user: location_user, 
    mbti: mbti,
    age: age,
    bio: bio, 
    price: price,
    comfort: comfort,
    convenience: convenience, 
    speed: speed, 
    cca: cca,
    linkedin: linkedin,
    facebook: facebook,
    instagram: instagram,
  }) 
  const updates = {};
  updates[`users/${username}/name`] = displayname
  return update(ref(db), updates)
}

export function get_ride_details(rideid) { 
  const db = getDatabase();
  const rides = ref(db, `rides/${rideid}`)
  onValue(rides, (snapshot) => {
    const data = snapshot.val();
    var k = "";
    var v = "";
    for ([k, v] of Object.entries(data)) { 
      localStorage.setItem(k, v)
    }
  });
}

export function formatAMPM(date) {

  let hours = Number(date.split(":")[0]);
  let minutes = Number(date.split(":")[1]);
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function format_date(date){
  date = date.split("-")
  let day = new Date(date[0], date[1], date[2]).toDateString().split(" ")
  return [day[0],`${day[1]} ${day[2]} ${day[3]}`]
}