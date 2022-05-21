import React from 'react'
import Logo from '../logo'
import styles from './index.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footContent}>
            <Logo/>

        </div>
    </footer>
  )
}
