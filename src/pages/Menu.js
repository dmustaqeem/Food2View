import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useLocation } from 'react-router-dom'
import text from '../components/config.json';
import { Link } from 'react-router-dom';

const ModelViewer = () => {
    const location = useLocation();
    console.log(location);
    var arr = [];
    for (var key of Object.keys(text)) {
        if(location.state.Name == text[key].resturant){
            var obj = {Image: text[key].Image, Price: text[key].price, Name: text[key].Name}
            arr.push(obj);
        }
    }
    return (
    <main>
        <PageHero title="Menu" />
        <Wrapper className="page section section-center">
        
        <article>
        
            <div className='headerContainer'>
                <img src={location.state.Image} className="logoHC" alt="logo" />
                <div className='InfoDiv'>
                    <div className="info">
                        <div style={{color: '#FF0000'}}>Opening Hours</div>
                        <div className='data'>2-5</div>
                    </div>

                    <div className="info">
                        <div style={{color: '#FF0000'}}>Phone</div>
                        <div className='data'>111222333</div>
                    </div>

                    <div className="info">
                        <div style={{color: '#FF0000'}}>Address</div>
                        <div className='data'>{location.state.Location}</div>
                    </div>
                </div>
            </div>

            {arr.map((arr) => {
                const { Image, Price, Name  } = arr
                return (

                    <div className='productsContainer'>
                        <div className='productC'>
                            <img src={Image} style={{backgrondColor: '0xff00ff'}} className="logo" alt="logo" />
                            <div className='productTitle'>{Name}</div>
                            <div className='productTitle'>
                                    <Link
                                    to={{
                                    pathname: "/Modelviewer",
                                    search: "?sort=name",
                                    hash: "#the-hash",
                                    state: { name: Name }
                                    }}>
                                        <div class="arrow" >
                                            <div class="arrow-top"></div>
                                            <div class="arrow-bottom"></div>
                                        </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
               })}
    

        </article>

        

    </Wrapper>
    </main>
    )
}

const Wrapper = styled.section`
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
 display: grid;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 grid-gap: 5rem;


 //

 .arrow {
  cursor: pointer;
  height: 10%;
  left: 90%;
  position: absolute;
  top: 60%;
  transform: translateX(-50%) translateY(-50%);
  transition: transform .1s;
  width: 10%;
  
  &-top,
  &-bottom {
    background-color: red;
    height: 4px;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 50px;
    
    &:after {
      background-color:red;
      content: '';
      height: 100%;
      position: absolute;
      top: 0;
      transition: all $transition-time;
    }
  }
  
  &-top {
    transform: rotate(45deg);
    transform-origin: bottom right;
    
    &:after {
      left: 100%;
      right: 0;
      transition-delay: 0s;
    }
  }
  
  &-bottom {
    transform: rotate(-45deg);
    transform-origin: top right;
    
    &:after {
      left: 0;
      right: 100%;
      transition-delay: $transition-time;
    }
  }
  &:active {
    transform: translateX(-50%) translateY(-50%) scale(0.9);
  }
}

 //

 .headerContainer{
    width: 1200px;
    max-width: 1200px;
    height: 200px;
    position: relative;
    border-radius: 20px;
    display: flex;
    box-shadow:
        inset 
                0 0  0 2px rgb(255,255,255),
                0.3em 0.3em 1em rgba(0,0,0,0.3);
 }

 .logo{
    display: block;
    width: 320px;
    height: 150px;
 }

 .InfoDiv{
    width: 100%;
    height: 100%;
    font-size: 15px;
    display: grid;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 350px;
 }
 .info{
    display: flex;
 }

 .data{
    margin-left: 50px;
 }

 .productsContainer{
    margin-top: 3%;
    width: 1200px;
    max-width: 1200px;
    min-width: 500px;
    height: 200px;
    position: relative;
    border-radius: 20px;
    display: grid;
 }

 .productC{
    margin-top: 5px;
    border-radius: 20px;
    display: flex;
    box-shadow:
        inset 
                0 0  0 2px rgb(255,255,255),
                0.3em 0.3em 1em rgba(0,0,0,0.3);
 }

 .productTitle{
    width: 30%;
    height: 100%;
    display: grid;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 100px;
 }

 

@media (max-width: 600px) {
  grid-template-columns: 1fr 1fr;
  display: inline-block;


  .logo {
   width: 200px;
   height: 125px;
  }
  .logoHC{
    width: 90%;
    height: 125px;
  }
  

  .headerContainer{
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;
 }

 .InfoDiv{
    font-size: 15px;
    display: inline-block;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    margin-top: 10%;
 }
 .info{
    display: flex;
 }

 .data{
    margin-left: 50px;
 }

 .productsContainer{
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
    margin-top: 90px;
 }

 .productC{
    margin-top: 10px;
    display: inline-block;
 }

 .productTitle{
    width: 30%;
    height: 100%;
    display: inline-block;
    margin-left: 100px;
 }


 //

 .arrow {
  display: inline-block;
  height: 10%;
  left: 70%;
  top: 70%;
  width: 10%;
  
  &-top,
  &-bottom {
    width: 50px;
  }

  
}

 //


}
`
export default ModelViewer
