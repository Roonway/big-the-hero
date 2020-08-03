import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';

export default function Register() {
    //estados para armazenar os dados dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    //Serve para fazer a navegação por meio de uma função JS
    const history = useHistory();

    /**
     * receber o evento no parâmetro "e" e definindo ele como "preventDefault"
     * faz com que a página não recarregue assim que dê um submit
     */
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            fone,
            city,
            uf,
        }

        try {
            const response = await api.post('ongs', data);

            //Usa-se a crase "`" quando necessitamos por uma variável no meio da string
            alert(`Seu ID de acesso é ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert("Erro ao cadastrar. Tente novamnete mais tarde");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça Seu Cadastro, Entre na Plataforma e Ajude Pessoas a encontrarem os casos de sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não Tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Telefone"
                        value={fone}
                        onChange={e => setFone(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}