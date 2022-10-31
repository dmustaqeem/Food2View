import React, { Component } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import styled from 'styled-components'
import { initializeApp } from 'firebase/app'
import { ARButton } from '../ARButton.js'

var ar, controller, model
var scene = new THREE.Scene()
class ARView extends React.Component {
 
componentDidMount() {

  const container = document.createElement("div");
  document.body.appendChild(container);
  var width = this.mount.clientWidth
  var height = this.mount.clientHeight / 1.5
  
  this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  scene.add(this.camera)

  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  this.renderer.setPixelRatio(window.devicePixelRatio)
  this.renderer.setSize(window.innerWidth, window.innerHeight)
  this.renderer.xr.enabled = true
  container.appendChild(this.renderer.domElement);

  ar = new ARButton( this.renderer, { sessionInit: { optionalFeatures: [ 'dom-overlay' ], domOverlay: { root: document.body } } } );


  this.animate()

 }
 animate = () => {
  this.renderScene()
  window.requestAnimationFrame(this.animate)
 }
 renderScene = () => {
  this.renderer.render(scene, this.camera)
 }

 render() {
  return (
   <Wrapper
    ref={(mount) => {
     this.mount = mount
    }}
   />
  )
 }
}

const Wrapper = styled.div`
 @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
 width: 100px;
 height: 100px;
`

export default ARView
