const {Router} = require('express')
require('dotenv').config()

const router = Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

module.exports = router