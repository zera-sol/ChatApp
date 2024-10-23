'use client'
import AdminListPosts from '@/components/admin/adminPosts/adminListPosts';
import styles from './admin.module.css';
import AdminAddPost from '@/components/admin/adminPosts/adminAddPost';
import AdminListUsers from '@/components/admin/adminUsers/adminListUsers';
import AdminAddUsers from '@/components/admin/adminUsers/adminAddUsers';
import { useEffect, useState } from 'react';
    
const getUser = async () => {
    try {
     const res = await fetch('http://localhost:3000/api/users')
  
     if(!res.ok){
         const errMessage = await res.json();
         throw new Error(errMessage.error)
     }
     const users = await res.json();
        return users;
    } catch (error) {
      throw new Error(error)
    }
 
 }
 const getPost = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/blog")
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        alert(error.message)
        throw new Error(error)
    }
 }

export default function AdminPage() {
const [error, setError] = useState("");
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);

 useEffect(() => {
    getUser().then((data) => {
        setUsers(data);
    }).catch((error) => {    
        setError(error.message);
    });

    getPost().then((data) => {
        setPosts(data);
    }).catch((error) => {
        setError(error.message);
    })
 }, [])
 
    return (
        <div className={styles.container}>            
            <h3 className={styles.title}>Manage Posts</h3>
            {error && alert(error)}
            <div className={styles.row}>
                <div className={styles.col}>
                    <AdminListPosts posts={posts}/>
                </div>
                <div className={styles.col}>
                    <AdminAddPost />
                </div>
            </div>                        
            <h3 className={styles.title}>Manage Users</h3>
            <div className={styles.row}> 
                <div className={styles.col}>
                    <AdminListUsers users={users} />
                </div>
                <div className={styles.col}>
                    <AdminAddUsers />
                </div>
            </div>
        </div>
    )
}