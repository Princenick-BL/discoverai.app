import React ,{useState,useEffect} from 'react'
import HomeHeader from '../../../components/FullWidthHeader'
import styles from './index.module.scss'
import NewsLetter from '../../../components/NewsLetter'
import {Pub300,PubBanner} from '../../../components/Pub'
import Stats from '../../../components/Stats'
import Captcha from '../../../components/Captcha'
import Head from 'next/head'

export default function GradientGenerator() {

  const [deg,setDeg] = useState(111)
  const [islinear,setIsLinear] = useState(true)
  const [radialType,setRadialType ] = useState("ellipse")
  
  const [tooltip,setToolTip] = useState("Copy to clipboard")

  const [colors,setColors] = useState([
    {
      value :"#079bee",
      pos : 20
    },
    {
      value :"#0829be",
      pos : 70
    },
    {
      value :"#031863",
      pos : 100
    }
  ])

  const style ={
    background: `${islinear ? "linear-gradient("+deg+"deg" : "radial-gradient("+radialType},${
        colors.map(color=>{
          return color.value+ " " + color.pos +"%" 
        })
      })`
  }

  const handleChangeColor = (id,action,payload) =>{
    const oldColor = colors[id]
    switch(action){
      case "color":
        const newColor = {...oldColor,value:payload}
        const newColors = colors.map((color,index) =>{
          if(index === id){
            return newColor
          }
          return color
        })
        setColors(newColors)
        return
      case "position":
        if(payload>100){
          payload = 0
        }
        if(payload < 0){
          payload  = 100
        }
        const newColorPos = {...oldColor,pos:payload}
        const newColorsPos = colors.map((color,index) =>{
          if(index === id){
            return newColorPos
          }
          return color
        })
        setColors(newColorsPos)
        return
    }
  }

  const handleDeleteColor = (id) =>{
    setColors(colors.filter((color,index) => index!==id))
  }

  const handleAddColor = () =>{

    const oldColors = [...colors]
    oldColors.push(colors[colors.length-1])
    setColors(oldColors)

  }

  const handleCopyToClipBoard = () =>{
    setToolTip("Copied");
    navigator.clipboard.writeText(`background : ${style.background};`)
    var timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      setToolTip("Copy to clipboard");
    }, 500);
    
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
          <h1 style={{width:" 100%",textAlign:"center",fontSize:"1rem",marginBottom:"1rem"}}>CSS Background Gradient Generator- Online CSS Gradient Generator</h1>
          <div className={styles.preview} style={style}>
          <div className={styles.tooltip} onClick={(e)=>{handleCopyToClipBoard()}}>
            <svg className={styles.copyIcon} version="1.1" id="Layer_1"  x="0px" y="0px"
              viewBox="0 0 64 64" enableBackground="new 0 0 64 64" >
              <g id="Text-files">
                <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
                  C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
                  c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
                  h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
                  C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
                  c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
                  c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
                  M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
                  c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
                  c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
                  h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"/>
                <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
                  c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
                  C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"/>
                <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
                  c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
                  C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"/>
                <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
                  s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
                  S39.16465,29.4603004,38.6031494,29.4603004z"/>
                <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
                  s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
                  S29.0059509,37.5872993,28.4444485,37.5872993z"/>
              </g>
            </svg>
            <span className={styles.tooltiptext}>{tooltip}</span>
          </div>
          </div>
          <div className={styles.editor}>
            <div className={styles.edite}>
              <div className={styles.type} onClick={(e)=>{setIsLinear(!islinear)}}>
                Type : 
                <div className={styles.typeValue}>
                  <span className={islinear ? styles.selected : ""}>Linear</span>
                  <span className={!islinear ? styles.selected : ""}>Radial</span>
                </div>
              </div>
              {islinear ?
               ( <div className={styles.orientation}>
                  Orientation
                  <input 
                    type={"number"} 
                    value={deg} 
                    onChange={(e)=>{
                      if(e.target.value > 360){
                        setDeg(0)
                      }else if (e.target.value < 0){
                        setDeg(360)
                      }else{
                        setDeg(e.target.value)
                      }
                  }}/>
                  deg
                </div>):(
                  <div className={styles.radialSelect}>
                    <select  defaultValue={radialType} onChange={(e)=>{setRadialType(e.target.value)}}>
                      <option key={"ellipse"} selected>Ellipse</option>
                      <option key={"circle"} >Circle</option>
                    </select>
                  </div>
                )
              }
            </div>

            <table>

              <thead>
                <tr>
                  <th>COLOR</th>
                  <th>HEX</th>
                  <th>POSITION</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  colors.map((color,index)=>{
                    return(
                      <tr key={index}>
                        <td>
                          <div className={styles.inputColorContainer}>
                            <input className={styles.inputColor} type={"color"}  value={color.value} onChange={(e)=>{handleChangeColor(index,"color",e.target.value)}} />
                          </div>
                        </td>
                        <td>
                          <input type={"text"} value={color.value} className={styles.color} onChange={(e)=>{handleChangeColor(index,"color",e.target.value)}}/> 
                        </td>
                        <td>
                          <input type={"number"} value={color.pos} className={styles.pos} onChange={(e)=>{handleChangeColor(index,"position",e.target.value)}}/> 
                        </td>
                        <td>
                        <svg style={{cursor:"pointer"}} onClick={()=>{handleDeleteColor(index)}} viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                        </td>
                      </tr>
                    )
                  })
                }
                <tr>
                  <td colSpan={4}>
                    <div className={styles.addColor} onClick={(e)=>{handleAddColor()}}>
                      + Add Color
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>

           
           
           
          </div>
          <div className={styles.description}> 
            <h1>Linear gradient - Background</h1>
            <div className={styles.desctext}>
              A linear gradient is a function that generates a linear gradient from one or more colors. 
                <br></br>
                <p className={styles.code}>
                background-image: linear-gradient(orientation, color1 stop1, color2 stop2, ...);
                </p>
                It uses an orientation which is the orientation angle of the gradient, followed by the colors to use for the gradient and their stop positions. The colors so informed constitute a gradient that goes from one point to another of the allocated space.                <br></br>
                Example : 
                <br></br>
                <p className={styles.code}>background : linear-gradient(111deg,#079bee 20%,#0829be 70%,#031863 100%);</p>
                Our tool offers 3 colors by default. However you can use the add color button to add more colors.
            </div>
            <br></br>
            {/* <PubBanner/> */}
            <br></br>
            <h1>Radial gradient - Background</h1>
            <div className={styles.desctext}>
            Unlike the linear gradient, which makes a gradient from one point to another, the radial creates a gradient by starting the colors from the same point and spreading them gently outwards in a circular or elliptical shape. 
            Le schéma est le suivant :
            <p className={styles.code}>
            radial-gradient(shape, color1 stop1, color2 stop2, ...);
            </p>
            shape represents the type of radial gradient desired, it can be either a circle or an ellipse; followed by the gradient colors and their position or spacing
              
            </div>
            <br></br>
            {/* <PubBanner/> */}
            <br></br>

          </div>
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
