import React, { PropsWithChildren } from 'react'
import { ImCheckboxUnchecked } from 'react-icons/im'

import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'
import { ITask } from '../index'
import styles from './Unfinished.module.css'

interface IUnFinished extends ITask {
    list: TodoList
    state: boolean
}

export default function UnFinished(props: PropsWithChildren<IUnFinished>) {
    const { updateTodo } = useUpdateTodo('complete', props.list, props.id)

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
        <div className={styles.UnFinished} onClick={handleClick}>
            <div className={styles.Icon} onClick={handleCheck}>
                <ImCheckboxUnchecked className={styles.UnChecked} />
            </div>
            {props.children}
        </div>
    )
}
