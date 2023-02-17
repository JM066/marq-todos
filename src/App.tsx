import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getTodolistKeys, getTodoList } from './redux/todo/todoSlice'
import Todo from './component/Todo/index'
import './App.css'
import { RootState } from './redux/store'
import callApi from './http/index'
import todoProvider from './todo/todo.provider'
import { TodoList } from './redux/todo/todoSlice.type'

function App() {
    // const [fetchResult, setFetchResult] = useState<Record<TodoList>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )
    const dispatch = useDispatch()
    const cancel = useRef(false)
    useEffect(() => {
        console.error('how many times render??')
        if (cancel.current === false) {
            getTodos()
            return () => {
                cancel.current = true
            }
        }
    }, [])

    const getTodos = async () => {
        try {
            const json = await callApi<TodoList>({
                url: '/test',
                method: 'get',
            })
            dispatch(addItem(json?.data))
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }
    }
    const handleUpdateRequest = async (updatedList: TodoList) => {
        try {
            const json = await callApi<TodoList>({
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
            const json = await callApi<any>({
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
        const updatedList = todoProvider.completeTodo(todoList, id)
        await handleUpdateRequest(updatedList)
        await getTodos()
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('does it arrive?')
        try {
            const json = await callApi<any>({
                url: '/test',
                method: 'post',
                body: JSON.stringify({
                    list: todoList,
                    item: text,
                }),
            })
            console.log('text', text)
            console.log('json', json)
            await handleUpdateRequest(json.data)
            await getTodos()
        } catch (e) {
            console.log('e', e)
        }
    }
    // const handleConnect = () => {
    //     const returned = todoProvider.addConnection(todoList, )
    //     handleUpdate(returned)
    //     getTodolist()
    // }
    // const handleDisconnect = () => {
    //     getTodolist()
    //     const returned = disConnect()
    //     handleUpdate(returned)
    //     getTodoList
    // }

    // cosnt addTodoAction = () = {
    //     getTodo()
    //     handleAdd()
    //     getTodos()
    // }
    const handleDelete = async (id: string) => {
        const update = await handleDeleteRequest(todoList, id)
        await handleUpdateRequest(update)
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
                <button
                    className="button-with-margin"
                    type="submit"
                    // onClick={async () => {
                    //     try {
                    //         const json = await callApi<any>({
                    //             url: '/test',
                    //             method: 'post',
                    //             body: JSON.stringify({
                    //                 item: 'clean the room',
                    //             }),
                    //         })
                    //         console.log('json', json)
                    //         dispatch(addItem(json?.messages))
                    //     } catch (e) {
                    //         console.log('e', e)
                    //     }
                    // }}
                >
                    post test
                </button>
            </form>

            <button className="button-with-margin clear">Clear!</button>
            <br />
            <br />
            <ul className="fetch-result">
                {todoListKeys.reverse().map((a: any, i: number) => {
                    return (
                        <Todo
                            key={i}
                            id={a}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default App
