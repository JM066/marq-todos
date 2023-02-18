import React, { useState, PropsWithChildren } from 'react'

import ModalContainer from '../ModalContainer'
interface IEdit {
    id: string
}
export default function Edit(props: PropsWithChildren<IEdit>) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Edit</button>
            <ModalContainer isOpen={isOpen} closeModal={closeModal}>
                <div>Connect Tasks</div>
                {props.children}
            </ModalContainer>
        </div>
    )
}
