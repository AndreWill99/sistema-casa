import React, { useState } from 'react';
import './Configuracoes.css';

export default function Configuracoes() {
    const [nomeInstituicao, setNomeInstituicao] = useState('Casa de Repouso Bárbara');
    const [emailNotificacao, setEmailNotificacao] = useState('contato@casabarbara.com.br');
    const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

    const handleSalvar = (e) => {
        e.preventDefault();
        alert('Configurações do sistema salvas com sucesso!');
    };

    return (
        <div className="configuracoes-container">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Configurações do Sistema</h2>
                    <p className="page-sub">Dados da instituição, parâmetros de notificação e segurança do CRM.</p>
                </div>
            </div>

            <div className="settings-card">
                <h3 className="card-title">Perfil da Instituição</h3>

                <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="input-group">
                        <label className="input-label">NOME DA INSTITUIÇÃO / UNIDADE</label>
                        <input
                            type="text"
                            className="custom-input"
                            value={nomeInstituicao}
                            onChange={(e) => setNomeInstituicao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">E-MAIL PRINCIPAL PARA NOTIFICAÇÕES</label>
                        <input
                            type="email"
                            className="custom-input"
                            value={emailNotificacao}
                            onChange={(e) => setEmailNotificacao(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                        <input
                            type="checkbox"
                            id="notif"
                            checked={notificacoesAtivas}
                            onChange={(e) => setNotificacoesAtivas(e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: '#810F0F' }}
                        />
                        <label htmlFor="notif" style={{ fontSize: '14px', color: '#500707', fontWeight: 600 }}>
                            Receber alertas de medicação e faltas por e-mail
                        </label>
                    </div>

                    <button type="submit" className="submit-btn" style={{ width: '220px', marginTop: '16px' }}>
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
}
