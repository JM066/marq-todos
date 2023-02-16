export function concatId<S>(idList: S[], id: S) {
    return [...new Set(idList.concat(id))]
}
export function concatEntities<T>(
    baseObject: { [key: string]: T },
    toConcat: { [key: string]: T }
) {
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
