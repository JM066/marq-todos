import React from 'react'
import Modal from 'react-modal'

interface IModalContainer {
    isOpen: boolean
    closeModal: () => void
}

export default function ModalContainer(
    props: React.PropsWithChildren<IModalContainer>
) {
    return (
        <Modal
            isOpen={props.isOpen}
            style={{
                overlay: {
                    background: 'rgba(33, 35, 39, 0.5)',
                    zIndex: 10000,
                    overflow: 'scroll',
                },
                content: {
                    outline: 'none',
                    width: '50%',
                    height: '70%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
            contentLabel="Example Modal"
        >
            <div className="w-full h-full flex flex-col">
                <div onClick={props.closeModal}>X</div>
                <div className="w-full h-full ">{props.children}</div>
            </div>
        </Modal>
    )
}
