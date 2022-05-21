import React,{useState} from 'react'
import styles from './index.module.scss'

export default function Cookies({handleOk,handleConfigure}) {
    return (
        <div className={styles.cookies}>
            <div className={styles.flex}>
                <div>
                We use cookies on our site to enhance our users' experience. By continuing on our site you agree to their use.            </div>
                <div className={styles.cookiesBtn}>
                    <div onClick={handleOk}>OK</div>
                    <div onClick={handleConfigure}>Configure</div>
                </div>
            </div>
            <div className={styles.close}>x</div>
        </div>
    )
}
