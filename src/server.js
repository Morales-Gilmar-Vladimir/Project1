// Importacion de express
const express = require('express')
// Importacion de path
const path = require('path');

// Importacion de handleabars
const { engine }  = require('express-handlebars')

// importar methoOverride
const methodOverride = require('method-override');

// Inicializaciones
const app = express()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

// establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
// establecer conf.. extras
app.engine('.hbs',engine({
    // establecer master page
    defaultLayout:'main',
    // esta.. el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    // esta.. el path de la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    // establecer la extension de las paginas
    extname:'.hbs'
}))
//establecer motor de plantilla
app.set('view engine','.hbs')

// Middlewares 
// El servidor va a trabajar con informacion en vase a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// Variables globales

// Rutas 
// app.get('/',(req,res)=>{
//     res.render("index")
// })
// // Rutas 
// app.get('/',(req,res)=>{
//     res.render('index')
// })

app.use(require('./routers/index.routes'))

app.use(require('./routers/portafolio.routes'))
// Archivos estáticos
//Definir archivos estaticos y publicos 
app.use(express.static(path.join(__dirname,'public')))

// Exportar la variable
module.exports = app



