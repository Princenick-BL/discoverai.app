import 'aos/dist/aos.css';
import 'highlight.js/styles/an-old-hope.css'
import '../styles/globals.scss'
import {GlobalProvider} from '../GlobalContext'
import { GoogleOAuthProvider } from '@react-oauth/google';


function MyApp({ Component, pageProps }) {
  return     (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GAUTH_ID}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
