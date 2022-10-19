import React, { useState, useRef, useEffect } from 'react'
import { links } from '../utils/constants'

const Herobar = () => {
 const [showLinks, setShowLinks] = useState(false)
 const linksContainerRef = useRef(null)
 const linksRef = useRef(null)
 const toggleLinks = () => {
  setShowLinks(!showLinks)
 }
 useEffect(() => {
  const linksHeight = linksRef.current.getBoundingClientRect().height
  if (showLinks) {
   linksContainerRef.current.style.height = `${linksHeight}px`
  } else {
   linksContainerRef.current.style.height = '0px'
  }
 }, [showLinks])
 return (
  <nav>
   <ul className="links" ref={linksRef}>
    {links.map((link) => {
     const { id, url, text } = link
     return (
      <li key={id}>
       <a href={url}>{text}</a>
      </li>
     )
    })}
   </ul>
  </nav>
 )
}

export default Herobar
