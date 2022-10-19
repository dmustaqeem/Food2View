import React from 'react'
import { FaFacebook, FaYoutube, FaTwitter, FaGoogle } from 'react-icons/fa'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const info = [
 {
  id: 1,
  text: 'About',
  url: '/information',
 },
 {
  id: 2,
  text: 'media',
  url: '/menu',
 },
 {
  id: 3,
  text: 'contact',
  url: '/contact',
 },
 {
  id: 4,
  text: 'add',
  url: '/reviews',
 }
]
export const links = [
 
]
export const services = [
 {
  id: 1,
  icon: <GiCompass />,
  title: 'mission',
  text:
   'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
 },
 {
  id: 2,
  icon: <GiDiamondHard />,
  title: 'vision',
  text:
   'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
 },
 {
  id: 3,
  icon: <GiStabbedNote />,
  title: 'history',
  text:
   'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
 },
]
export const social = [
 {
  id: 1,
  url: 'https://www.twitter.com',
  icon: <FaFacebook />,
 },
 {
  id: 2,
  url: 'https://www.twitter.com',
  icon: <FaTwitter />,
 },
 {
  id: 3,
  url: 'https://www.twitter.com',
  icon: <FaGoogle />,
 },
 {
  id: 4,
  url: 'https://www.twitter.com',
  icon: <FaYoutube />,
 },
]
export const products_url = 'https://course-api.com/react-store-products'
export const api_url = 'https://apif2v.netlify.app/api/airtable'
export const single_product_url = `https://course-api.com/react-store-single-product?id=`
