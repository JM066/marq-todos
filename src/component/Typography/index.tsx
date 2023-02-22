import React from 'react'
import classNames from 'classnames'
import styles from './Typography.module.css'
interface ITypography {
    as?: React.ElementType
    color?: 'primary' | 'seconary' | 'tertiary'
    alignEnd?: boolean
    classname?: string
    onclick?: () => void
}
export default function Typography(
    props: React.PropsWithChildren<ITypography>
) {
    const Text = props.as || 'div'
    const handleSize = () => {
        if (props.as === 'h1') {
            return 'large'
        }
        if (props.as === 'h2') {
            return 'medium'
        }
        return 'small'
    }

    return (
        <Text
            className={classNames(
                styles.Typography,
                styles[props.color || ''],
                { [styles.alignEnd]: props.alignEnd },
                styles[handleSize()],
                props.classname
            )}
            onClick={props.onclick}
        >
            {props.children}
        </Text>
    )
}
