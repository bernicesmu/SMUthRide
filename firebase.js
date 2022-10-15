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

  console.log(values)
  for(var entry of values){
    let username_array = []
    let chat_id = entry[0]
    let ids = chat_id.split("_")
    for(var id of ids){
      if(id == "007"){
        
      }
      else{
        //get the username...
        let usernames = ref(db, 'users')
        onValue(usernames, (snapshot)=>{
          const user_data = snapshot.val()
          console.log(user_data)

            //need the userids properly....

        })
      }
    }
  }
  // if there is no values then create a new chat_room
});

}