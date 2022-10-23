// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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
    console.log(data)
    var uid = 0
    for (var i of Object.values(data)) { 
      console.log("i is", i)
      uid = i.userid
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
}

export function write_ride(username, rideid, address, cost, capacity, frequency, date, time) { 
  const db = getDatabase();
  set(ref(db, `rides/${username}/${rideid}`), {
    address,
    cost,
    capacity,
    frequency,
    date,
    time
  })
}

export function find_rid(username) { 
  const db = getDatabase();
  const rides = ref(db, `rides/${username}`)
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


export function find_chat(){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  var final_output = []
// Attach an asynchronous callback to read the data at our posts reference
onValue(reference, (snapshot) => {
  const data = snapshot.val();
  // var keys = Object.keys(data)
  var values = Object.entries(data)
  // console.log(data)
  // console.log(keys)
  // console.log(values)
  // var thing = values[1][1]
  // console.log(thing.user)
  
  // console.log(values)
  for(var entry of values){
    let username_array = []
    let chat_id = entry[0]
    // let ids = chat_id.split("_")
  
  //   if(ids.includes("001")){
  //       // console.log(entry[1])
  //       for(var id of ids){
  //         if(id != "001"){
  //           username_array.push(id)
  //         }
  //       }
  //       let combine = username_array.join(" ")
  //       // console.log(combine)
  //       //display
  //       final_output.push(combine)
  //       // console.log(final_output)
  //   }
  // }
  if(chat_id.includes("001")){
    // console.log(chat_id)
    
    let message = find_last_chat_message(chat_id)
    console.log(message)
    let other_user = get_name(chat_id,"001")
    print_user(message,other_user)

  }
}
  // if there is no values then create a new chat_room
  // console.log(final_output)
  // print_users(final_output)
});

}

//NEED TO UPDATE WITH VUE FOR DYNAMIC RETREIVAL
export function find_last_chat_message(paired_id){
  const db = getDatabase()
  const reference = ref(db, 'messages')
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    paired_id = '001_002'
    // console.log(data[paired_id])
    for(var id in data){
      if(id == paired_id){
        // console.log(data[id])
        let messages = data[id]
        // console.log(messages)
        // console.log(messages[messages.length - 1])
        let last_message = messages[messages.length - 1]
        // console.log(last_message.message)

        // SOME ISSUE WITH THE ASYNC REQUEST. CANNOT RETURN
        return last_message.message
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
        
        console.log(data[id].name)
        
        // SOME ISSUE WITH THE ASYNC REQUEST. CANNOT RETURN
        return data[id].name
        
      });


    }
  }
}

export function print_users(list_of_names){
  let html_string = ""
  for(var user of list_of_names){
    console.log(user)
    html_string+= `<div>${user}</div><hr>`
  }

  document.getElementById("chatroom").innerHTML = html_string
}

export function print_user(message,other_user){
  let html_string = ""
  html_string+= 
  `<div class = "chatbox" style="padding:10px; display: flex;">
      <div id="photo">
        
      </div>
      <div style="margin-left: 20px;align-self: start;width: 70%;"> 
        <b>${other_user}</b>
        <div style="text-overflow: ellipsis; display: block; width:50%;white-space: nowrap; width: 100%; overflow: hidden;">
          ${message}
        </div>
      </div>`
      document.getElementById("chatroom").innerHTML += html_string
}