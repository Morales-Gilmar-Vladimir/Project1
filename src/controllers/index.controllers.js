
// Importar el mpdelo
const Portfolio = require('../models/Portfolio')


// Método para listar todos los portafolios
const renderIndex = async(req,res)=>{
    // Consultar todos los portafolios, transformar a JSON y almacenarlos en la variable portfolios
    const portfolios = await Portfolio.find().lean()

    // Invocar a la vista index y pasar la variable portfolios
    res.render('index',{portfolios})
}





// Exportación de la función 
module.exports = {
    renderIndex
}