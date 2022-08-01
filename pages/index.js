import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import Head from 'next/head';
import HomeHeader from '../components/HomeHeader';
import Image from 'next/image';
import {TOOL_CAT} from '../constant'
import Link from 'next/link';
import Footer from '../components/Footer';
import { HorizontalNewsLetter } from '../components/NewsLetter';
import { getTutos } from '../services/tutos';

export default function HomeDeskTop() {

  const [tools,setTools] = useState([
    {
      id : 1,
      poster :"/images/gradient.png",
      title : "Background Gradient Generator- Online Gradient Generator",
      description : "This is an online background gradient generator. It allows you to generate linear or radial background gradients. Edit, copy and paste and it's done.",
      url:"/design/gradient-generator",
      category : "design"
    },
    // {
    //   id: 2,
    //   poster :"/images/gradient.png",
    //   title : "Box shadow generator - Beautifuf box shadow templates",
    //   description : "Based on IBM WATSON TTS API this application offers an AI that can convert any text into audio. ",
    //   url:"/design/box-shadow-generator",
    //   category : "design"
    // },
    {
      id: 3,
      poster :"/images/tts.png",
      title : "VoxAI : Example of a text to speach application based on the IBM WATSIN API",
      description : "This text-to-speech application allows you to transform the text into audio according to the language and the defined voice.",
      url:"/ai/text-to-speach-voxai",
      category : "ai"
    },
    
  ])

  const useReactPath = () => {
    const [path, setPath] = useState();
    const listenToPopstate = () => {
      const winPath = window.location.pathname;
      setPath(winPath);
    };
    useEffect(() => {
      window.addEventListener("popstate", listenToPopstate);
      return () => {
        window.removeEventListener("popstate", listenToPopstate);
      };
    }, []);
    return path;
  };

  const path = useReactPath();

  useEffect(() => {

    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    const hasError = url.includes("?error=")

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      
    }
    if(hasError){
        const newUrl = url.split("?error=");
        window.history.pushState({}, null, newUrl[0]);
    }

  }, [path]);

  useEffect(()=>{
    (async ()=>{
      const resTuto = await getTutos("tuto");
      if(resTuto.success){
        setTools([...tools,...resTuto.data])
      }
    })();
  },[])

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="theme-color" content="#205fb3"/>
        <link rel="icon" href="/favicon.ico" />  
        <title>Discover AI : Dev tools</title>
        <meta name="description" content="Find the tool you need to work faster and more efficiently." />
        <link rel="canonical" href="https://discoverai.app" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Discover AI : Dev tools" />
        <meta property="og:description" content="Find the tool you need to work faster and more efficiently." />
        <meta property="og:url" content="https://discoverai.app" />
        <meta property="og:site_name" content="Discover AI" />
        <meta property="og:image" content="/discoverai.png" />

        {/* <meta property="article:publisher" content="https://www.facebook.com/UsWeekly" />
        <meta property="article:modified_time" content="2022-05-10T19:45:26+00:00" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discover AI : Dev tools" />
        <meta name="twitter:description" content="Find the tool you need to work faster and more efficiently." />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>  
      </Head>
      <div className={styles.home}>
      
        <HomeHeader/>

        <div className={styles.block1}>
          <div className={styles.content}>
            <div className={styles.left}>

              <h1>A range of tools that continues to grow for the benefit of all developers</h1>
              <br></br>
              <br></br>
              <div className={styles.txt}>
                <span>A particular request? Or want to discover more? </span>
              </div>
              <div className={styles.btnsZone}>
                <Link href={"/contact-us"}>
                  <button className={styles.btnPrimary} type="primary">Contact us</button>
                </Link>
              </div>
              <br></br>
              
            </div>
            <div className={styles.right}>
              
            </div>

          </div>
          <div className={styles.shadow}></div>
          
        </div>
        <div className={styles.tools}> 
          <h3> <svg width="16px" height="16px" viewBox="0 0 16 16"  fill="currentColor" >
            <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
          </svg>&nbsp;Design</h3>
          <br></br>
          {
            tools?.filter(t => t.category === TOOL_CAT.DESIGN)?.map((tool,index)=>{
              return(
                <Link key={index} href={tool.url} target="_blank">
                  <a  target="_blank">
                    <div className={styles.toolPreview}>
                      <div className={styles.img}>
                        <Image src={tool.poster} width={300} height={200} alt="tool Img"/>
                      </div>
                      <div className={styles.toolMeta}>
                        <h2>{tool.title}</h2>
                        <p>{tool.description}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })
          }
          <br></br>
          <HorizontalNewsLetter/>
          <br></br>
          <br></br>
          <h3> 
            <svg version="1.1" id="Layer_1"x="0px" y="0px"
              width="16px" height="16px" viewBox="0 0 256 241" enableBackground="new 0 0 256 241" >
              <path d="M254,188V2H2v186h111v29H75v22h106v-22h-38v-29H254z M19,19h217v151H19L19,19z M179.966,61.995
                c-1.298-2.503-2.874-4.264-4.728-5.284c-0.093-2.688-1.298-4.913-3.245-6.86c-2.318-2.318-5.377-3.523-8.714-3.523
                c-3.801-4.45-13.071-7.138-20.766-5.933c-3.801-1.854-8.714-1.761-12.051-1.761c-0.464,0-0.834,0-1.298,0h-0.464
                c-3.986,0-10.939-0.093-14.74,3.245c-3.708-1.483-9.548-0.834-14.276,0.556c-5.84,1.854-9.919,4.728-11.402,8.158
                c-3.801,0.927-8.621,4.357-11.495,8.529c-2.225,3.245-4.357,8.158-2.41,14.276c-2.225,5.748-1.02,11.959,3.245,16.872
                c4.357,5.099,10.939,7.324,16.779,5.748c3.245,0.371,5.655,0.185,7.324-0.185c0.371,2.874,1.483,6.582,4.728,9.178
                c1.298,2.966,3.801,5.191,7.045,6.118c3.708,1.02,7.787,0.371,10.846-1.761c1.112-0.093,2.41-0.185,3.801-0.464
                c-0.185,2.318,0,4.45,0.556,6.304c0.185,1.947,1.947,12.422,12.33,17.428c10.568,5.099,10.105,8.158,10.105,9.085
                c0,3.059,3.523,4.821,7.045,4.913c0.093,0,0.185,0,0.464,0c3.523,0,6.118-1.947,6.304-4.821c0.464-6.118-0.556-7.231-5.006-12.422
                c-1.483-1.761-2.41-4.821-2.967-6.86c2.039-0.464,3.894-1.112,5.655-2.039c2.688,0,5.284-1.02,7.231-2.967
                c1.947-1.947,3.059-4.357,3.245-7.138c6.304-4.357,9.456-14.091,7.602-23.917C183.674,79.608,183.303,68.762,179.966,61.995z
                M169.861,106.956c-0.834,0.464-1.298,1.298-1.112,2.039c0.093,1.947-0.556,3.801-1.854,5.099c-1.112,1.112-2.688,1.761-4.172,1.761
                c-6.118-2.318-5.84-7.231-5.748-7.787c0.093-1.298-0.834-2.41-2.039-2.503s-2.41,0.834-2.503,2.039
                c-0.371,2.41,0.464,7.045,4.635,10.383c-2.874,0.834-6.582,1.112-11.495,1.112c-5.562,0-9.27-1.112-11.124-3.523
                c-1.391-1.761-1.761-4.264-1.112-7.324c6.767-1.298,8.992,1.854,9.085,2.039c0.464,0.649,1.112,1.112,1.947,1.112
                c0.371,0,0.834-0.093,1.112-0.371c1.112-0.556,1.483-2.039,0.927-3.059c-0.093-0.185-3.986-6.675-15.389-3.986l0,0
                c-2.318,0.464-4.357,0.649-6.118,0.834c-4.913-5.84-1.391-10.012-0.927-10.475c0.927-0.927,0.834-2.41-0.093-3.245
                c-0.927-0.927-2.41-0.834-3.245,0c-2.41,2.41-5.099,8.621-0.185,15.389c-1.576,0.556-3.523,0.649-5.191,0.185
                c-1.483-0.464-3.337-1.391-4.264-3.894c-0.093-0.464-0.464-0.834-0.834-1.02c-4.172-3.059-3.523-8.714-3.43-9.641
                c0.834-2.318,3.337-7.509,10.475-9.548c3.245-0.927,5.84-0.371,9.085,0.185c0.927,0.185,1.947,0.371,2.966,0.556
                c1.112,8.251,9.919,11.402,10.197,11.588c0.185,0.093,0.464,0.093,0.834,0.093c0.927,0,1.854-0.556,2.225-1.483
                c0.464-1.112-0.185-2.503-1.391-2.874c-0.093,0-5.655-2.039-7.045-6.86c7.602-0.185,10.383-5.933,10.661-9.085
                c0.093-1.298-0.649-2.41-1.947-2.503c-1.298-0.093-2.41,0.649-2.503,1.947c-0.093,0.464-0.927,5.099-6.675,5.099
                c-2.318,0-4.357-0.464-6.304-0.834c-3.43-0.649-7.045-1.391-11.217-0.093c-5.284,1.483-8.621,4.45-10.661,7.231
                c-1.483-2.039-3.708-3.337-5.562-4.357c-1.298-0.649-2.503-1.391-3.337-2.318c-2.039-2.039,0.371-6.304,0.371-6.304
                c0.649-1.02,0.371-2.503-0.834-3.059c-1.391-1.02-2.781-0.649-3.43,0.464c-1.576,2.781-3.43,8.251,0.371,12.051
                c1.298,1.298,2.874,2.225,4.357,2.966c3.059,1.761,4.821,2.874,4.821,5.84c-0.556,0.371-2.318,1.298-7.324,0.649
                c-0.371,0-0.556,0-0.927,0.093c-4.264,1.298-9.085-0.464-12.515-4.264c-3.337-3.801-4.172-8.621-2.225-12.886
                c0.185-0.556,0.185-1.112,0-1.761c-1.761-4.635-0.093-8.436,1.576-10.939c1.483-2.225,3.523-3.894,5.284-5.099
                c0.556,0.371,1.112,0.464,1.854,0.371c5.84-1.483,9.734,5.284,10.012,5.655c0.464,0.834,1.112,1.112,1.947,1.112
                c0.371,0,0.834-0.093,1.112-0.371c1.112-0.556,1.483-2.039,0.927-3.059c-0.185-0.371-3.43-6.118-9.178-7.787
                c0.834-2.225,3.986-4.357,8.621-5.748c5.933-1.854,10.661-1.391,11.681-0.556c3.523,5.099,1.391,7.972-1.391,11.588
                c-0.556,0.834-1.112,1.483-1.761,2.318c-4.635,6.86-1.298,12.051,1.298,13.905c0.464,0.371,0.927,0.464,1.391,0.464
                c0.649,0,1.391-0.371,1.854-0.927c0.834-1.02,0.556-2.41-0.464-3.245c-0.556-0.464-3.337-2.967-0.093-7.694
                c0.464-0.649,1.02-1.391,1.483-2.039c2.688-3.43,6.675-8.529,2.41-15.667c2.688-1.854,8.714-1.854,11.217-1.761h0.464
                c0.371,0,0.834,0,1.298,0c3.059,0,7.787,0,10.568,1.483c0.464,0.185,1.02,0.371,1.576,0.185c6.582-1.298,13.998,1.298,16.779,3.894
                c-1.298,2.503-3.43,8.158-2.225,13.442c1.391,6.211,1.576,7.787-3.43,9.641c-1.112,0.464-1.854,1.761-1.391,2.967
                c0.371,0.927,1.298,1.483,2.225,1.483c0.185,0,0.556,0,0.834-0.093c3.337-1.298,5.284-2.874,6.304-4.728
                c0.556,0.185,0.927,0.556,1.298,1.02c1.576,2.039,1.391,5.84,1.298,7.138c-0.185,1.298,0.649,2.41,1.947,2.688
                c0.093,0,0.185,0,0.371,0c1.112,0,2.039-0.834,2.318-1.947c0.093-0.649,0.927-6.675-2.225-10.661
                c-1.02-1.391-2.41-2.318-3.986-2.874c-0.093-1.854-0.464-3.801-0.927-5.748c-0.927-3.986,0.927-8.529,1.854-10.475
                c2.039,0.093,3.894,0.927,5.284,2.225c1.391,1.391,1.947,3.245,1.854,5.099c-0.093,1.112,0.649,2.318,1.854,2.503
                c1.112,0.185,2.41,1.483,3.337,3.43c2.688,5.377,2.966,14.74,0.834,20.209c0,0.093-0.093,0.093-0.093,0.093
                c-2.039,2.966-4.728,3.059-9.178,3.059c-1.483,0-2.874,0-4.45,0.093c-7.045,0.649-10.383,7.694-10.475,8.065
                c-0.556,1.112,0,2.503,1.112,3.059c0.371,0.093,0.649,0.185,0.927,0.185c0.927,0,1.761-0.464,2.039-1.391
                c0,0,2.41-4.913,6.767-5.377c1.298-0.093,2.688-0.093,3.986-0.093c3.059,0,6.397,0,9.27-1.576
                C177.092,97.685,174.496,104.36,169.861,106.956z M148.817,63.292c0.556,1.205,0.185,2.596-0.834,3.245
                c-0.278,0.278-0.649,0.371-1.112,0.371c-0.834,0-1.483-0.371-1.947-1.02c-0.093-0.185-3.523-5.469-10.105-4.357
                c-0.556,0.834-1.298,1.669-2.318,2.225c-0.464,0.278-0.927,0.649-1.391,0.834c-3.986,2.41-5.377,3.43-4.913,5.933
                c0.185,1.298-0.556,2.503-1.854,2.688c-0.278,0-0.371,0-0.464,0c-1.205,0-2.132-0.834-2.318-1.947
                c-1.02-5.84,3.337-8.343,7.138-10.661c0.464-0.278,0.927-0.649,1.391-0.834c2.596-1.669,1.576-6.767,1.576-6.767
                c-0.185-1.298,0.464-2.596,1.761-2.781c1.298-0.185,2.596,0.464,2.781,1.761c0,0.278,0.371,2.318,0.185,4.728
                C142.792,56.71,147.241,60.882,148.817,63.292z"/>
              </svg>
          &nbsp;AI</h3>
          <br></br>
          {
            tools?.filter(t=> t.category === TOOL_CAT.AI)?.map((tool,index)=>{
              return(
                <Link  key={index} href={tool.url}>
                  <a  target="_blank">
                    <div className={styles.toolPreview}>
                      <div className={styles.img}>
                        <Image className={styles.poster} layout='responsive' src={tool.poster} width={300} height={200} alt="tool Img"/>
                      </div>
                      <div className={styles.toolMeta}>
                        <h2>{tool.title}</h2>
                        <p>{tool.description}</p>
                      </div>

                    </div>
                  </a>
                </Link>

              )
            })
          }
          <br></br>
          <h3 style={{marginBottom:"-3rem"}}> 

          <svg version="1.1" id="Capa_1" x="0px" y="0px"
              width="20px" height="20px" viewBox="0 0 696.662 696.663" 
              >
            <g>
              <path d="M56.961,191.577l17.977-6.867l3.409,1.98l-14.731,8.309l-0.337,7.479c-0.006,0-14.225,84.932,1.541,119.941
                c0,0,26.114,6.882,44.561-12.832L86.559,208.024l-2.389-8.308l31.004-17.036l-0.678,6.455L92.083,204.3l12.618,0.795l152.824,2.784
                l127.957-83.623l85.145-61.274L209.247,40.19L0,198.47l55.322,3.497L56.961,191.577z M228.317,106.424
                c15.936-4.567,31.12-0.413,33.917,9.315c2.798,9.714-7.853,21.309-23.781,25.907c-15.928,4.579-31.113,0.413-33.912-9.301
                C201.737,122.618,212.388,111.022,228.317,106.424z M89.278,303.836l-5.249,1.504c0,0-5.224-27.995-5.512-58.6L89.278,303.836z"/>
              <path d="M696.662,622.058l-125.14-78.212V243.516H403.649c7.181-10.892,10.025-21.644,7.223-31.383
                c-0.072-0.27-0.23-0.512-0.311-0.771l-20.559-71.379l-127.952,83.626l-152.823-2.787l12.239,42.514l8.537,29.65
                c2.767,9.604,10.716,17.107,22.308,22.51v228.354l-125.138,78.21v34.413h669.488V622.058z M287.831,312.978
                c28.315-8.164,53.579-19.371,73.847-31.921h169.175v226.735H183.596V323.877C212.137,327.469,249.122,324.122,287.831,312.978z
                M166.682,554.793h390.47l56.604,40.673H110.078L166.682,554.793z"/>
            </g>

          </svg>
          &nbsp;Tutos</h3>
          <br></br>
          {
            tools?.filter(t=> t.category === TOOL_CAT.TUTO)?.map((tool,index)=>{
              return(
                <Link  key={index} href={"/tuto/"+tool.title.toLocaleLowerCase().replaceAll(" ","-")+"-"+tool.id}>
                  <a  target="_blank">
                    <div className={styles.tutoPreview + "  " +((index % 2) === 0 ? " "+styles.selected : " "+styles.notSelected)}>
                      <div className={styles.img}>
                        <Image className={styles.poster} layout='responsive' src={tool.poster} width={300} height={200} alt="tool Img"/>
                      </div>
                      <div className={styles.toolMeta}>
                        <h2>{tool.title}</h2>
                        <p>{tool.description}</p>
                      </div>

                    </div>
                  </a>
                </Link>

              )
            })
          }
          <div className={styles.more}> 
            <Link href={"/tuto"}>
              <a>More tutos ?</a>
            </Link>
          </div>
          
          <div className={styles.info}>
            <q>
              &nbsp;Our teams are working to provide you with development tools through different applications. For open source applications, the code is made available to you directly with the demo.  Discover ai wants to help developers to find the tools they are looking for faster and easier. Why not in this mission to develop open source tools find, design or discover and update unconventional tools that will benefit the whole community.&nbsp; 
            </q>
          </div>
        </div>

        <Footer/>
        
      </div>

      
     
      
    </>
  )
}

