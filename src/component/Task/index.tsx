import { useSelector } from 'react-redux'
import classNames from 'classnames'
import type { RootState } from '../../redux/store'
import { getTodoItemById, getTodoList } from '../../redux/todo/todoSlice'
import UnFinished from './UnFinished'
import Finished from './Finished'
import styles from './Task.module.css'
export interface ITask {
    id: string
    reload: () => void
}
export default function Task(props: ITask) {
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const Component = todoList[props.id].done ? Finished : UnFinished

    return (
        <div className={styles.TaskContainer}>
            <Component
                state={todoList[props.id].done}
                id={props.id}
                list={todoList}
                reload={props.reload}
            >
                <span
                    className={classNames(styles.Task, {
                        [styles.done]: todoList[props.id].done,
                    })}
                >
                    {todoList[props.id].item}
                </span>
            </Component>
        </div>
    )
}
