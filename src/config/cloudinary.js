// Importar cloudinary
const cloudinary = require('cloudinary').v2


// Realizar las confiiguraciones
cloudinary.config({ 
    // Estableciendo las variables de entorno
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});


// Función para guardar las imágenes en Cloudinary
module.exports.uploadImage = async(filePath) => {
    // Guardar en cloudinary en la carpeta portafolio
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

// Método para eliminar las imágenes de Cloudinary
module.exports.deleteImage = async (publicId)=>{
    // Elimanr en cloudinary la imagen de la carpeta portafolio
    return await cloudinary.uploader.destroy(publicId)
}