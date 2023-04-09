// Funcion consulta si un usuario ya esta en session
export function isLoggedIn(req, res, next){
    req.session.name ? next() : res.redirect("/")
}
// Funcion consulta si un usuario NO esta en session
export function isLoggedOut(req, res, next){
    req.session.name ? res.redirect('/home') : next()
}

import bCrypt from 'bcrypt';

export function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10))
}

export function isValidPassword(user, password){
    return bCrypt.compareSync(password, user.password)
}