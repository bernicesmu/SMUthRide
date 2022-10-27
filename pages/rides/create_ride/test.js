import {write_ride, find_rid} from '../../../index.js'

document.getElementById('rides').addEventListener('click', write_ride_local)
function write_ride_local(){
    var user = "alice"

    // const database = getDatabase(); 
    // const chats = ref(database, `users/${username}`)
    // onValue(chats, (snapshot) => { 
      
    //   const data = snapshot.val();
    //   var userid
        
    // })
    var rideid = 7

    

    var smu_to_from = "To"
    
    var user_address = "abc123"
    // console.log(address)
    var smu_location = "LKCSB"
    var cost = 56
    var max_capacity = 4
    var frequency = 2
    var date = "11/12/22"
    var time = "11"
    var users_offered = []
    var area = "Changi Prison"
    write_ride(smu_location,smu_to_from,user,rideid,user_address,cost,max_capacity,date,time,users_offered,area)

}

