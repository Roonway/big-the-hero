import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';

export default function Profile() {
    // Estado para gravar as respostas da requisição get "profile"
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();
    //O useEffect() serve para disparar um função em um determinado momento do componete
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            /**
             * Faz uma varredura no array do Estado incidents e deixa
             * só os elemetos que tenha id diferente da id deletada
             */
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert("Erro ao deletar. Tente novamnete mais tarde");
        }
    }

    function handleLogout() {
        //Remove os dados do localStorage
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-containter">
            <header>
                <img src={LogoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/caso/novo">Cadastrar Novo Caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower sice={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>))}
            </ul>
        </div>
    );
}