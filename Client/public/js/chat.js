// const eventSource = new EventSource("https://localhost:8080");
let answering = false;
const select = document.querySelector.bind(document);
const chat = select(".chat");
const textArea = select(".textareaMessage");
const sendBtn = select("#sendBtn");

const consts = {
    role: {
        user: 'user',
        bot: 'bot',
    }
}

const components = {
    msg: (role, msg) => {
        return `<div class="message ${role}-message">
                    <div>${msg}</div>
                </div>`
    },
}

const utils = {
    stringToElement: function (html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    },
    addMsg: function (role, msg) {
        chat.appendChild(this.stringToElement(components.msg(role, msg)));
    },
    addUserInputMsg: function () {
        utils.addMsg(consts.role.user, textArea.value);
    },
    addBotMsg: function(){
        
    },
    setBtnState: function (disabled) {
        if (sendBtn) {
            sendBtn.disable = disabled;
        }
    },
}

/************ Event Handlers ************/

/***** DOM Handlers *****/
sendBtn.addEventListener('click', (event) => {
    if (answering) {
        return;
    }
    utils.addUserInputMsg();
    utils.setBtnState(true);  // enable the button after receiving the full response of bot from the server
});

textArea.addEventListener("keypress", (event) => {
    if (event.code == "Enter" || event.keyCode == 13) {
        if (answering) {
            return;
        }
        event.preventDefault();
        utils.addUserInputMsg();
        textArea.value = null;
    }
});

/***** EventSource Handlers *****/

// eventSource.onopen = function(event){
//     console.log('Successfully connected to the server');
// }

// eventSource.onmessage = function(event){
//     const data = JSON.parse(event.data);
//     console.log(data);
// }

// eventSource.onerror = function() {
//     eventSource.close();
// }