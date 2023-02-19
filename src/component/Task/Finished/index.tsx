import React, { PropsWithChildren, useEffect } from 'react'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'
// import styles from './Finished.module.css'
interface IFinished {
    id: string
    list: TodoList
    isChecked: boolean
    reload: () => void
}
export default function Finished(props: PropsWithChildren<IFinished>) {
    const { updateTodo } = useUpdateTodo('complete', props.list, props.id)

    const handleClick = async () => {
        console.log('CLICK???')
        await updateTodo()
        props.reload()
    }
    return (
        <div className="strikethrough" onClick={handleClick}>
            {props.children}
        </div>
    )
}
