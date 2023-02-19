import React, { useEffect, PropsWithChildren } from 'react'
import useUpdateTodo from '../../../hook/useUpdateTodo'
import { TodoList } from '../../../redux/todo/todoSlice.type'

interface IFinished {
    id: string
    list: TodoList
    reload: () => void
}
export default function Finished(props: PropsWithChildren<IFinished>) {
    const { updateTodo } = useUpdateTodo('complete', props.list, props.id)

    const handleClick = async () => {
        await updateTodo()
        props.reload()
    }
    return <button onClick={handleClick}>click finished</button>
}
