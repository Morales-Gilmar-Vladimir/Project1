//IMPORTAR MODELO
const Portfolio = require('../models/Portfolio')
//IMPORTAR EL METODO 
const { uploadImage,deleteImage } = require('../config/cloudinary')

//IMPORTAR FS-EXTRA
const fs = require('fs-extra')

// METODO PARA LISTAR LOS PORTAFOLIOS
// const renderAllPortafolios = (req,res)=>{
//     res.send('Listar todos los portafolios')
// }
const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    
    newPortfolio.user = req.user._id
    // VALIDAR SI EXISTE IMAGEN
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
   
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
   // UTILIZAR MEOTOD 
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
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

// METODOO PARA ELIMINAR
// const deletePortafolio = (req,res)=>{
//     res.send('Eliminar un nuevo portafolio')
// }
const deletePortafolio = async(req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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

