import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, addIds } from '../redux/todo/todoSlice'
import callApi from '../utils/http.utils'

type TodoData = {
    loading: boolean
    getTodos: () => Promise<void>
}
export default function useGetTodos(): TodoData {
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

    return { loading, getTodos }
}
