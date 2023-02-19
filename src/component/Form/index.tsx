import { PropsWithChildren, useState } from 'react'
import useAddTodo from '../../hook/useAddTodo'
import Button from '../Button/'
import Input from '../Input/index'
import { TodoList } from '../../redux/todo/todoSlice.type'

interface IForm {
    list: TodoList
    reload: () => void
}
export default function Form(props: PropsWithChildren<IForm>) {
    const [text, setText] = useState<string>('')
    const { addTodo } = useAddTodo<TodoList>(props.list, text)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await addTodo()
        props.reload()
        setText('')
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input text={text} setText={setText} />
            <Button type="submit">post test</Button>
        </form>
    )
}
