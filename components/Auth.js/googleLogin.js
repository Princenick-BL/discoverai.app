import React from 'react'
import {GoogleLogin} from 'react-google-login'
import styles from './index.module.scss'
import { config } from '../../config'

export default function GoogleLoginBtn({login}) {

    const onSuccess = response => {login(response?.profileObj)};
    const onFailure = response => console.error(response);

    return (
        <div className={styles.authBtns}>
            <GoogleLogin
                clientId={config.GOOGLE_AUTH_CLI_ID}
                buttonText='Continue with google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy='single_host_origin'
                style={{width:"100%"}}

            />
        </div>
    )
}
