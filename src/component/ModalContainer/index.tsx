import React from 'react'
import Modal from 'react-modal'
import { RiCloseCircleFill } from 'react-icons/ri'
import styles from './ModalContainer.module.css'
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
                    transform: 'translate(-50%, -50%)',
                },
            }}
            contentLabel="Example Modal"
        >
            <div className={styles.ModalContainer}>
                <div onClick={props.closeModal} className={styles.Close}>
                    <RiCloseCircleFill className={styles.Icon} />
                </div>
                {props.children}
            </div>
        </Modal>
    )
}
