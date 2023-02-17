import { ITodoProvider } from './todo.interface'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import {
    concatEntities,
    concatId,
    removeEntities,
    removeRefId,
} from '../utils/todo.utils'

import { TodoList } from '../redux/todo/todoSlice.type'

// function getItems() {
//     let existing = localStorage.getItem('todoList')
//     let data = existing ? JSON.parse(existing) : {}
//     return data as TodoList
// }

function generateUid() {
    return uuidv4()
}

const todoProvider: ITodoProvider = {
    addTodo: (todoList: TodoList, item: string) => {
        const id = generateUid()
        const data = {
            [id]: {
                item: item,
                postedAt: `message(${Date.now()})`,
                done: false,
                connection: [],
            },
        }

        // const todoList = getItems()
        const state = concatEntities<TodoList>(todoList, data)
        return state
        // updateItem(state)
    },

    getTodos: () => {
        let existing = localStorage.getItem('todoList')
        let data = existing ? JSON.parse(existing) : {}
        return data as TodoList
        // return getItems()
    },

    updateItem(updatedList: TodoList) {
        localStorage.setItem('todoList', JSON.stringify(updatedList))
    },

    removeTodo: (todoList: TodoList, item: string) => {
        // let todoList = getItems()
        const connectedItemList = todoList[item].connection
        const rest = removeEntities(todoList, item)
        const state = removeRefId(rest, connectedItemList, item)
        todoList = { ...state }
        return todoList
        // updateItem(todoList)
    },
    addConnection: (todoList: TodoList, id: string, refItemId: string) => {
        // let todoList = getItems()
        todoList[id].connection = concatId<string>(
            todoList[id].connection,
            refItemId
        )
        todoList[refItemId].connection = concatId<string>(
            todoList[refItemId].connection,
            id
        )
        return todoList
    },
    completeTodo: (todoList: TodoList, item: string) => {
        // const todoList = getItems()
        console.error('todoList', todoList)
        const doneState = todoList[item].connection.filter(
            (id: string) => !todoList[id].done
        )
        console.error('doneState', doneState)
        if (doneState.length > 0) {
            doneState.forEach((id: string) =>
                console.log(`please complete todo ${todoList[id]}`)
            )
        } else {
            let clonedTodoList = _.cloneDeep(todoList)
            clonedTodoList[item].done = true

            return clonedTodoList
        }

        return todoList
    },
    removeConnection: (todoList: TodoList, id: string, refItemId: string) => {
        // let todoList = getItems()
        todoList[id].connection = todoList[id].connection.filter(
            (item) => item !== refItemId
        )
        todoList[id].connection = todoList[refItemId].connection.filter(
            (item) => item !== id
        )
        return todoList
        // updateItem(todoList)
    },
}
export default todoProvider
