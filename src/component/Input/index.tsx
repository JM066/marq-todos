import styles from './Input.module.css'
import classNames from 'classnames'
interface IInput {
    text: string
    onchange: (e: string) => void
    placeholder?: string
    classname?: string
}
export default function Input(props: IInput) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onchange(e.currentTarget.value)
    }

    return (
        <input
            type="text"
            className={classNames(styles.Input, props.classname)}
            value={props.text}
            onChange={handleChange}
            placeholder={props.placeholder || ''}
        />
    )
}
