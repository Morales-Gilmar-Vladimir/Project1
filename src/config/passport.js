// Importar passport
const passport = require('passport')
// Importar el modelo 
const User = require('../models/User')


// Establecer la estrategia 
const LocalStrategy = require('passport-local').Strategy


// Configuración de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{

    // Consulta a la BDD para obtener el usuario en base al email
    const userBDD = await User.findOne({email})
    // Verificar si existe el usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // Verificar la contraseña del form vs bdd
    const passwordUser = await userBDD.matchPassword(password)
    // verificar si coinciden
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // Validar si el usuario puede iniciar sesión si y solo si ha confirmado su cuenta de correo electrónico
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)

    // Mandar el usuario
    return done(null,userBDD)
}))





// Realizar el proceso de serializar el usuario 
passport.serializeUser((user,done)=>{
    done(null,user.id)
})


// Realizar el proceso de deserealizar el usuario
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});