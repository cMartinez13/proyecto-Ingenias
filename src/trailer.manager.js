const fs = require('fs');

// Lee la información almacenada en la DB
function leerPeliculas(){
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8' )
    const PELICULAS = JSON.parse(datos)
    return PELICULAS
}

// Filtra el catálogo de acuerdo a los items que incluyen el parámetro en sus títulos
function filtrarTitulo(title) {
    const catalogo = leerPeliculas()
    const filtrado = catalogo.filter(item => item.titulo.toLowerCase().includes(title));
    return filtrado; 
}

// Filtra el catálogo de acuerdo a los items que incluyen en su reparto el valor enviado
// por parámetro y después genera un nuevo array con los elementos coincidentes transformados
function filtrarReparto(act) {
    const catalogo = leerPeliculas();
    const filtrado = catalogo.filter(item => item.reparto.toLowerCase().includes(act));
    let resultado;
    (filtrado != []) ? resultado = filtrado.map((item) => {
        return {titulo: item.titulo, reparto: item.reparto};
    })
    : resultado = []; 
    return resultado; 
}


module.exports = {leerPeliculas, filtrarReparto, filtrarTitulo}

