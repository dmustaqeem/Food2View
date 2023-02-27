import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import styled from 'styled-components'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set } from "firebase/database";

var scene
class Three extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   selectedModel: '',
  }
 }

 getObject() {}

 componentDidMount() {
  if (this.props.status == 'none') {
   this.width = this.mount.clientWidth;
   this.height = this.mount.clientHeight;
  //  console.log("Width is:  " + this.mount.clientWidth);
  //  console.log("Height is:  " + this.mount.clientHeight);
  //  if (window.innerWidth <= 800) {
  //   this.width = 300
  //   this.height = 400
  //  }
  } else {
   this.width = this.mount.clientWidth
   this.height = this.mount.clientHeight / 1.5
  }
  var object = this.props.model
  scene = new THREE.Scene()
  this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
  this.camera.position.z = 8
  this.camera.position.y = 5
  this.objMTL = []
  this.obj = []
  this.gltfArr = []
  this.fbxArr = []

  this.renderer = new THREE.WebGLRenderer({ antialias: true })
  this.renderer.setClearColor('#D3D3D3')
  this.renderer.setSize(this.width, this.height)
  this.mount.appendChild(this.renderer.domElement)

  this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  this.controls.target.set(0, 0, 0)
  //this.controls.enableZoom = false;

  // Your web app's Firebase configuration
  const firebaseConfig = {
   apiKey: 'AIzaSyD4z6orD880wzC453IwB7IJMHbDgGnOEak',
   authDomain: 'food2view-storage.firebaseapp.com',
   databaseURL: 'https://food2view-storage-default-rtdb.firebaseio.com',
   projectId: 'food2view-storage',
   storageBucket: 'food2view-storage.appspot.com',
   messagingSenderId: '854509118316',
   appId: '1:854509118316:web:2865aafdc9d2238a0b4949',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app);
  set(ref(db, 'users/' + '1'), {
    username: 'd',
    email: 'dawarmustaqeem@gmail.com'
  });
  var model

  //LIGHTS
  var lights = []
  lights[0] = new THREE.AmbientLight(0xffffff, 1)
  lights[1] = new THREE.PointLight(0xffffff, 1, 0)
  lights[2] = new THREE.PointLight(0xffffff, 1, 0)
  lights[1].position.set(100, 200, 100)
  lights[2].position.set(-100, -200, -100)
  scene.add(lights[0])
  scene.add(lights[1])
  scene.add(lights[2])


  this.renderScene()
  this.start()
  if (object.type == 'obj') {
   if (object.mtl == '') {
    var obj = {
     path: object.path,
     obj: object.object,
     scale: object.scale,
     mesh: null,
    }
    this.obj.push(obj)
   } else {
    var obj = {
     path: object.path,
     obj: object.object,
     mtl: object.mtl,
     scale: object.scale,
     mesh: null,
    }
    this.objMTL.push(obj)
   }
  }

  if (object.type == 'glb' || object.type == 'gltf') {
   var obj = {
    path: object.path,
    obj: object.object,
    scale: object.scale,
    rotX: object.rotX,
    rotY: object.rotY,
    rotZ: object.rotZ,
    mesh: null,
   }
   this.gltfArr.push(obj)
  }

  if (object.type == 'fbx') {
   var obj = {
    path: object.path,
    obj: object.object,
    scale: object.scale,
    rotationX: object.rotX,
    rotationY: object.rotY,
    rotationZ: object.rotZ,
    mesh: null,
   }
   this.fbxArr.push(obj)
  }

  //GLTF/GLB Loader
  if (this.gltfArr != null) {
   for (let i in this.gltfArr) {
    var scale = this.gltfArr[i].scale
    var rotX = this.gltfArr[i].rotX;
    var rotY = this.gltfArr[i].rotY;
    var rotZ = this.gltfArr[i].rotZ;
    var loader = new GLTFLoader()
    loader.load(this.gltfArr[i].obj, function (gltf) {
     gltf.scene.position.set(0, 0, 0)
     gltf.scene.scale.set(scale, scale, scale)
     gltf.scene.rotation.set(rotX, rotY, rotZ)
     scene.add(gltf.scene)
    })
   }
  }

  //OBJ Loader for OBJs Without MTL
  if (this.obj != null) {
   for (let i in this.obj) {
    const loader = new OBJLoader()
    var scale = this.obj[i].scale
    loader.setPath(this.obj[i].path)
    loader.load(this.obj[i].obj, function (object) {
     object.position.set(0, 0, 0)
     object.scale.set(scale, scale, scale)
     object.rotation.set(0, 0, 0)
     scene.add(object)
    })
   }
  }

  //OBJ Loader for OBJs with MTL
  if (this.objMTL != null) {
   for (let i in this.objMTL) {
    var mtlLoader = new MTLLoader()
    var path = this.objMTL[i].path
    var mtl = this.objMTL[i].mtl
    var obj = this.objMTL[i].obj
    var scale = this.objMTL[i].scale
    mtlLoader.setPath(path)
    mtlLoader.load(mtl, function (materials) {
     materials.preload()
     var objloader = new OBJLoader()
     objloader.setMaterials(materials)
     objloader.setPath(path)
     objloader.load(obj, function (object) {
      object.position.set(0, 0, 0)
      object.scale.set(scale, scale, scale)
      object.rotation.set(0, 0, 0)
      scene.add(object)
     })
    })
   }
  }

  //FBX Loader for OBJs
  if (this.fbxArr != null) {
   for (let i in this.fbxArr) {
    var xr = this.fbxArr[i].rotationX
    var yr = this.fbxArr[i].rotationY
    var zr = this.fbxArr[i].rotationZ
    const loader = new FBXLoader()
    var scale = this.fbxArr[i].scale
    loader.load(this.fbxArr[i].obj, function (object) {
     object.position.set(0, 0, 0)
     object.scale.set(scale, scale, scale)
     object.rotation.set(xr, yr, zr)
     scene.add(object)
    })
   }
  }

  this.controls.update()
  window.addEventListener( 'resize', this.onWindowResize, false );
 }

 onWindowResize(){
  
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
  this.controls.update()
  this.renderScene()
  this.frameId = window.requestAnimationFrame(this.animate)
 }
 renderScene = () => {
  if (this.renderer) this.renderer.render(scene, this.camera)
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
 position: relative;
 display: block;
 position: relative;
 border-radius: 20px;
 height: 400px;
 width: 100%;

 @media (max-width: 600px) {
 }
`

export default Three
