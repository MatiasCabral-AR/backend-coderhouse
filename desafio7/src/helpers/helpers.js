import bCrypt from 'bcrypt';

export function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(Number(process.env.GENSALT_PASS)))
}

export function isValidPassword(user, password){
    return bCrypt.compareSync(password, user.password)
}

export function delayResponse(req, res, next){
    setTimeout(() => {
        next()
    }, 5000)
}