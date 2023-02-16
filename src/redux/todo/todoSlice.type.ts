export interface TodoList {
    [key: string]: {
        item: string
        done: boolean
        connection: string[]
    }
}
export interface TodoEntities {
    todoEntities: TodoList
}
