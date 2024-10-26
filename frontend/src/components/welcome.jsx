import React, {useState , useEffect} from 'react'
import styled from 'styled-components'
import Robot from '../images/robot.gif'
function Welcome({currentUser}) {

    const [userName , setUserName] = useState("");
    const fetchUserName = async ()=>{
        const data = await JSON.parse(localStorage.getItem('chat-app-user'))
        setUserName(data.username);
    }

    useEffect(()=>{
        fetchUserName();
    },[]);

    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome , <span>{userName}</span>
            </h1>
            <h3>My Chat App</h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction :column;

    img{
        height: 17rem;
    }

    h1 , h3{
        margin :10px;
    }
    span{
        color: #4e0eff;
    }
`
export default Welcome