import React, { useState, PropsWithChildren } from 'react'
import Button from '../Button/index'
import ModalContainer from '../ModalContainer'
interface IEdit {
    id: string
    type: 'connect' | 'edit'
}
export default function EditContainer(props: PropsWithChildren<IEdit>) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Button
                type="button"
                color="primary"
                onclick={() => setIsOpen(true)}
            >
                {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
            </Button>
            <ModalContainer isOpen={isOpen} closeModal={closeModal}>
                {props.children}
            </ModalContainer>
        </>
    )
}
