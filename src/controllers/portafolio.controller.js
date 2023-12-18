//IMPORTAR MODELO
const Portfolio = require('../models/Portfolio')

// METODO PARA LISTAR LOS PORTAFOLIOS
// const renderAllPortafolios = (req,res)=>{
//     res.send('Listar todos los portafolios')
// }
const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}



// METODO PARA LISTAR EL DETALLE DE UN PORTAFOLIO
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

// METODO PARA MOSTAR EL FORMULARIO
// const renderPortafolioForm = (req,res)=>{
//     res.send('Formulario para crear un portafolio')
// }

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

// METODOPARA GUARDAR EN LA BDD
// const createNewPortafolio = (req,res)=>{
//     res.send('Crear un nuevo portafolio')
// }
// const createNewPortafolio =(req,res)=>{
//     console.log(req.body);
//     res.send("Portafolio almacenado en la BDD")
// }
// const createNewPortafolio =async (req,res)=>{
//     const {title, category,description} = req.body
//     const newPortfolio = new Portfolio({title,category,description})
//     await newPortfolio.save()
//     res.json({newPortfolio})
// }

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.redirect('/portafolios')
}


// METODO PARA ACTUALIZAR EL FORMILARIO
const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

// METODOO PARA ACTUALIZAR EN LA BDD LO CAPTURADO EN EL FORM
const updatePortafolio = async(req,res)=>{
    const {title,category,description}= req.body
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

// METODOO PARA ELIMINAR
// const deletePortafolio = (req,res)=>{
//     res.send('Eliminar un nuevo portafolio')
// }
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}


// EXPORTACION COMMONJS NOMBRADA
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}

