const passport = require('passport')
const User = require('../models/User')

const LocalStrategy = require('passport-local').Strategy



passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{

    const userBDD = await User.findOne({email})
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    return done(null,userBDD)
}))



passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});