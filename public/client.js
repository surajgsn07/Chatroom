const socket = io();


let textarea = document.querySelector('#textarea')
let name;
let messagearea = document.querySelector(".message_area");
do{
    name = prompt("Enter your name ...");
}while(!name);

textarea.addEventListener('keyup' ,(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }
    //append message
    appendMessage(msg , 'outgoing')
    textarea.value = "";


    //send to server
    socket.emit('message' , msg);
}

function appendMessage(msg , type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className)

    let markup;
    if(type === "outgoing"){
        markup = `
                <div style="width: 40%;
                border-radius: 20px 20px 0px 20px;
                border: 1px solid black;
                padding: 5px; line-height: 0;">
                    <h4>${msg.user}</h4>
                    <hr>
                    <p>${msg.message}</p>
                </div>
        `
    }else{
        markup = `
        <div style="width: 40%;
                border-radius: 20px 20px 20px 0px;
                border: 1px solid black;
                padding: 5px; line-height: 0;">
                <h4>${msg.user}</h4>
                <hr>
                <p>${msg.message}</p>
                </div>
        `
    }


    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}


//recieve message

socket.on('message' , (msg)=>{
    console.log(msg);
    appendMessage(msg , 'incoming')
})