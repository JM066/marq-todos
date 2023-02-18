import { TodoList } from '../redux/todo/todoSlice.type'

export function concatId<S>(idList: S[], id: S) {
    return [...new Set(idList.concat(id))]
}
export function concatEntities<T>(baseObject: T, toConcat: T) {
    return Object.assign({}, baseObject, toConcat)
}
export function removeEntities(baseObejct: TodoList, id: string) {
    delete baseObejct[id]
    return baseObejct
}
export function removeRefId(baseObject: TodoList, arr: string[], item: string) {
    arr.forEach((id: string) => {
        baseObject[id]?.connection.filter((refId) => refId !== item)
    })
    return baseObject
}
