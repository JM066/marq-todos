export interface ITodoProvider {
    addTodo: (item: string) => void
    getTodoList: () => Promise<{
        [key: string]: {
            item: string
            postedAt: string
            done: boolean
            connection: string[]
        }
    }>
    // getTodoList: () => {
    //     [key: string]: {
    //         item: string
    //         postedAt: string
    //         done: boolean
    //         connection: string[]
    //     }
    // }
    // addConnection: (item: string, connection: string) => void
    // removeConnection: (item: string, connection: string) => void
    completeTodo: (item: string) => void
    removeTodo: (item: string) => void
}
