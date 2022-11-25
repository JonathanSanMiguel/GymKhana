const express = require('express')

const app = express()

//Rutas
app.use('/gymkhana/auth', require('./src/routes/auth.routes'))

//CallBack para enviar un mensaje cuando inicie el servidor
app.listen(4000, () => {
    console.log(`Servidor en el puerto: ${4000}`)
})