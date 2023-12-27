
// Importar el modelo 
const Portfolio = require('../models/Portfolio')
// Importar el método 
const { uploadImage, deleteImage } = require('../config/cloudinary')
// Importar fs
const fs = require('fs-extra')



// MÉTODO PARA LISTAR LOS PORTAFOLIOS
const renderAllPortafolios = async(req,res)=>{
    // Almacenar todos los portafolios del usuario que inicia sesión en la variable y luego convertir en json
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    // Invoocar a la vista y mandar la variable 
    res.render("portafolio/allPortfolios",{portfolios})
}




// MÉTODO PARA LISTAR EL DETALLE DE UN PORTAFOLIO
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}






// MÉTODO PARA MOSTRAR EL FORMULARIO 
const renderPortafolioForm = (req,res)=>{
    // INVOCACIÓN DE LA VISTA
    res.render('portafolio/newFormPortafolio')
}

// MÉTODO PARA GUARDAR EN LA BDD LO CAPTURADO EN EL FORM 
const createNewPortafolio = async (req,res)=>{
    // Crear una nueva instancia del Portafolio
    const newPortfolio = new Portfolio(req.body)
    // Asociar el usuario que inicia sesión al portafolio
    newPortfolio.user = req.user._id
    // Validar la imágen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // Invocar el método para que se almacene en cloudinary
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    // Eliminar los archivos temporales
    await fs.unlink(req.files.image.tempFilePath)
    
    // Almacenar en la BDD
    await newPortfolio.save()
    res.redirect('/portafolios')
}









// MÉTODO PARA MOSTRAR EL FORMULARIO PARA ACTUALIZAR  
const renderEditPortafolioForm = async(req,res)=>{
    // Cargar la información del portafolio y convertir en un json
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // Invocar la vista y pasar la variable
    res.render('portafolio/editPortfolio',{portfolio})
}



// MÉTODO PARA ACTUALIZAR EN LA BDD LO CAPTURADO EN EL FORM 
const updatePortafolio = async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    // Verificar si el usuario quiere actualizar la imagen o solo los campos extras
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








// MÉTODO PARA ELIMINAR EN LA BDD 
const deletePortafolio = async(req,res)=>{

    // Utilizar el método findByIdAndDelete
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
    res.redirect('/portafolios')
}










// EXPORTAR LAS FUNCIONES
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}