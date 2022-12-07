const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

//ModdleWares
app.use(morgan('dev'))
//Cors
app.use(cors())
//lectuar y parseo del body.
app.use(express.json())
//EndPiont 
app.use('/gymkhana/auth', require('./src/routes/auth.routes'))

//CallBack para enviar un mensaje cuando inicie el servidor
app.listen(4000, () => {
    console.log(`Servidor en el puerto: ${4000}`)
})