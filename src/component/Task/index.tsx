import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useUpdateTodo from '../../hook/useUpdateTodo'
import type { RootState } from '../../redux/store'
import { getTodoItemById } from '../../redux/todo/todoSlice'
import { TodoList } from '../../redux/todo/todoSlice.type'
interface ITask {
    id: string
    list: TodoList
    reload: () => void
}
export default function Task(props: ITask) {
    const todo = useSelector((state: RootState) =>
        getTodoItemById(state, props?.id)
    )
    const { updateTodo } = useUpdateTodo<TodoList>(
        'complete',
        props.list,
        props.id
    )
    useEffect(() => {
        if (todo !== undefined) {
            console.log('todo,', todo)
        }
    }, [todo])
    const handleComplete = async () => {
        await updateTodo()
        props.reload()
    }
    return (
        <div>
            <div>
                Item: {todo.item} Status: {todo.done ? 'Done' : 'Not Done'}
            </div>
            <button className="button-with-margin" onClick={handleComplete}>
                Complete
            </button>
        </div>
    )
}
