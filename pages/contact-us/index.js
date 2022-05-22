import React,{useState,useEffect} from 'react'
import Header from '../../components/Header'
import styles from '../index.module.scss'
import Footer from '../../components/Footer'
import axios from 'axios'
import Notification from '../../components/Notification'

export default function ContactUs() {

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const [notification,setNotification] = useState(false)

    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        
        if(process.env.NEXT_PUBLIC_APP_API_ENDPOINT){
            const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/contacts`,{
                firstname : firstName,
                lastname : lastName,
                email:email,
                message : message
            })
            if(!res?.data?.error){
                setNotification({
                    text : res.data.message,
                    type:"success"
                })
                return
            }
            setNotification({
                text : res.data.message,
                type:"error"
            })
        }
    }
    useEffect(()=>{
        (adsbygoogle = window.adsbygoogle || []).push({});
      },[])
    return (
        <div className={styles.contactUs}>
            <Notification
                notification={notification}
                onClose={()=>{setNotification(false)}}
            />
            <Header/>   
            <div className={styles.head}>
                <br></br>
                <p>Any question ?</p>
                <br></br>
                <h1>Contact Discover AI</h1>
            </div>
            <br></br>

            <div className={styles.content}>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <h2>Send Us a Message</h2>
                    <br></br>
                    <div className={styles.formItem}>
                        <label data-end="*">Last Name </label>
                        <input type={"text"} placeholder='ex : DHOE ' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
                    </div>
                    <br></br>
                    <div className={styles.formItem}>
                        <label data-end="*">First Name </label>
                        <input type={"text"} placeholder='ex : John' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </div>
                    
                    <br></br>
                    <div className={styles.formItem}>
                        <label data-end="*">Email </label>
                        <input type={"text"} placeholder='ex : example@gmal.com' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <br></br>
                    <div className={styles.formItem}>
                        <label data-end="*">Message </label>
                        <textarea
                            rows={5}
                            value={message} onChange={(e)=>{setMessage(e.target.value)}}
                            required
                        >

                        </textarea>                    
                    </div>

                    <div>
                        <input type={"submit"} value={"Send"}/>
                    </div>
                    
                </form>
                <div className={styles.txt}>
                     " Do you have any questions for us or do you want our teams to work on a tool that you find very useful ? Do not hesitate to contact us, our team will answer you as soon as possible."
                     <svg fill='#fff' preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="9.3 10.2 45.4 43.6" zoomAndPan="magnify" role="img" aria-label="email"><g id="__id12_shcm2e67k"><path d="M16.3,53.8h31.4c3.4,0,7-1.8,7-7V31.2c0-2.1-0.6-3.7-1.7-4.9l0,0c-0.2-0.3-0.6-0.3-0.9-0.1l-1.9,1.2V11.7 c0-0.9-0.8-1.5-1.8-1.5H14.7c-1,0-1.8,0.7-1.8,1.5v15.1L12,26.2c-0.3-0.2-0.7-0.1-1,0.1l0,0c-1.5,1.7-1.7,4-1.7,4.9v15.6 C9.3,50.2,11.2,53.8,16.3,53.8z M47.7,52.3H16.3c-2.6,0-4-1.1-4.7-2.4L27.4,38l4.2,2.7c0,0,0,0,0,0c0,0,0,0,0,0 c0.1,0,0.2,0.1,0.3,0.1c0,0,0,0,0,0s0,0,0,0c0.1,0,0.2,0,0.3-0.1c0,0,0,0,0,0c0,0,0,0,0,0l4.1-2.6l15.9,12 C51.1,52.1,48.6,52.3,47.7,52.3z M53.2,46.8c0,0.7-0.1,1.3-0.2,1.8L37.8,37.2l14.4-9.3c0.6,0.9,0.9,2,0.9,3.4V46.8z M14.4,11.8 c0,0,0.1-0.1,0.3-0.1h33.6c0.2,0,0.2,0.1,0.3,0v16.7L32,39.2L14.4,27.8L14.4,11.8z M10.8,31.2c0-0.6,0.1-2.1,0.9-3.4l14.3,9.3 L11,48.5c-0.2-0.7-0.2-1.3-0.2-1.7V31.2z" style={{fill: "inherit"}}></path><path d="M34.1,28.6c0.1-0.2,0.1-0.4,0.1-0.5c0-0.2-0.1-0.3-0.2-0.4c-0.2-0.1-0.4-0.2-0.6-0.1c-0.4,0.1-0.8,0.1-1.3,0.1 c-3,0-5.4-2.4-5.4-5.4c0-3,2.4-5.4,5.4-5.4c3,0,5.4,2.4,5.4,5.4c0,0.9-0.2,1.8-0.6,2.5c-0.1,0.2-0.5,0.7-0.9,0.8h-0.2 c-0.2,0-0.2-0.5-0.2-0.5v-2.8c0-2.1-1.6-3.8-3.6-3.8c-2,0-3.6,1.7-3.6,3.8c0,2.1,1.6,3.8,3.6,3.8c0.8,0,1.5-0.3,2.2-0.8v0.1 c0,0.4,0.1,0.7,0.3,1.1c0.3,0.4,0.7,0.6,1.3,0.6c0.1,0,0.3,0,0.4,0c0.7-0.2,1.3-0.7,1.8-1.5l0-0.1c0.5-0.9,0.7-2,0.7-3.1 c0-3.8-3.1-6.8-6.8-6.8c-3.8,0-6.9,3.1-6.9,6.8c0,3.8,3.1,6.9,6.9,6.9c0.6,0,1.1-0.1,1.7-0.2C33.9,28.9,34,28.7,34.1,28.6z M32,24.6c-1.2,0-2.1-1-2.1-2.3c0-1.3,1-2.3,2.1-2.3c1.2,0,2.2,1.1,2.2,2.3C34.2,23.5,33.2,24.6,32,24.6z" ></path></g></svg>
                </div>
            </div>
            <ins className="adsbygoogle"
                style={{display:"block"}}
                data-ad-client="ca-pub-5455960452945884"
                data-ad-slot="5832080832"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <Footer/>
        </div>
    )
}
