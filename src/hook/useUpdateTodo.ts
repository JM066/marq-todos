import { useState } from 'react'
import callApi from '../utils/http.utils'
import { TodoList } from '../redux/todo/todoSlice.type'

type TodoData = {
    loading: boolean
    updateTodo: () => Promise<void>
}
export default function useUpdateTodo(
    action: string,
    list: TodoList,
    id: string,
    refId?: string
): TodoData {
    const [loading, setLoading] = useState<boolean>(false)

    const updateTodo = async () => {
        setLoading(true)
        try {
            const json = await callApi({
                url: '/test',
                method: 'put',
                body: JSON.stringify({
                    action: action,
                    list: list,
                    id: id,
                    refId: refId,
                }),
            })
            if (json.data) setLoading(false)
        } catch (err) {
            console.error('error:', err)
        }
    }

    return { loading, updateTodo }
}
