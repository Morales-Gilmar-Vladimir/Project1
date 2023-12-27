//Ariba del todo
const Social = require('../models/Social')
const { uploadImage, deleteImage } = require('../config/cloudinary')
const fs = require('fs-extra')

const renderSocialForm = (req, res) => {
    res.render('socialnetworks/newFormSocialN')
}

const renderAllSocial = async (req, res) => {
    //A partir del modelo usar el metodo find
    const socialn = await Social.find({ user: req.user._id }).lean()
    res.render('socialnetworks/allSocial', { socialn })
}

const renderEditSocialForm =async(req,res)=>{
    //Apartir del modelo llamar al metodo findById
    const social = await Social.findById(req.params.id).lean()
    //Con la variable portafolio pintar en la vista del formulario
    res.render('socialnetworks/editSocial',{social})
}

const createNewProfileSocial = async (req, res) => {
    //Desestructurar
    const { name, description, facebook, linkedin, github, instagram, tiktok, twiter } = req.body
    //Crear una nueva instancia
    const newSocial = new Social({ name, description, facebook, linkedin, github, instagram, tiktok, twiter })
    //
    newSocial.user = req.user._id

    //Verifica si el formulario tiene una imagen para subirla 
    //y si no tiene manda un mensaje de advertencia
    if (!(req.files?.image)) return res.send("Se requiere una imagen")
    //La invocacion de  
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newSocial.image = {
        public_id: imageUpload.public_id,
        secure_url: imageUpload.secure_url
    }
    //Eliminar el archivo temp del directorio uploads
    await fs.unlink(req.files.image.tempFilePath)
    //Ejecutar el metodo save
    await newSocial.save()
    res.redirect('/social')
}

const updateSocial = async (req, res) => {
    //Cargar la informacion del portafolio

    //Verificar el id del portafolio sea el mismo
    const social = await Social.findById(req.params.id).lean()
    //Si es TRUE continuar con la edicion y si es FALSE enviar a la ruta de portafolios

    if (req.files?.image) {
        //Vamos a realizar la atualizacion de la imagen

        //Primero validamos que venga una imagen en el formulario
        if (!(req.files?.image)) return res.send("Se requiere una imagen")
        //Eliminar la imagen en cloudinary
        await deleteImage(social.image.public_id)
        //Cargar la nueva imagen
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //Costruir la data para actualizar en la BD
        const data = {
            name: req.body.name || social.name,//Se mantenga todos lo que esta en los inputs
            description: req.body.description || social.description,
            facebook: req.body.facebook || social.facebook,
            linkedin: req.body.linkedin || social.linkedin,
            github: req.body.github || social.github,
            instagram: req.body.instagram || social.instagram,
            tiktok: req.body.tiktok || social.tiktok,
            twiter: req.body.twiter || social.twiter,
            image: {
                public_id: imageUpload.public_id,
                secure_url: imageUpload.secure_url
            }
        }
        //Eliminar la imagen temporal
        await fs.unlink(req.files.image.tempFilePath)
        //Actualizar en BD findByIdAndUpdate
        await Social.findByIdAndUpdate(req.params.id, data)
    }
    else {
        //Vamos a hacer la actualizacion de los campos sin imagen
        const { name, description, facebook, linkedin, github, instagram, tiktok, twiter } = req.body
        await Social.findByIdAndUpdate(req.params.id, { name, description, facebook, linkedin, github, instagram, tiktok, twiter })
    }
    res.redirect('/social')
}

const deleteSocial = async (req, res) => {
    //Apartir del modelo usar el metodo findByIdAndDelete
    const social = await Social.findByIdAndDelete(req.params.id)
    //Invocar al metodo y pasar el ID
    await deleteImage(social.image.public_id)
    //Hacer el redirect
    res.redirect('/social')
}

//Exportacion nombrada
module.exports = {
    renderSocialForm,
    renderAllSocial,
    createNewProfileSocial,
    deleteSocial,
    renderEditSocialForm,
    updateSocial
}