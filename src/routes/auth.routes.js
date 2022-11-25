const { Router } = require('express')
const { createUser, LogIn, renewToken } = require('../controllers/auth.controller')

const router = Router()
//Rutas para los controllers
//Crear un nuevo usuario
router.post('/newUser', createUser)

//Login de usuario
router.post('/login', LogIn)

//Validar token
router.get('/renew', renewToken)

module.exports = router