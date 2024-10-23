"use client";

import styles from "./loginForm.module.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      alert('Login successful!');
      router.push('/')
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
           type="email" 
           placeholder="email" 
           name="email" 
           value={email}
           onChange={(e) => setEmail(e.target.value)}/>
      <input 
            type="password" 
            placeholder="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
