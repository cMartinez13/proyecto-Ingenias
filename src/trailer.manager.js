const fs = require('fs');

function leerPeliculas(){
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8' )
    const PELICULAS = JSON.parse(datos)
    return PELICULAS
}


module.exports = {leerPeliculas}