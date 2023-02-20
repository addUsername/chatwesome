import { v4 as uuidv4 } from 'uuid';
import ws from "./ws";
import {onMessageCB, setUsername, diasableChat, toastError, toastInfo} from "./view";
var random_name = require('node-random-name');

const USERNAME = random_name()
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
            const url = window.location.origin+"/dist/index.html?lobby="+json.lobby+"&lobby_token="+json.token
            toastInfo(url)

        }).catch(function(err) {
            toastError("BE is unreachable :(")
        })
    }

    if(chatAvailable()){
        setUsername(USERNAME)
        const conn = new ws(UUID, USERNAME);
        conn.setCallbacks(onMessageCB)
        conn.startConnection(PARAMS.lobby, PARAMS.lobby_token)
        document.getElementById("submit").onclick = function() {
            const msg =  document.getElementById("msg")
            if(msg){
                conn.send(""+msg.value);
                msg.value = ""
            }
        }
    }else {
        diasableChat()
    }
    
}

function chatAvailable(){
    return PARAMS.lobby_token && PARAMS.lobby
}

function getUuid(){
    const old_uuid = sessionStorage.getItem("uuid")
    if(sessionStorage.getItem("uuid")){
        return old_uuid
    }
    const new_uuid = uuidv4();
    sessionStorage.setItem("uuid", new_uuid)
    return new_uuid
}

init()
