import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getTodolistKeys, getTodoList } from './redux/todo/todoSlice'
import Task from './component/Task/index'
import Edit from './component/Edit/index'
import Search from './component/Search/index'
import callApi from './utils/http.utils'
import todoProvider from './todo/todo.provider'
import useGetTodos from './hook/useGetTodos'
// import { TodoList } from './redux/todo/todoSlice.type'
// import { RootState } from './redux/store'
import './App.css'
export interface TodoList {
    [key: string]: {
        item: string
        done: boolean
        connection: string[]
    }
}
function App() {
    // const [fetchResult, setFetchResult] = useState<Record<TodoList>>({})
    // const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    // const todoList = useSelector((state: RootState) => getTodoList(state))
    // const todoListKeys = useSelector((state: RootState) =>
    //     getTodolistKeys(state)
    // )
    // const dispatch = useDispatch()
    // const cancel = useRef(false)
    const { todoList, todoListKeys, loading, getTodos } = useGetTodos()

    // useEffect(() => {
    //     console.error('how many times render??')
    //     if (cancel.current === false) {
    //         getTodos()
    //         return () => {
    //             cancel.current = true
    //         }
    //     }
    // }, [])

    // const getTodos = async () => {
    //     try {
    //         const json = await callApi<TodoList>({
    //             url: '/test',
    //             method: 'get',
    //         })
    //         dispatch(addItem(json?.data))
    //     } catch (e) {
    //         console.log('e', e)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    const handleUpdateRequest = async (updatedList: TodoList) => {
        try {
            const json = await callApi({
                url: '/test',
                method: 'put',
                body: JSON.stringify({
                    data: updatedList,
                }),
            })
            console.log('json', json)
        } catch (e) {
            console.log('e', e)
        }
    }
    const handleDeleteRequest = async (list: TodoList, id: string) => {
        try {
            const json = await callApi({
                url: '/test',
                method: 'delete',
                body: JSON.stringify({
                    list: list,
                    id: id,
                }),
            })
            console.log('json', json)
            return json?.data
        } catch (e) {
            console.log('e', e)
        }
    }
    const handleComplete = async (id: string) => {
        todoProvider.completeTodo(todoList, id)
        await getTodos()
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const json = await callApi({
                url: '/test',
                method: 'post',
                body: JSON.stringify({
                    list: todoList,
                    item: text,
                }),
            })
            console.log('text', text)
            console.log('json', json)
            await getTodos()
        } catch (e) {
            console.log('e', e)
        }
        setText('')
    }
    const handleConnect = async (id: string, refId: string) => {
        todoProvider.addConnection(todoList, id, refId)
        await getTodos()
    }
    const handleDisconnect = async (id: string, refId: string) => {
        todoProvider.removeConnection(todoList, id, refId)
        await getTodos()
    }

    const handleDelete = async (id: string) => {
        await handleDeleteRequest(todoList, id)
        await getTodos()
    }

    if (loading) return <div>Loading.....</div>

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
                <button className="button-with-margin" type="submit">
                    post test
                </button>
            </form>

            <button className="button-with-margin clear">Clear!</button>
            <br />
            <br />
            <ul className="fetch-result">
                {todoListKeys.reverse().map((id: any, i: number) => {
                    return (
                        <div className="list" key={i}>
                            <Task
                                id={id}
                                handleComplete={handleComplete}
                                handleDelete={handleDelete}
                            />
                            <Edit id={id}>
                                <Search
                                    id={id}
                                    list={todoList}
                                    idList={todoListKeys}
                                    connect={handleConnect}
                                />
                            </Edit>
                            <div>
                                Tags:
                                {todoList[id]?.connection.map((tag, i) => (
                                    <div
                                        onClick={() =>
                                            handleDisconnect(id, tag)
                                        }
                                        key={i}
                                    >
                                        {todoList[tag]?.item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}

export default App
