import React,{useState,useEffect,useRef} from 'react'
import dropdownStyles from './dropdown.module.scss'

export default function DropDown({children,dropDownElement}) {

    const [show,setShow] = useState(false)
    const wrapperRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
    
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (show && ref.current && !ref.current.contains(event.target)) {
              setShow(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref,show]);
    }
    useOutsideAlerter(wrapperRef);

  return (
    <div className={dropdownStyles.dropdown} ref={wrapperRef} >
        <div className={dropdownStyles.children}  onClick={(e)=>setShow(!show)}>
            {children}
        </div>
        {show &&
            <div  className={dropdownStyles.dropElement}>
                {dropDownElement}
            </div>
        }
    </div>
  )
}
