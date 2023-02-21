export interface TodoList {
    [key: string]: {
        item: string
        done: boolean
        connection: string[]
        time: Date
    }
}
export interface TodoEntities {
    todoEntities: TodoList
}
