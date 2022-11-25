const { Router } = require('express')

const router = Router()
//Crear un nuevo usuario
router.post('/newUser', (req, res) => {
    return res.json({
        ok: "",
        msg: "new user"
    })
})
//Login de usuario
router.post('/login', (req, res) => {
    return res.json({
        ok: "",
        msg: "hola soy el login"
    })
})
//Validar token
router.get('/renew', (req, res) => {
    return res.json({
        ok: "",
        msg: "renew"
    })
})

module.exports = router