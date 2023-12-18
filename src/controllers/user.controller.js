const User = require('../models/User')
const passport = require("passport")


// MOSTRAR EL FORMULARIO DE REGISTRO
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//CAPTURAR LOS DATOS DEL FORMULARIO Y ALMACENAR EN BDD
// const registerNewUser =(req,res)=>{
//     res.send('register new user')
// }
const registerNewUser = async(req,res)=>{
    
    const{name,email,password,confirmpassword} = req.body
    
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    newUser.save()
    res.redirect('/user/login')
}


//MOSTRAR EL FORMULARIO DE LOGIN
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
// CAPTURAR LOS DATOS DEL FORMULARIO Y REALIZAR EL PROCESO DE LOGIN EN CONJUNTO CON BDD
// const loginUser =(req,res)=>{
//     res.send('login user')
// }
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

// CERRAR SESION DE URUARUI 
// const logoutUser =(req,res)=>{
//     res.send('logout user')
// }
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}