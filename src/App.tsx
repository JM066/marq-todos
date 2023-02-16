import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getTodolist } from './redux/todo/todoSlice'
import Todo from './component/Todo/index'
import './App.css'
import { RootState } from './redux/store'
import callApi from './http/index'
import { TodoList } from './redux/todo/todoSlice.type'

function App() {
    // const [fetchResult, setFetchResult] = useState<Record<TodoList>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const todoList = useSelector((state: RootState) => getTodolist(state))
    const dispatch = useDispatch()
    const cancel = useRef(false)
    useEffect(() => {
        const getTodos = async () => {
            try {
                const json = await callApi<TodoList>({
                    url: '/test',
                    method: 'get',
                })
                dispatch(addItem(json?.messages))
            } catch (e) {
                console.log('e', e)
            } finally {
                setLoading(false)
            }
        }
        if (cancel.current === false) {
            getTodos()
            return () => {
                cancel.current = true
            }
        }
    }, [])
    const handleUpdate = async (id: string) => {
        try {
            const json = await callApi<TodoList>({
                url: '/test',
                method: 'put',
                body: JSON.stringify({
                    id: id,
                }),
            })
            console.log('json', json)
            dispatch(addItem(json?.messages))
        } catch (e) {
            console.log('e', e)
        }
    }
    const handleDelete = async (id: string) => {
        try {
            const json = await callApi<any>({
                url: '/test',
                method: 'delete',
                body: JSON.stringify({
                    id: id,
                }),
            })
            console.log('json', json)
            dispatch(addItem(json?.messages))
        } catch (e) {
            console.log('e', e)
        }
    }
    if (loading) return <div>Loading.....</div>
    return (
        <>
            <button
                className="button-with-margin"
                onClick={async () => {
                    try {
                        const json = await callApi<any>({
                            url: '/test',
                            method: 'post',
                            body: JSON.stringify({
                                item: 'clean the room',
                            }),
                        })
                        console.log('json', json)
                        dispatch(addItem(json?.messages))
                    } catch (e) {
                        console.log('e', e)
                    }
                }}
            >
                post test
            </button>
            <button
                className="button-with-margin"
                onClick={async () => {
                    try {
                        const json = await callApi<{ messages: string }>({
                            url: '/test',
                            method: 'get',
                        })
                    } catch (e) {
                        console.log('e', e)
                    }
                }}
            >
                get test
            </button>

            <button className="button-with-margin clear">Clear!</button>
            <br />
            <br />
            <ul className="fetch-result">
                {todoList.reverse().map((a: any, i: number) => {
                    return (
                        <Todo
                            key={i}
                            id={a}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default App
