// metodo para proteger rutas y a la vez esta siendo xportada
module.exports.isAuthenticated = (req,res,next)=>{
    //si existe un inicio de sesion
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/user/login')
}

//REDIRECCIONAR A LA VISTA PORTAFOLIOS SI EL USUARIO YA INICIO SESION 
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}