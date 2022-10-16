import {create_chat} from '../../index.js'

import {find_chat} from '../../index.js'

// Initialize Firebase






document.getElementById('usertest').addEventListener('submit', create_chatroom) 
console.log("weoufhwef")


document.getElementById('g').addEventListener('click', find_chats) 


function create_chatroom() { 
    var inputs = document.getElementsByTagName('input')
    var uid1 = inputs.user1.value
    var uid2 = inputs.user2.value
    console.log(uid1)
    create_chat(uid1, uid2)
}


function find_chats(){
    
    
    console.log(find_chat())
}

