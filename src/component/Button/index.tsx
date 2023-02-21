import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'
interface IButton {
    type: 'button' | 'submit' | 'reset' | undefined
    color?: 'primary' | 'secondary'
    size?: 'max' | 'min'
    onclick?: () => void
    classname?: string
}
export default function Button(props: React.PropsWithChildren<IButton>) {
    const handlSize = () => {
        if (props.size) {
            return props.size
        }
        return 'small'
    }

    return (
        <button
            onClick={props.onclick}
            className={classNames(
                styles.Button,
                styles[props.color || ''],
                styles[handlSize()],
                props.classname
            )}
            type={props.type || 'button'}
        >
            {props.children}
        </button>
    )
}
