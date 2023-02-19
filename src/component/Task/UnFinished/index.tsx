import React, { PropsWithChildren } from 'react'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'
import { ITask } from '../index'

interface IUnFinished extends ITask {
    list: TodoList
}

export default function UnFinished(props: PropsWithChildren<IUnFinished>) {
    const { updateTodo } = useUpdateTodo('undoComplete', props.list, props.id)

    const handleClick = async () => {
        await updateTodo()
        props.reload()
    }
    return <button onClick={handleClick}>click unfinished</button>
}
