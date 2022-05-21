import React ,{useState,useRef}from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function Captcha() {

    const recaptchaRef = useRef(null)

    return (
        <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RE_CAPTCHA}
        size="invisible"
      />
    )
}
