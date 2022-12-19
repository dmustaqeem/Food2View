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

const SearchPage = (props) => {
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
        <div className="data">{selectedRes.Location}</div>
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
     const { category, id, location, name, timings, url, contact } = product

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
            onClick={() => handleToggle(name, location, url, contact)}
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

// Styled Components

const Wrapper = styled.div`
 display: grid;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 grid-gap: 5rem;
`
export default SearchPage
