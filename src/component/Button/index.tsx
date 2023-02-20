import React from 'react'
import styles from './Button.module.css'
interface IButton {
    type: 'button' | 'submit' | 'reset' | undefined
}
export default function Button(props: React.PropsWithChildren<IButton>) {
    // const handleCursor = () => {
    //     return props.disabled === true ? 'cursor-not-allowed' : 'cursor-pointer'
    // }

    // const handleClick = (
    //     ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // ) => {
    //     if (props.disabled !== true) {
    //         props.onclick(ev)
    //     }
    // }

    return (
        <button className={styles.Button} type={props.type || 'button'}>
            {props.children}
        </button>
    )
}
