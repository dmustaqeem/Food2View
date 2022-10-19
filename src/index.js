import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { SideProvider } from './context/sidebar_context.js'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'
import { ModalProvider } from './context/modal_context'

ReactDOM.render(
  <UserProvider>
   <SideProvider>
    <CartProvider>
     <ModalProvider>
      <App />
     </ModalProvider>
    </CartProvider>
   </SideProvider>
  </UserProvider>,
 document.getElementById('root')
)
