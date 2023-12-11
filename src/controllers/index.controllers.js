
const renderIndex = (req,res)=>{
    res.render('index')
}

const renderAbout = (req,res)=>{
    res.render('login')
}


module.exports ={
    renderIndex, 
    renderAbout
}
