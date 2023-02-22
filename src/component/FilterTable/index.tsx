import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
    getTodoList,
    getTodolistKeys,
    getCompletedTodoIds,
    getActiveTodoIds,
} from '../../redux/todo/todoSlice'
import { RootState } from '../../redux/store'
import TableFooter from '../TableFooter/index'
import Task from '../Task/index'
import EditContainer from '../EditContainer/index'
import Search from '../Search/index'
import Delete from '../Delete/index'
import TagList from '../TagList/index'
import Edit from '../Edit/index'
import getLocalStorage, { LOCAL_STORAGE_KEY } from '../../localStorage'
// import FilterList from '../FilterList/index'
import { TodoList } from '../../redux/todo/todoSlice.type'
import styles from './TableConainer.module.css'
import usePagination from '../../hook/usePagination'

interface IFilterTable {
    page: number
    range: number
    todoList: TodoList
    filteredList: string[]
    getTodos: () => void
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function FilterTable(props: IFilterTable) {
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )

    // const [page, setPage] = useState<number>(
    //     Number(getLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE)) || 1
    // )
    // const [selected, setSelected] = useState<'all' | 'complete' | 'active'>(
    //     'all'
    // )
    // const completedTodos = useSelector((state: RootState) =>
    //     getCompletedTodoIds(state)
    // )
    // const activeTodos = useSelector((state: RootState) =>
    //     getActiveTodoIds(state)
    // )
    // const todoList = useSelector((state: RootState) => getTodoList(state))
    // const allTodos = useSelector((state: RootState) => getTodolistKeys(state))

    // const filterType = () => {
    //     if (selected === 'active') {
    //         return activeTodos
    //     } else if (selected === 'complete') {
    //         return completedTodos
    //     } else {
    //         return allTodos
    //     }
    // }
    const { data } = usePagination(
        props?.range,
        props?.page,
        props?.filteredList?.reverse()
    )
    return (
        <div className={styles.TodoListWrapper}>
            <ul className={styles.TodoList}>
                {data?.map((id: any, i: number) => (
                    <li className={styles.TodoContainer} key={i}>
                        <div className={styles.TodoItem}>
                            <div className={styles.TodoTitle}>
                                <Task id={id} reload={props.getTodos} />
                                <TagList id={id} reload={props.getTodos} />
                            </div>

                            <div className={styles.ActionContainer}>
                                <div className={styles.Actions}>
                                    <EditContainer id={id} type="connect">
                                        <Search
                                            id={id}
                                            list={props.todoList}
                                            idList={todoListKeys}
                                            reload={props.getTodos}
                                        />
                                    </EditContainer>
                                    <EditContainer id={id} type="edit">
                                        <Edit
                                            id={id}
                                            list={props.todoList}
                                            reload={props.getTodos}
                                        />
                                    </EditContainer>
                                    <Delete
                                        id={id}
                                        list={props.todoList}
                                        reload={props.getTodos}
                                    />
                                </div>
                                <div className={styles.Caption}>
                                    {
                                        new Date(props.todoList[id].postedAt)
                                            .toString()
                                            .split('GMT')[0]
                                    }
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <TableFooter
                data={todoListKeys}
                range={5}
                setPage={props.setPage}
            />
        </div>
    )
}
