import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { getTodoItemById, getTodoList } from '../../redux/todo/todoSlice'
import UnFinished from './UnFinished'
import Finished from './Finished'
// import { TodoList } from '../../redux/todo/todoSlice.type'
export interface ITask {
    id: string
    reload: () => void
}
export default function Task(props: ITask) {
    const todoList = useSelector((state: RootState) => getTodoList(state))
    const todo = useSelector((state: RootState) =>
        getTodoItemById(state, props?.id)
    )
    const [isChecked, setIsChecked] = useState<boolean>(todo.done)
    const SpecificStory = isChecked ? Finished : UnFinished
    return (
        <div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
            />
            <SpecificStory
                id={props.id}
                list={todoList}
                reload={props.reload}
                isChecked={isChecked}
            >
                <div>
                    Item: {todo.item} Status: {isChecked ? 'Done' : 'Not Done'}
                </div>
            </SpecificStory>
            {/* <div>
                Item: {todo.item} Status: {todo.done ? 'Done' : 'Not Done'}
            </div> */}
            {/* {todo.done ? (
                <UnFinished
                    id={props.id}
                    list={todoList}
                    reload={props.reload}
                />
            ) : (
                <Finished id={props.id} list={todoList} reload={props.reload} />
            )} */}
        </div>
    )
}
