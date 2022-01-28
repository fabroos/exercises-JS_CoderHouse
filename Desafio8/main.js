//  jshint  esversion: 11 

// saque el login pq voy a ocupar firebase mas adelante


// TODO -> cambiarlo a una funcion nativa para la implementacion de un limite de ampliaje
import Autosize from 'https://cdn.skypack.dev/autosize';

const user = {
    uid: crypto.randomUUID(),
    name: 'anon',
    profilePic: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Anonim.png',
};

const messages = JSON.parse(localStorage.getItem('messages')) || [];

class Message{
    constructor(message, name, profilePic, timestamp, profileUid){
        this.message = message;
        this.name = name;
        this.profilePic = profilePic;
        this.timestamp = timestamp;
        this.profileUid = profileUid;
    }
} 


const formMessage = document.getElementById("sendMessage");
const messageToSend = document.getElementById("messageToSend");

Autosize(document.querySelector('textarea'));

addEventListener("load", ()=> {
    updateMessageList();
});


let isFocused = false;


messageToSend.addEventListener("focusin", () => {
   isFocused = true;
});

messageToSend.addEventListener("focusout", () => {
    isFocused = false;
 });

addEventListener("keydown", (e)=>{
    if(e.key == "Enter" && messageToSend.value.length > 0 && isFocused)  manageMessage();
});
console.log(messages);
function manageMessage(){
    const message = messageToSend.value;

    messages.push(new Message(message, user.name, user.profilePic, new Date(), user.uid));
    updateMessageList();
    formMessage.reset();
    localStorage.setItem('messages', JSON.stringify(messages));
}

function addZeros(time){
    return time > 10 ? time : "0" + time;
}

function updateMessageList(){
    const fragment = document.createDocumentFragment();
    for(let msg of messages){
        const {profilePic, profileUid, name, message} = msg;
        const div = document.createElement("div");
        const timestamp = new Date(msg.timestamp);
        div.classList.value = profileUid !== user.uid ? "flex w-full mt-2 space-x-3 max-w-xs"
                                                      : "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end";
        const msgHTML = profileUid !== user.uid ? `<img class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" src="${profilePic}">
                                                    <div>
                                                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg break-all">
                                                            <p class="text-sm">${message}</p>
                                                        </div>
                                                        <span class="text-xs text-gray-500 leading-none" >${timestamp.getDate()} ${new Intl.DateTimeFormat('es-ES', {month: "short"}).format(timestamp.getMonth())} ${timestamp.getHours()}:${addZeros(timestamp.getMinutes())}</span>
                                                    </div>`
                                                : `<div>
                                                        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg break-all">
                                                            <p class="text-sm">${(message)}</p>
                                                        </div>
                                                        <span class="text-xs text-gray-500 leading-none">${timestamp.getDate()} ${new Intl.DateTimeFormat('es-ES', {month: "short"}).format(timestamp.getMonth())} ${timestamp.getHours()}:${addZeros(timestamp.getMinutes())}</span>
                                                    </div>
                                                    <img class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" src="${profilePic}">`;
        div.innerHTML = msgHTML;
        fragment.appendChild(div);
    }
    const msgList = document.getElementById("messageList");
    msgList.innerHTML = "";
    msgList.appendChild(fragment);
    
}

formMessage.addEventListener("submit", function(e) {
    e.preventDefault();
});




