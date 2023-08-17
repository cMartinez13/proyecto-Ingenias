const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { leerPeliculas, obtenerReparto } = require('./src/trailer.manager');
const app = express();
const path = require("path");
const PORT =process.env.PORT || 3008;
let DB = [];

//Exportamos el archivo trailer.manager.js
const datos = require('./src/trailer.manager');



//MIDDLEWARE
dotenv.config();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    DB = leerPeliculas();
    next();
})

// Inicializamos el motor de plantillas elegido

app.set('view engine', 'ejs');
app.use(express.static('views'));
// SERVIDOR WEB 

app.get('/', (req,res)=>{
   const data = {
    title: 'Bienvenido a Trailerflix',
    message: 'Listado de peliculas y series disponibles',
    products: leerPeliculas()
   }   
   res.render('trailerflix', data)
})

app.get('/reparto:act', (req, res)=>{
    console.log("VALOR RECIBIDO:", req.params.reparto)
    console.log(typeof req.params.reparto);
    const actores = obtenerReparto();
    res.send(actores);
   
})
/*
app.get('/:id',(req,res)=>{
    console.log("VALOR RECIBIDO:", req.params.id)
    console.log(typeof req.params.id)
    const id = parseInt(req.params.id)
    const fruta = obtenerFrutaFind(id)
    res.send(fruta);
})
*/
app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

app.listen(PORT, ()=>{console.log(`Node.js web server at port ${PORT} in running...`)} );

