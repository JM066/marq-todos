import React, { useState } from 'react'
import useUpdateTodo from '../../hook/useUpdateTodo'
import { TodoList } from '../../redux/todo/todoSlice.type'
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
    const { updateTodo } = useUpdateTodo<TodoList>(
        'connect',
        props.list,
        props.id,
        search.id
    )
    const handleSelect = (item: string, id: string) => {
        setSearch({ id: id, task: item })
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({
            id: '',
            task: e.currentTarget.value.toLocaleLowerCase() || '',
        })
    }
    const handleConnect = async () => {
        await updateTodo()
        props.reload()
    }
    const handleSearch = () => {
        return (
            <div>
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
        <div>
            <input
                type="text"
                value={search.task}
                onChange={(e) => handleInput(e)}
            />
            {search.task !== undefined && handleSearch()}
            <button onClick={handleConnect}>{search.id}</button>
        </div>
    )
}
