import styles from './postCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function PostCard(){
    return(
      <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src='/post.jpg' alt="" fill className={styles.img}/>
                </div>
                <span className={styles.date}>01.01.2024</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>Title</h1>
                <p className={styles.desc}>Description</p>
                <Link className={styles.link} href='/blog/post'>READ MORE</Link>
            </div>
      </div>
    )
}