import useRemoveTodo from '../../hook/useRemoveTodo'
import { TodoList } from '../../redux/todo/todoSlice.type'

interface IDelete {
    id: string
    list: TodoList
    reload: () => void
}
export default function Delete(props: IDelete) {
    const { removeTodo } = useRemoveTodo<TodoList>(props.list, props.id)
    const handleDelete = async () => {
        await removeTodo()
        props.reload()
    }
    return (
        <div>
            <button className="button-with-margin" onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}
