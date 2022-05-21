import React,{useState,useEffect,useRef} from 'react'
import styles from './index.module.scss'
import Logo from '../logo';
import axios from 'axios';
import Notification from '../Notification';
import { useGlobalContext } from '../../GlobalContext';
import Head from 'next/head';
import GoogleLogin from '../Auth.js/googleLogin';
import { config } from '../../config';
import GoogleSignUpButton from '../Auth.js/GoogleSignUp';

export default function Modal({type,onClose}) {

    const wrapperRef = useRef(null);

    const [showPass,setShowPass] = useState(false)
    const [oAuthClientId,setoAuthClientId] = useState();
    const [gitClientId,setGitClientId] = useState(false)
    const [step,setStep] = useState(0)
    const [notification,setNotification] = useState(false)
    const [redirectUrl,setRedirectUrl] = useState(false)
    const [loginId,setLoginId] = useState(false)
    const [loginPwd,setLoginPwd] = useState(false)

    const [signupEmail,setSignUpEmail] = useState()
    const [signupName,setSignUpName] = useState()
    const [signupFName,setSignUpFName] = useState()
    const [signupPwd1,setSignUpPwd1] = useState()
    const [signupPwd2,setSignUpPwd2] = useState()
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const [currentLocation,setCurrentLocation] = useState("")
    const {state,dispatch} = useGlobalContext()

    function useOutsideAlerter(ref) {
        useEffect(() => {
    
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (type && ref.current && !ref.current.contains(event.target)) {
              onClose()
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref,type]);
    }
    useOutsideAlerter(wrapperRef);


    useEffect(()=>{
        (async()=>{
            const gapi = await import('gapi-script').then((pack) => pack.gapi);
    
            function start(){
                 gapi.auth2.init({
                    
                    clientId :  config.GOOGLE_AUTH_CLI_ID,
                    scope:""
                })
            }

             gapi.load('client:auth2',start)
        })();
    },[])

    useEffect(() => {
        setStep(0)
        setoAuthClientId(process.env.NEXT_PUBLIC_GAUTH_ID)
        setGitClientId(process.env.NEXT_PUBLIC_GIT_CLI_ID || process.env.NEXT_PUBLIC_GIT_CLI_ID_DEFAULT)
        setRedirectUrl(window.location.href)
      return
    }, [type])

    
    

    const handleLoginWithGoogle = async (data) =>{
        if(!data?.email || !data?.googleId)
            setNotification({
                text : "An error occured please try again later",
                type:"error"
            })
        const res = await axios.post(`${config.API_ENDPOINT}/login`,{
            email : data?.email,
            password : "@gmail.com"+data?.googleId+data?.email?.charAt(0),
        })
        if(!res.data?.error){
            window.localStorage.setItem("access_token", res?.data?.token);
            dispatch({
                type:"LOGIN",
                payload:res?.data?.token,
            })
            onClose(false)
            setNotification({
                text : res.data.message,
                type:"success"
            })
        }
        if(res.data?.error){
            setNotification({
                text : res.data?.message,
                type:"error"
            })
        }
        
    }


    const handleSignupWithGoogle = async (data) =>{

        try{

            const res = await axios.post(`${config.API_ENDPOINT}/register`,{
                email : data?.email,
                firstname : data?.givenName,
                lastname : data?.familyName,
                password : "@gmail.com"+data?.googleId+data?.email?.charAt(0),
                userAvatar : data?.imageUrl
            })
            if(res.status === 200){
                setNotification({
                    text : "Account created successfully . You can log in now.",
                    type:"success"
                })
                
                onClose("LOGIN")
    
            }else{
                setNotification({
                    text : res.data.message,
                    type:"error"
                })
            }
        }catch(e){
            setNotification({
                text : e.message,
                type:"error"
            })
        }
    }

   

    const login = async () =>{

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,{
            email : loginId,
            password : loginPwd
        })
        if(!res.data?.error){
            window.localStorage.setItem("access_token", res?.data?.token);
            dispatch({
                type:"LOGIN",
                payload:res?.data?.token,
            })
            onClose(false)
            setNotification({
                text : res.data.message,
                type:"success"
            })
        }
        if(res.data?.error){
            setNotification({
                text : res.data?.message,
                type:"error"
            })
        }
        
    }

    const signup = async () =>{

        try{

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`,{
                email : signupEmail,
                firstname : signupFName,
                lastname : signupName,
                password : signupPwd1
            })
            if(res.status === 200){
                setNotification({
                    text : "Account created successfully . You can log in now.",
                    type:"success"
                })
                
                onClose("LOGIN")
    
            }else{
                setNotification({
                    text : res.data.message,
                    type:"error"
                })
            }
        }catch(e){
            setNotification({
                text : e.message,
                type:"error"
            })
        }

    }

    console.log(type)
    
    useEffect(() => {

        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");
    
        // If Github API returns the code parameter
        if (hasCode) {
          const newUrl = url.split("?code=");
          window.history.pushState({}, null, newUrl[0]);
          setData({ ...data, isLoading: true });
    
          const requestData = {
            code: newUrl[1]
          };
    
        }
       

    }, [data]);

      
    return (
        <>
            <Head>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </Head>
            <Notification
                notification={notification}
                onClose={()=>{setNotification(false)}}
            />
            {type === "LOGIN" ?(

                <div className={type ? styles.modal : styles.nodisplay}>
                    <div className={styles.wrapper}>
                        <div className={styles.box} ref={wrapperRef}>
                            <div className={styles.close}>
                                <svg style={{cursor:"pointer"}} onClick={()=>{onClose(false)}} viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                            </div>
                            <form>
                                <div>
                                    <Logo style={{color:"var(--color-primary-light)",fontSize:"2em"}}/>
                                </div>
                                <br></br>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                    <input className={styles.inputText} type={"text"} placeholder='Identifiant' onChange={(e)=>{setLoginId(e.target.value)}}/>
                                    <div className={styles.inputPassword}>
                                        <input className={styles.input} type={showPass? "text": "password"} placeholder='Mot de pass' onChange={(e)=>{setLoginPwd(e.target.value)}}/>
                                        {showPass ?(
                                            <i onClick={(e)=>{setShowPass(false)}} className="fa fa-eye-slash" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                        ):(
                                            <i onClick={(e)=>{setShowPass(true)}} className="fa fa-eye" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                        )}

                                    </div>
                                    <input type={"submit"} className={styles.submitBtn} onClick={(e)=>{login()}} value="Login"/>
                                </div>
                                <br></br>
                                <div>You can try</div>
                                <br></br>
                                <div>
                                    { config.GOOGLE_AUTH_CLI_ID  &&
                                        <GoogleLogin
                                            onClose = {(e)=>{onClose()}}
                                            login={(e)=>{handleLoginWithGoogle(e)}}

                                        />
                                    }
                                    {/* {gitClientId  &&
                                        <a 
                                        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${gitClientId}&redirect_uri=${redirectUrl}`}
                                        onClick={() => {
                                            setData({ ...data, errorMessage: "" });
                                        }}>
                                            <div className={styles.github}>
                                                <i className="fa fa-github" style={{fontSize:"25px",color:"#fff",marginRight:"1rem"}}></i>
                                                Continue with GitHub
                                            </div>
                                        </a>

                                    } */}
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            ): type === "SIGNUP" ?(
                <div className={type ? styles.modal : styles.nodisplay}>
                    <div className={styles.wrapper}>

                        <div className={styles.box} ref={wrapperRef}>
                            <div className={styles.close}>
                                <svg style={{cursor:"pointer"}} onClick={()=>{onClose(false)}} viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                            </div>
                            <form>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                    <Logo style={{color:"var(--color-primary-light)",fontSize:"2em"}}/>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        {config.GOOGLE_AUTH_CLI_ID &&
                                            <GoogleSignUpButton
                                                signup={(e)=>{handleSignupWithGoogle(e)}}
                                            />
                                        }

                                        {/* {gitClientId &&
                                            <a
                                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${gitClientId}&redirect_uri=${redirectUrl}`}
                                                onClick={() => {
                                                    setData({ ...data, errorMessage: "" });
                                                }}
                                            >
                                                <div className={styles.github}>
                                                    <i className="fa fa-github" style={{fontSize:"25px",color:"#fff",marginRight:"1rem"}}></i>
                                                    Continue with GitHub
                                                </div>
                                            </a>
                                        
                                        } */}

                                    </div>
                                    <br></br>

                                    <div>OR</div>
                                    <br></br>
                                    {step === 0 ?
                                        <input className={styles.inputText} type={"email"} placeholder='Start with your email' value={signupEmail} onChange={(e)=>{setSignUpEmail(e.target.value)}}/>
                                    :(step ===1 && signupEmail)?
                                        
                                        <div>
                                            <input className={styles.inputText} type={"text"} placeholder='Last Name' value={signupName} onChange={(e)=>{setSignUpName(e.target.value)}}/>
                                            <input className={styles.inputText} type={"text"} placeholder='First Name' value={signupFName} onChange={(e)=>{setSignUpFName(e.target.value)}}/>
                                        </div>
                                    :(step ===2 && signupName && signupFName) &&
                                        <>
                                        <div className={styles.inputPassword}>
                                            
                                            <input className={styles.input} type={"text"} placeholder='Passord' value={signupPwd1} onChange={(e)=>{setSignUpPwd1(e.target.value)}}/>

                                            {showPass ?(
                                                <i onClick={(e)=>{setShowPass(false)}} className="fa fa-eye-slash" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                            ):(
                                                <i onClick={(e)=>{setShowPass(true)}} className="fa fa-eye" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                            )}
                                            
                                        </div>
                                        <div className={styles.inputPassword}>
                                            
                                            <input className={styles.input} type={"text"} placeholder='Confirm password' value={signupPwd2} onChange={(e)=>{setSignUpPwd2(e.target.value)}}/>

                                            {showPass ?(
                                                <i onClick={(e)=>{setShowPass(false)}} className="fa fa-eye-slash" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                            ):(
                                                <i onClick={(e)=>{setShowPass(true)}} className="fa fa-eye" style={{fontSize:"24px",cursor:"pointer"}}></i>
                                            )}
                                            
                                        </div>
                                        </>
                                    

                                    }
                                
                                    <div className={styles.footbtn+" "+(step === 0 && styles.centerfoot)}>
                                        {step < 2 ?(
                                            <>
                                            {step > 0 &&
                                                <div onClick={(e)=>{
                                                    if(step > 0)
                                                    setStep(step - 1)
                                                        
                                                }} className={styles.back}>{"<- Back"}</div>
                                            }
                                            <div 
                                                className={styles.submitBtn}
                                                onClick={(e)=>{
                                                    switch(step){
                                                        case 0 :
                                                            if(signupEmail){
                                                                setStep(step + 1)
                                                            }else{
                                                                setNotification({
                                                                    text:"Email is required.",
                                                                    type:"error"
                                                                })
                                                            }
                                                            break
                                                        case 1 :
                                                            if(signupName && signupFName){
                                                                setStep(step + 1)
                        
                                                            }else{
                                                                setNotification({
                                                                    text:"Require First Name and Last Name.",
                                                                    type:"error"
                                                                })
                                                            }
                                                            break
                                                        case 2 :
                                                            if(signupPwd1 && signupPwd2 && signupPwd1 === signupPwd2){
                                                                setStep(step + 1)
                                                            }else{
                                                                setNotification({
                                                                    text:"Password confirmation is not correct.",
                                                                    type:"error"
                                                                })
                                                            }
                                                            break
                                                        
                                                    }
                                                    
                                                }}
                                            >Next</div>
                                            </>
                                        ):(
                                            <div 
                                                className={styles.submitBtn}
                                                onClick={(e)=>{signup()}}
                                            >Signup</div>
                                        )}
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>

                </div>
            ):<></>}
        </>
    )
}
