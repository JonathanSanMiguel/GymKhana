//Sirve para igualar el res a response y permita el intellisense
const { response } = require('express');
const { validationResult } = require('express-validator');


//CallBack para Crear un nuevo usuario.
const createUser = (req, res = response) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.mapped()
        })
    }

    const { name, email, password } = req.body
    console.log(name, email, password);

    return res.json({
        ok: "",
        msg: "Registro exitoso"
    })//return
}//createUser


//CallBack para iniciar sesion.
const LogIn = (req, res = response) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    
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