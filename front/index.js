let chats = document.querySelector('#chats');
let input = document.querySelector('input');
let btn = document.querySelector('button');
let chatHistory = [{role: "system", content: "Actua como un experto en finanzas, hacéle todas las preguntas necesarias al usuario para asesoralo de la mejor forma posible. Entendé bien al usuario y respondele con amabilidad. Si vas a hacer preguntas, hacelas de una y esperá la respuesta del usuario para pasar a la siguiente. Tenés que ser tajante con tu respuesta una vez que la sabés, porque tenés que ayudar a tomar decisiones, no a tener dudas. Siempre que tengas preguntas, tenés que hacerlas de a una. Para que el usuario pueda responder, y cuando te responde, le respondes en base a su respuesta o continúas con las preguntas, según convenga. Por otro lado, tenés que conocer mucho al usuario para pdoer darle la mejor respuesta posible. Hacé todas las preguntas posibles. Tenés que seguir el contexto de la conversación siempre."}]

document.addEventListener('DOMContentLoaded', function(){
    input.focus()
})

let askQuestion = async (pregunta) => {
    let res = await fetch(`http://localhost:5555/api`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pregunta)
    })

    let data = await res.json()
    return data.content
}

let addToHistory = (role, content) => {
    chatHistory.push({
        "role": role,
        "content": content
    })
}

btn.addEventListener('click', async function(){
    let pregunta = input.value;
    input.value = "";
    chats.scrollTop = chats.scrollHeight ;
    addToHistory("user", pregunta)
    let respuesta = await askQuestion(chatHistory)
    
    addToHistory("system", respuesta)
    append(chatHistory)
    chats.scrollTop = chats.scrollHeight ;
    input.focus()
})

let append = (mensajes) => {
    chats.innerHTML = ""
    let cant = mensajes.length

    for(let i = 1; i < cant; i++){
        let role = mensajes[i].role
        if(role == "user"){
            chats.innerHTML += 
        `<div class="row rounded shadow-sm m-2 chat user">
            <p class="role pt-2 ps-3 pe-3">YO</p>
            <p class="ps-3 pe-3">${mensajes[i].content}</p>
        </div>
        `
        } else {
            chats.innerHTML += 
            `<div class="row rounded shadow-sm m-2 chat">
                <p class="role pt-2 ps-3 pe-3">Asesor</p>
                <p class="ps-3 pe-3">${mensajes[i].content}</p>
            </div>
            `
        }
        
    }
    // mensajes.forEach((chat) => {
    //     chats.innerHTML += 
    //         `<div class="row border rounded shadow-sm m-2">
    //             <p class="role pt-2 ps-3 pe-3">${chat.role.toUpperCase()}</p>
    //             <p class="ps-3 pe-3">${chat.content}</p>
    //         </div>
    //         `
    // })
}


document.addEventListener('keydown', function(e){
    console.log(e)
    if(e.key == "Enter"){
        btn.click()
    }
})