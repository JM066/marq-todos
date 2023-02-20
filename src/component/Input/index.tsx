import styles from './Input.module.css'
interface IInput {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
}
export default function Input(props: IInput) {
    return (
        <input
            type="text"
            className={styles.Input}
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
        ></input>
    )
}
