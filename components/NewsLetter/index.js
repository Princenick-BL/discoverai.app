import React,{useState} from 'react'
import Logo from '../logo'
import styles from './index.module.scss'
import {HorizontalNotification} from '../Notification'
import axios from 'axios'

export default function NewsLetter() {

  const [notification,setNotification] = useState(false)
  const [email,setEmail] = useState("")

  const handleSubmit = async (e) =>{

    
    if(process.env.NEXT_PUBLIC_APP_API_ENDPOINT){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/contacts`,{
          email:email,
          type : "newsletter"
      })
      if(!res?.data?.error){
          setNotification({
              text : "Welcome in our family",
              type:"success"
          })
          return
      }
      setNotification({
          text : res.data.message,
          type:"error"
      })
      setEmail("")

    }
  }

  return (
    <>
      <HorizontalNotification
        notification={notification}
        onClose={()=>{setNotification(false)}}
      />
      <div className={styles.newsletter}>
          <Logo/>
          <br></br>
          <div className={styles.nlText}>Be the first to know about our new tools <span>😉😉😉.</span></div>
          <br></br>
          <input className={styles.newletterInput} type={"text"} placeholder='email ex: *@gmail.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <br></br>
          <br></br>
          <div className="btn btnFill" onClick={()=>{handleSubmit()}}>S'abonner</div>
      </div>
    </>
  )
}

export function HorizontalNewsLetter(){

  const [notification,setNotification] = useState(false)
  const [email,setEmail] = useState("")

  const handleSubmit = async (e) =>{

    
    if(process.env.NEXT_PUBLIC_APP_API_ENDPOINT){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/contacts`,{
          email:email,
          type : "newsletter"
      })
      if(!res?.data?.error){
          setNotification({
              text : "Welcome in our family",
              type:"success"
          })
          return
      }
      setNotification({
          text : res.data.message,
          type:"error"
      })
      setEmail("")
    }
  }

  return(
    <>
      <HorizontalNotification
        notification={notification}
        onClose={()=>{setNotification(false)}}
      />
      
      <div className={styles.horizontalNewsLetter}>
        <div className={styles.content}>
          <div className={styles.left}>
            Be among the first to know when our new tools go online.
          </div>
          <div className={styles.right}>
            <input className={styles.newletterInput} type={"text"} placeholder='email ex: *@gmail.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <div className="btn btnFill" onClick={()=>{handleSubmit()}}>S'abonner</div>
          </div>  
        </div>
      </div>
    </>
  )
}
