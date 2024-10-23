"use Client"
import { FaUpload } from "react-icons/fa"
import styles from "./adminAddPost.module.css"
import { useState } from "react"
import { useSession } from "next-auth/react"; 

export default function AdminAddPost() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [fullText, setFullText] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession();
    const userId = session?.user?.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       const formData = new FormData()
       formData.append("title", title)
       formData.append("desc", desc)
       formData.append("img", img)
       formData.append("fullText", fullText)
       formData.append("userId", userId)
       
       setLoading(true)
       try {
        const res = await fetch("http://localhost:3000/api/blog", {
            method: "POST",
            body:formData,
        })

        const data = await res.json()
        if(res.ok){
           setError(data.message)
           setTitle("")
           setDesc("")
           setImg("")
           setFullText("")
           window.location.reload()
        }else{
            setError(data.error)
        }    

       } catch (error) {
             setError(error.message)
             throw new Error(error)
       }
       setLoading(false)
    }
    return (
        <div className ={styles.container}>
              <form onSubmit={handleSubmit} className={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <input 
                        type="text" 
                        placeholder="Summary" 
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}/>
                    <div className={styles.image_upload_container}>
                        <label>Upload post image</label>
                        <input 
                            type="file" 
                            id="post-img"
                            accept="/images/*"
                            style={{display: 'none'}} 
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label htmlFor="post-img" className={styles.upload_icon}>
                                <FaUpload size={34} />
                        </label>
                    </div>
                    <textarea
                        name="fullText"
                        id="fullText"
                        cols="30"
                        rows="10"
                        placeholder="fullText of the post"
                        value={fullText}
                        onChange={(e) => setFullText(e.target.value)}
                    ></textarea>
                    <button>{loading? "Posting....":"Add post"}</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
        </div>
    )
}