import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, About, ErrorPage, ModelViewer, Menu } from './pages/Index'
import { Navbar, Sidebar, Geolocation, Footer } from './components'

function App() {
 return (
  <Router>

   <Sidebar />
   <Switch>
    <Route exact path="/">
     <Home/>
    </Route>
    <Route path="/about">
     <About />
    </Route>
    <Route path="/modelviewer">
    <ModelViewer/>
   </Route>

   <Route path="/menu">
        <Menu/>
    </Route>

    <Route path="*">
     <ErrorPage />
    </Route>
   </Switch>
   {/* <Footer /> */}
  </Router>
 )
}

export default App
