import React, { useState } from 'react';
// Usamos o Componente "Link" no lugar do atributo "a" para que a página não sofra reload 
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon() {
     //estados para armazenar os dados dos inputs
    const [id, setId] = useState('');

    //Serve para fazer a navegação por meio de uma função JS
    const history = useHistory();

    /**
    * receber o evento no parâmetro "e" e definino ele como "preventDefault"
    * faz com que a página não recarregue assim que dê um submit
    */
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('login', { id });

            // Torna os dados disponível em toda a aplicação add no localStorage
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/perfil');
        } catch (error) {
             alert("Falha no Login. Tente novamnete mais tarde");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#E02041" />
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heroes" />
        </div>

    );
}

