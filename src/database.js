const mongoose = require('mongoose')

//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'

// Cadena de conexion a la bdd
const MONGODB_URI = 'mongodb://localhost:27017/portfolio'

// crea un metodo para hacer la cadena de conexion
connection = async()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

//eXPORTAR EL METODO CONNECT 
module.exports = connection