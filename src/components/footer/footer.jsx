import styles from "./footer.module.css"
export default function Footer(){
    return(
        <div className={styles.container}>
            <div className={styles.logo}>zeraDev</div>
            <div className={styles.text}>Zera Creative Thoughts agency @ All rights reserved</div>
        </div>
    )
}