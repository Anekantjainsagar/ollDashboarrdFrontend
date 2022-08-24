import React from 'react'
import styles from './style.module.css'

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1>Sales Crm Login</h1>
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Passowrd' />
          <button className={styles.btn}>Login</button>
        </div>
      </div>
    </>
  )
}

export default Login