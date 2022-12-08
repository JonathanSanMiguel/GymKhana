const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {

    const playload = {uid, name}

    return new Promise((resolve, reject) => {
        jwt.sign(playload, process.env.SECRET_JWT_SEED, {
            expiresIn: '48h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject()
            }else{
                resolve(token)
            }
        })
    })//Promise
}//generarJWT

module.exports = {
    generarJWT
}