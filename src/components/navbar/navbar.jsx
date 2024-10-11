'use client'
import Link from "next/link";
import styles from './navbar.module.css'
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Navbar(){
    const [open, setOpen] = useState(false)
    const pathName = usePathname()
    const links = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Contact',
            path: '/contact'
        },
        {
            title: 'Blog',
            path: '/blog'
        },
    ]
    const session = true;
    const isAdmin = true;
    return(
        <div>
            <div className={styles.container}>
                <div className={styles.logo}>Logo</div>
                <div className={`${styles.navlink}`}>
                {links.map((link => (
                    <Link href={link.path} key={link.title} className={`${pathName === link.path && styles.active}`}>
                        {link.title}
                    </Link>
                )))}
                {
                    session ? (
                        isAdmin && (
                            <>
                                <Link href='/admin' className={`${pathName === '/admin' && styles.active}`}>
                                    Admin
                                </Link>
                                <button className={styles.logoutButton}>Logout</button>
                            </>
                        )
                    ):(
                        <Link href='/login' className={`${pathName === '/login' && styles.active}`}>
                            Login
                        </Link>
                    )
                }
                </div>
                <button className={styles.navMenu} onClick={() => setOpen(prev => !prev)}>Menu</button>
            </div>
            {open && 
                <div className={`${styles.navlink_small_screen}`}>
                {links.map((link => (
                    <Link href={link.path} key={link.title} className={`${pathName === link.path && styles.active}`}>
                        {link.title}
                    </Link>
                )))}
                {
                    session ? (
                        isAdmin && (
                            <>
                                <Link href='/admin' className={`${pathName === '/admin' && styles.active}`}>
                                    Admin
                                </Link>
                                <button className={styles.logoutButton}>Logout</button>
                            </>
                        )
                    ):(
                        <Link href='/login' className={`${pathName === '/login' && styles.active}`}>
                            Login
                        </Link>
                    )
                }
                </div>
            }
        </div>
    )
}