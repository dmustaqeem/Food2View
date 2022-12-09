import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import food2view from './assets/Food2View-logos.jpeg'
import { FaBars, FaCamera } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links, social } from '../utils/constants'
import { useSideContext } from '../context/sidebar_context'
import { useModalContext } from '../context/modal_context'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'


export default function Navbar() {
 const { openModal } = useModalContext()

 const { openSidebar } = useSideContext()

 //===================================

 const [state, setState] = React.useState({
    left: false,
   })
  
   const toggleDrawer = (anchor, open) => (event) => {
    if (
     event.type === 'keydown' &&
     (event.key === 'Tab' || event.key === 'Shift')
    ) {
     return
    }
  
    setState({ ...state, [anchor]: open })
   }
  
   const list = (anchor) => (
    <Box
     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
     role="presentation"
     onClick={toggleDrawer(anchor, false)}
     onKeyDown={toggleDrawer(anchor, false)}
    >
    <NavbarImageHolder>
        <img
        src={food2view}
        alt="logo"
        style={{ height: '150px', width: '150px' }}
    />
    </NavbarImageHolder>
     <List>
      {['Search', 'Meals', 'New Offers', 'Most Viewed'].map((text, index) => (
       <ListItem key={text} disablePadding>
        <ListItemButton>
         <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
         </ListItemIcon>
         <ListItemText primary={text} />
        </ListItemButton>
       </ListItem>
      ))}
     </List>
     <Divider />
     <List>
      {['Resturants', 'Search By Location'].map((text, index) => (
       <ListItem key={text} disablePadding>
        <ListItemButton>
         <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
         </ListItemIcon>
         <ListItemText primary={text} />
        </ListItemButton>
       </ListItem>
      ))}
     </List>
    </Box>
   )

 //===================================


 //===============Social Media Icons===================
//  <ul className="social-icons">
//      {social.map((socialIcon) => {
//       const { id, url, icon } = socialIcon
//       return (
//        <li key={id}>
//         <a href={url}>{icon}</a>
//        </li>
//       )
//      })}
//     </ul>
//     <ul className="nav-links">
//      {links.map((link) => {
//       const { id, text, url } = link
//       return (
//        <li key={id}>
//         <Link to={url}> {text} </Link>
//        </li>
//       )
//      })}
//     </ul>

//================================================================================

 return (
  <NavContainer>
   <div className="nav-center">
    <div className="nav-header">
    
    <div>
    {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}><FaBars className="faIcon"></FaBars></Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
  </div>
    </div>


    
   </div>
  </NavContainer>
 )
}

const NavbarImageHolder = styled.nav`
    width: 100%;
    height: 200px;
    position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
`;

const NavContainer = styled.nav`
 height: 5rem;
 display: flex;
 align-items: center;
 justify-content: space-between;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

 .social-icons {
  display: none;
 }
 .faIcon{
    color: black;
    font-size: 20px;
    font-weight: bold;
 }
 .faIcon:hover {
  opacity: 0.3;
 }
 .nav-center {
  width: 90vw;
  margin: 0 auto;
  max-width: var(--max-width);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
 }

 .nav-header {
  display: flex;
  align-items: center;
  img {
   width: 100px;
   margin-left: -15px;
   margin-top: 75px;
   margin-bottom: 50px;
  }
 }
 .nav-toggle {
  background: transparent;
  border: transparent;
  color: var(--clr-primary-5);
  cursor: pointer;
  svg {
   font-size: 2rem;
  }
 }
 .camera-toggle {
  background: transparent;
  border: transparent;
  color: var(--cltr-primary-5);
  cursor: pointer;
  svg {
   font-size: 2rem;
  }
 }

 .nav-links {
  display: none;
 }

 .nav-links a {
  text-transform: capitalize;
  display: inline-block;
  font-weight: bold;
  margin-right: 0.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  transition: var(--mainTransition);
 }
 .nav-links a:hover {
  color: var(--primaryColor);
 }
 .logo {
  width: 3rem;
  background-color: var(--clr-font);
 }
 .btn:hover {
  opacity: 0.3;
 }
 @media (min-width: 992px) {
  .nav-toggle {
   display: none;
  }
  .camera-toggle {
   display: none;
  }

  .modal-overlay {
   display: none;
  }
  .show-modal {
   display: none;
  }
  .modal-container {
   display: none;
  }
  .close-modal-btn {
   display: none;
  }
  .nav-center {
   display: grid;
   grid-template-columns: auto 1fr auto;
   align-items: center;
   justify-content: center;
  }
  .search-input {
   width: 30rem;
  }
  .social-icons {
   display: flex;
   li {
    margin-left: 1rem;
   }
  }
  .social-icons a {
   color: var(--clr-primary-3);
  }
  .social-icons a:hover {
   color: grey;
  }
  .nav-links {
   display: flex;
   justify-content: center;
   li {
    margin: 0 0.5rem;
   }
   a {
    color: var(--clr-grey-3);
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    padding: 0.5rem;
    &:hover {
     border-bottom: 2px solid var(--clr-primary-7);
    }
   }
  }
 }
`
