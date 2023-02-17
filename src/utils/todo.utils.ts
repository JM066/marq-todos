import { TodoList } from '../redux/todo/todoSlice.type'

export function concatId<S>(idList: S[], id: S) {
    return [...new Set(idList.concat(id))]
}
export function concatEntities<T>(baseObject: T, toConcat: T) {
    return Object.assign({}, baseObject, toConcat)
}
export function removeEntities<T>(
    baseObejct: { [key: string]: T },
    id: string
) {
    const state = { ...baseObejct }
    delete state[id]
    return state
}
export function removeRefId(baseObject: TodoList, arr: string[], item: string) {
    const state = { ...baseObject }
    arr.forEach((id: string) =>
        state[id].connection.filter((refId) => refId !== item)
    )
    return state
}
