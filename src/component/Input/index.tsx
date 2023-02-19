interface IInput {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
}
export default function Input(props: IInput) {
    return (
        <input
            type="text"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
        ></input>
    )
}
