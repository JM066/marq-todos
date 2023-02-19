import React, { PropsWithChildren, useEffect } from 'react'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'
import { ITask } from '../index'

interface IUnFinished extends ITask {
    list: TodoList
    isChecked: boolean
    // handleClick: () => void
}

export default function UnFinished(props: PropsWithChildren<IUnFinished>) {
    const { updateTodo } = useUpdateTodo('undoComplete', props.list, props.id)

    const handleClick = async () => {
        await updateTodo()
        props.reload()
    }

    return (
        <div className="undo-strikethrough" onClick={handleClick}>
            {props.children}
        </div>
    )
}
