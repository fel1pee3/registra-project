import "./Home.css"

import React from "react";

import imgHomeRegistra from '../../../images/img-home-registra.png';

import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="component">
            <div className="caixaContentsHome">
                <img src={imgHomeRegistra} alt="imgHomeRegistra" />
                <h2>Monitoramento de ocorrências em sala</h2>
                <p>"Registre ocorrências em sala de aula com facilidade. Obtenha uma visão detalhada por tipo de ocorrência, aluno(a) e turma. Além disso, gere relatórios completos, tanto individuais quanto agregados por grupos, para uma análise mais abrangente."</p>
                <div className="caixaBtns">
                    <Link className="btnLinkHome btnCad" to="/Register">Register</Link>
                    <Link className="btnLinkHome btnLog" to="/Login"> Login</Link>
                </div>
            </div>
        </div>
    )
}