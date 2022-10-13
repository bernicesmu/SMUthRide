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

export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
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
  // var final = 'dves'
  // onValue(rides, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data)
  //   var rid = 0
  //   for (var i of Object.keys(data)) { 
  //     rid = i 
  //   }
  //   console.log(rid)
  //   final = rid
  //   return rid
  // });
  // console.log("outside", final)
  rides.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    console.log(messages)
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