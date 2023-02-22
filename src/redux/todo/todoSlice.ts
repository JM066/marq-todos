import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { TodoEntities } from './todoSlice.type'

const initialState: TodoEntities = {
    todoEntities: {},
    todoIds: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            state.todoEntities = payload
        },
        addIds: (state, { payload }) => {
            state.todoIds = payload
        },
    },
})

export const { addItem, addIds } = todoSlice.actions

export const getTodolistKeys = (state: RootState) =>
    Object.keys(state.todo.todoEntities)
export const getCompletedTodoIds = (state: RootState) =>
    Object.keys(state.todo.todoEntities).filter(
        (id) => state.todo.todoEntities[id].done
    )
export const getActiveTodoIds = (state: RootState) =>
    Object.keys(state.todo.todoEntities).filter(
        (id) => !state.todo.todoEntities[id].done
    )
export const getTodoItemById = (state: RootState, id: string) =>
    state.todo.todoEntities[id]
export const getTodoList = (state: RootState) => state.todo.todoEntities

export default todoSlice.reducer
