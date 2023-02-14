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
            const result = await foo(index, array, this.path)
            return result
        } catch(error) { return false }
    }
    async getAll(limit){
        try {
            const array = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(limit) return array.slice(0, limit)
            else return array
        } catch(error) { return false }
    }
    async getById(id){
        const array =  await this.getAll();
        const object = array.find( element => element.id === id )
        return object ? object : false
    }
    async deleteById(id){
        // La funcion foo sera usada en #findAndExecute
        async function foo(index, array, path){
            if(index >= 0){
                array.splice(index, 1)
                await fs.writeFile(path, JSON.stringify(array, null, 2))
                return true
            }else{throw new Error}
        }
        const obj = await this.getById(id)
        const result = await this.findAndExecute(obj, foo, this.getAll())
        return result
    }
}