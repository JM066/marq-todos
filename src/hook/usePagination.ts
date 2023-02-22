import { useState, useEffect } from 'react'
import { setLocalStorage, LOCAL_STORAGE_KEY } from '../localStorage'
export default function usePagination(
    range: number,
    selectedPage: number,
    todoListKeys: string[]
) {
    const [data, setData] = useState<string[]>(todoListKeys)

    useEffect(() => {
        setLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE, selectedPage)
        setData(
            todoListKeys?.slice(
                range * (selectedPage - 1),
                range * selectedPage
            )
        )
    }, [selectedPage, range, todoListKeys])

    return { data }
}
