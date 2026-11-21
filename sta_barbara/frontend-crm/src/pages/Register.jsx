import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import bgPattern from '../assets/bg_pattern.png';
import { FiUser, FiAtSign, FiChevronDown, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';
import { cadastrarUsuario } from '../services/api';
import './Register.css';

export default function Register({ onVoltarLogin, onRegisterSuccess }) {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [cargo, setCargo] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState(null);

    // Etapa ativa calculada dinamicamente conforme preenchimento
    const calcularEtapa = () => {
        if (confirmarSenha && senha) return 4;
        if (senha) return 3;
        if (usuario || cargo) return 2;
        return 1;
    };

    const etapaAtiva = calcularEtapa();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validações locais conforme o Figma
        if (!nome.trim() || !usuario.trim() || !cargo || !senha || !confirmarSenha) {
            setMensagemStatus({
                tipo: 'error',
                texto: 'Por favor, preencha todos os campos do formulário.'
            });
            return;
        }

        if (senha.length < 8) {
            setMensagemStatus({
                tipo: 'error',
                texto: 'A senha deve conter no mínimo 8 caracteres.'
            });
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagemStatus({
                tipo: 'error',
                texto: 'As senhas informadas não coincidem.'
            });
            return;
        }

        setCarregando(true);
        setMensagemStatus(null);

        try {
            // Requisição com API conectada ao MongoDB Atlas
            const resultado = await cadastrarUsuario({
                nome: nome.trim(),
                usuario: usuario.trim().toLowerCase(),
                cargo,
                senha
            });

            if (resultado.sucesso) {
                setMensagemStatus({
                    tipo: 'success',
                    texto: resultado.mensagem || 'Conta criada com sucesso! Redirecionando para o login...'
                });

                setTimeout(() => {
                    if (onRegisterSuccess) {
                        onRegisterSuccess(resultado.dados);
                    } else if (onVoltarLogin) {
                        onVoltarLogin();
                    }
                }, 1400);
            } else {
                setMensagemStatus({
                    tipo: 'error',
                    texto: resultado.mensagem || 'Erro ao realizar o cadastro. Tente novamente.'
                });
            }
        } catch (erro) {
            console.error('Erro ao conectar à API:', erro);
            setMensagemStatus({
                tipo: 'error',
                texto: 'Não foi possível conectar ao servidor. Verifique a conexão com o banco de dados.'
            });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="register-container">
            {/* Esquerda: Painel da Marca e Stepper do Figma */}
            <div className="register-left-panel">
                <img src={bgPattern} alt="Background Texture" className="bg-pattern" />

                {/* Anéis Decorativos de Fundo */}
                <div className="ring ring-top-right"></div>
                <div className="ring ring-center"></div>
                <div className="ring ring-bottom-left"></div>

                <div className="brand-content">
                    <img src={logoImg} alt="Casa de Repouso Bárbara" className="brand-logo" />
                    <div className="brand-divider"></div>
                    <p className="brand-subtitle">GESTÃO DE PROPRIEDADES</p>

                    {/* Stepper com os 4 passos do Figma */}
                    <div className="register-stepper">
                        <div className={`step-item ${etapaAtiva >= 1 ? 'step-active' : ''}`}>
                            <span className="step-circle">1</span>
                            <span className="step-label">Informações pessoais</span>
                        </div>
                        <div className={`step-item ${etapaAtiva >= 2 ? 'step-active' : ''}`}>
                            <span className="step-circle">2</span>
                            <span className="step-label">Cargo e função</span>
                        </div>
                        <div className={`step-item ${etapaAtiva >= 3 ? 'step-active' : ''}`}>
                            <span className="step-circle">3</span>
                            <span className="step-label">Segurança da conta</span>
                        </div>
                        <div className={`step-item ${etapaAtiva >= 4 ? 'step-active' : ''}`}>
                            <span className="step-circle">4</span>
                            <span className="step-label">Confirmação</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Direita: Formulário de Cadastro do Figma */}
            <div className="register-right-panel">
                <div className="form-wrapper">
                    <span className="welcome-badge">NOVO ACESSO</span>
                    <h1 className="form-title">Criar sua conta</h1>
                    <p className="form-subtitle">Preencha os campos abaixo para se registrar no sistema.</p>

                    {mensagemStatus && (
                        <div className={`alert-box alert-${mensagemStatus.tipo}`}>
                            {mensagemStatus.texto}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        {/* 1. Nome Completo */}
                        <div className="input-group">
                            <label htmlFor="nomeCompleto" className="input-label">
                                NOME COMPLETO
                            </label>
                            <div className="input-wrapper">
                                <input
                                    id="nomeCompleto"
                                    type="text"
                                    className="custom-input"
                                    placeholder="ex: João da Silva"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    autoComplete="name"
                                    required
                                />
                                <span className="input-icon-adornment">
                                    <FiUser size={18} />
                                </span>
                            </div>
                        </div>

                        {/* 2. Grid de 2 colunas: Nome de Usuário e Cargo */}
                        <div className="input-row-grid">
                            <div className="input-group">
                                <label htmlFor="nomeUsuario" className="input-label">
                                    NOME DE USUÁRIO
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        id="nomeUsuario"
                                        type="text"
                                        className="custom-input"
                                        placeholder="ex: joao.silva"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        autoComplete="username"
                                        required
                                    />
                                    <span className="input-icon-adornment">
                                        <FiAtSign size={18} />
                                    </span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="cargoUsuario" className="input-label">
                                    CARGO
                                </label>
                                <div className="input-wrapper">
                                    <select
                                        id="cargoUsuario"
                                        className="custom-input custom-select"
                                        value={cargo}
                                        onChange={(e) => setCargo(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        <option value="Administrador Geral">Administrador Geral</option>
                                        <option value="Médico(a) Geriatra">Médico(a) Geriatra</option>
                                        <option value="Enfermeiro(a)">Enfermeiro(a)</option>
                                        <option value="Cuidador(a)">Cuidador(a)</option>
                                        <option value="Fisioterapeuta">Fisioterapeuta</option>
                                        <option value="Nutricionista">Nutricionista</option>
                                        <option value="Recepção / Comercial">Recepção / Comercial</option>
                                    </select>
                                    <span className="input-icon-adornment select-arrow">
                                        <FiChevronDown size={18} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Senha */}
                        <div className="input-group">
                            <label htmlFor="senhaCadastro" className="input-label">
                                SENHA
                            </label>
                            <div className="input-wrapper">
                                <input
                                    id="senhaCadastro"
                                    type={mostrarSenha ? 'text' : 'password'}
                                    className="custom-input"
                                    placeholder="Mínimo 8 caracteres"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="input-icon-btn"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    title={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                                >
                                    {mostrarSenha ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            <span className="input-helper-text">
                                Use letras, números e símbolos para maior segurança
                            </span>
                        </div>

                        {/* 4. Confirmar Senha */}
                        <div className="input-group">
                            <label htmlFor="confirmarSenhaCadastro" className="input-label">
                                CONFIRMAR SENHA
                            </label>
                            <div className="input-wrapper">
                                <input
                                    id="confirmarSenhaCadastro"
                                    type={mostrarConfirmar ? 'text' : 'password'}
                                    className="custom-input"
                                    placeholder="Repita a senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="input-icon-btn"
                                    onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                    title={mostrarConfirmar ? 'Ocultar senha' : 'Exibir senha'}
                                    aria-label={mostrarConfirmar ? 'Ocultar senha' : 'Exibir senha'}
                                >
                                    {mostrarConfirmar ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Botão de Envio: CRIAR CONTA */}
                        <button type="submit" className="submit-btn register-submit-btn" disabled={carregando}>
                            <span>{carregando ? 'Criando conta...' : 'CRIAR CONTA'}</span>
                            <FiUserPlus size={18} className="btn-icon" />
                        </button>

                        {/* Opção em texto para retornar ao login */}
                        <div className="auth-footer-text">
                            <span>Já tem uma conta?</span>
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={onVoltarLogin}
                            >
                                Fazer login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
