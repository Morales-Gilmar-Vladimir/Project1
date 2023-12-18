const {Router} = require('express')
require('dotenv').config()


const {renderIndex,renderLogin} = require('../controllers/index.controllers.js')

const router = Router()

router.get('/',renderIndex)

module.exports = router