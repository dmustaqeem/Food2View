import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import SingleItem from './SingleItem'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import InfoIcon from '@mui/icons-material/Info';
import Backdrop from '@mui/material/Backdrop';
import Three from './three/index'
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { api_url, Resturants } from '../utils/constants';
const theme = createTheme({
    palette: {
        neutral: {
            main: '#c59d5f',
            contrastText: '#fff',
        },
    },
});

const Menu = ({ items }) => {

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState();
    const [resturant, setResturant] = React.useState();
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    async function fetchData () {
      return fetch(api_url)
            .then((response) => response.json())
            .then((data) => {Resturants[0] = data});
    }

    function restValue(){
      for (var key of Object.keys(Resturants[0])) {
        if(values.resturant === Resturants[0][key].name){
          setResturant(Resturants[0][key].url)
        }
      }
    }


    function renderCard() {
        if (open == true) {
            return (<CardWrapper>
                <div className='close-icon'><CloseIcon style={{ color: 'black', cursor: 'pointer' }} onClick={handleClose} /></div>
                <div className='header'>
                    <img className='meal-name' src={resturant}/>
                </div>
                <div className='model-holder'>
                    <Three status="full" model={values} />
                </div>

                <div style={{ width: '100%', height: '15%', borderRadius: '6px', backgroundColor: '#427AF4', display: 'grid', justifyContent: 'center', textAlign: 'center', placeContent: 'center' }}>
                    {values.Description}
                </div>

                <div className='button-holder'>
                    <div className='left-button'><Button variant="contained">View In AR</Button></div>
                    <div className='right-button'><Button variant="contained">Price:  ${values.price}</Button></div>
                </div>
            </CardWrapper>)
        }
    }


    useEffect(() => {
      fetchData();
    },[])



    return (
        <Wrapper>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                {renderCard()}
            </Backdrop>



            <div className="sectionCenter">
                {items.map((menuItem, index) => {
                    const { id, Name, Image, resturant, price, model } = menuItem

                    return (
                        <article key={id} className="product-card">
                            <img className="card-image" src={Image} />
                            <div className="overlay-product" />
                            <div className="product-details">
                                <header className='product-header'>
                                    <h4 style={{ color: 'white' }}>{Name}</h4>
                                </header>



                                <div className='description-holder'>
                                    <InfoIcon onClick={() => {
                                        handleToggle()
                                        setValues(menuItem)
                                        restValue();
                                    }} />
                                </div>

                                <div
                                    style={{
                                        // border: '2px solid red',
                                        width: '100%',
                                        height: '30px',
                                        display: 'grid',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" style={{ color: 'darkblue' }}
                                            onClick={function (event) {
                                                var win = window.open(
                                                    'https://ar.food2view.com/ ' + '?Model=' + model + '/' + 'Por Do Sol',
                                                    '_blank'
                                                )
                                                win.focus()
                                            }}>
                                            <div style={{ color: 'white' }}>Try in AR</div>

                                            <ViewInArIcon style={{ color: 'white' }} />
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </Wrapper>
    )
}


const CardWrapper = styled.div`
  height:85%;
  width:70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* added z-index */


  .header{
    width: 100%;
    height: 20%;
    display: grid;
    justify-content: center;
    place-content: center;
  }

  .model-holder{
    width: 100%;
    height: 47%;
  }

  .close-icon{
    position: absolute;
    top: 5;
    left: 5;
    width: 5%;
    height: 5%;
  }

  .description-holder{
    width: 100%;
    height: 10%;
    background-color: black;
    
  }

  .button-holder{
    height: 20%;
    width: 100%;
    display: flex;
  }

  .left-button{
    width: 50%;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .right-button{
    width: 50%;
    height: 100%;
    display: grid;
    place-content: center;
  }

  .meal-name{
    font-size: 40px;
    color: black;
    font-family: sans-serif;
    font-style: italic;
}

  @media screen and (max-width: 768px) {
    width: 90%;
    .meal-name{
    font-size: 20px;
    color: black;
    font-family: sans-serif;
    font-style: italic;
} 

    .button-holder{
    height: 20%;
    width: 100%;
    display: grid;
  }

  .left-button{
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .right-button{
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
  }
`;

const Wrapper = styled.div`
position: absolute;
left: 0;
width: 100%;
font-family: "Roboto Condensed", sans-serif;

  .sectionCenter {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    background-color: var(--blue);
    color: cornsilk;
  }

  .product-card {
    border-radius: 20px;
    display: grid;
    height: 40vh;
    width: 50vh;
    margin-top: 4rem;
    margin-bottom: 1rem;
    /* transition: all 0.7s cubic-bezier(0.895, 0.03, 0.685, 0.22); */
    transition: box-shadow 0.3s;
    &:hover{
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(9, 55, 53, 0.08),
      0px 16px 24px rgba(9, 55, 53, 0.1), 0px 24px 32px rgba(9, 55, 53, 0.14); 
    }
  }

  .card-image{
    border-radius: 20px;
    object-fit:cover;
    height: 40vh;
    width: 50vh;
    border-radius: var(--radius);
    display: block;
    position: absolute;
  }

  
  .product-details{
    border-radius: 20px;
      display: grid;
      justify-content: center;
      align-items: center;
      z-index: 1;
      height: 40vh;
      width: 50vh;
      position: relative;
      transition: backdrop-filter 0.3s;
      border-radius: var(--radius);
  }


  .overlay-product{
      border-radius: 6px;
      display: grid;
      justify-content: center;
      align-items: center;
      background-color: black;
      z-index: 1;
      height: 40vh;
      width: 50vh;
      position: absolute;
      opacity: 0.4;
      border-radius: var(--radius);
  }

  .product-details:hover{
    backdrop-filter: blur(5px);
    }

    

  .product-header{
      width: 100%;
      display: grid;
      position: relative;
      align-items: center;
      justify-content: center;

  }
  .item-info header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px dotted var(--clr-grey-5);
  }

  .item-info h4 {
    margin-bottom: 0.5rem;
  }

  .price {
    position: relative;
    text-align: center;
    color: darkblue;
  }

  .description-holder {
    position: relative;
    display: inline;
    padding: 1rem;
    color: white;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    visibility: hidden;
  }

  .product-details:hover .description-holder{
    visibility: visible;
    }

  .item-text {
    color: white;
  }


.overlay-content {
  height:85%;
  width:70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* added z-index */
}

  @media (min-width: 576px) {
  }

  @media only screen and (max-width: 600px) {
  }

  @media only screen and (min-width: 600px) {
  }

  @media screen and (max-width: 768px) {
    .menu-item {
      grid-template-columns: 200px 1fr;
      gap: 0 1.00rem;
      max-width: 50rem;
    }

    .photo {
      height: 175px;
    }
    .product-card {
    height: 40vh;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 1rem;
    
  }

  .card-image{
    border-radius: 20px;
    object-fit:cover;
    height: 40vh;
    width: 100%;
    border-radius: var(--radius);
    display: block;
    position: absolute;
  }

  
  .product-details{
    border-radius: 20px;
      display: grid;
      justify-content: center;
      align-items: center;
      z-index: 1;
      height: 40vh;
      width: 100%;
      position: relative;
      transition: backdrop-filter 0.3s;
      border-radius: var(--radius);
  }


  .overlay-product{
      border-radius: 6px;
      display: grid;
      justify-content: center;
      align-items: center;
      background-color: black;
      z-index: 1;
      height: 40vh;
      width: 100%;
      position: absolute;
      opacity: 0.4;
      border-radius: var(--radius);
  }

  }

  @media (min-width: 992px) {
  }
  @media screen and (min-width: 1200px) {
    .sectionCenter {
      width: 100%;
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    }
    /* .sectionCenter {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    background-color: var(--blue);
    color: cornsilk;
  } */

    .photo {
      height: 150px;
    }
  }
`
export default Menu
