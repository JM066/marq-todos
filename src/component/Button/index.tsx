import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'
interface IButton {
    type: 'button' | 'submit' | 'reset' | undefined
    color?: 'primary' | 'secondary'
    onclick?: () => void
    classname?: string
}
export default function Button(props: React.PropsWithChildren<IButton>) {
    return (
        <button
            onClick={props.onclick}
            className={classNames(
                styles.Button,
                styles[props.color || ''],
                props.classname
            )}
            type={props.type || 'button'}
        >
            {props.children}
        </button>
    )
}
