const socket = io.connect()

function verMensajesUser(event){
    const username = document.getElementById('username').value;
    socket.emit('ver-mensajes-user', {
        username:username
    })
    return false
}


function enviarMensaje(event){
    const fecha = new Date().toLocaleDateString()+ new Date().toTimeString();
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('chat_mensaje').value;
    if(email){
        socket.emit('new_msg', {
            email:email,   
            mensaje:mensaje,
            fecha:fecha
        })
        document.getElementById('chat_mensaje').value = '';
        return false
    }else{
        alert("Debe ingresar su email")
    }
}

function renderChatGeneral(data){
    const html = data.map( msg =>
        `
        <li style="display: flex; flex-direction:row; ">
            <div id="autor" style="font-weight: bold; color:blue;" >
                ${msg.email} <span style="color: brown; font-weight:normal; margin-left:5px;">  ${msg.fecha}  :</span> 
            </div>
            <div id="msj"  style="color: green; font-style: italic; margin-left:15px;">
               ${msg.mensaje}
            </div>
            
        </li>
      `).join(" ");
      document.getElementById('chat-general').innerHTML = html;
      /*
<form method="post" action="/chat">
                    
                        <input name="emailresponder" id="emailresponder" value="${msg.email}" type="hidden">
                        <input name="mensajeid" id="mensajeid" value="${msg._id}" type="hidden">
                        <input id="mensajerespuesta" type="text" class="form-control" placeholder="Respuesta" />
                        <button type="submit" id="btn-responder"
                            style="color:white; background-color:rgb(63, 8, 63); margin:20px; border-radius:3px; border-width:0px; padding:8px;">
                            Responder
                        </button>
                        </form>*/
    
}

function renderUserMsgs(data){
    const html = data.map( msg =>
        `
        <li style="display: flex; flex-direction:row; ">
            <div id="autor" style="font-weight: bold; color:blue;" >
                <span style="color: brown; font-weight:normal; margin-left:5px;">  ${msg.fecha}  :</span> 
            </div>
            <div id="msj"  style="color: green; font-style: italic; margin-left:15px;">
               ${msg.mensaje}
            </div>

        </li>
      `).join(" ");
      document.getElementById('chat-user').innerHTML = html;
    
}

socket.on('mensajesgeneral', data =>{
    renderChatGeneral(data)
})

socket.on('mensajesUser', data =>{
    renderUserMsgs(data)
})












