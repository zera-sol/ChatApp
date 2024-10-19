"use client";

import styles from "./registerForm.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    passwordRepeat:'',
    img:''
  })
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
//this is to add onchange functionality in each input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
//function called when a form is submitted
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData)

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess('User registered successfully!');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      });
      router.push("/login")
    } else {
      setError(data.message || 'Registration failed!');
    }
  } catch (err) {
    setError('An error occurred!');
  }
}
  useEffect(() => {}, []);
  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <input 
           type="text" 
           placeholder="username" 
           name="username" 
           value={formData.username}
           onChange={handleChange}
           required/>
      <input 
           type="email" 
           placeholder="email" 
           name="email" 
           value={formData.email}
           onChange={handleChange}
           required/>
      <input 
          type="password" 
          placeholder="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          required/>
      <input
          type="password"
          placeholder="password again"
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={handleChange}
          required/>
      <button type="submit">Register</button>
      <Link href="/login"> Have an account? <b>Login</b> </Link>
    </form>
  );
};

export default RegisterForm;
