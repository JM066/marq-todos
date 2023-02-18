import { PropsWithChildren } from 'react'
import useUpdateTodo from '../../hook/useUpdateTodo'
import { TodoList } from '../../redux/todo/todoSlice.type'

interface IDelete {
    id: string
    list: TodoList
    reload: () => void
    refId: string
}
export default function Tag(props: PropsWithChildren<IDelete>) {
    const { updateTodo } = useUpdateTodo<TodoList>(
        'disconnect',
        props.list,
        props.id,
        props.refId
    )
    const handleDisconnect = async () => {
        await updateTodo()
        props.reload()
    }
    return (
        <div>
            <button className="button-with-margin" onClick={handleDisconnect}>
                {props.children}
            </button>
        </div>
    )
}
