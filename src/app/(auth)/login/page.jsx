'use client';
import { signIn } from 'next-auth/react';
import styles from './login.module.css'
import LoginForm from '@/components/loginForm/loginForm';
import Link from "next/link"
import { FaGithub } from 'react-icons/fa';  // GitHub icon from Font Awesome
import { FcGoogle } from 'react-icons/fc';  // Google icon (flat color)

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>      
      <LoginForm />
      <div className={styles.loginBySocialMedia}>
        <button onClick={() => signIn('github')} className={styles.btn}>
            <FaGithub className={styles.icon}/>Sign in with GitHub
        </button>
        <button onClick={() => signIn('google')} className={styles.btn}>
            <FcGoogle className={styles.icon}/> Sign in with Google
        </button> 
      </div>     
      <Link href="/register">{"Don't have an account?"} <b>Register</b> </Link>
    </div>
  );
};

export default LoginPage;
