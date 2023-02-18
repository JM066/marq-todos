import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getTodolistKeys, getTodoList } from '../redux/todo/todoSlice'
import callApi from '../utils/http.utils'
import { RootState } from '../redux/store'
import { TodoList } from '../redux/todo/todoSlice.type'

type TodoData = {
    todoList: TodoList
    loading: boolean
    todoListKeys: string[]
    getTodos: () => Promise<void>
}
export default function useGetTodos(): TodoData {
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const cancel = useRef(false)

    useEffect(() => {
        if (cancel.current === false) {
            getTodos()
            return () => {
                cancel.current = true
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getTodos = async () => {
        setLoading(true)
        try {
            const json = await callApi({
                url: '/test',
                method: 'get',
            })

            dispatch(addItem(json?.data))
        } catch (err) {
            console.error('error:', err)
        } finally {
            setLoading(false)
        }
    }

    return { todoList, todoListKeys, loading, getTodos }
}
