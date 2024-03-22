import './style.css'
import { App } from './src/todos/app'
import storeJosueTodoApp from './src/store/todo.store'

storeJosueTodoApp.initStore()

App('#app')
