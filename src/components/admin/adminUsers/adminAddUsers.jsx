'use Client';
import styles from "./adminAddUser.module.css";
import { FaUpload } from 'react-icons/fa';
import { useState } from "react";
import { url } from "@/lib/url";

export default function AdminAddUsers() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [img, setImg] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Passwords do not match");
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("repeatPassword", repeatPassword);
        if (img) {
            formData.append("img", img);  // Append the image file if it exists
        }
        formData.append("isAdmin", isAdmin); // Append as boolean

        setLoading(true); // Set loading to true

        try {
            const res = await fetch(`${url}/api/auth/register`, {
                method: 'POST',
                body: formData, // Send the FormData
            });

            const data = await res.json();
            if (res.ok) {
                // Reset form fields
                setUsername('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');
                setImg(null);
                setIsAdmin(false);
                window.location.reload(); // Reload after resetting fields
            } else {
                setError(data.message || 'Registration failed!');
            }
        } catch (error) {
            setError(error.message || 'An error occurred while submitting the form');
        } finally {
            setLoading(false); // Reset loading state
        }

        // Log each entry in FormData for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    name="username"
                    type="text" 
                    placeholder="Name or Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                <input 
                    name="repeatPassword"
                    type="password" 
                    placeholder="Confirm Password"
                    value={repeatPassword} 
                    onChange={(e) => setRepeatPassword(e.target.value)} />
                <select name="role" id="role" className={styles.select} onChange={(e) => setIsAdmin(e.target.value === "yes")}>
                    <option value="" disabled>isAdmin</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <div className={styles.image_upload_container}>
                    <label>Upload profile picture</label>
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"   // Ensures only image files are allowed
                        style={{ display: 'none' }}  // Hide the default file input
                        onChange={(e) => setImg(e.target.files[0])} // Handle file selection
                    />
                    <label htmlFor="file-input" className={styles.upload_icon}>
                        <FaUpload size={24} />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding User..." : "Add User"}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
