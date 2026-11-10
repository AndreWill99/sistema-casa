import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import bgPattern from '../assets/bg_pattern.png';
import iconUser from '../assets/icon_user.svg';
import iconLock from '../assets/icon_lock.svg';
import iconArrow from '../assets/icon_arrow.svg';
import './Login.css';

export default function Register({ onVoltarLogin }) {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('Enfermeiro(a)');
    const [mensagem, setMensagem] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        if (!nome || !usuario || !senha) return;

        setMensagem('Novo usuário cadastrado com sucesso!');
        setTimeout(() => {
            if (onVoltarLogin) onVoltarLogin();
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-left-panel">
                <img src={bgPattern} alt="Pattern" className="bg-pattern" />
                <div className="ring ring-top-right"></div>
                <div className="ring ring-center"></div>
                <div className="ring ring-bottom-left"></div>

                <div className="brand-content">
                    <img src={logoImg} alt="Casa de Repouso Bárbara" className="brand-logo" />
                    <div className="brand-divider"></div>
                    <p className="brand-subtitle">CADASTRO DE NOVO USUÁRIO</p>
                </div>
            </div>

            <div className="login-right-panel">
                <div className="form-wrapper">
                    <span className="welcome-badge">ACESSO AO SISTEMA</span>
                    <h1 className="form-title">Criar Conta no CRM</h1>
                    <p className="form-subtitle">Cadastre um novo colaborador para acesso às funcionalidades da plataforma.</p>

                    {mensagem && <div className="alert-box alert-success">{mensagem}</div>}

                    <form onSubmit={handleRegister} className="login-form">
                        <div className="input-group">
                            <label className="input-label">NOME COMPLETO</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Nome do colaborador"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">NOME DE USUÁRIO</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Seu usuário de acesso"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                                <button type="button" className="input-icon-btn" tabIndex={-1}>
                                    <img src={iconUser} alt="User" />
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">SENHA DE ACESSO</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    className="custom-input"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <button type="button" className="input-icon-btn" tabIndex={-1}>
                                    <img src={iconLock} alt="Lock" />
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">CARGO / FUNÇÃO</label>
                            <select
                                className="custom-input"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                            >
                                <option value="Administrador">Administrador Geral</option>
                                <option value="Médico(a)">Médico(a) Geriatra</option>
                                <option value="Enfermeiro(a)">Enfermeiro(a)</option>
                                <option value="Cuidador(a)">Cuidador(a)</option>
                                <option value="Recepção">Recepção / Comercial</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn">
                            <span>Cadastrar Colaborador</span>
                            <img src={iconArrow} alt="Criar" className="btn-arrow" />
                        </button>

                        <button
                            type="button"
                            className="action-btn-outline"
                            style={{ marginTop: '10px' }}
                            onClick={onVoltarLogin}
                        >
                            Voltar para o Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
