import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import usePagination from '../../hook/usePagination'
import { getTodoList, getTodolistKeys } from '../../redux/todo/todoSlice'
import { RootState } from '../../redux/store'
import TableFooter from '../TableFooter/index'
import Task from '../Task/index'
import EditContainer from '../EditContainer/index'
import Search from '../Search/index'
import Delete from '../Delete/index'
import TagList from '../TagList/index'
import Edit from '../Edit/index'
import getLocalStorage, { LOCAL_STORAGE_KEY } from '../../localStorage'

import styles from './TableConainer.module.css'
interface ITableContainer {
    range: number
    getTodos: () => void
}
export default function TableContainer(props: ITableContainer) {
    const [page, setPage] = useState<number>(
        Number(getLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE)) || 1
    )
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )

    const { data } = usePagination(props.range, page, todoListKeys.reverse())
    return (
        <div className={styles.TodoListWrapper}>
            <ul className={styles.TodoList}>
                {data?.map((id: any, i: number) => (
                    <li className={styles.TodoItem} key={i}>
                        <div className={styles.TodoTitle}>
                            <Task id={id} reload={props.getTodos} />
                            <TagList id={id} reload={props.getTodos} />
                        </div>

                        <div className={styles.ActionContainer}>
                            <EditContainer id={id} type="connect">
                                <Search
                                    id={id}
                                    list={todoList}
                                    idList={todoListKeys}
                                    reload={props.getTodos}
                                />
                            </EditContainer>
                            <EditContainer id={id} type="edit">
                                <Edit
                                    id={id}
                                    list={todoList}
                                    reload={props.getTodos}
                                ></Edit>
                            </EditContainer>
                            <Delete
                                id={id}
                                list={todoList}
                                reload={props.getTodos}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <TableFooter data={todoListKeys} range={5} setPage={setPage} />
        </div>
    )
}
