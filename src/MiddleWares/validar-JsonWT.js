const { response } = require("express")
const jwt = require("jsonwebtoken")

const validarJWT = (req, res = response, next) => {
    const JWtoken = req.header('x-token')

    if (!JWtoken) {
        return res.status(401).json({
            msg: "error en el token"
        })
    }

    try {

        const {uid, name} = jwt.verify(JWtoken, process.env.SECRET_JWT_SEED)
        console.log(uid, name);

        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            msg: "Token no valido"
        })
    }

    next()
}

module.exports = {
    validarJWT
}