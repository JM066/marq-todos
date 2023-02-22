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
import getLocalStorage, { LOCAL_STORAGE_KEY } from '../localStorage'
import FilterTable from '../component/FilterTable'
import Button from '../component/Button/index'
import Form from '../component/Form/index'
import Typography from '../component/Typography'
import styles from './App.module.css'

export enum FilterType {
    ALL = 'all',
    COMPLETE = 'complete',
    ACTIVE = 'active',
}

function App() {
    const { loading, getTodos } = useGetTodos()
    const [page, setPage] = useState<number>(
        Number(getLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE)) || 1
    )
    const [selected, setSelected] = useState<FilterType>(FilterType.ALL)
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const completedTodos = useSelector((state: RootState) =>
        getCompletedTodoIds(state)
    )
    const activeTodos = useSelector((state: RootState) =>
        getActiveTodoIds(state)
    )
    const allTodos = useSelector((state: RootState) => getTodolistKeys(state))

    const filterType = () => {
        if (selected === FilterType.ACTIVE) {
            return activeTodos
        } else if (selected === FilterType.COMPLETE) {
            return completedTodos
        } else {
            return allTodos
        }
    }

    if (loading) return <div>Loading.....</div>

    return (
        <div className={styles.App}>
            <Typography as="h1">Marq-TODO</Typography>
            <Form list={todoList} reload={getTodos} />
            <div className={styles.Controls}>
                <Button
                    classname={styles.ControlButton}
                    selected={selected === FilterType.ALL}
                    onclick={() => setSelected(FilterType.ALL)}
                >
                    All
                </Button>
                <Button
                    classname={styles.ControlButton}
                    selected={selected === FilterType.ACTIVE}
                    onclick={() => setSelected(FilterType.ACTIVE)}
                >
                    Active
                </Button>
                <Button
                    classname={styles.ControlButton}
                    selected={selected === FilterType.COMPLETE}
                    onclick={() => setSelected(FilterType.COMPLETE)}
                >
                    Completed
                </Button>
            </div>
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
