import React , {useState , useEffect }from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components'
import Logo from '../images/logo.png';
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios';
import {signupRoute} from '../APIRoutes.js';

function Signup() {
    const navigate = useNavigate()
    const [values , setValues] = useState({
        username: "",
        email: "",
        password: "",
        comfirmpassword: "",
    });
    
    // toast customization
    const toastOptions = {
        position : 'top-right',
        autoClose: 6000,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark',
    }

    //  is user is already log in
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/");
        }
    } ,[])

    const validations = ()=>{
        const {username, email, password , comfirmpassword} = values;
        if(password !== comfirmpassword){
            toast.error("password and comfirm password must be same" , toastOptions);
            return false;
        }
        if(username.length < 6){
            toast.error("username should be more than 6 characters" , toastOptions);
            return false;
        }
        if(password.length < 8){
            toast.error("paasword should contain atleast 8 character" , toastOptions);
            return false;
        }
        if(email === ''){
            toast.error("email required" , toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({...values , [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(validations()){
            // console.log("hello");
            // console.log(signupRoute);
            const {username , email , password } = values; 
            const {data} = await axios.post(signupRoute , {username , email , password});
            if(data.status === false){
                toast.error(data.msg , toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user' ,JSON.stringify(data.user));
                navigate('/')
            }
        }
    }

    return (
    <div>
        <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
                <div className="Logo">
                    <img src={Logo} alt=".." />
                    <h3>DeeChat</h3>
                </div>
                <input type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(event) => handleChange(event)}
                    />
                <input type="email" 
                    placeholder='Email'
                    name='email'
                    onChange={(event) => handleChange(event)}
                />
                <input type="password" 
                    placeholder='Password'
                    name='password'
                    onChange={(event) => handleChange(event)}
                />
                <input type="password" 
                    placeholder='Comfirm Password'
                    name='comfirmpassword'
                    onChange={(event) => handleChange(event)}
                />

                <button type="submit">Create Account</button>

                <span>
                    Already have an account ? <Link to="/login">Login</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </div>
    )
}



// CSS style
// background-color: #FF3CAC;
// background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);


const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #a1c4fd, #c2e9fb); /* Soft blue gradient */
    min-width: 300px;
    min-height: 500px;
    padding: 30px;

    .Logo {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1c1c1c; /* Dark gray for contrast */

        img {
            height: 3rem;
        }

        h2 {
            text-align: center;
            margin: auto 10px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.9); /* Light background for better contrast */
        padding: 2rem 5rem;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Softer shadow */
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.02); /* Subtle scale effect on hover */
        }

        @media (max-width: 350px) {
            padding: 1rem 1rem;
        }
    }

    input {
        height: 40px; /* Increased height for better usability */
        width: 100%;
        border-radius: 10px;
        text-align: center;
        margin: 18px 10px;
        background-color: rgba(200, 230, 250, 0.8); /* Light blue background for inputs */
        border: 1px solid #00796b; /* Teal border */
        font-size: 1rem;
        color: #1c1c1c; /* Dark gray text */
        padding: 0 10px; /* Added padding for better touch target */
        transition: border-color 0.3s ease;

        &:focus {
            border: 1px solid #009688; /* Darker teal on focus */
            background-color: rgba(200, 230, 250, 1); /* Lighter background on focus */
            outline: none;
        }

        @media (max-width: 300px) {
            width: 80%;
        }
    }

    button {
        background: linear-gradient(135deg, #4db6ac, #80deea); /* Soft teal gradient for button */
        height: 40px; /* Increased height for better usability */
        width: 100%;
        color: white;
        padding: 1px 2px;
        margin: 18px 10px;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        transition: background 0.4s ease-in-out, transform 0.3s ease;

        &:hover {
            background: linear-gradient(135deg, #80deea, #4db6ac); /* Reverse gradient on hover */
            transform: translateY(-2px); /* Subtle lift effect */
        }

        @media (max-width: 300px) {
            width: 80%;
        }
    }

    span {
        text-align: center;
        margin: 5px;
        color: #1c1c1c; /* Dark gray for text */

        a {
            color: #00796b; /* Teal for links */
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default Signup