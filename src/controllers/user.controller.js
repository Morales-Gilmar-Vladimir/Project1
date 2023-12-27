
// Importación del modelo 
const User = require('../models/User')

// Importación de passport
const passport = require("passport")

// Importar el método sendMailToUser
const { sendMailToUser } = require("../config/nodemailer")





// Método es para mostrar el fomrulario de regsitro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

// Método es para capturar la información del formulario y almacenar en bdd
const registerNewUser = async(req,res)=>{
    // Obtener los datos del req.body
    const{name,email,password,confirmpassword} = req.body
    // Validar si todos los campos están llenos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // Validar las contraseñas
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    // Consulta a la BDD para ontener un usuario en base al email
    const userBDD = await User.findOne({email})
    // Verificar si el usuario ya se encuentra registrado
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    // Crear una nueva instancia para registrar un nuevo usuario
    const newUser = await new User({name,email,password,confirmpassword})
    // Encriptrar el password
    newUser.password = await newUser.encrypPassword(password)
    // Establecer el token
    const token = newUser.crearToken()
    // Enviar el correo electrónico
    sendMailToUser(email,token)
    // Guardar en BDD
    newUser.save()
    // Redireccionar a la vista login
    res.redirect('/user/login')
}


// Método para confirmar el email
const confirmEmail = async(req,res)=>{
    // Validar si existe el token 
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    // Obtener el usuario en base al token
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}






// Método es para mostrar el fomrulario de login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
// Método para realizar en inicio de sesión con los datos del form
const loginUser = passport.authenticate('local',{
    // Si todo sale mal - redireccionar al login
    failureRedirect:'/user/login',
    // Si todo sale bien - redirecccionar a la vista de portafolios
    successRedirect:'/portafolios'
})



// Método para realizar el cierre de sesión
const logoutUser =(req,res)=>{

    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
    
}


// Exportación de los métodos (controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}
