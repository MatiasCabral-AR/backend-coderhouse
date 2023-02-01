import {promises as fs} from 'fs'
import { writeFileSync, readFileSync } from 'fs';

export default class GeneralManager{
    constructor(path){
        this.path = path;
        this.autoExecute() // La funcion deja de ser privada para poder ser heredada
        }
    async autoExecute(){
        // Esta funcion es de ejecucion automatica y se encarga de comprobar si existe
        // o no el archivo y tambien si esta vacio
        try {
            const file = readFileSync(this.path, 'utf-8')
            if(file.length === 0) throw new Error('File empty')
        } catch (error) {
            console.log(error.message)
            writeFileSync(this.path, JSON.stringify(Array.from(0), null, 2))
            console.log('\nFile created or replaced')
        }
    }
    async findAndExecute(object, foo, get){
        // Funcion generica de busqueda de indice y ejecucion de funcion (foo)
        const array = await get()
        const index = array.map(element => element.id).indexOf(object.id)
        try {
            let result = await foo(index, array, this.path)
            return result
        } catch (error) {
            return false
        }
    }
}