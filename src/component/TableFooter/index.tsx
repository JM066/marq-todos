import React from 'react'
import Button from '../Button/index'
import styles from './TableFooter.module.css'

interface ITableFooter {
    data: string[]
    range: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function TableFooter(props: ITableFooter) {
    return (
        <div className={styles.FooterContainer}>
            <div className={styles.PageWrapper}>
                {new Array(Math.ceil(props.data.length / props.range))
                    .fill(0)
                    .map((_a, i) => (
                        <div>
                            <Button
                                type="button"
                                key={i}
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
