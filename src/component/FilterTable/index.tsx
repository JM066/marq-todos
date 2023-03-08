import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTodolistKeys } from '../../redux/todo/todoSlice'
import { TodoList } from '../../redux/todo/todoSlice.type'
import { RootState } from '../../redux/store'
import usePagination from '../../hook/usePagination'
import TableFooter from '../TableFooter/index'
import Task from '../Task/index'
import EditContainer from '../EditContainer/index'
import Search from '../Search/index'
import Delete from '../Delete/index'
import TagList from '../TagList/index'
import Edit from '../Edit/index'
import Typography from '../Typography'
import styles from './FilterTable.module.css'

interface IFilterTable {
    page: number
    range: number
    todoList: TodoList
    filteredList: string[]
    getTodos: () => void
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function FilterTable(props: IFilterTable) {
    const todoListKeys = useSelector((state: RootState) =>
        getTodolistKeys(state)
    )
    const { data } = usePagination(props.range, props.page, props.filteredList)
    useEffect(() => {
        if ((props.page - 1) * props.range >= data.length)
            props.setPage(props.page - 1)
    }, [])
    return (
        <div className={styles.TodoListWrapper}>
            <ul className={styles.TodoList}>
                {data?.map((id: any, i: number) => (
                    <li className={styles.TodoContainer} key={i}>
                        <div className={styles.TodoItem}>
                            <div className={styles.TodoTitle}>
                                <Task id={id} reload={props.getTodos} />
                                <TagList id={id} reload={props.getTodos} />
                            </div>

                            <div className={styles.ActionContainer}>
                                <div className={styles.Actions}>
                                    <EditContainer id={id} type="connect">
                                        <Search
                                            id={id}
                                            list={props.todoList}
                                            idList={todoListKeys}
                                            reload={props.getTodos}
                                        />
                                    </EditContainer>
                                    <EditContainer id={id} type="edit">
                                        <Edit
                                            id={id}
                                            list={props.todoList}
                                            reload={props.getTodos}
                                        />
                                    </EditContainer>
                                    <Delete
                                        id={id}
                                        list={props.todoList}
                                        reload={props.getTodos}
                                    />
                                </div>
                                <Typography
                                    as="p"
                                    color="tertiary"
                                    alignEnd={true}
                                >
                                    {
                                        new Date(props.todoList[id].postedAt)
                                            .toString()
                                            .split('GMT')[0]
                                    }
                                </Typography>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <TableFooter
                page={props.page}
                data={props?.filteredList}
                range={5}
                setPage={props.setPage}
            />
        </div>
    )
}
