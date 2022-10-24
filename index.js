// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
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
    location: "Singapore", 
    mbti: "ABCD",
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
    username: username, 
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
  set(ref(db, `messages/${uid1}_${uid2}/`), {
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

export function find_chat(){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  var final_output = []
// Attach an asynchronous callback to read the data at our posts reference
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    var values = Object.entries(data)

    for(var entry of values){
      let username_array = []
      let chat_id = entry[0]
    if(chat_id.includes("001")){      
      find_last_chat_message(chat_id)
      let message = localStorage.getItem("latest_message")
      // console.log(message)
      get_name(chat_id,"001")
      let other_user = localStorage.getItem("other_user_name")
      print_user(message,other_user)
      localStorage.removeItem("latest_message")
      localStorage.removeItem("other_user_name")
  }
}

});

}

//NEED TO UPDATE WITH VUE FOR DYNAMIC RETREIVAL
export function find_last_chat_message(paired_id){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    paired_id = '001_002'
    for(var id in data){
      if(id == paired_id){
        let messages = data[id]
        let last_message = messages[messages.length - 1]
        localStorage.setItem("latest_message", last_message.message)
      }
      
    }
  });


}

export function get_name(chat_id, user_id){
  const db = getDatabase()
  const reference = ref(db, 'users')
  let ids = chat_id.split("_")
  for(var id of ids){
    if(id != user_id){
      //get the user name
      onValue(reference, (snapshot) => {
        const data = snapshot.val();
        localStorage.setItem("other_user_name", data[id].name)
      });


    }
  }
}

export function print_user(message,other_user){
  var username = "joleneusername" // hardcoded for now 
  var all_chatrooms = document.getElementsByClassName("chatbox")
  var exist = false
  for (var cr of all_chatrooms) { 
    if (cr.id == username) { 
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
    document.getElementById(username).innerHTML = html_string
  }
  else { 
    let html_string =
    `<div id="${username}" class="chatbox" style="padding:10px; display: flex;">
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
  const users = ref(db, `users/${username}`)
  onValue(users, (snapshot) => {
    const data = snapshot.val();
    var rid = 0
    for (var i of Object.keys(data)) { 
      rid = i 
    }
    localStorage.setItem("rideid", rid)
  });
}