import { ITodoProvider } from './todo.interface'
import { concatEntities, concatId, removeEntities } from '../utils/todo.utils'
import { v4 as uuidv4 } from 'uuid'

type todoListType = {
    [key: string]: {
        item: string
        done: boolean
        connection: string[]
    }
}

function getItems() {
    let existing = localStorage.getItem('todoList')
    let data = existing ? JSON.parse(existing) : {}
    console.log('newData', data)
    return data
}
function updateItem(updatedList: todoListType) {
    localStorage.setItem('todoList', JSON.stringify(updatedList))
}
function generateUid() {
    return uuidv4()
}

const todoProvider: ITodoProvider = {
    addTodo: async (item: string) => {
        const id = generateUid()
        const data = {
            [id]: {
                item: item,
                postedAt: `message(${Date.now()})`,
                done: false,
                connection: [],
            },
        }

        const todoList = getItems()
        const state = concatEntities(todoList, data)
        updateItem(state)
    },

    getTodoList: () => {
        return getItems()
    },

    // addConnection: (id: string, refItem: string) => {
    //     concatId(todoList[id].connection, refItem)

    //     // this.adjacencyList[node1].push(node2)
    //     // this.adjacencyList[node2].push(node1)
    // },
    // removeConnection: (node1, node2) => {
    //     // this.adjacencyList[node1] = this.adjacencyList[node1].filter(v => v !== node2)
    //     // this.adjacencyList[node2] = this.adjacencyList[node2].filter(v => v !== node1)
    // },
    removeTodo: (item) => {
        let todoList = getItems()
        const rest = removeEntities(todoList, item)
        todoList = { ...rest }
        updateItem(todoList)
    },
    completeTodo(item) {
        const todoList = getItems()
        const doneState = todoList[item].connection.filter(
            (task: string) => !todoList[task].done
        )
        if (doneState.length > 0) {
            doneState.forEach((task: todoListType) =>
                console.log(`please complete todo ${task.item}`)
            )
        } else {
            const state = { ...todoList }
            state[item].done = true
            updateItem(state)
        }
        //     // while (this.adjacencyList[node].length) {
        //     //   const adjacentNode = this.adjacencyList[node].pop();
        //     //   this.removeConnection(node, adjacentNode);
        //     // }
        //     // delete this.adjacencyList[node];
    },
}
export default todoProvider
