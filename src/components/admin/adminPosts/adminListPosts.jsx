import Link from "next/link";
import styles from "./adminListPost.module.css"
import { FaCheckCircle } from 'react-icons/fa';

export default function AdminListPosts({posts}) {
    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post._id}>
                    <Link href={`/blog/${post._id}`} className={styles.title}>
                       <FaCheckCircle /> {post.title}</Link>
                </div>
            ))}
        </div>
    )
}