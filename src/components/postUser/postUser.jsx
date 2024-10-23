import styles from './postUser.module.css'

// Fetch data from the API
const getData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register/${id}`, {
        method: "GET",
      }, {catch: "no-store"});
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return []; 
    }
  };
export default async function PostUser({userId}){
    const user = await getData(userId);
    return(
        <div className={styles.container}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>{user.username}</span>
        </div>
    )
}