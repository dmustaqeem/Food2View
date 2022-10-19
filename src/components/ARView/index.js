import React, { Component } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { ARButton } from 'three/examples/jsm/ARButton.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import styled from 'styled-components'

var scene

class ARView extends React.Component {
 componentDidMount() {
  var width = this.mount.clientWidth
  var height = this.mount.clientHeight / 1.5

  scene = new THREE.Scene()

  this.camera = new THREE.PerspectiveCamera(
   70,
   window.innerWidth / window.innerHeight,
   0.01,
   20
  )

  this.renderer = new THREE.WebGLRenderer({ antialias: true })
  this.renderer.setClearColor('#FF00FF')
  this.renderer.setSize(width, height)
  this.mount.appendChild(this.renderer.domElement)
  this.renderer.xr.enabled = true
  this.renderer.outputEncoding = THREE.sRGBEncoding

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
  light.position.set(0.5, 1, 0.25)
  scene.add(light)

  var ar = new ARButton(this.renderer, {
   sessionInit: {
    optionalFeatures: ['dom-overlay'],
    domOverlay: { root: document.body },
   },
  })
  console.log(ar)

  this.renderScene()
  this.start()
 }

 componentWillUnmount() {
  this.stop()
  this.mount.removeChild(this.renderer.domElement)
 }
 start = () => {
  if (!this.frameId) {
   this.frameId = requestAnimationFrame(this.animate)
  }
 }
 stop = () => {
  cancelAnimationFrame(this.frameId)
 }
 animate = () => {
  this.renderScene()
  this.frameId = window.requestAnimationFrame(this.animate)
 }
 renderScene = () => {
  if (this.renderer) this.renderer.render(scene, this.camera)
 }

 render() {
  return (
   <MountStyle
    ref={(mount) => {
     this.mount = mount
    }}
   />
  )
 }
}

const MountStyle = styled.div`
 width: 100%;
 height: 900px;
 position: absoloute;
`

export default ARView
