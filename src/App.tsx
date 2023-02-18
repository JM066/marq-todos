import React, { useState } from 'react'
import Task from './component/Task/index'
import Edit from './component/Edit/index'
import Search from './component/Search/index'
import Delete from './component/Delete/index'
import Tag from './component/Tag/index'
import useGetTodos from './hook/useGetTodos'
import useAddTodo from './hook/useAddTodo'
import { TodoList } from './redux/todo/todoSlice.type'
import './App.css'

function App() {
    const [text, setText] = useState<string>('')
    const { todoList, todoListKeys, loading, getTodos } = useGetTodos()
    const { addTodo } = useAddTodo<TodoList>(todoList, text)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await addTodo()
        await getTodos()
        setText('')
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
                            <Task id={id} list={todoList} reload={getTodos} />
                            <Delete id={id} list={todoList} reload={getTodos} />
                            <Edit id={id}>
                                <Search
                                    id={id}
                                    list={todoList}
                                    idList={todoListKeys}
                                    reload={getTodos}
                                />
                            </Edit>
                            <div>
                                Tags:
                                {todoList[id]?.connection.map((refId, i) => (
                                    <Tag
                                        key={i}
                                        id={id}
                                        list={todoList}
                                        refId={refId}
                                        reload={getTodos}
                                    >
                                        {todoList[refId]?.item}
                                    </Tag>
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
