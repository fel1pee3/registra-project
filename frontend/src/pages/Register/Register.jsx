import React, { useState } from "react";

import "./Register.css";

import logoRegistraBlue from '../../../images/logoRegistraBlue.png'

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register(){

    const [values, setValues] = useState({
        username: '',
        telephone: '',
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
            const response = await axios.post('http://localhost:3000/auth/register', values)
            if(response.status === 201){
                navigate('/login')
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
                        <input type="text" required name="username" onChange={handleChanges} autoComplete="off" className="input" />
                        <label className="user-label" >Nome Completo</label>
                    </div>
                    <div className="input-group">
                        <input type="number" required name="telephone" onChange={handleChanges} autoComplete="off" className="input" />
                        <label className="user-label" >Telefone</label>
                    </div>
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
                    <p>Already have account?</p>
                    <Link className="linkLog" to="/Login">Login</Link>
                </div>
            </div>
        </div>
    )
}