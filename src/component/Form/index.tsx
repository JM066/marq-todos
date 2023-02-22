import { PropsWithChildren, useState } from 'react'
import useAddTodo from '../../hook/useAddTodo'
import Button from '../Button/'
import Input from '../Input/index'
import { TodoList } from '../../redux/todo/todoSlice.type'
import styles from './Form.module.css'
import Typography from '../Typography'

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
        <form className={styles.Form} onSubmit={handleSubmit}>
            <Input text={text} onchange={setText} />
            <div className={styles.ButtonContainer}>
                <Button color="secondary" type="submit">
                    <Typography as="h2">Add Todo</Typography>
                </Button>
            </div>
        </form>
    )
}
