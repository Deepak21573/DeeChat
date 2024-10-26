import React ,{useState , useEffect} from 'react'
import styled from 'styled-components';
import Logo from '../images/logo.png';
import {useNavigate , Link} from 'react-router-dom'

function Contact({contacts , currentUser , changeChat}) {
    const [currentUserName , setCurrentUserName] = useState(undefined);
    const [currentUserImage , setCurrentUserImage] = useState(undefined);
    const [currentSelected , setCurrentSelected] = useState(undefined);

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]);

    return (
        <>
        {
            currentUserImage && currentUserName &&(
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>DeeChat</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index)=>{
                                return(
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    key={index} 
                                    onClick={()=>changeCurrentChat(index,contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="currentuser">
                        <div className="avatar">
                            <Link to="/setAvatar"><img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" /></Link>
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>

                </Container>
            )
        }
        </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: black;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: grey;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact{
            background-color :#ffffff34;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 1rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            overflow: hidden;
            
            .avatar{
                img{
                    height: 3rem;
                }
            }
            
            .username{
                h3{
                    color: white;
                    font-size:0.9rem;
                }
            }

        }
        
        .selected{
            background-color: blue;
        }
    }

    .currentuser {
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        height: 100%;

        .avatar {
            img {
                height: 4rem;
            }
        }
        .username {
            h2 {
                color: white;
                font-size:0.95rem;
            }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
        //   font-size: 0.25rem;
         color: white;
            font-size:0.95rem;
        }
      }
    }
  }
`;

export default Contact