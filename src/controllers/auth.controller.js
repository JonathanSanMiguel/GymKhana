//Sirve para igualar el res a response y permita el intellisense
const { response } = require('express')

//CallBack para Crear un nuevo usuario.
const createUser = (req, res = response) => {
    const { email, name, password } = req.body

    console.log(email, name, password);

    return res.json({
        ok: "",
        msg: "new user"
    })//return
}//createUser

//CallBack para iniciar sesion.
const LogIn = (req, res = response) => {
    const { email, password } = req.body

    console.log(email, password);

    return res.json({
        ok: "",
        msg: "hola soy el login"
    })//return
}//createUser

//CallBack para validar el JsonToken.
const renewToken = (req, res = response) => {
    return res.json({
        ok: "",
        msg: "renew"
    })//return
}//renewToken

//Exportar los CallBacks.
module.exports = {
    createUser,
    LogIn,
    renewToken
}