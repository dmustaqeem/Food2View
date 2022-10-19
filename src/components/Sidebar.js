import React from 'react'
import food2view from '../assets/Food2View-logos.jpeg'
import { Link } from 'react-router-dom'
import { useSideContext } from '../context/sidebar_context'
import { useUserContext } from '../context/user_context'

import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import SocialButtons from './SocialButton.js'

const Sidebar = () => {
 const { isSidebarOpen, closeSidebar } = useSideContext()
 const { myUser } = useUserContext()

 return (
  <SidebarContainer>
   <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>

     <Link to="/" className="linksclass" onClick={closeSidebar}>
      <img src={food2view} className="logo" alt="elpawl" />{' '}
     </Link>

    <SocialButtons />

    <ul className="links">
     {links.map(({ id, text, url }) => {
      return (
       <li key={id}>
        <Link to={url} onClick={closeSidebar}>
         {' '}
         <h4 style={{ fontWeight: 'bold' }}>{text}</h4>{' '}
        </Link>
       </li>
      )
     })}
     {myUser && (
      <li>
       <Link to="/checkout" onClick={closeSidebar}>
        {' '}
        checkout{' '}
       </Link>
      </li>
     )}
    </ul>
   </aside>
  </SidebarContainer>
 )
}

const SidebarContainer = styled.div`
 text-align: center;


 .linksclass {
  display: grid;
  justify-content: center;
 }
 ul {
  display: grid;
  justify-content: center;
 }

 .close-btn:hover {
  color: var(--clr-red-light);
 }
 .logo {
  margin-top: 1rem;
  width: 35vh;
  height: 30vh;
 }
 .logo:hover {
  opacity: 0.5;
 }
 .links {
  margin-bottom: 1rem;
 }

 .links a {
  display: block;
  text-align: center;
  text-transform: capitalize;
  padding: 1rem 3rem;
  margin-top: 0.5rem;
  color: var(--clr-grey-3);
  transition: var(--transition);
  letter-spacing: var(--spacing);
 }

 .links a:hover {
  padding: 0.7rem 1.5rem;
  padding-left: 2rem;
  background: var(--superblue);
  color: var(--clr-grey-2);
 }

 .sidebar {
  background: rgb(6, 106, 225);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition: var(--transition);
  transform: translate(-100%);
  z-index: -1;
 }
 .show-sidebar {
  transform: translate(0);
  z-index: 999;
 }
 .cart-btn-wrapper {
  margin: 2rem auto;
 }
 @media screen and (min-width: 992px) {
  .sidebar {
   display: none;
  }
 }
`

export default Sidebar
