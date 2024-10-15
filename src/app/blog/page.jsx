import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

// Fetch data from the API
const getData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
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

// Blogpage Component
export default async function Blogpage() {
  const posts = await getData(); // Await for the data

  return (
    <div className={styles.container}>
      {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))
      }
    </div>
  );
}
