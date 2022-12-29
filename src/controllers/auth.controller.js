//Sirve para igualar el res a response y permita el intellisense
const { response, json } = require('express')
const Usuario = require('../Models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jsonWebToken')

//CallBack para Crear un nuevo usuario.
const createUser = async(req, res = response) => {
    //Parametros para el SignIn.
    const { nombre, apellido, email, password } = req.body

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
        const JWtoken = await generarJWT(dbUser.id, nombre)

        //Crear usuario en la Batabase.
        await dbUser.save()
        
        //res successful.
        return res.status(201).json({
            ok: true,
            msg: "Registro Exitoso",
            uid: dbUser.id,
            nombre: dbUser.nombre,
            apellido: dbUser.apellido,
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
const LogIn = async(req, res = response) => {
    
    const { email, password } = req.body

    try {
       const dbUser = await Usuario.findOne({email})
       //Validar si los datos son validos
       if(!dbUser){
        return res.status(400).json({
            ok: "false",
            msg: "Correo no valido"
        })
       }
       //Confirmar si el password hace match
       const validPassword = bcrypt.compareSync(password, dbUser.password)
       if (!validPassword) {
            return res.status(400).json({
                ok: "false",
                msg: "Password no valida"
            })
       }

       //Generar el JsonWebToken
       const JWtoken = await generarJWT(dbUser.id, dbUser.nombre, dbUser.apellido)

       //res del servicio
       return res.json({
            ok: "true",
            msg: "Login Success",
            uid: dbUser.id,
            nombre: dbUser.nombre,
            apellido: dbUser.apellido,
            JWtoken
       })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: "false",
            msg: "Something wrong Goes..."
        })
    }
}//createUser


//CallBack para validar el JsonToken.
const renewToken = async(req, res = response) => {

    const { uid, nombre, apellido } = req

    const JWtoken = await generarJWT(uid, nombre, apellido)

    return res.json({
        ok: "true",
        msg: "renewed",
        uid,
        nombre,
        apellido,
        JWtoken
    })//return
}//renewToken


//Exportar los CallBacks.
module.exports = {
    createUser,
    LogIn,
    renewToken
}