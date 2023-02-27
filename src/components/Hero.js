import React, { Purecomponent, useState, useEffect } from 'react'
import { useModalContext } from '../context/modal_context'
import styled from 'styled-components'
import { api_url, links } from '../utils/constants'
import Button from '@mui/material/Button'
import Three from './three'
import items from '../utils/data'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get, set } from 'firebase/database'
import Menu from './Menu'


const text = require('./config.json')
const api = api_url

const Hero = (props) => {
  const [menuItems, setMenuItems] = useState(items)
 const [hoveredIndex, setHoveredIndex] = useState(-1)

 const handleMouseOver = (index) => {
  setHoveredIndex(index)
 }

 const handleMouseOut = () => {
  setHoveredIndex(-1)
 }

 const [selectedItem, setSelectedItem] = useState(null)

 const handleItemClick = (index) => {
  setSelectedItem(index)
 }

 const handleCloseOverlay = () => {
  setSelectedItem(null)
 }

 const fetchData = async () => {
  props.func('visible')
  const response = await fetch(api)
  const data = await response.json()
  
 }
 useEffect(() => {
  fetchData()
 }, [])

 const [open, setOpen] = React.useState(true)

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: 'AIzaSyD4z6orD880wzC453IwB7IJMHbDgGnOEak',
  authDomain: 'food2view-storage.firebaseapp.com',
  databaseURL: 'https://food2view-storage-default-rtdb.firebaseio.com',
  projectId: 'food2view-storage',
  storageBucket: 'food2view-storage.appspot.com',
  messagingSenderId: '854509118316',
  appId: '1:854509118316:web:2865aafdc9d2238a0b4949',
 }

 // Initialize Firebase
 const app = initializeApp(firebaseConfig)
 const db = getDatabase()

 return (
  <Wrapper>
   <div className="Header">
    <img
     className="logoImg"
     style={{}}
     src="../assets/Food2View-logos.jpeg"
     alt="logo"
    ></img>
   </div>

   <div className="grid-container">
      <Menu items={menuItems} />
   </div>
  </Wrapper>
 )
}

// Styled Components

