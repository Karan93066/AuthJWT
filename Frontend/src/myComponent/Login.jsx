import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
    const [values,setValues] = useState({
        email : '',
        password : '',
    });
    
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
      async function handleSubmit(e) 
    {
        e.preventDefault()
        axios.post('http://localhost:4200/login',values)
        .then(res => {
            if(res.data.Status == "Success"){
                navigate('/')
            }
            else{
                console.log("Error",res.data.Error)
            }
        })
        .then(err => console.log(err));
        

  setValues('');
    
}
    return (
        <>
           <div className='container'>
           <h1 className="heading">Signup Page </h1>
           <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">E-mail</label>
                    <input type="text" placeholder="Enter Email" name="username" onChange={e => setValues({...values,email:e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={e => setValues({...values,password:e.target.value})} required/>
                </div>
                    
               
                <button type="submit">Login</button>
                <Link to="/signup">Signup</Link>

            </form>
            </div>
        
        </>
     
    );
}

export default Login;