
const app = require('./server.js')

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})

const connection = require('./database.js')

connection()

require('dotenv').config()