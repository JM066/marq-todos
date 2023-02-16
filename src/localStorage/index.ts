import { LOCAL_STORAGE } from './index.type'

function getLocalStorage(item: LOCAL_STORAGE) {
    return localStorage.getItem(item)
}

export function setLocalStorage(item: LOCAL_STORAGE, value: string) {
    localStorage.setItem(item, value)
}

export function removeLocalStorage(item: LOCAL_STORAGE) {
    localStorage.removeItem(item)
}

export default getLocalStorage
export { LOCAL_STORAGE as LOCAL_STORAGE_KEY }
