import React from 'react'
import { useSelector } from 'react-redux'
import Task from '../component/Task/index'
import Edit from '../component/Edit/index'
import Search from '../component/Search/index'
import Delete from '../component/Delete/index'
import TagList from '../component/TagList/index'
import Form from '../component/Form/index'
import useGetTodos from '../hook/useGetTodos'
import { getTodoList, getTodolistKeys } from '../redux/todo/todoSlice'
import { RootState } from '../redux/store'
import styles from './App.module.css'

function App() {
    const { loading, getTodos } = useGetTodos()
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )

    console.error('LOAD MAIN')
    if (loading) return <div>Loading.....</div>

    return (
        <div className={styles.App}>
            <Form list={todoList} reload={getTodos} />
            <ul className={styles.TodoList}>
                {todoListKeys.reverse().map((id: any, i: number) => {
                    return (
                        <li className="container-row" key={i}>
                            <div className={styles.TodoItem}>
                                <Task id={id} reload={getTodos} />
                                <TagList id={id} reload={getTodos} />
                            </div>

                            <Edit id={id}>
                                <Search
                                    id={id}
                                    list={todoList}
                                    idList={todoListKeys}
                                    reload={getTodos}
                                />
                            </Edit>
                            <Delete id={id} list={todoList} reload={getTodos} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
