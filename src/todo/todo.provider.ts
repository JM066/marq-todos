import { ITodoProvider } from './todo.interface'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import {
    concatEntities,
    concatId,
    removeEntities,
    removeRefId,
    removeRefIds,
} from '../utils/todo.utils'
import getLocalStorage, {
    setLocalStorage,
    LOCAL_STORAGE_KEY,
} from '../localStorage'
import { TodoList } from '../redux/todo/todoSlice.type'

function generateUid() {
    return uuidv4()
}
function updateItem(updatedList: TodoList) {
    setLocalStorage(LOCAL_STORAGE_KEY.TODOLIST, updatedList)
}
const todoProvider: ITodoProvider = {
    addTodo: (todoList: TodoList, item: string) => {
        const id = generateUid()
        const data = {
            [id]: {
                item: item,
                postedAt: Date.now(),
                done: false,
                connection: [],
            },
        }

        const state = concatEntities<TodoList>(todoList, data)
        updateItem(state)
        return state
    },

    getTodos: () => {
        let existing = getLocalStorage(LOCAL_STORAGE_KEY.TODOLIST)
        return existing ? JSON.parse(existing as string) : {}
    },

    editTodo: (list: TodoList, id, title) => {
        let state = _.cloneDeep(list)
        state[id].item = title
        state[id].postedAt = Date.now()
        updateItem(state)
    },

    removeTodo: (todoList: TodoList, item: string) => {
        let state = _.cloneDeep(todoList)
        const connectedItemList = state[item].connection
        let rest = removeEntities(state, item)
        if (connectedItemList.length > 0) {
            rest = removeRefIds(rest, connectedItemList, item)
        }
        updateItem(rest)
        return rest
    },
    addConnection: (todoList: TodoList, id: string, refItemId: string) => {
        const state = _.cloneDeep(todoList)
        const found = state[refItemId].connection.find((task) => task === id)
        if (found) {
            window.alert(
                `${state[refItemId].item} is already linked to ${state[id].item}`
            )
        } else {
            state[id].connection = concatId<string>(
                todoList[id].connection,
                refItemId
            )
        }
        updateItem(state)
        return state
    },
    completeTodo: (todoList: TodoList, item: string) => {
        let state = _.cloneDeep(todoList)
        if (state[item].connection.length > 0) {
            const doneState = state[item].connection.filter((id: string) => {
                return state[id]?.done === false
            })
            if (doneState.length > 0) {
                window.alert(`Please complete all the referred tasks`)
            } else {
                state[item].done = true
            }
        } else {
            state[item].done = true
        }
        updateItem(state)
        return state
    },
    undoCompleteTodo: (todoList: TodoList, item: string) => {
        let state = _.cloneDeep(todoList)
        state[item].done = false
        updateItem(state)
        return state
    },
    removeConnection: (todoList: TodoList, id: string, refItemId: string) => {
        const state = _.cloneDeep(todoList)
        state[id].connection = removeRefId(state[id]?.connection, refItemId)
        updateItem(state)
        return state
    },
}
export default todoProvider
