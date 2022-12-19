import React, { Purecomponent, useState, useEffect } from 'react'
import { useModalContext } from '../context/modal_context'
import styled from 'styled-components'
import { api_url, links } from '../utils/constants'
import TextField from '@mui/material/TextField'
import {
 BrowserRouter as Router,
 Switch,
 Route,
 useHistory,
 Link,
} from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get, set } from 'firebase/database'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import CallIcon from '@mui/icons-material/Call'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
const text = require('./config.json')
const api = api_url

const Hero = (props) => {
 const [products, setProducts] = useState([])
 const { isModalOpen, closeModal } = useModalContext()
 const [searchInput, setSearchInput] = useState('')
 const [selectedRes, setSelectedRes] = useState([])
 const [modelsRes, setModelsRes] = useState([])
 const [mainOverflow, setMainOverflow] = useState('')

 const fetchData = async () => {
  setMainOverflow('visible')
  props.func('visible')
  const response = await fetch(api)
  const data = await response.json()
  setProducts(data)
 }
 useEffect(() => {
  fetchData()
 }, [])

 const [open, setOpen] = React.useState(false)
 function handleClose() {
  setOpen(false)
  setMainOverflow('visible')
  props.func('visible')
 }

 async function handleToggle(id, location, url, contact) {
  console.log(contact)
  var obj = { Name: id, Location: location, URL: url }
  setSelectedRes(obj)
  var arr = []

  for (var key of Object.keys(text)) {
   if (id == text[key].resturant) {
    var obj = {
     Number: text[key].number,
     Image: text[key].Image,
     Price: text[key].price,
     ModelName: text[key].Name,
     Resturant: text[key].resturant,
    }
    arr.push(obj)
   }
  }

  setModelsRes(arr)
  setMainOverflow('hidden')
  props.func('hidden')
  setOpen(!open)
 }

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

 const card = (
  <React.Fragment>
   <CardWrapper id="style-3">
    <div className="closeOverlay">
     <CloseIcon onClick={handleClose}></CloseIcon>
    </div>
    <article>
     <div className="headerContainer">
      <img
       src={selectedRes.URL}
       className="logoHC"
       alt="logo"
       style={{ backgroundColor: 'black' }}
      />
      <div className="InfoDiv">
       <div className="info">
        <AccessTimeIcon></AccessTimeIcon>
        <div className="data">2-5</div>
       </div>

       <div className="info">
        <CallIcon></CallIcon>
        <div className="data">111222333</div>
       </div>

       <div className="info">
        <LocationOnIcon></LocationOnIcon>
        <div className="data">{selectedRes.Location}</div>
       </div>
      </div>
     </div>

     <Stack direction="column" spacing={2} style={{ padding: '2rem' }}>
      {modelsRes.map((modelsRes) => {
       const { Number, Image, Price, ModelName, Resturant } = modelsRes
       return (
        <div className="productsContainer">
         <div className="productC">
          <img
           src={Image}
           style={{ backgrondColor: '0xff00ff' }}
           className="logo"
           alt="logo"
          />
          <div className="productTitle">{ModelName}</div>
          <div className="productViewer">
           <Link
            to={{
             pathname: '/ModelViewer',
             search: '?sort=name',
             hash: '#the-hash',
             state: { name: ModelName },
            }}
           >
            <Button variant="contained"> Object Viewer</Button>
           </Link>
           <div>
            <Button
             onClick={function (event) {
              //  const reference = ref(db,'objects/'+'2');
              //  set(reference,{
              //   Desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet tincidunt lorem. Ut leo risus, pretium quis ligula nec, aliquam laoreet quam. Quisque semper ipsum diam, sit amet bibendum tellus bibendum et. Quisque vulputate commodo ex in pellentesque. Nunc et porta orci, sit amet gravida nunc. Suspendisse potenti. Nulla et erat sed ipsum dignissim blandit. Praesent eu ex consectetur, congue erat at, ornare ex.",
              //   Image: "Burger.png",
              //   Meal: "Meal 2",
              //   Model: "Platter",
              //   tyoe: "glb",
              //   Price: "8.99",
              //   Resturant: "El Vez",
              //   Rotation: "0",
              //   Scale: "2"
              //  })

              const reference = ref(db, 'selected/')
              set(reference, {
               Selected: ModelName + '+' + Resturant,
              })

              var win = window.open(
               'https://ar.food2view.com/ '+ '?Model=' +  ModelName + '/' + Resturant,
               '_blank'
              )
              win.focus()
              }}

                   
             variant="contained"
             style={{ marginTop: '10px' }}
            >
             <ViewInArIcon></ViewInArIcon>
             View in AR
            </Button>
           </div>
          </div>
         </div>
        </div>
       )
      })}
     </Stack>
    </article>
   </CardWrapper>
  </React.Fragment>
 )
 {
  let overlayStatus
  if (open) {
   overlayStatus = (
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={open}
    >
     <Card variant="outlined">{card}</Card>
    </Backdrop>
   )
  } else {
   overlayStatus = <div></div>
  }

  //Old Seach box

  //   <input
  //   type="text"
  //   name="text"
  //   placeholder="search"
  //   className="search-input"
  //   value="search"
  //  />

  //=============
  return (
   <Wrapper>
    {overlayStatus}
    <div>
     <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      style={{ width: '100%' }}
     />
    </div>

    <div
     className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}`}
    >
     <div className="modal-container"></div>
    </div>
    {products.map((product) => {
     const { category, id, location, name, timings, url } = product

     {
      if (mainOverflow == 'visible') {
       return (
        <div className="container" key={id}>
         <div className="card">
          <img src={url} className="logo" alt="logo" />
         </div>
         <div className="cardBelow">
          <div className="location">
           <div style={{ color: 'red' }}>Location</div>
           <div>{location}</div>
          </div>

          <div className="menuButton">
           <Button
            variant="contained"
            onClick={() => handleToggle(name, location, url )}
           >
            {' '}
            Menu <RestaurantMenuIcon></RestaurantMenuIcon>
           </Button>
          </div>

          {}
         </div>
        </div>
       )
      }
     }
    })}
   </Wrapper>
  )
 }
}

const CardWrapper = styled.section`
 @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
 display: block;
 align-items: center;
 justify-content: center;
 width: 98%;
 height: 98%;
 position: absolute;
 top: 1%;
 left: 1%;
 overflow-y: auto;
 overflow-x: hidden;
 background-color: white;
 border-radius: 20px;

 .closeOverlay {
  position: -webkit-sticky; /* Safari & IE */
  position: sticky;
  top: 10px;
  margin-left: 10px;
  cursor: pointer;
  z-index: 1;
 }

 .headerContainer {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
 }

 .logo {
  display: block;
  width: 350px;
  height: 150px;
 }

 .logoHC {
  display: inline-block;
  width: 350px;
  height: 150px;
  margin-left: 10%;
 }

 .InfoDiv {
  width: 100%;
  height: 90%;
  font-size: 15px;
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
 }
 .info {
  display: flex;
  margin-top: 1rem;
 }

 .data {
  margin-left: 50px;
  display: inline-block;
 }

 .productsContainer {
  margin-top: 3%;
  width: 100%;
  height: auto;
  position: relative;
  border-radius: 10px;
  display: grid;
  background-color: white;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 2px rgb(255, 255, 255),
   0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
 }

 .productC {
  display: flex;
 }

 .productTitle {
  width: 50%;
  height: 20%;
  margin-left: 250px;
  margin-top: 45px;
  position: relative;
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
 }

 .productViewer {
  width: 50%;
  height: 20%;
  margin-left: 250px;
  padding-top: 2rem;
  position: relative;
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
 }

 @media (max-width: 600px) {
  grid-template-columns: 1fr 1fr;
  display: inline-block;

  .logo {
   width: 100%;
   height: 150px;
   margin-left: 0%;
   display: inline-block;
  }

  .logoHC {
   width: 95%;
   height: 125px;
   margin-left: 0%;
  }

  .headerContainer {
   width: 100%;
   height: 100%;
   position: relative;
   display: grid;
   align-items: center;
   justify-content: center;
  }

  .InfoDiv {
   font-size: 15px;
   display: inline-block;
   text-align: center;
   align-items: center;
   justify-content: center;
   margin-left: 20px;
   margin-top: 10%;
  }
  .info {
   display: flex;
  }

  .data {
   width: 60%;
   margin-left: 50px;
   text-align: left;
   align-items: center;
   justify-content: center;
  }

  .productsContainer {
   width: 100%;
   max-width: 100%;
   min-width: 100%;
   display: inline-block;
   align-items: center;
   justify-content: center;
   margin-top: 90px;
  }

  .productC {
   margin-top: 10px;
   display: inline-block;
  }

  .productTitle {
   width: 100%;
   height: 100%;
   display: inline-block;
   margin-left: 0px;
   align-items: center;
   justify-content: center;
   text-align: center;
  }

  .productViewer {
   padding: 2rem;
   width: 100%;
   height: 100%;
   display: inline-block;
   margin-left: 0px;
   align-items: center;
   justify-content: center;
  }
 }
`

// Styled Components

const Wrapper = styled.div`
 display: grid;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 grid-gap: 5rem;

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
 .container__image .container__info {
  position: relative;
  line-height: 1.8;
  transition: ease-in-out 0.3s;
  opacity: 0;
 }
 .container__image .container__location {
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
 .container__image:hover .container__info {
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

 img {
  width: 240px;
  display: block;
  object-fit: cover;
  height: 125px;
 }

 @media only screen and (max-width: 600px) {
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
 /* Large devices (lapto/desktops, 992px and up) */
 @media only screen and (min-width: 992px) {
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
 /* Extra large devices (large laptops and desktops, 1200px and up) */
 @media only screen and (min-width: 1200px) {
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
`
export default Hero
