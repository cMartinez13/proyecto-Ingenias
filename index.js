const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { leerPeliculas, filtrarTitulo, filtrarReparto } = require('./src/trailer.manager');
const app = express();
const path = require("path");
const PORT =process.env.PORT || 3008;
let DB = [];

//Exportamos el archivo trailer.manager.js
const datos = require('./src/trailer.manager');
const { title } = require('process');



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

//RETORNA EL CATALOGO DE PELICULAS DE TRAILERFLIX
app.get('/catalogo', (req,res)=>{
   const catalogo = leerPeliculas()
   res.json(catalogo);
   })

// Retorna los elementos del catálogo que incluyen en su titulo el parámetro de la request
app.get('/titulo/:title', (req,res) => {
    const title = req.params.title.trim().toLowerCase();
    const catalogo = filtrarTitulo(title);
    (catalogo != []) ? res.json(catalogo).status(200)
    : res.status(404).send('No se encuentran elementos que coincidan.'); 
})

// Retorna los datos de la categoria elegida (series/peliculas)
app.get('/categoria/:cat', (req, res) => {
    const cat = req.params.cat.trim().toLowerCase();
    const nombre = leerPeliculas().filter(nombre => nombre.categoria.toLowerCase() == cat);
    if (nombre !== []) {
        res.json(nombre);
    } else {
        res.status(404).send('No se encuentra la categoria');
    }
});

// Retorna los datos del trailer de acuerdo al ID
app.get('/trailer/:id', (req, res)=>{
    const id = req.params.id;
    const trailer = leerPeliculas().filter(trailer => trailer.id == id);
    if (trailer !==[]){
        const trailer1 = trailer.map(x => {
            return {
                titulo: x.titulo,
                trailer: x.trailer
            }
        })
        res.json(trailer1);
    }else{
        res.status(404).send('Esta pelicula/serie no tiene un trailer asociado')
    }
})

//Retorna título y datos de reparto de los items de los cuales forme parte el actor/actriz que se ingresa por parámetro
app.get('/reparto/:act', (req, res)=>{
    const act = req.params.act.trim().toLowerCase()
    const resultado = filtrarReparto(act);
    (resultado != []) ? res.json(resultado).status(200)
    : res.status(404).json('No se encontró el actor o actriz en el catálogo')
})


// Control de rutas inexistentes
app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

app.listen(PORT, ()=>{console.log(`Node.js web server at port ${PORT} in running...`)} );

