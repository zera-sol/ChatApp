'use client'
import { useState, useEffect } from "react";
import styles from "./adminListUser.module.css";
import Image from "next/image";

export default function AdminListUsers({ users }) {
    const [displayDeleteId, setDisplayDeleteId] = useState(null); // Track the user ID for deletion
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [displayMessage, setDisplayMessage] = useState(false);

    const handleDisplay = (userId) => {
        setDisplayDeleteId(userId); // Set the ID of the user to delete
    };

    const removeDisplay = () => {
        setDisplayDeleteId(null); // Reset the ID to hide the popup
    };

    const handleClickOutside = (event) => {
        const popup = document.getElementById("popup");
        if (popup && !popup.contains(event.target)) {
            removeDisplay(); // Hide the popup
        }
    };

    const handleClickOutsideMessage = (event) => {
        const popup = document.getElementById("popupMessage");
        if (popup && !popup.contains(event.target)) {
            setDisplayMessage(false); // Hide the message
        }
    };

    useEffect(() => {
        // Add event listener to handle clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutsideMessage);
    
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutsideMessage);
        };
    }, []);

    const handleDelete = async (id) => {
        console.log(`Deleting user with ID: ${id}`); // Debugging log
        fetch(`http://localhost:3000/api/auth/register/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res); // Debugging log for the response
                return res.json();
            })
            .then((data) => {
                console.log(data); // Debugging log for the data
                if (data) {
                    setDisplayMessage(true);
                    setSuccess(data.message ? data.message : null);
                    setError(data.error ? data.error : null);
                } else {
                    setDisplayMessage(true);
                    setError(data.error ? data.error : "An error occurred");
                }
            })
            .catch((err) => {
                console.error(err); // Log any errors
                setDisplayMessage(true);
                setError(err.message);
            });
    };

    return (
        <div className={styles.container}>
            {users.map((user) => (
                <div key={user._id}>
                    <div className={styles.user}>
                        <div className={styles.userImage}>
                            <Image src={user?.img || "/noavatar.png"} alt={user?.name} fill className={styles.pp} />
                        </div>
                        <div className={styles.userDetail}>
                            <p>
                                <span className={styles.email}> {user?.email}</span>
                            </p>
                        </div>
                        <button className={styles.btnDelete} onClick={() => handleDisplay(user._id)}>Delete user</button>
                    </div>
                    {displayDeleteId === user._id && ( // Show the confirmation only for the selected user
                        <div className={styles.active}>
                            <p>Are you sure you want to delete this user?</p>
                            <div className={styles.btns} id='popup'>
                                <button className={styles.btnYes} onClick={() => handleDelete(user._id)}>Yes</button>
                                <button className={styles.btnNo} onClick={removeDisplay}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <div className={`${displayMessage ? styles.active : styles.confirmDelete} ${error ? styles.error : ""} ${success ? styles.success : ''}`}>
                <button className={styles.closeIcon} onClick={() => setDisplayMessage(false)}>X</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </div>
        </div>
    );
}
