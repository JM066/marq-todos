import React from 'react'
import { useSelector } from 'react-redux'
import { getTodoList } from '../redux/todo/todoSlice'
import { RootState } from '../redux/store'
import useGetTodos from '../hook/useGetTodos'
import TableContainer from '../component/TableContainer'
import Form from '../component/Form/index'
import styles from './App.module.css'

function App() {
    const { loading, getTodos } = useGetTodos()
    const todoList = useSelector((state: RootState) => getTodoList(state))

    if (loading) return <div>Loading.....</div>

    return (
        <div className={styles.App}>
            <Form list={todoList} reload={getTodos} />
            <TableContainer range={5} getTodos={getTodos} />
        </div>
    )
}

export default App
