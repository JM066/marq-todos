import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { TodoEntities } from './todoSlice.type'

const initialState: TodoEntities = {
    todoEntities: {},
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            state.todoEntities = payload
        },
    },
})

export const { addItem } = todoSlice.actions

export const getTodolistKeys = (state: RootState) =>
    Object.keys(state.todo.todoEntities)
export const getTodoItemById = (state: RootState, id: string) =>
    state.todo.todoEntities[id]
export const getTodoList = (state: RootState) => state.todo.todoEntities
export default todoSlice.reducer
