import React from 'react'
import Tag from '../Tag/index'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { getTodoList } from '../../redux/todo/todoSlice'

export interface ITagList {
    id: string
    reload: () => void
}

export default function TagList(props: ITagList) {
    const todoList = useSelector((state: RootState) => getTodoList(state))
    return (
        <div>
            Tags:
            {todoList[props.id]?.connection.map((refId, i) => (
                <Tag
                    key={i}
                    id={props.id}
                    list={todoList}
                    refId={refId}
                    reload={props.reload}
                >
                    {todoList[refId]?.item}
                </Tag>
            ))}
        </div>
    )
}
