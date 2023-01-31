import * as crypto from 'crypto'

// Choosing encryption algorythm 
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
const password = "12345"

function cypher(password){
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    return {
        iv : iv.toString('hex'),
        password : Buffer.concat([cipher.update(password), cipher.final()]).toString('hex')
    }
}
let encriptado = cypher(password)
console.log(encriptado)

function decypher(password){
    let iv = Buffer.from(password.iv, 'hex')
    let encryptedPassword = Buffer.from(password.password, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv) 
    return {
        password : Buffer.concat([decipher.update(encryptedPassword), decipher.final()]).toString()
    }
    
}
let desencriptado = decypher(encriptado)
console.log(desencriptado)