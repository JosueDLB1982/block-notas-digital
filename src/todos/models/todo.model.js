import {v4 as uuid} from 'uuid' // librería que crea id únicos

export class Todo {

    constructor( description ) {
        this.id = uuid();// creamos un id único
        this.description = description;
        this.done = false;
        this.createAt = new Date()
    }
}