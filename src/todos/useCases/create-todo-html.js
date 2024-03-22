import { Todo } from '../models/todo.model'

/**
 * 
 * @param {Todo} todo 
 */


export const createTodoHTML = (todo) => {
    if(!todo) throw new Error('A todo object is required')

    const { done, description, id } = todo // usamos la desestructuración de objetos para extraer del todo las propiedades

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''} > 
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `
    const liElement = document.createElement('li') // creamos un element li y lo asignamos a la constante liElement
    liElement.innerHTML = html // le agregamos el contenido del html 
    liElement.setAttribute('data-id', id) // Asignamos el id proporcionado
    
    if(todo.done) // sólo se aplicará la regla si el todo esta completo
        liElement.classList.add('completed')
    return liElement // retornamos el li creado y completo
}