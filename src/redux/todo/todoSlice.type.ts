export interface TodoList {
    [key: string]: {
        item: string
        done: boolean
        connection: string[]
        postedAt: number
    }
}
export interface TodoEntities {
    todoEntities: TodoList
    todoIds: string[]
}
