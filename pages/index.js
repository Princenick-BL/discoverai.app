import React,{useState,useEffect} from 'react'
import HomePageMobile from '../components/HomePageMobile'
import HomePageDeskTop from '../components/HomePageDeskTop';

export default function Home() {

  const [largeur,setLargeur]=useState();

  useEffect(()=>{
    setLargeur(window.innerWidth);
    const changeWidth =()=>{
      setLargeur(window.innerWidth);
    }

    window.addEventListener('resize',changeWidth);

    // return()=>{
    //     window.removeEventListner('resize',changeWidth);
    // }
  },[])

  return (
    <>
      <HomePageDeskTop/>
    </>
  )

}
