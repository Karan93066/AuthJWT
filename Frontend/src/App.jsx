import React,{ useState } from 'react'
import { Routes,Route} from 'react-router-dom'
import Login from './myComponent/Login'
import Signup from './myComponent/Signup'
import Home from './myComponent/Home'
function App() {
  return (
    <>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
