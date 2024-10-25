"use client"
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import {useState, useEffect} from "react";
import { url } from "@/lib/url";

// Fetch data from the API

const getData = async () => {
  try {
    const response = await fetch(`${url}/api/blog`, {
      method: "GET",
      catch: 'no-store'
    })

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
export default function Blogpage() {
  const [posts, setPosts] = useState([]); // Initialize the state to store posts
   
  useEffect(() => {
    getData().then((data) => {
      setPosts(data);
    });
  }, [])
  return (
    <div className={styles.container}>
      {posts.map((post) => (
          <div className={styles.post} key={post._id}>
            <PostCard  post={post} />
          </div>
        ))
      }
    </div>
  );
}
