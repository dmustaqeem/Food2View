import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaBars, FaCamera } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links, social } from '../utils/constants'
import { useSideContext } from '../context/sidebar_context'
import { useModalContext } from '../context/modal_context'


export default function Navbar() {
 const { openModal } = useModalContext()

 const { openSidebar } = useSideContext()

 return (
  <NavContainer>
   <div className="nav-center">
    <div className="nav-header">
     <button type="button" className="nav-toggle" onClick={openSidebar}>
      <FaBars className="faIcon" />
     </button>
    </div>

    <button type="button" className="camera-toggle" onClick={openModal}>
     <FaCamera />
    </button>

    <ul className="social-icons">
     {social.map((socialIcon) => {
      const { id, url, icon } = socialIcon
      return (
       <li key={id}>
        <a href={url}>{icon}</a>
       </li>
      )
     })}
    </ul>
    <ul className="nav-links">
     {links.map((link) => {
      const { id, text, url } = link
      return (
       <li key={id}>
        <Link to={url}> {text} </Link>
       </li>
      )
     })}
    </ul>
   </div>
  </NavContainer>
 )
}

const NavContainer = styled.nav`
 height: 5rem;
 display: flex;
 align-items: center;
 justify-content: space-between;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

 .social-icons {
  display: none;
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
