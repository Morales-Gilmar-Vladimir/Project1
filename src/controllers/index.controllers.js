
//Primera funcion para renderizar el index
const renderIndex = (req,res)=>{
    res.render('index')
}

//Primera funcion para renderizar el login
const renderLogin = (req,res)=>{
    res.render('login')
}



//Exportar dos funciones
module.exports ={
    renderIndex, 
    renderLogin
}
