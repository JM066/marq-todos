import React, { PropsWithChildren } from 'react'
import { BsCheckSquareFill } from 'react-icons/bs'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { ITask } from '../index'
import { TodoList } from '../../../redux/todo/todoSlice.type'
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
        e.stopPropagation()
        await updateTodo()
        props.reload()
    }
    return (
        <div className={styles.Finished} onClick={handleClick}>
            <div className={styles.Icon} onClick={handleCheck}>
                <BsCheckSquareFill className={styles.Checked} />
            </div>

            {props.children}
        </div>
    )
}
