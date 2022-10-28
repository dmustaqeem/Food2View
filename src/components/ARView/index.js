import React, { Component } from 'react'
import * as THREE from 'three'
import * as ZapparThree from '@zappar/zappar-threejs'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import styled from 'styled-components'
// import Burger from '../../assets/Models/burger-3d-model/source/ScannedBurger.fbx'
import Robo from '../../assets/Models/robo.glb'
import {Storage} from 'aws-amplify';

class ARView extends React.Component {
 componentDidMount() {

    fetch('https://food2view.s3.amazonaws.com/robo.glb')
    .then ((response) => response.text())
    .then (data => {
      console.log(data)
    });
  var width = this.mount.clientWidth
  var height = this.mount.clientHeight / 1.5

  if (ZapparThree.browserIncompatible()) {
   ZapparThree.browserIncompatibleUI()
   throw new Error('Unsupported browser')
  }

  this.camera = new ZapparThree.Camera()

  const manager = new ZapparThree.LoadingManager()

  this.renderer = new THREE.WebGLRenderer({ antialias: true })
  this.scene = new THREE.Scene()
  document.body.appendChild(this.renderer.domElement)

  this.renderer.setSize(window.innerWidth, window.innerHeight)
  window.addEventListener('resize', () => {
   this.renderer.setSize(window.innerWidth, window.innerHeight)
  })

  ZapparThree.permissionRequestUI().then((granted) => {
   if (granted) this.camera.start()
   else ZapparThree.permissionDeniedUI()
  })

  ZapparThree.glContextSet(this.renderer.getContext())

  this.scene.background = this.camera.backgroundTexture

  const instantTracker = new ZapparThree.InstantWorldTracker()
  this.instantTrackerGroup = new ZapparThree.InstantWorldAnchorGroup(
   this.camera,
   instantTracker
  )

  this.scene.add(this.instantTrackerGroup)

  // Let's add some lighting, first a directional light above the model pointing down
  const directionalLight = new THREE.DirectionalLight('white', 0.8)
  directionalLight.position.set(0, 5, 0)
  directionalLight.lookAt(0, 0, 0)
  this.instantTrackerGroup.add(directionalLight)

  // And then a little ambient light to brighten the model up a bit
  const ambientLight = new THREE.AmbientLight('white', 0.4)
  this.instantTrackerGroup.add(ambientLight)


  //   const loader = new FBXLoader()
  //   loader.load(
  //    Burger,
  //    (object) => {
  //     object.position.set(0, 0, 0)
  //     object.scale.set(0.5, 0.5, 0.5)
  //     this.instantTrackerGroup.add(object)
  //    },
  //    (xhr) => {
  //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  //    },
  //    (error) => {
  //     console.log(error)
  //    }
  //   )

  const gltfLoader = new GLTFLoader(manager)

  gltfLoader.load(
   Robo,
   (gltf) => {
    // gltf.scene.scale.set(0.5,0.5,0.5)
    // gltf.scene.position.set(0,-1,-1)
    this.instantTrackerGroup.add(gltf.scene)
   },
   undefined,
   () => {
    console.log('An error ocurred loading the GLTF model')
   }
  )
  instantTracker.setAnchorPoseFromCameraOffset(0, -1, -2);

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
  this.camera.updateFrame(this.renderer)
  this.renderer.render(this.scene, this.camera)
  if (this.renderer) this.renderer.render(this.scene, this.camera)
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
 height: 100%;
 position: absoloute;
 display: block;
`

export default ARView
