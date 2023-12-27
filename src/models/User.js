const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
        name: {
            type:String,
            require:true
        },
        email: {
            type:String,
            require:true
        },
        password: {
            type:String,
            require:true
        },
        token:{
            type:String,
            default:null
        },
        confirmEmail:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

//Metodo para cifrar el password del usuario
userSchema.methods.encrypPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

//Metodo para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}

//Meodo para crear un token
userSchema.methods.crearToken = function(){
    //Utilizamos la funcion incoporada de MATH
    return token = this.token = Math.random().toString(36).slice(2)
}

module.exports = model('user', userSchema)
//Exporta el modulo y crea el nombre de la colision de la BD y a que esquema esta asociado