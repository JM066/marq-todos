import useRemoveTodo from '../../hook/useRemoveTodo'
import { TodoList } from '../../redux/todo/todoSlice.type'
import Button from '../Button/index'
import Typography from '../Typography'

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
            <Typography as="p">Delete</Typography>
        </Button>
    )
}
