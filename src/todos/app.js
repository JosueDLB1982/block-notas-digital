import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPendingTodos } from './useCases'

const ElementIDs = { // referencias al HTML
    ClearCompletedButton: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    TodoList: '.todo-list',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter()) // creo una constante que contendrá los todos que voy a mostrar, para obtenerlos, del todoStore invocarémos la función getTodos, luego para saber cuál filtro esta seleccionado, de la misma todoStore invocamos la función getCurrentFilter
        renderTodos(ElementIDs.TodoList, todos) // recibe el identificador del elemento HTML donde voy a renderizar y los todos a renderizar
        updatePendingCount() // cada vez que se renderiza llama la función que muestra los todos pendientes
    }

    // función para mostrar el número de todos pendientes
    const updatePendingCount = () => {
        renderPendingTodos(ElementIDs.PendingCountLabel)
    }

    // cuando la App se llama
    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append( app )
        displayTodos() // invoco la función para que se muestren los todos en la app
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput)
    const todoListUL = document.querySelector(ElementIDs.TodoList)
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton)
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters)

    // Listeners
    newDescriptionInput.addEventListener('keyup', (e) => {
        // el keyCode 13 pertenece a la tecla enter, la siguiente condición verifica que no se aun string vacío
        if((e.keyCode !== 13) || (e.target.value.trim().length === 0)) return
        
        todoStore.addTodo(e.target.value) // si el string tiene contenido y el usuario presiona enter, llamamos addTodo y le pasamos en value
        displayTodos() // una vez que se incluye la nueva tarea, llamamos la función displayTodos para ejecutar la renderización
        e.target.value = '' // nos aseguramos de limpiar el imput una vez insertada la nueva tarea
    })

    todoListUL.addEventListener('click', (e) => {
        const elementLI = e.target.closest('[data-id]') //closest método que permite seleccionar al elemento padre más cercano que cumpla con el criterio. En este caso el id
        const elementId = elementLI.getAttribute('data-id') // permite obtener el atributo que cumpla con el parámetro
        todoStore.toogleTodo(elementId) // se aplica el cambio al todo que coincida con el id
        displayTodos()
    })

    todoListUL.addEventListener('click', (e) => {
        const elementLI = e.target.closest('[data-id]') //closest método que permite seleccionar al elemento padre más cercano que cumpla con el criterio. En este caso el id
       
        if(!elementId || !e.target.classList.contains('destroy')) return // si no se encuentra la class destroy o el elementId return
             todoStore.deleteTodo(elementLI.getAttribute('data-id')) // eliminamos el todo que coincida con el id
             displayTodos() 

        // const isDestroyElement = e.target.className === 'destroy'
        // const element = e.target.closest('[data-id]')
        // if(!element || !isDestroyElement) return
        //     todoStore.deleteTodo(element.getAttribute('data-id'))
        //     displayTodos() LÓGICA FERNANDO
    })

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted()
        
        displayTodos()
    })

    // aplicar los filtros
    // no tiene addEventListener porque es una lista, usamos un forEach
    filtersLIs.forEach( e => {
        e.addEventListener('click', (e) => {
            filtersLIs.forEach(el => {
                el.classList.remove('selected') // le quitamos la clase a todos
            })
            e.target.classList.add('selected') // le aplicamos la clase al seleccionado

            switch(e.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break

                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break
            }

            displayTodos()

        })
    })

}
