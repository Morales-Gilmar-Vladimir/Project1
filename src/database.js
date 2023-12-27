const mongoose = require('mongoose')
const {DBUSER,DBPASSWORD,DBNAME} = process.env

// Se debe cambiar el link segun la base de datos de cada uno :v
const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.awsthof.mongodb.net/${DBNAME}`

connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection