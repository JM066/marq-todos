import { useState } from 'react'
import callApi from '../utils/http.utils'
import { TodoList } from '../redux/todo/todoSlice.type'

type TodoData = {
    loading: boolean
    editTodo: () => Promise<void>
}
export default function useEditTodo(
    list: TodoList,
    id: string,
    title: string
): TodoData {
    const [loading, setLoading] = useState<boolean>(false)

    const editTodo = async () => {
        setLoading(true)
        try {
            const json = await callApi({
                url: '/test',
                method: 'put',
                body: JSON.stringify({
                    list: list,
                    id: id,
                    title: title,
                }),
            })
            if (json.data) setLoading(false)
        } catch (err) {
            console.error('error:', err)
        }
    }

    return { loading, editTodo }
}
