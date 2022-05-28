import React ,{useState} from 'react'
import HomeHeader from '../../../../components/Header'
import styles from './index.module.scss'
import NewsLetter from '../../../../components/NewsLetter'
import Pub300 from '../../../../components/Pub300'
import Stats from '../../../../components/Stats'
import Captcha from '../../../../components/Captcha'

export default function GradientGenerator() {

  const [shadows,setShadows] = useState([
    {
      isInset: false,
      colors : [//box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
      
        {
          color : `rgba(9, 30, 66, 0.25)`,
          pos1 : 0,
          pos2 : 1 ,
          pos3 : 1 ,
          pos4 : 0 ,
        },
        {
          color : `rgba(9, 30, 66, 0.13)`,
          pos1 : 0,
          pos2 : 0,
          pos3 : 1,
          pos4 : 1,
        },
      ]
    },
    {
      isInset: false,
      colors : [
        {
          color : `rgba(50, 50, 105, 0.15)`,
          pos1 : 0,
          pos2 : 2 ,
          pos3 : 5 ,
          pos4 : 0,
        },
        {
          color : `rgba(0, 0, 0, 0.05)`,
          pos1 : 0,
          pos2 : 1,
          pos3 : 1,
          pos4 : 0,
        },
      ]
    },
    {
      isInset: false,
      colors : [
        {
          color : `rgba(17, 17, 26, 0.05)`,
          pos1 : 0,
          pos2 : 1 ,
          pos3 : 0 ,
        },
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 0,
          pos3 : 8,
        },
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 16,
          pos3 : 48,
        },
      ]
    },
    {
      isInset: true,
      colors :[//box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        {
          color : `rgba(50, 50, 93, 0.25)`,
          pos1 : 0,
          pos2 : 30 ,
          pos3 : 60 ,
          pos4 : -12 ,
        },
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 18,
          pos3 : 36,
          pos4 : -18
        },
        
      ]
    },
    {
      isInset: false,
      colors :[
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 1 ,
          pos3 : 0 ,
        },
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 8,
          pos3 : 24,
        },
        {
          color : `rgba(17, 17, 26, 0.1)`,
          pos1 : 0,
          pos2 : 16,
          pos3 : 48,
        },
      ]
    },
  ])

  const [shadow,setShadow] = useState(shadows[0])
  
  const [deg,setDeg] = useState(111)
  const [tooltip,setToolTip] = useState("Copy to clipboard")

  //box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  
  const generateShadow = (shadowData) =>{

    return {
      boxShadow: `${
        shadowData?.colors.map(color=>{
          return (
            color.color+ " " + color.pos1   +"px"+ " "+color?.pos2 +"px" + " "+  color.pos3   +"px" + " "+( color.pos4 ?(color.pos4+"px") : "" ) + " " + (shadowData?.isInset ? " inset" : "")
          )
        })
      }`
  
    }
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
    navigator.clipboard.writeText(JSON.stringify(style))
    var timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      setToolTip("Copy to clipboard");
    }, 500);
    
  }

  return (
    <div className={styles.container}>
      <HomeHeader/>
      <div className={styles.viewer}>
        <div className={styles.left}>

        </div>
        <div className={styles.center}>
          <h1 style={{width:" 100%",textAlign:"center",fontSize:"1rem",marginBottom:"1rem"}}>CSS Box Shadow Generator - Box Shadow Examples</h1>
          <div className={styles.shadows}>
            <div className={styles.examples}>
              <h3>Example</h3>
              {shadows.map((shadow,index)=>{
                return (
                  <div key={index} className={styles.example}  style={generateShadow(shadow)} onClick={(e)=>{setShadow(shadow)}}>
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
                  </div>
                )
              })}
            </div>

            <div className={styles.edition}>
              <div className={styles.preview} style={generateShadow(shadow)}>

              </div>
            </div>

          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.zone1}>
            <NewsLetter/>
            <Stats/>
          </div>
            {/* <Pub300>
            
            </Pub300> */}
        </div>
        
      </div>
      <Captcha/>
    </div>
  )
}
