import PostUser from '@/components/postUser/postUser';
import styles from './singlePost.module.css';
import Image from 'next/image';

// Fetch data from the API
const getData = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "GET",
      }, {catch: 'no-store'});
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return []; 
    }
  };
export default async function SingleBlogPage({params}) {
    const post = await getData(params.id)
    console.log(post.id)

        return (
            <div className={styles.container}>       
                <div className={styles.imgContainer}>
                    <Image
                        src='/post.jpg'
                        alt=""
                        fill /* Allows the image to fill its container */
                        objectFit="cover" /* Ensures the image covers the container */
                        className={styles.img}
                    />
                </div>       
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.detail}>    
                        <Image 
                            className={styles.avatar}
                            src='/post2.webp' 
                            alt='' 
                            height={50}
                            width={50}
                        />      
                        <PostUser userId = {post.userId}/>
                        <div className={styles.detailText}>
                            <span className={styles.detailTitle}>Published</span>
                            <span className={styles.detailValue}>01.01.2024</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        {post.body}
                    </div>
                </div>
            </div>
        )
}
