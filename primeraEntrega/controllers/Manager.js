import {promises as fs} from 'fs'
import { writeFileSync, readFileSync } from 'fs';
export default class Manager{
    constructor(path){
        this.path = path;
        this.autoExecute()
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
    async getAll(limit){
        try {
            const array = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(limit) {return array.slice(0, limit)}
            else {return array}
        } catch(error) { return false }
    }
    async getById(id){
        const array =  await this.getAll();
        const object = array.find( element => element.id === id )
        return object ? object : false
    }
    async deleteById(id){
        const array = await this.getAll()
        const object = array.find(element => element.id === id)
        if(object === undefined){
            return false}
        const newArray = array.filter((element) => element !== object)
        await fs.writeFile(this.path, JSON.stringify(newArray, null, 2))
        return object
    }
    
    // ------------------------------------------------------------------------------------
    // Aux Functions
    
    assignId(object ,array){
        // Funcion de asignacion de id de un objeto basado en el array contenedor
        array.length === 0 ? object.id = 1 : object.id = array[array.length - 1].id + 1
        return object
    }
}