import React, { useState } from 'react'
import { FaRegClipboard } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
const Clipboard = ({code}) => {
    const [clipboardIcon, setClipboardIcon] = useState(false)
    const handleClipboardClick = () => {
        navigator.clipboard.writeText(code).then(() => {
          setClipboardIcon(true)
          setTimeout(() => {
            setClipboardIcon(false)
          }, 3000)
        }).catch(err => {
          console.error('Failed to copy: ', err)
        })
      }
  return (
    <div className='absolute top-2 right-2 z-10  p-2 bg-gray-800 rounded-lg  cursor-pointer' onClick={handleClipboardClick}>
    {clipboardIcon ? <FaClipboardCheck /> : <FaRegClipboard />}
  </div>
  )
}

export default Clipboard