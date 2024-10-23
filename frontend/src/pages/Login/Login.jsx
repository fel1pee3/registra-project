import React, { useState } from "react";

import "./Login.css";

import logoRegistraBlue from '../../../images/logoRegistraBlue.png'

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values)
            if(response.status === 201){
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className="component">
            <div className="caixaContentsRegister">

                <div className="logo"><img src={logoRegistraBlue} alt="logo registra blue" /><h1>REGISTRA</h1></div>

                <form onSubmit={handleSubmit} className="formRegister">

                    <div className="input-group">
                        <input type="email" required name="email" onChange={handleChanges} autoComplete="off" className="input" />
                        <label className="user-label" >Email</label>
                    </div>
                    <div className="input-group">
                        <input type="password" required name="password" onChange={handleChanges} autoComplete="off" className="input" />
                        <label className="user-label" >Senha</label>
                    </div>

                    <button className="btnRegister">Submit</button>

                </form>

                <div className="linkRegisterParaLogin">
                    <p>Don't have account?</p>
                    <Link className="linkLog" to="/Register">Singup</Link>
                </div>
            </div>
        </div>
    )
}