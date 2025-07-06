const select = document.querySelector.bind(document);
const chat = select(".chat");

const consts = {
    role:{
        user: 'user',
        bot: 'bot',
    }
}

const components = {
    msg: (role, msg)=>{
        return `<div class="message ${role}-message">
                    <div>${msg}</div>
                </div>`
    },
}

const utils = {
    addMsg: (role, msg)=>{},
}