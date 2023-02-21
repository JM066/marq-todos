import { useState, useEffect } from 'react'
import { setLocalStorage, LOCAL_STORAGE_KEY } from '../localStorage'
export default function usePagination(
    range: number,
    selectedPage: number,
    todoListKeys: string[]
) {
    const [data, setData] = useState<string[]>([])

    useEffect(() => {
        setLocalStorage(LOCAL_STORAGE_KEY.CURRENT_PAGE, selectedPage)
        setData(
            todoListKeys.slice(range * (selectedPage - 1), range * selectedPage)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPage, range])

    return { data }
}
