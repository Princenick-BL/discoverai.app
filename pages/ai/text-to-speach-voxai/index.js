import React ,{useEffect, useState,useCallback,useRef}from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'
import {getVoices,generateTTS} from '../../../services/tts'
import { Input,Button,Progress,Spin,notification} from 'antd';
import {useAsync} from '../../../hook/useAsync'
import Logo from '../../../components/logo'
import Header from '../../../components/Header'


const { TextArea } = Input;



const tracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"
  },
  {
    id: 1,
    title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"
  }
];


export default function Home() {
  
  const [voices,setVoices] = useState([])
  const [gender,setGender] = useState(false)
  const [language,setLanguage] = useState(false)
  const [text,setText] = useState(false)
  const [voice,setVoice] = useState(false)
  const [generating,setIsgenerating]=useState(false)
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  const {run,data,loading} = useAsync(getVoices)


  useEffect(()=>{
    run()
  },[])

  useEffect(()=>{
    if(data && data.success){
      setVoices(data.data)
    }
  },[data])

 
  const getFilteredVoide = useCallback(() =>{

    return voices.filter((v)=>{
      if(gender && language){
        return (v.gender === gender && v.language === language )
      }else if(gender){
        return (v.gender === gender  )
      }else if (language){
        return (v.language === language  )
      }else{
        return true
      }
    })

  })



  const handleGenerateTTS = useCallback( async () =>{
    setIsgenerating(true)
    const res = await generateTTS(text,voice)
    
    if(res.success){
        setIsgenerating(false)
        if(!res.data.error){
          const b64 = Buffer.from(res.data.buffer).toString('base64')
          const audio  = new Audio('data:audio/wav;base64,'+b64)  
          audio.play()
          const buff =  new ArrayBuffer(res.data.buffer)
        }else{
          notification['warning']({
            message: 'Oups !!!',
            description: res.data.message,
          });
        }
      }
  },[voice,text])

  return (
    <div className={styles.container}>
      <Head>
        <title>VoxAI : Example of a text to speach application based on the IBM WATSIN API</title>
        <meta name="description" content="This application offers an AI that can convert any text into audio." />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1b1588" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5455960452945884"
     crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" />
        {/* Lien font googlr */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://voxai.nickscorp.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VoxAI : Example of a text to speach application based on the IBM WATSIN API" />
        <meta property="og:description" content="This application offers an AI that can convert any text into audio." />
        <meta property="og:image" content="/images/preview.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="voxai.nickscorp.app" />
        <meta property="twitter:url" content="https://voxai.nickscorp.app/" />
        <meta name="twitter:title" content="VoxAI : Example of a text to speach application based on the IBM WATSIN API" />
        <meta name="twitter:description" content="This application offers an AI that can convert any text into audio." />
        <meta name="twitter:image" content="/images/preview.png" />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}

      </Head>
      
      <header className={styles.header}>
        <div>The demo version is limited in use,</div>
        <Link href='#'> upgrade to premium.</Link>
      </header>

      <main className={styles.main}>
        <br></br>
        <div style={{display:'flex'}}>
          <h2>VoxAI</h2>
          <span style={{fontWeight:'bold'}}>Demo</span>
        </div>
        <br></br>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <h1>Convert Text to Speech with Watson Text to natural-sounding Speech Converter </h1>
        </div>
        <div className={styles.content}>
          <div className={styles.box+ " "+styles.H+ " "+styles.spaceBetweenH}>
         
            <select className={styles.select} defaultValue=""  onChange={(e)=>setLanguage(e.target.value)}>
                <option value="">Language</option>
                <option value="fr-FR">French (Français)</option>
                <option value="fr-CA">French Canadian</option>
                <option value="en-US">American English</option>
                <option value="en-GB"> British English</option>
                <option value="de-DE">Standard German (Standard Deutsch)</option>
                <option value="it-IT">Italian (Italiano)</option>
                <option value="pt-BR">Brazilian Portuguese (Português Brasileiro)</option>
                <option value="pt-BR">Brazilian Portuguese (português brasileiro)</option>
                <option value="es-LA">Latin American Spanish (español latinoamericano)</option>
                <option value="es-ES">Castilian Spanish (español castellano)</option>
                <option value="ja-JP">Japanese (日本語)</option>
            </select>

            <select  className={styles.select}  defaultValue="" onChange={(e)=>setGender(e.target.value)}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select  className={styles.select}  defaultValue="" onChange={(e)=>setVoice(e.target.value)}>
              <option value="">Voice</option>
              {getFilteredVoide().map(v=>{
                  return <option key={v.name} value={v.name}>{v.description.split(' ')[0].slice(0, -1)}</option>
              })}
            </select>
            
          </div>
          <br></br>
          <div className={styles.box+ " "+styles.H}>
              <div className={styles.text}>
                <TextArea  className={styles.textArea} rows={5} placeholder={`Write or paste your text here \nBeing a Beta site, only 100 characters are allowed.`} showCount maxLength={100} onChange={(e)=>{setText(e.target.value)}} /> 
              </div>
              <div className={styles.audio}>
                <div className={styles.btnZone}>
                  <Button onClick={(e)=>{handleGenerateTTS(e)}} className={styles.listen} > {generating && <Spin />}&nbsp;&nbsp; Listen</Button>
                  {/* <Button onClick={(e)=>{handleGenerateTTS(e)}} className={styles.listen}  >{generating && <Spin />}&nbsp;&nbsp;Download</Button> */}
                </div>
              </div>
          </div>
        </div>

     
        <div className={styles.steps}>
          <div className={styles.step}>
              <div className={styles.number}>1</div>
              <div className={styles.text}>
                Insert or paste your text in the dedicated block.
              </div>
          </div>

          <div className={styles.step}>
              <div className={styles.number}>2</div>
              <div className={styles.text}>
              Configure the text-to-speech settings.
              </div>
          </div>

          <div className={styles.step}>
              <div className={styles.number}>3</div>
              <div className={styles.text}>
              Click on the generate button to generate the synthesis.
              </div>
          </div>
        
        </div>
     
      </main>
      <br></br>
      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.logo}>
          Powered by{' '}&nbsp; &nbsp; 
            <Logo/>
          </div>
        </a>
        {/* <script>{ (adsbygoogle = window.adsbygoogle || []).push({})}</script> */}

      </footer>
    </div>
  )
}
