const fs = require('fs');

function leerPeliculas(){
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8' )
    const PELICULAS = JSON.parse(datos)
    return PELICULAS
}

function obtenerReparto(){
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8' )
    const actoresReparto = JSON.parse(datos)
    const nombresActores = actoresReparto.map(actoresReparto => {
        return {
            titulo: actoresReparto.titulo,
            reparto: actoresReparto.reparto
        }
    })
    
console.table(nombresActores)

}

module.exports = {leerPeliculas, obtenerReparto}

