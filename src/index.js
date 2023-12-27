// Importar dotenv 
require('dotenv').config()

// Importación de la variable app
const app = require('./server.js')
// Importación de la función connection
const connection = require('./database.js')



// Invocar la función 
connection()



// Iniciar el servidor en el puerto 300
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})