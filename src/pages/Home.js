import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import SearchForm from '../components/SearchForm'
import { Hero } from '../components'
const Home = () => {
    const [mainOverflow, setMainOverflow] = useState('');
    const pull_data = (data) => {
    }
    return (
    <MainContainer>
    <Hero func={pull_data}/>
    </MainContainer>
 )
}
const MainContainer = styled.main`
 height: 100%;
 width: 100%;

 display: grid;
 justify-content: center;
 align-items: center;
`

export default Home
