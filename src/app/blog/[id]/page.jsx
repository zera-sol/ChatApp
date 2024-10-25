import PostUser from '@/components/postUser/postUser';
import styles from './singlePost.module.css';
import Image from 'next/image';
import { url } from '@/lib/url';

// Fetch data from the API
const getData = async (id) => {
    try {
      const response = await fetch(`${url}/api/blog/${id}`, {
        method: "GET",
        catch: 'no-store'
      });
  
      if (!response.ok) {
        throw new Error();
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return []; 
    }
  };

const getUser = async (id) => {
    try {
        const res = await fetch(`${url}/api/auth/register/${id}`,{
            method: "GET"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.error)
        }
        return data;
    } catch (error) {
        console.error(error)
        return [];
    }
}
  
 export const generateMetadata = async ({params}) => {
    const post = await getData(params.id);
    return {
        title: post.title,
        description: post.body
    }
 }
 
export default async function SingleBlogPage({params}) {
    const post = await getData(params.id)
    const user = await getUser(post.userId)
    
        return (
            <div className={styles.container}>       
                <div className={styles.imgContainer}>
                    <Image
                        src={post.img?post.img:"/post2.webp"}
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
                            src={user.img? user.img: "/noavatar.png"} 
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
