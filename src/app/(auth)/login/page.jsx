'use client';
import { signIn } from 'next-auth/react';
import styles from './login.module.css'

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <button onClick={() => signIn('github')} className={styles.btn}>
        Sign in with GitHub
      </button>
      <button onClick={() => signIn('google')} className={styles.btn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
