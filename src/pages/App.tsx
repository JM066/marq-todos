import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    getTodoList,
    getTodolistKeys,
    getCompletedTodoIds,
    getActiveTodoIds,
} from '../redux/todo/todoSlice'
import { RootState } from '../redux/store'
import useGetTodos from '../hook/useGetTodos'
import FilterTable from '../component/FilterTable'
import getLocalStorage, { LOCAL_STORAGE_KEY } from '../localStorage'

import Form from '../component/Form/index'
import styles from './App.module.css'

function App() {
    const { loading, getTodos } = useGetTodos()

    const [page, setPage] = useState<number>(
        Number(getLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE)) || 1
    )
    const [selected, setSelected] = useState<'all' | 'complete' | 'active'>(
        'complete'
    )
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const completedTodos = useSelector((state: RootState) =>
        getCompletedTodoIds(state)
    )
    const activeTodos = useSelector((state: RootState) =>
        getActiveTodoIds(state)
    )
    const allTodos = useSelector((state: RootState) => getTodolistKeys(state))

    const filterType = () => {
        if (selected === 'active') {
            return activeTodos
        } else if (selected === 'complete') {
            return completedTodos
        } else {
            return allTodos
        }
    }
    if (loading) return <div>Loading.....</div>

    return (
        <div className={styles.App}>
            <Form list={todoList} reload={getTodos} />
            <FilterTable
                page={page}
                range={5}
                todoList={todoList}
                filteredList={filterType()}
                getTodos={getTodos}
                setPage={setPage}
            />
        </div>
    )
}

export default App
