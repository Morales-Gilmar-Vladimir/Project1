// Importación de la Clase Router
const {Router} = require('express')




// Importación de las funciones
const { renderIndex } = require('../controllers/index.controllers')


// creación de la instancia 
const router = Router()


// Ruta inicial (home - index)
router.get('/',renderIndex)





// Exportar la variable router
module.exports = router
