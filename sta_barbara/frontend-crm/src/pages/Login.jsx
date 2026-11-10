import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import bgPattern from '../assets/bg_pattern.png';
import iconUser from '../assets/icon_user.svg';
import iconLock from '../assets/icon_lock.svg';
import iconArrow from '../assets/icon_arrow.svg';
import './Login.css';

export default function Login({ onLoginSuccess }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usuario.trim() || !senha.trim()) {
            setMensagemStatus({ tipo: 'error', texto: 'Por favor, preencha todos os campos.' });
            return;
        }

        setCarregando(true);
        setMensagemStatus(null);

        // Simulação de login/integração
        setTimeout(() => {
            setCarregando(false);
            setMensagemStatus({ tipo: 'success', texto: 'Login efetuado com sucesso! Redirecionando...' });
            if (onLoginSuccess) {
                setTimeout(() => {
                    onLoginSuccess({ usuario });
                }, 1200);
            }
        }, 1000);
    };

    return (
        <div className="login-container">
            {/* Esquerda: Painel da Marca */}
            <div className="login-left-panel">
                <img src={bgPattern} alt="Background Texture" className="bg-pattern" />

                {/* Anéis Decorativos do Figma */}
                <div className="ring ring-top-right"></div>
                <div className="ring ring-center"></div>
                <div className="ring ring-bottom-left"></div>

                <div className="brand-content">
                    <img src={logoImg} alt="Casa de Repouso Bárbara" className="brand-logo" />
                    <div className="brand-divider"></div>
                    <p className="brand-subtitle">GESTÃO DE PROPRIEDADES</p>

                    <ul className="feature-list">
                        <li className="feature-item">
                            <span className="feature-dot"></span>
                            <span>Controle financeiro completo</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-dot"></span>
                            <span>Gestão de funcionários</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-dot"></span>
                            <span>Relatórios em tempo real</span>
                        </li>
                        <li className="feature-item">
                            <span className="feature-dot"></span>
                            <span>Dashboard interativo</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Direita: Formulário de Login */}
            <div className="login-right-panel">
                <div className="form-wrapper">
                    <span className="welcome-badge">BEM-VINDO DE VOLTA</span>
                    <h1 className="form-title">Entrar na sua conta</h1>
                    <p className="form-subtitle">Insira suas credenciais para acessar o sistema.</p>

                    {mensagemStatus && (
                        <div className={`alert-box alert-${mensagemStatus.tipo}`}>
                            {mensagemStatus.texto}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="usuario" className="input-label">
                                NOME DE USUÁRIO
                            </label>
                            <div className="input-wrapper">
                                <input
                                    id="usuario"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Digite seu usuário"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                                <button type="button" className="input-icon-btn" tabIndex={-1} aria-label="Usuário">
                                    <img src={iconUser} alt="User Icon" />
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="senha" className="input-label">
                                SENHA
                            </label>
                            <div className="input-wrapper">
                                <input
                                    id="senha"
                                    type={mostrarSenha ? 'text' : 'password'}
                                    className="custom-input"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="input-icon-btn"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    title={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                                >
                                    <img src={iconLock} alt="Lock Icon" />
                                </button>
                            </div>
                        </div>

                        <div className="form-meta">
                            <a href="#esqueci-senha" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
                                Esqueci minha senha
                            </a>
                        </div>

                        <button type="submit" className="submit-btn" disabled={carregando}>
                            <span>{carregando ? 'Entrando...' : 'Entrar'}</span>
                            <img src={iconArrow} alt="Entrar" className="btn-arrow" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
