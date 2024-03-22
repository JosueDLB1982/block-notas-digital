import todoStore, { Filters } from "../../store/todo.store"

let element

/**
 * 
 * @param {String} elementID lugar donde se desea renderizar el resultado
 */

export const renderPendingTodos = (elementID) => {
    if(!element) // Si no existe elelemento que lo busque por el elementID
        element = document.querySelector(elementID)

    if(!element) // si aún no lo encuentra lanza un error
        throw new Error(`Element ${elementID} not found`)

    // al tenerlo efectivamente, le asignamos el valor del length, que será la cantidad de pendientes arrojados por el filtro
    element.innerHTML = todoStore.getTodos(Filters.Pending).length
}