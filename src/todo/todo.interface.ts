import { TodoList } from '../redux/todo/todoSlice.type'

export interface ITodoProvider {
    addTodo: (todoList: TodoList, item: string) => TodoList
    getTodos: () => TodoList
    editTodo: (updatedList: TodoList) => void
    removeTodo: (todoList: TodoList, item: string) => TodoList
    addConnection: (
        todoList: TodoList,
        id: string,
        refItemId: string
    ) => TodoList
    completeTodo: (todoList: TodoList, item: string) => TodoList
    undoCompleteTodo: (todoList: TodoList, item: string) => TodoList
    removeConnection: (
        todoList: TodoList,
        id: string,
        refItemId: string
    ) => TodoList
}
