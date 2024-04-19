import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Home() {
    const [auth,setAuth] = useState(false);
    const [message,setMessage] = useState('');
    const [name,setName] =useState('');

    axios.defaults.withCredentials = true;  
    useEffect(()=>{
        axios.get('http://localhost:4200/')
        .then(res =>{
            if(res.data.Status === "Success"){
                setAuth(true);
                setName(res.data.name);
            } else{
                setAuth(false);
                setMessage(res.data.Error)
            }
        })
        .then(err => {
                console.log("error",);
        })
    },[])

    const handleLogout=()=>{
        axios.get('http://localhost:4200/logout')
        .then (res  =>{
            location.reload(true);
        }).catch(err=> console.log(err));
    }
    return (
        <div>
            {
                auth ?
                <div>
                    <h3>
                        You are Authorized {name}
                    </h3>
                    <button onClick={handleLogout}>Logout</button> 
                </div>
                :
                <div>
                    <h3>{message }</h3>
                    <h3>Login Now</h3>
                    <Link to="/login">Login</Link>
                </div>
            }
        </div>
    );
}

export default Home;