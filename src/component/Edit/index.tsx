import React, { useState } from 'react'
import useEditTodo from '../../hook/useEditTodo'
import { TodoList } from '../../redux/todo/todoSlice.type'
import Input from '../Input/index'
import Button from '../Button/index'
import Typography from '../Typography'
import styles from './Edit.module.css'
interface IEdit {
    id: string
    list: TodoList
    reload: () => void
}

export default function Edit(props: IEdit) {
    const [title, setTitle] = useState<string>(props.list[props.id].item)

    const { editTodo } = useEditTodo(props.list, props.id, title)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await editTodo()
        props.reload()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.Edit}>
                <Typography as="h2"> Edit Data</Typography>
                <Input text={title} onchange={setTitle} />

                <Button type="submit" color="secondary">
                    <Typography as="h2">Save</Typography>
                </Button>
            </form>
        </>
    )
}
