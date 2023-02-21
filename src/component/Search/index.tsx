import React, { useState } from 'react'
import useUpdateTodo from '../../hook/useUpdateTodo'
import Input from '../Input/index'
import Button from '../Button/index'
import { TodoList } from '../../redux/todo/todoSlice.type'
import styles from './Search.module.css'

interface ISearch {
    id: string
    list: TodoList
    idList: string[]
    reload: () => void
}

export default function Search(props: ISearch) {
    const [search, setSearch] = useState<{ [key: string]: string }>({
        id: '',
        task: '',
    })
    const [isItemSelected, setIsItemSelected] = useState<boolean>(false)
    const { updateTodo } = useUpdateTodo(
        'connect',
        props.list,
        props.id,
        search.id
    )
    const handleSelect = (item: string, id: string) => {
        setSearch({ id: id, task: item })
        setIsItemSelected(true)
    }
    const handleInput = (value: string) => {
        setSearch({
            id: '',
            task: value.toLocaleLowerCase() || '',
        })
    }
    const handleConnect = async () => {
        await updateTodo()
        props.reload()
    }
    const handleSearch = () => {
        return (
            <div className={styles.RefList}>
                {props.idList
                    .filter(
                        (id: string) =>
                            props.list[id].item
                                .toLocaleLowerCase()
                                .includes(search.task) && id !== props.id
                    )
                    .map((filteredId, i) => (
                        <div
                            key={i}
                            className={styles.RefItem}
                            onClick={() =>
                                handleSelect(
                                    props.list[filteredId].item,
                                    filteredId
                                )
                            }
                        >
                            {props.list[filteredId].item}
                        </div>
                    ))}
            </div>
        )
    }
    return (
        <div className={styles.Search}>
            <h2>Connect Tasks</h2>
            <Input
                classname={styles.SearchInput}
                text={search.task}
                onchange={handleInput}
                placeholder="Search a task to connect"
            />
            {search.task !== undefined && handleSearch()}
            {isItemSelected && (
                <div className={styles.RefList}>
                    <div>Click to Connect</div>
                    <Button
                        type="button"
                        color="secondary"
                        onclick={handleConnect}
                    >
                        {search.task}
                    </Button>
                </div>
            )}
        </div>
    )
}
