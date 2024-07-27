const express = require('express');
const OpenAi = require('openai')
const cors = require('cors');
require('dotenv').config()
const port = 5555;

const app = express()
app.use(cors());

app.use(express.json())

const apiKey = process.env.api_Key

const openai = new OpenAi({apiKey})


async function main(chatHistory){
    let response = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-4o-mini",
        temperature: 0
    })
    let object = response.choices[0].message
    console.log("mensaje de respuesta...")
    console.log(object)
    return object
}


// main(chat)


app.post("/api", async (req, res) => {
    console.log("Inicio del proceso...")
    let ques = req.body
    console.log(ques)
    console.log("Inicio de la AI...")
    let ans = await main(ques);
    
    console.log("Enviando respuesta...")
    console.log(ans)
    res.json(ans);
})

app.listen(port, 
    console.log(`http://localhost:${port}/api`)
)

