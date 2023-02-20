export default class ws {
    url = "wss://chatwesome.herokuapp.com/socket/websocket";
    uuid = null
    conn = null
    lobby = null
    lobby_token = null
    onMessageCB = undefined
    username = null


    constructor(uuid, username){
        this.url += "/?id="+uuid;
        this.uuid = uuid;
        this.username = username
    }

    startConnection(lobby, lobby_token){
        this.lobby = lobby;
        this.lobby_token = lobby_token;
        this.init()
    }

    setCallbacks(onMessage){
        this.onMessageCB = onMessage
    }

    init(){
        this.conn = new WebSocket(this.url);

        this.conn.addEventListener('open', () => {
            this.onMessageCB({event:"open"})

            this.conn.send(JSON.stringify({
                "topic": "room:"+this.lobby,
                "event": "phx_join",
                "payload": {
                    "token":this.lobby_token,
                    "name":"TODO"
                },
                "ref": 0
            }))

            
        });

        this.conn.addEventListener("message", (e) => { 
            this.onMessageCB(e.data)
        });

        this.conn.addEventListener("ping", (e) => {            
            this.onMessageCB({event:"ping"})
        });

        this.conn.addEventListener("pong", (e) => {            
            this.onMessageCB({event:"ping"})
        });
    }

    send(msg){
        if(!this.conn){
            console.error("Socket is not connected")
            return
        }
        this.conn.send(JSON.stringify({
            "topic": "room:"+this.lobby,
            "event": "message",
            "payload": {
                "message":msg,
                "user":this.username,
            },
            "ref": 0
        }))

    }
}