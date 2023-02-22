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
export function removeRefId(arr: string[], item: string) {
    return arr?.filter((refId) => refId !== item)
}

export function removeRefIds(
    baseObject: TodoList,
    arr: string[],
    item: string
) {
    if (arr.length > 0) {
        arr.forEach((id: string) => {
            if (baseObject[id] !== undefined) {
                baseObject[id].connection = removeRefId(
                    baseObject[id]?.connection,
                    item
                )
            }
            return
        })
    }

    return baseObject
}
