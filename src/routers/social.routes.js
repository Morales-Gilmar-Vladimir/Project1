const { Router } = require('express')

const router = Router()
const { isAuthenticated } = require('../helpers/validate-auth')

const { renderSocialForm,
        renderAllSocial,
        createNewProfileSocial,
        deleteSocial,
        renderEditSocialForm,
        updateSocial
} = require('../controllers/social.controller.js')

router.get('/social', isAuthenticated, renderAllSocial)

router.get('/social/add', isAuthenticated, renderSocialForm)
router.post('/social/add', isAuthenticated, createNewProfileSocial)

router.get('/social/edit/:id', isAuthenticated, renderEditSocialForm)
router.put('/social/edit/:id', isAuthenticated, updateSocial)

router.delete('/social/delete/:id', isAuthenticated, deleteSocial)

module.exports = router