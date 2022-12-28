const { response } = require("express")
const jwt = require("jsonwebtoken")

const validarJWT = (req, res = response, next) => {

    const JWtoken = req.header('X-Token')

    if (!JWtoken) {
        return res.status(401).json({
            ok: false,
            msg: "Error en el JsonWebToken"
        })
    }

    try {

        const {uid, nombre, apellido} = jwt.verify(JWtoken, process.env.SECRET_JWT_SEED)
        //console.log(uid, nombre, apellido);

        req.uid = uid
        req.nombre = nombre
        req.apellido = apellido
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })
    }

    next()
}

module.exports = {
    validarJWT
}