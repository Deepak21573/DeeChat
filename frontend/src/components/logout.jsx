import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi';
function Logout() {
    const navigate = useNavigate();

    const handleClick =  async ()=>{
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
        </Button>
    )
}

// import styled from 'styled-components';

const Button = styled.button`
    position: fixed; /* Fixes button position on the screen */
    bottom: 20px; /* Positions button 20px from the bottom */
    right: 20px; /* Positions button 20px from the right */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 35px;
    background-color: black; 
    border: none;
    width: 2%;
    min-width: 60px;
    height: 40px;
    cursor: pointer;

    svg {
        font-size: 1.3rem;
        color: #ffffff; /* White icon color for contrast */
    }
`

export default Logout
