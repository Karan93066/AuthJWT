import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [values,setValues] = useState({
        name : '',
        email : '',
        password : '',
    });
    
    const navigate = useNavigate();
      async function handleSubmit(e) 
    {
        e.preventDefault()
        axios.post('http://localhost:4200/register',values)
        .then(res => console.log(res))
        .then(err => console.log(err));
        

  setValues('');
    
}
    return (
        <>
           <div className='container'>
           <h1 className="heading">Signup Page </h1>
           <form onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username" onChange={e => setValues({...values,name:e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="username">E-mail</label>
                    <input type="text" placeholder="Enter Email" name="username" onChange={e => setValues({...values,email:e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={e => setValues({...values,password:e.target.value})} required/>
                </div>
                    
               
                <button type="submit">Signup</button>
            </form>
            </div>
        
        </>
     
    );
}

export default Signup;