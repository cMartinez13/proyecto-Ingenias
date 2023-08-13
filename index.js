const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { leerPeliculas } = require('./src/trailer.manager');
const app = express();
const PORT =process.env.PORT || 3008;
let DB = [];
//MIDDLEWARE
dotenv.config();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    DB = leerPeliculas();
    next();
})

// SERVIDOR WEB 

app.get('/', (req,res)=>{
    res.send(DB)
})

app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

app.listen(PORT, ()=>{console.log(`Node.js web server at port ${PORT} in running...`)} );