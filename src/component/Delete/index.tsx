import useRemoveTodo from '../../hook/useRemoveTodo'
import Button from '../Button/index'
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
        <Button type="button" color="primary" onclick={handleDelete}>
            Delete
        </Button>
    )
}
