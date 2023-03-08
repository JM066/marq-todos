import Button from '../Button/index'
import styles from './TableFooter.module.css'

interface ITableFooter {
    data: string[]
    page: number
    range: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function TableFooter(props: ITableFooter) {
    return (
        <div className={styles.FooterContainer}>
            <div className={styles.PageWrapper}>
                {Array.from({
                    length: Math.ceil(props.data.length / props.range),
                }).map((_a, i) => (
                    <div key={i}>
                        <Button
                            type="button"
                            key={i}
                            selected={props.page === i + 1}
                            classname={styles.PageNum}
                            onclick={() => props.setPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
