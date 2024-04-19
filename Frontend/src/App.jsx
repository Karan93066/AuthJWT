import React,{ useState } from 'react'
import { Routes,Route} from 'react-router-dom'
import Login from './myComponent/Login'
import Signup from './myComponent/Signup'
function App() {
  return (
    <>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path='/' element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App
