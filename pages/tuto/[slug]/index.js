import React ,{useState,useEffect} from 'react'
import HomeHeader from '../../../components/Header'
import styles from './index.module.scss'
import NewsLetter from '../../../components/NewsLetter'
import {Pub300,PubBanner} from '../../../components/Pub'
import Stats from '../../../components/Stats'
import Captcha from '../../../components/Captcha'
import Head from 'next/head'
import { getTuto } from '../../../services/tutos'
import Image from 'next/image'
import CodeBlock from '../../../components/CodeBlock'

export default function Tuto() {

  const [tuto,setTuto] = useState(false)

  useEffect(()=>{
    (async ()=>{
      const url = window.location.href
      const tutoId = url.split("-").pop()
      const res = await getTuto(tutoId)
      if(res.success){
        setTuto(res.data)
      }
      console.log(res)
    })();

  },[])

  const renderChildren = (children) =>{
    switch(children?.type){
      case "code":
        return (
          <CodeBlock
            text = {children?.text}
          />
        )
      case "plainText" :
        return(
          <div
            style={children?.meta}
          >
            {children?.text}
          </div>
        )
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="theme-color" content="#f8fafb"/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5455960452945884"
     crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" />  
        <title>CSS Background Gradient Generator- Online CSS Gradient Generator</title>
        <meta name="description" content="This is an online background gradient generator. It allows you to generate linear or radial background gradients. Edit, copy and paste and it's done." />
        <link rel="canonical" href="https://discoverai.app/tool/design/gradient-generator" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Background Gradient Generator" />
        <meta property="og:description" content="This is an online background gradient generator. It allows you to generate linear or radial background gradients. Edit, copy and paste and it's done." />
        <meta property="og:url" content="https://discoverai.app/tool/design/gradient-generator" />
        <meta property="og:site_name" content="Background Gradient Generator" />
        <meta property="og:image" content="/gradient.png" />

        {/* <meta property="article:publisher" content="https://www.facebook.com/UsWeekly" />
        <meta property="article:modified_time" content="2022-05-10T19:45:26+00:00" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Background Gradient Generator" />
        <meta name="twitter:description" content="This is an online background gradient generator. It allows you to generate linear or radial background gradients. Edit, copy and paste and it's done." />

      </Head>
      <HomeHeader
      />
      <div className={styles.viewer}>
        <div className={styles.left}>

        </div>
        <div className={styles.center}>
          {tuto?.title &&
            <h1>{tuto?.title}</h1>
          }
          {tuto?.poster &&
            <div className={styles.poster}>
              <Image src={tuto?.poster} alt='poster' width={500} height={300} layout='responsive'/>
            </div>
          }
          {tuto?.demo &&
            <>
              <br></br>
              <a className={styles.demo} href={tuto?.demo}>
                See a Demo
              </a>
            </>
          }

          {tuto?.childrens && tuto?.childrens.map((children,index)=>{
            return(
              <div key={index}>
                <br></br>
                {
                  renderChildren(children)
                }
              </div>
            )
          })
          }
          {/* <PubBanner/> */}
        </div>
        <div className={styles.right}>
          <div className={styles.zone1}>
            <NewsLetter/>
            <Stats/>
          </div>
          {/* <Pub300/> */}
        </div>
      </div>

    </div>
  )
}
