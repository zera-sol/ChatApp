import styles from './singlePost.module.css';
import Image from 'next/image';
export default function SingleBlogPage(){
    return(
        <div className={styles.container}>       
            <div className={styles.imgContainer}>
                <Image src='/post.jpg' alt="" fill className={styles.img} />
            </div>       
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.detail}>    
                    <Image 
                          className={styles.avatar}
                          src='/post2.webp' 
                          alt='' 
                          height={50}
                          width={50} />            
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>Zerihun Solomon</span>
                    </div>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>
                </div>
                <div className={styles.content}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro doloribus eligendi ipsa, inventore accusantium excepturi vero atque? Fugit commodi, ea excepturi nulla distinctio eveniet, deleniti at perferendis alias porro ad!</div>
            </div>
      </div>
    )
}