import React, { PropsWithChildren } from 'react'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'
import { ITask } from '../index'
import styles from './Finished.module.css'
interface IFinished extends ITask {
    list: TodoList
    state: boolean
}
export default function Finished(props: PropsWithChildren<IFinished>) {
    const { updateTodo } = useUpdateTodo('undoComplete', props.list, props.id)

    const handleClick = async () => {
        await updateTodo()
        props.reload()
    }
    const handleCheck = async (e: any) => {
        e.stopImmediatePropagation()
        await updateTodo()
        props.reload()
    }
    return (
        <div className={styles.Finished} onClick={handleClick}>
            <input
                type="checkbox"
                checked={props.state}
                onChange={handleCheck}
                className={styles.Input}
            />
            <div>{props.children}</div>
        </div>
    )
}
