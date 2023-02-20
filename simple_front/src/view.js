let username = ""

export function setUsername(u){
    username = u
}

export function diasableChat(){

    document.getElementById("submit").disabled = true
    document.getElementById("msg").disabled = true 
    document.getElementById("msg").value = "Please create a new lobby and sahre it to start chatting!!"
    document.getElementById("emoji").disabled = true
}

export function onMessageCB(message) {
    if (typeof message === 'string') {
        message = JSON.parse(message)
    }
    if(message && message.event){ 
        switch(message.event){

            case "phx_reply":
                statusInfo("Joined as "+username)
                break;
            case "open":
                statusInfo("Connected")
                break;
            case "shout":
                drawMessage(message.payload)
                break;
            case "ping":
            case "pong":
                toastPing()
            default:
                break;
        }
    }

}
export function toastError(msg){
    const html = 
   ' <div class="alert alert-danger" role="alert">'+msg+'</div>'
    document.getElementById("alert").innerHTML = html
}

export function toastInfo(msg){
    const html = 
   ' <div class="alert alert-primary" role="alert"><input id=copy-value class="form-control" value="'+msg+'"></input><button id=copy class="btn" type="button">Copy <i class="far"><img width="22" height="22" src="assets/copy.svg"/></i></button></div>'
        document.getElementById("alert").innerHTML = html
        document.getElementById("copy").onclick = function(){
        navigator.clipboard.writeText(document.getElementById("copy-value").value);
    }
}


function statusInfo(msg){
    document.getElementById("status").innerText=msg
}

function drawMessage(payload){
    let div = document.getElementById("chat-content");
    let row = document.createElement("div");
    row.classList.add("row")
    row.classList.add(payload.user === username?"justify-content-end":"justify-content-start");
    let msg = document.createElement("div");
    msg.classList.add("msg");
    msg.innerHTML += "<p class='body'> " + payload.message + " </p>";
    msg.innerHTML += "<div class='footer'> " + payload.user + " </div>";
    row.appendChild(msg);
    div.appendChild(row)
}


function toastPing(){
    //document.getElementById("status").innerText=msg
}

let emojiBtn = document.getElementById("emoji");
let activated = false

const emojiList = [
    "👍",
    "👌",
    "👏",
    "🙏",
    "🆗",
    "🙂",
    "😀",
    "😃",
    "😉",
    "😊",
    "😋",
    "😌",
    "😏",
    "😐",
    "😑",
    "😒",
    "😓",
    "😂",
    "🤣",
    "😅",
    "😆",
    "😜",
    "😹",
    "🚶",
    "👫",
    "👬",
    "👭",
    "😙",
    "😘",
    "🏠",
    "👆",
    "🖕",
    "👋",
    "👎",
    "👈",
    "👉"
  ];
emojiList.forEach(element => {
    let list = document.getElementById("emoji-list");
    let node = document.createElement("span");
    node.classList.add("emoji");
    node.textContent = element;
    node.onclick = ev => {
      document.getElementById("msg").value += node.textContent;
    };
    list.appendChild(node);
  });

  emojiBtn.onclick = function(evt) {
    activated = !activated;
  
    let list = document.getElementById("emoji-list");
    if (activated) {
      list.style.display = "flex";
    } else {
      list.style.display = "none";
    }
  };
  