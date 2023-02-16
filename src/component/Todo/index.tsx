import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { getTodoItemById } from '../../redux/todo/todoSlice'
interface ITodo {
    id: string
    handleUpdate: (id: string) => void
    handleDelete: (id: string) => void
}
export default function Todo(props: ITodo) {
    console.log('props.id', props.id)
    const todo = useSelector((state: RootState) =>
        getTodoItemById(state, props?.id)
    )

    useEffect(() => {
        if (todo !== undefined) {
            console.log('todo,', todo)
        }
    }, [todo])

    return (
        <div>
            <div>
                Item: {todo.item} Status: {todo.done ? 'Done' : 'Not Done'}
            </div>
            <button
                className="button-with-margin"
                onClick={() => props.handleUpdate(props.id)}
            >
                Completed
            </button>
            <button
                className="button-with-margin"
                onClick={() => props.handleDelete(props.id)}
            >
                Delete
            </button>
        </div>
    )
}
