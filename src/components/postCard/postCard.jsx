import styles from './postCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
export default function PostCard({post}){
    return(
      <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src={post.img?post.img:"/post.jpg"} alt="" fill className={styles.img}/>
                </div>
                <span className={styles.date}>{post.createdAt.slice(0, 10).split("-").join(".")}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.body}</p>
                <Link className={styles.link} href={`/blog/${post._id}`}>READ MORE</Link>
            </div>
      </div>
    )
}