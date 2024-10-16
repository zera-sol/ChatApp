// src/components/navbar/navbar.jsx
'use client'; // Ensure this is a client component
import Link from "next/link";
import styles from './navbar.module.css';
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"; // Import useSession
import { signOut } from 'next-auth/react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();
    const { data: session } = useSession(); // Get session data
    const isAdmin = session?.user?.role === 'admin'; // Example: check if user is admin

    const links = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
        { title: 'Blog', path: '/blog' },
    ];

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.logo}>Logo</div>
                <div className={`${styles.navlink}`}>
                    {links.map(link => (
                        <Link href={link.path} key={link.title} className={`${pathName === link.path && styles.active}`}>
                            {link.title}
                        </Link>
                    ))}
                    {session ? (
                        <>
                            {isAdmin && (
                                <Link href='/admin' className={`${pathName === '/admin' && styles.active}`}>
                                    Admin
                                </Link>
                            )}
                            <button className={styles.logoutButton} onClick={() => signOut()}>Logout</button>
                        </>
                    ) : (
                        <Link href='/login' className={`${pathName === '/login' && styles.active}`}>
                            Login
                        </Link>
                    )}
                </div>
                <Image 
                    src="/menu.png" 
                    alt="" 
                    width={30} 
                    height={30} 
                    onClick={() => setOpen(prev => !prev)} 
                    className={styles.navMenu} 
                />
            </div>
            {open && 
                <div className={`${styles.navlink_small_screen}`}>
                    {links.map(link => (
                        <Link href={link.path} key={link.title} className={`${pathName === link.path && styles.active}`}>
                            {link.title}
                        </Link>
                    ))}
                    {session ? (
                        <>
                            {isAdmin && (
                                <Link href='/admin' className={`${pathName === '/admin' && styles.active}`}>
                                    Admin
                                </Link>
                            )}
                            <button className={styles.logoutButton}>Logout</button>
                        </>
                    ) : (
                        <Link href='/login' className={`${pathName === '/login' && styles.active}`}>
                            Login
                        </Link>
                    )}
                </div>
            }
        </div>
    );
}
