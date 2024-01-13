import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import ForgetPassword from '../pages/ForgetPassword'


export function AppRoutes (){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/reset" element={<ForgetPassword/>} />
            </Routes>
        </BrowserRouter>
    )
}