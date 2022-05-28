import React from 'react'
import styles from './index.module.scss'

export function Pub300() {
  return (
    <div className={styles.pub300}>
        <div className={styles.title}>
            <span>Advertisement</span>
        </div>
        <div className={styles.pub}> 
        </div>    
    </div>
  )
}

export function PubBanner(){
  return(
    <div className={styles.pubBanner}>
        <div className={styles.title}>
            <span>Advertisement</span>
        </div>
        <div className={styles.pub}> 
        </div>    
    </div>
  )
}
