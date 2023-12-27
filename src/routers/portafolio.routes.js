// Importación de la Clase Router
const{Router} = require('express')

// Importación de los métodos del controlador
const { renderPortafolioForm, createNewPortafolio, renderAllPortafolios, renderPortafolio, renderEditPortafolioForm, updatePortafolio, deletePortafolio } = require('../controllers/portafolio.controller')


// Importar el método isAuthenticated
const {isAuthenticated} = require('../helpers/validate-auth')




// creación de la instancia 
const router = Router()


// RUTA PARA CARGAR LA VISTA DEL FORMULARIO
router.get('/portafolio/add', isAuthenticated, renderPortafolioForm)
// RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN BDD
router.post('/portafolio/add', isAuthenticated, createNewPortafolio)


// RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
router.get('/portafolios', isAuthenticated, renderAllPortafolios)
// RUTA PARA PRESENTAR EL DETALLE DE UN PORTAFOLIO
router.get('/portafolio/:id', isAuthenticated, renderPortafolio)


// RUTA PARA CARGAR LA VISTA DEL FORMULARIO PARA ACTUALIZAR
router.get('/portafolio/edit/:id', isAuthenticated, renderEditPortafolioForm)
// RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR (ACTUALIZAR) EN BDD
router.put('/portafolio/edit/:id', isAuthenticated, updatePortafolio)

// RUTA PARA ELIMINAR EL PORTAFOLIO
router.delete('/portafolio/delete/:id', isAuthenticated, deletePortafolio)



// Exportar la variable router
module.exports = router