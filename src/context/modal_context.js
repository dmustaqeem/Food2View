import React, { useState, useContext } from 'react'

const ModalContext = React.createContext()

const ModalProvider = ({ children }) => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false)
 const [isModalOpen, setIsModalOpen] = useState(false)

 const openSidebar = () => {
  setIsSidebarOpen(true)
 }
 const closeSidebar = () => {
  setIsSidebarOpen(false)
 }

 const openModal = () => {
  setIsModalOpen(true)
 }
 const closeModal = () => {
  setIsModalOpen(false)
 }

 return (
  <ModalContext.Provider
   value={{
    isSidebarOpen,
    isModalOpen,
    openModal,
    closeModal,
    openSidebar,
    closeSidebar,
   }}
  >
   {children}
  </ModalContext.Provider>
 )
}

export const useModalContext = () => {
 return useContext(ModalContext)
}

export { ModalContext, ModalProvider }
