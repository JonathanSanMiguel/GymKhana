const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config() 

const app = express()

//Directorio publico
app.use(express.static('src/public'))

//ModdleWares
app.use(morgan('dev'))
//Cors
app.use(cors())
//lectuar y parseo del body.
app.use(express.json())
//EndPiont 
app.use('/gymkhana/auth', require('./src/routes/auth.routes'))

//CallBack para enviar un mensaje cuando inicie el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto: ${process.env.PORT}`)
})