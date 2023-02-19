import { useState } from 'react'
import callApi from '../utils/http.utils'

type TodoData = {
    loading: boolean
    removeTodo: () => Promise<void>
}
export default function useRemoveTodo<T>(list: T, id: string): TodoData {
    const [loading, setLoading] = useState<boolean>(false)

    const removeTodo = async () => {
        setLoading(true)
        try {
            const json = await callApi({
                url: '/test',
                method: 'delete',
                body: JSON.stringify({
                    list: list,
                    id: id,
                }),
            })
            if (json.data) setLoading(false)
        } catch (err) {
            console.error('error:', err)
        }
    }

    return { loading, removeTodo }
}
