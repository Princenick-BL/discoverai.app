import React,{useState,Fragment, useMemo, useEffect} from 'react'
import Logo from '../logo'
import styles from './index.module.scss'
import Modal from '../Modal';
import Image from 'next/image';
import { useGlobalContext } from '../../GlobalContext';
import img from '../../public/freeImg.jpg'
import DropDown from '../DropDown';
import { useGoogleOneTapLogin } from '@react-oauth/google';


export default function HomeHeader(props) {


  const [formType,setFormType] = useState(false)
  const {state,dispatch} = useGlobalContext()
  const [renderConnectState,setRenderConnectState]=useState(false)

  const handlesignOut = () =>{
    dispatch({
      type:"LOGOUT"
    })
  }


  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
        console.log(credentialResponse);
    },

  });

  useEffect(()=>{
    if(state.identity){
      setRenderConnectState(
        <DropDown
          dropDownElement={
            <div>
              <div style={{marginLeft:".5rem",fontSize:"14px"}}>
                <span>Signed in as</span>
                <div style={{fontWeight:"bold"}}>
                  {""+state?.identity?.firstName+ " "+state?.identity?.lastName}
                </div>
              </div>
              <div style={{fontSize:"14px",borderTop:"1px solid #ccc",padding:".5rem",paddingBottom:"0",marginTop:".5rem",cursor:"pointer"}} 
                onClick={(e)=>{handlesignOut()}}
              >
                Sign out
              </div>
            </div>
          }
        >
          <div className={styles.loggedUser}>
            <Image className={styles.userImg} style={{marginRight:"1rem"}} alt="" src={img} width={25} height={25}/>
            <span className={styles.dropdownCaret}></span>
          </div>
        </DropDown>
      )
    }else{
      setRenderConnectState(
        <div className={styles.authBtns}>
          <div className={styles.login} onClick={()=>{setFormType("LOGIN")}}>Sign In</div>
          <div className={styles.signup} onClick={()=>{setFormType("SIGNUP")}}>Sign Up</div>
        </div>
      )
    }

  },[state])

  const [largeur,setLargeur]=useState(false);
  const [toggleMenu,setToggleMenu]=useState(false);
  const showMenu =() =>{
    setToggleMenu(!toggleMenu);
  };


  useEffect(()=>{
      setLargeur(window.innerWidth);

      const changeWidth =()=>{

          setLargeur(window.innerWidth);

          if(window.innerWidth > 500){
              setToggleMenu(false);
          }
      }
      window.addEventListener('resize',changeWidth);
      return(
        window.removeEventListener('resize',changeWidth)
      )
  },[props])


  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Logo style={{marginLeft:"1rem"}}/>
          {largeur <= 500 ?(
            <div>
              <i style={{fontSize:"30px",marginRight:"20px"}} className="fa fa-bars"  onClick={showMenu}></i>
              {toggleMenu &&
                <div className={styles.headerBtns}>
                  {renderConnectState}
                </div>
              }
            </div>):(
              <div className={styles.headerBtns}>
                {renderConnectState}
              </div>

            )
          }

        </div>

      </header>
      <Modal
        type={formType}
        onClose={(e)=>{setFormType(e)}}
      />
    </>
    
  )
}
