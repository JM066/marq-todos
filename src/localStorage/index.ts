import { LOCAL_STORAGE } from './index.type'

function getLocalStorage(item: LOCAL_STORAGE) {
    return localStorage.getItem(item)
}

export function setLocalStorage<T>(item: LOCAL_STORAGE, value: T) {
    localStorage.setItem(item, JSON.stringify(value))
}

export function removeLocalStorage(item: LOCAL_STORAGE) {
    localStorage.removeItem(item)
}

export default getLocalStorage

export { LOCAL_STORAGE as LOCAL_STORAGE_KEY }
