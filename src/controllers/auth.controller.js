//Sirve para igualar el res a response y permita el intellisense
const { response } = require('express')
const Usuario = require('../Models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jsonWebToken')

//CallBack para Crear un nuevo usuario.
const createUser = async(req, res = response) => {
    //Parametros para el SignIn.
    const { name, email, password } = req.body

    try {
        //Verificacion de email.
        let usuario = await Usuario.findOne({email})
        //Si el email existe, termina el proceso. 
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Email ya registrado"
            })
        }

        //Creacion del usuario con el modelo
        //Nueva instancia del usuario.
        const dbUser = new Usuario(req.body)

        //Hash al password.
        const salt = bcrypt.genSaltSync(15)
        dbUser.password = bcrypt.hashSync(password, salt)

        //Generar el JsonWebToken.
        const JWtoken = await generarJWT(dbUser.id, name)

        //Crear usuario en la Batabase.
        await dbUser.save()
        
        //res successful.
        return res.status(201).json({
            ok: true,
            msg: "Registro Exitoso",
            uid: dbUser.id,
            JWtoken
        });
        
      //res en caso de error
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Something was Wrong..."
        })//return
    }//catch
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