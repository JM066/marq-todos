import React, { useState } from 'react'
import { TodoList } from '../../redux/todo/todoSlice.type'
interface ISearch {
    id: string
    list: TodoList
    idList: string[]
    connect: (id: string, refId: string) => void
}

export default function Search(props: ISearch) {
    const [search, setSearch] = useState<{ [key: string]: string }>({
        id: '',
        task: '',
    })
    const handleSelect = (item: string, id: string) => {
        setSearch({ id: id, task: item })
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({
            id: '',
            task: e.currentTarget.value.toLocaleLowerCase() || '',
        })
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
            <button onClick={() => props.connect(props.id, search.id)}>
                {search.id}
            </button>
        </div>
    )
}
