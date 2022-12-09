const { Router } = require('express')
const { check } = require('express-validator')
const { createUser, LogIn, renewToken } = require('../controllers/auth.controller')
const { validarCampos } = require('../MiddleWares/validar-campos')
const { validarJWT } = require('../MiddleWares/validar-JsonWT')

const router = Router()

//Rutas para los controllers
//Crear un nuevo usuario
router.post('/newUser', [
    check('name', 'Ingresa un nombre').notEmpty(),
    check('email', 'Ingrese un email').isEmail(),
    check('password', 'Ingrese una contrsena').isAlphanumeric(),
    validarCampos
], createUser)

//Login de usuario
router.post('/login', [
    //Express-Validator
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').isAlphanumeric(),
    validarCampos
], LogIn)

//Validar token
router.get('/renew', validarJWT, renewToken)

module.exports = router