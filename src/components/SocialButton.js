import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'
import { social } from '../utils/constants'

const SocialButtons = () => {
 return (
  <Wrapper className="cart-btn-wrapper">
   <div className="iconbox">
    <ul className="social-icons">
     {social.map((socialIcon) => {
      const { id, url, icon } = socialIcon
      return (
       <li key={id}>
     
         {' '}
         <a href={url}>{icon}</a>

       </li>
      )
     })}
    </ul>
   </div>
  </Wrapper>
 )
}

const Wrapper = styled.div`
 display: grid;
 justify-content: center;
 grid-gap: 5rem;
 .socialbox {
  display: flex;
  grid-column: 1/3;
  grid-row: 1/2;
 }

 ul {
  list-style-type: none;
 }

 .social-icons {
  display: flex;
 }
 svg:hover {
  color: var(--superblue);
 }
 .social-icons a {
  margin: 0 0.5rem;
  color: black;
  transition: var(--transition);
 }
 .social-icons a:hover {
  color: var(--superblue);
 }

 .cart-btn {
  color: var(--clr-grey-1);
  font-size: 1.5rem;
  letter-spacing: var(--spacing);
  color: var(--clr-grey-1);
  display: flex;
  transition: var(--transition);

  align-items: center;
 }
 .cart-btn:hover {
  transform: rotate(90deg);
 }
 .cart-container {
  display: flex;
  align-items: center;
  svg {
   height: 1.6rem;
   margin-left: 5px;
  }
 }
 .cart-value {
  top: -10px;
  right: -16px;
  background: var(--clr-primary-5);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  color: var(--clr-white);
  padding: 12px;
 }
`
export default SocialButtons
