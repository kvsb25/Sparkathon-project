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
    setBtnState: function(disabled){
        if(sendBtn){
            sendBtn.disable = disabled;
        }
    }``
}

/************ Event Handlers ************/

sendBtn.addEventListener('click', (event) => {
    utils.addUserInputMsg();
})

textArea.addEventListener("keypress", (event)=>{
    if(event.code == "Enter" || event.keyCode == 13){
        event.preventDefault();
        utils.addUserInputMsg();
        textArea.value = null;
    }
});
