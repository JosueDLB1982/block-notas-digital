/** *
 En este store o almacen vamos a centralizar todos los datos y funciones de nuestra app
*/


import { Todo } from '../todos/models/todo.model'

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}


// Estado de la aplicación
const state = {
    todos: [
        new Todo('Gema del Alma'),
        new Todo('Gema del Tiempo'),
        new Todo('Gema de la Realidad'),
        new Todo('Gema del Poder'),
        new Todo('Gema del Espacio'),
        new Todo('Gema de la Mente'),
    ],
    filter: Filters.All
}


// Inicializa el store
const initStore = () => {
    loadStore() // al iniciar invocamos la función loadStore y cragamos el state
    console.log(state)
    console.log('InitStore')
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return // verificamos si hay contenido en el localStorage

        const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state')) // desestructuramos del objeto state los todos y el filter
        state.todos   = todos; // asignamos los todos
        state.filter = filter; // asignamos el filter
}

const saveStateToLocalStorage = () => { // función para hacer persistente el state alamacenando los datos en localStorage
    localStorage.setItem('state', JSON.stringify(state)) // guardo el contenido del objeto state en localStorage. Esta función convierte en string el objeto para que pueda ser leido por el localStorage
}

/**
 * Función que me permite obtener los todos
 * @param {String} filter 
 * @returns 
 */
const getTodos = (filter = Filters.All) => { // sin no se especifica un filtro, por defecto se muestran todos
    switch(filter) {
        case Filters.All:
            return [...state.todos] // usamos el operador spread para crear un nuevo array que contiene todos los todos
        case(Filters.Completed):
            return state.todos.filter(todo => todo.done)
        case(Filters.Pending):
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Option ${filter} is not valid`)
    }
}


/**
 * Función para insertar nuevos todos
 * @param {String} description
 */
const addTodo = (description) => {
    if(!description) throw new Error('Description is required')
    state.todos.push(new Todo(description)) // insertará en el state un nuevo todo con la descripción dada

    saveStateToLocalStorage() // persistencia del state a traves de la función
}


/**
 * Función para cambiar el estado del todo terminado o pendiente
 * @param {String} todoId Todo indentifier
 */
const toogleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId) {  // sólo si el todo.id es igual al todoId que recibo como argumento
            todo.done = !todo.done // invierto su valor
        }
        return todo // retorno el todo
    })
    saveStateToLocalStorage() // persistencia del state a traves de la función
}


/**
 * función para eliminar todos
 * @param {String} todoId id único generado por uuid que identifica cada todo
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId) // devuelve todos los todos cuyo todoId sea diferente al proporcionado
    saveStateToLocalStorage() // persistencia del state a traves de la función
}

// Función para elimminar los todos completados
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done) // filtrará y devolvera todos los todos cuyo estado sea pendiente
    saveStateToLocalStorage() // persistencia del state a traves de la función
}


/**
 * Función para seleccionar el filtro de tipo de vista todos, pendientes o completados
 * @param {Filters} newFilter debe estar contemplado en las opciones, filtro de vista de todos
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter // el filtro será igual al filtro nuevo
    saveStateToLocalStorage() // persistencia del state a traves de la función
}

// Función que permite saber cuál es el filtro seleccionado y así el objeto Filters sea privado
const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo,
}