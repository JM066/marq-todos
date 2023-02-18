import React, { useState } from 'react'
import callApi from '../utils/http.utils'

type TodoData = {
    loading: boolean
    addTodo: () => Promise<void>
}
export default function useAddTodo<T>(list: T, text: string): TodoData {
    const [loading, setLoading] = useState<boolean>(false)

    const addTodo = async () => {
        setLoading(true)
        try {
            const json = await callApi({
                url: '/test',
                method: 'post',
                body: JSON.stringify({
                    list: list,
                    item: text,
                }),
            })
            if (json.data) setLoading(false)
        } catch (err) {
            console.error('error:', err)
        }
    }

    return { loading, addTodo }
}
