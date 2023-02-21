import React, { useState, PropsWithChildren } from 'react'
import Button from '../Button/index'

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
        <>
            <Button
                type="button"
                color="primary"
                onclick={() => setIsOpen(true)}
            >
                Edit
            </Button>
            <ModalContainer isOpen={isOpen} closeModal={closeModal}>
                {props.children}
            </ModalContainer>
        </>
    )
}