const Wrapper = styled.div`
 display: grid;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 grid-gap: 5rem;

.Header{
  width:100%;
 text-align: center;

}
.background{
  opacity:50%;
  background-color:black;
  height:100%;
  width:360px;
}
.item-name{

  font-size: 30px;
  color: white;
  font-weight: 700;
  
}
.hoveredContent{
    height:300px;
    
  position: relative;
    width:90%;
    display:grid;
    border-radius:10px;
   
}

.hoveredContent .hoveredButtons button {
   height:200%;
   width:100%;
   background-color:grey;
   padding:5%;
   border-radius:10px;
   margin:auto;
}

.hoveredContent .hoveredButtons {
  margin-top:27.5%;
  margin-left:32.5%;
  position: absolute;
}
.logoImg{
    
  align-content: center;
  justify-content: center;
  margin: auto;
  height: 10%;
  width: 10%;
}
.BWimg{
}
.BWimg:hover {
  webkit-filter: blur(2px); 
  filter: blur(2px);
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.overlay {
  
  position: fixed; /* changed to fixed */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height:50%;
  width:50%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* added z-index */
  height:100%;
  width:100%;
}

.overlay-content {
  height:85%;
  width:35%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* added z-index */
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid-item {
  padding: 10px;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 20),
}
 
 .container__image {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-image: url('https://silviadiaconescu.com/work/landscape/pb-2.jpg');
  background-size: cover;
  transition: ease-in-out 0.3s;
  z-index: 2;
 }
 .container__image:before {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: inherit;
  background-position: bottom;
  filter: blur(40px) saturate(0%);
  transform: scaleX(0.4);
  transition: ease-in-out 0.4s;
  border-radius: 120px;
  transform-origin: right;
  opacity: 0;
  z-index: -1;
 }
 .container_image .container_info {
  position: relative;
  line-height: 1.8;
  transition: ease-in-out 0.3s;
  opacity: 0;
 }
 .container_image .container_location {
  transition-delay: 0.15s;
 }
 .container__image:hover {
  border-radius: 0;
  width: 450px;
  height: 310px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(9, 55, 53, 0.08),
   0px 16px 24px rgba(9, 55, 53, 0.1), 0px 24px 32px rgba(9, 55, 53, 0.14);
 }
 .container__image:hover:before {
  width: 100%;
  opacity: 0.18;
  filter: blur(10px) saturate(100%);
  transform: scale(2.8) translate3d(-18%, 0px, 0px);
 }
 .container_image:hover .container_info {
  transform: translate3d(-60%, 0px, 0px);
  opacity: 1;
 }

 .timings {
  width: 100%;
  font-size: 15px;
  display: inline-grid;
  text-align: center;
 }

 .menuButton {
  position: absolute;
  width: 100%;
  font-size: 15px;
  text-align: center;
  bottom: 20px;
 }

 .location {
  width: 100%;
  font-size: 15px;
  display: inline-grid;
  text-align: center;
  color: mix(#fff, #e91e63, 85%);
  font-weight: 500;
  z-index: -2;
  text-shadow: 20px 20px 20px rgba(0, 0, 0, 0.5),
   20px 20px 20px rgba(0, 0, 0, 0.4), 30px 30px 30px rgba(0, 0, 0, 0.1);
  mix-blend-mode: multiply;
 }

 .container {
  width: 100%;
  position: relative;
  border-radius: 20px;
  width: 320px;
  height: 200px;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px rgb(255, 255, 255),
   0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
 }

 .card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 320px;
  height: 200px;
  display: grid;
  justify-content: center;
  align-items: center;
 }

 .card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 }
 .card:before {
 }

 .card:after {
  position: absolute;
  top: 30%;
  left: 10%;
  font-size: 5em;
  font-weight: 800;
  font-style: italic;
 }

 .container:hover {
  transform: perspective(200px) translateZ(20px);
  height: 400px;
  transition: transform 1s cubic-bezier(0.455, 0.03, 0.515, 0.955),
   height 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
 }

 .container:not(:hover) {
  transform: perspective(-200px) translateZ(-20px);
  height: 200px;
  transition: transform 1s cubic-bezier(0.455, 0.03, 0.515, 0.955),
   height 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
 }

 .cardBelow {
  visibility: hidden;
 }
 .container:hover .cardBelow {
  animation: 1s fadeIn;
  visibility: visible;
 }

 @keyframes fadeIn {
  0% {
   opacity: 0;
   background-color: white;
  }
  50% {
   opacity: 0;
   background-color: white;
  }
  100% {
   visibility: visible;
   opacity: 1;
   height: 100%;
  }
 }



 @media only screen and (max-width: 600px) {
  .overlay-content{
      height:95%;
  width:75%;
  position: absolute;
  margin-left: 1%;
  }
  
  .hoveredContent .hoveredButtons {

      margin-top:40%;
      margin-left:25%;
      position: absolute;
    }
   
  .overlay{
    align-item:center;
  }
  .logoImg{
    
    alignContent: center;
    justifyContent: center;
    margin: auto;
    height: 50%;
    width: 50%;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
  
  .grid-item {
    padding: 10px;
    text-align: center;
  }

  padding: 5rem;
  /* .card:before {
   .color {
    display: none;
   }
  } */
  margin-bottom: 8rem;
  .linksBx {
   display: flex;
   justify-content: center;
   li {
    margin: 0 0.5rem;
   }
   a {
    color: var(--clr-grey-3);
    font-size: 0.65rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.85rem;
    &:hover {
     border-bottom: 2px solid var(--clr-primary-7);
    }
   }
  }

  img {
   width: 240px;
   display: block;
   object-fit: cover;
   height: 125px;
  }
 }

 @media (min-width: 576px) {
  padding: 2rem;
  /* .card:before {
   .color {
    display: none;
   }
  } */

  .linksBx {
   display: flex;
   justify-content: center;
   li {
    margin: 0 0.5rem;
   }
   a {
    color: var(--clr-grey-3);
    font-size: 0.65rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.85rem;
    &:hover {
     border-bottom: 2px solid var(--clr-primary-7);
    }
   }
  }

  img {
   width: 100%;
   display: block;
   object-fit: cover;
   height: 125px;
  }
 }

 /* Small devices (portrait tablets and large phones, 600px and up) */
 @media only screen and (min-width: 600px) {
  padding: 2rem;
  /* .card:before {
   .color {
    display: none;
   }
  } */

  .linksBx {
   display: flex;
   justify-content: center;
   li {
    margin: 0 0.5rem;
   }
   a {
    color: var(--clr-grey-3);
    font-size: 0.65rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.85rem;
    &:hover {
     border-bottom: 2px solid var(--clr-primary-7);
    }
   }
  }

  img {
   width: 100%;
   display: block;
   object-fit: cover;
   height: 125px;
  }
 }
 /* Medium devices *landscape tablets, 768px and up) */
 @media only screen and (min-width: 768px) {
  padding: 2rem;
 }
`
export default Hero