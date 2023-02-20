import { v4 as uuidv4 } from 'uuid';
import ws from "./ws"
var view = require("./view")
var random_name = require('node-random-name');

const USERNAME = getName()
const UUID = getUuid();
const PARAMS = {
    lobby_token: new URLSearchParams(window.location.search).get("lobby_token"),
    lobby: new URLSearchParams(window.location.search).get("lobby")
}

function init(){

    document.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            document.getElementById("submit").click()
            e.preventDefault()
        }
    })

    document.getElementById("submit-room").onclick = function() {
        
        const createLobbyUrl ="https://chatwesome.herokuapp.com/api/new-lobby?id="+UUID
        fetch(createLobbyUrl).then(res =>
            res.json()
        ).then( json => {
            const url = window.location.href+"?lobby="+json.lobby+"&lobby_token="+json.token
            view.toastInfo(url)

        }).catch(function(err) {
            view.toastError("BE is unreachable :(")
        })
    }

    if(chatAvailable()){
        view.setUsername(USERNAME)
        const conn = new ws(UUID, USERNAME);
        conn.setCallbacks(view.onMessageCB)
        conn.startConnection(PARAMS.lobby, PARAMS.lobby_token)
        document.getElementById("submit").onclick = function() {
            const msg =  document.getElementById("msg")
            if(msg){
                conn.send(""+msg.value);
                msg.value = ""
            }
        }
    }else {
        view.diasableChat()
    }
    
}

function chatAvailable(){
    return PARAMS.lobby_token && PARAMS.lobby
}

function getUuid(){
    const old_uuid = sessionStorage.getItem("uuid")
    if(old_uuid){
        return old_uuid
    }
    const new_uuid = uuidv4();
    sessionStorage.setItem("uuid", new_uuid)
    return new_uuid
}

function getName(){

    const old_name = sessionStorage.getItem("name")
    if(old_name){
        return old_name
    }
    const new_name = random_name();
    sessionStorage.setItem("name", new_name)
    return new_name
}

init()
