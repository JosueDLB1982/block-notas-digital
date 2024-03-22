import { Todo } from "../models/todo.model"
import { createTodoHTML } from '../useCases/create-todo-html'

let element = `` // creamos la variable para poder identificarla dentro del html

/**
 * 
 * @param {String} elementId // identificador del elemento HTML donde voy a renderizar
 * @param {Todo} todos // todos a renderizar
 */

export const renderTodos = (elementId, todos = []) => { 
    if(!element) // verificamos si el elemento no existe previamente
        element = document.querySelector(elementId) // si no existe lo asignamos en el id proporcionado
    
    if(!element) throw new Error(`Element ${elementId} not found`) // si se pasa un id invalido lanzamos un error

    element.innerHTML = '' // nos aseguramos de purgar el html cada vez que se de una nueva renderización para que no hayan errores

    todos.forEach(todo => {
        element.append(createTodoHTML(todo)) // montamos todos los todos en el html
    });
}