import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { Suspense } from 'react'
import Three from '../components/three'
import text from '../components/config.json'
import { useLocation } from 'react-router-dom'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import Backdrop from '@mui/material/Backdrop'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import CloseIcon from '@mui/icons-material/Close'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
 } from 'react-router-dom'

const ModelViewer = () => {
 const [open, setOpen] = React.useState(false)
 function handleClose() {
  setOpen(false)
 }

 function handleToggle() {
  setOpen(!open)
 }

 const location = useLocation()
 let selectedModel

 for (var key of Object.keys(text)) {
  if (location.state.name == text[key].Name) {
   selectedModel = text[key]
  }
 }

 //

 const card = (
  <React.Fragment>
   <CardWrapper id="style-3">
    <div className="closeOverlay">
     <CloseIcon onClick={handleClose}></CloseIcon>
    </div>
    <Three status="full" model={selectedModel} />
   </CardWrapper>
  </React.Fragment>
 )

 return (
  <main>
   <PageHero title="Product" />
   <Wrapper className="page section section-center">
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={open}
    >
     <Card variant="outlined">{card}</Card>
    </Backdrop>

    <CanvasSt>
     <Three status="none" model={selectedModel} />
    </CanvasSt>
    <article>
     <div className="title">
      <h2> {selectedModel.Name} </h2>
      <div className="underline"> </div>
     </div>

     <div style={{ marginTop: '3em', display: 'flex' }}>
      <h3 style={{ width: '10px' }}> Price:</h3>
      <p className="pricePara"> {selectedModel.price}$</p>
      <div className="underline"> </div>
     </div>

     <div style={{ marginTop: '3em' }}>
      <div className="productButtonDiv">
       <Button variant="contained" onClick={() => handleToggle()}>
        {' '}
        View Model <FullscreenIcon size="xl"></FullscreenIcon>
       </Button>
      </div>

      <div className="productButtonDiv">
       <Link
       to={
        'ar'
      }
       >
        <Button variant="contained">
         {' '}
         Try in AR <ViewInArIcon></ViewInArIcon>
        </Button>
       </Link>
      </div>
     </div>

     <p> {selectedModel.Description}</p>
    </article>
   </Wrapper>
  </main>
 )
}

const CanvasSt = styled.section`
 width: 100%;
 display: inline-block;
 border-radius: var(--radius);
 height: 500px;
 object-fit: cover;
 border-radius: 20px;
 box-shadow: inset 0 0 0 2px rgb(255, 255, 255),
  0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
`

const CardWrapper = styled.section`
 @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
 display: grid;
 align-items: center;
 justify-content: center;
 width: 80%;
 height: 80%;
 position: absolute;
 top: 10%;
 left: 10%;
 background-color: white;
 border-radius: 20px;

 .closeOverlay {
  position: -webkit-sticky; /* Safari & IE */
  position: sticky;
  top: 10px;
  cursor: pointer;
  z-index: 1;
 }

 @media (max-width: 600px) {
  grid-template-columns: 1fr 1fr;
  display: inline-block;
 }
`

const Wrapper = styled.section`
 @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
 display: grid;
 gap: 4rem;

 .productButtonDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
 }
 .productButton {
  width: 400px;
  height: 50px;
  background: #f3f0f1;
  position: relative;
  background: #0e253e;
  margin-bottom: 25px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  line-height: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-weight: semibold;
  &:nth-child(1) {
   box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
    6px 6px 10px rgba(0, 0, 0, 0.2);
   color: #ffffff;
  }
  &:hover {
   opacity: 0.3;
   box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
    6px 6px 10px rgba(0, 0, 0, 0.2);
  }
  &:active {
   opacity: 1;
   box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.5),
    inset 8px 8px 16px rgba(0, 0, 0, 0.1);
   color: #ffffff;
  }
 }
 p {
  line-height: 2;
  max-width: 45em;
  margin: 0 auto;
  margin-top: 2rem;
  color: var(--clr-grey-5);
 }
 .pricePara {
  line-height: 0;
  max-width: 0em;
  margin: 0 auto;
  margin-top: 0rem;
  color: var(--clr-grey-5);
 }
 .title {
  text-align: left;
 }
 .underline {
  margin-left: 0;
 }
 @media (min-width: 992px) {
  grid-template-columns: 1fr 1fr;
 }

 @media (max-width: 600px) {
  display: inline;
  gap: 2rem;
  .CanvasSt {
   width: 100%;
   display: block;
   height: 400px;
   background-color: aliceblue;
  }
  .productButtonDiv {
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
  }
  .productButton {
   width: 250px;
   height: 50px;
  }
  p {
   width: 14em;
  }
 }
`
export default ModelViewer
