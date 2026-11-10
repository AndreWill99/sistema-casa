import React, { useState } from 'react';
import {
    FiPlus,
    FiSearch,
    FiSliders,
    FiDownload,
    FiEdit2,
    FiX,
    FiPhone,
    FiMail,
    FiUser,
    FiCalendar,
    FiClock,
    FiFileText,
    FiCheckCircle,
    FiTrendingUp,
    FiChevronDown,
    FiDollarSign
} from 'react-icons/fi';
import './Leads.css';

export default function Leads() {
    // Lead Dataset matching Figma design
    const [leads, setLeads] = useState([
        {
            id: 1,
            interessado: 'Carlos Mendes',
            paciente: 'Sr. Arnaldo Mendes',
            telefone: '(11) 98111-2233',
            email: 'carlos.mendes@email.com',
            grau: 'Grau 2',
            status: 'Em Contato',
            valorEstimado: 'R$ 4.200,00',
            observacao: 'Família solicita vaga em quarto duplo com vista para o jardim.',
            historico: [
                { data: '28/09/2026', desc: 'Primeiro contato telefônico realizado por Juliana.' }
            ]
        },
        {
            id: 2,
            interessado: 'Ana Lima',
            paciente: 'Sr. José Lima',
            telefone: '(11) 98765-4321',
            email: 'ana.lima@email.com',
            grau: 'Grau 3',
            status: 'Aguardando Visita',
            valorEstimado: 'R$ 6.000,00',
            observacao: 'Família aguarda visita técnica para avaliação e escolha do quarto. Prefere quarto individual.',
            historico: [
                { data: '25/09/2026', desc: 'Visita agendada para sábado às 14h.' },
                { data: '20/09/2026', desc: 'Recebeu apresentação dos planos por WhatsApp.' }
            ]
        },
        {
            id: 3,
            interessado: 'Roberto Silva',
            paciente: 'Dona Teresa Silva',
            telefone: '(11) 97222-3344',
            email: 'roberto.silva@email.com',
            grau: 'Grau 1',
            status: 'Novo Lead',
            valorEstimado: 'R$ 3.800,00',
            observacao: 'Interessado em centro de convivência diurno.',
            historico: []
        },
        {
            id: 4,
            interessado: 'Fernanda Oliveira',
            paciente: 'Sra. Lourdes Oliveira',
            telefone: '(11) 96333-4455',
            email: 'fernanda.o@email.com',
            grau: 'Grau 3',
            status: 'Convertido',
            valorEstimado: 'R$ 5.500,00',
            observacao: 'Contrato assinado. Entrada prevista para a próxima segunda-feira.',
            historico: [
                { data: '29/09/2026', desc: 'Contrato de prestação de serviços assinado!' },
                { data: '15/09/2026', desc: 'Visita presencial realizada com sucesso.' }
            ]
        },
        {
            id: 5,
            interessado: 'Marcos Costa',
            paciente: 'Sr. Benedito Costa',
            telefone: '(11) 95444-5566',
            email: 'marcos.costa@email.com',
            grau: 'Grau 2',
            status: 'Aguardando Visita',
            valorEstimado: 'R$ 4.500,00',
            observacao: 'Aguardando disponibilidade de horário do médico da família.',
            historico: []
        },
        {
            id: 6,
            interessado: 'Juliana Alves',
            paciente: 'Dona Helena Alves',
            telefone: '(11) 94555-6677',
            email: 'juliana.alves@email.com',
            grau: 'Grau 1',
            status: 'Em Contato',
            valorEstimado: 'R$ 3.900,00',
            observacao: 'Proposta comercial enviada por e-mail.',
            historico: []
        }
    ]);

    // UI States
    const [termoBusca, setTermoBusca] = useState('');
    const [modalAberta, setModalAberta] = useState(false);
    const [abaAtivaModal, setAbaAtivaModal] = useState('observacao'); // 'observacao' | 'perfil' | 'historico'
    const [leadAtual, setLeadAtual] = useState(null);

    // Form States
    const [formInteressado, setFormInteressado] = useState('');
    const [formPaciente, setFormPaciente] = useState('');
    const [formTelefone, setFormTelefone] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formGrau, setFormGrau] = useState('Grau 2');
    const [formStatus, setFormStatus] = useState('Aguardando Visita');
    const [formValor, setFormValor] = useState('R$ 4.500,00');
    const [formObservacao, setFormObservacao] = useState('');

    const abrirModalCadastro = () => {
        setLeadAtual(null);
        setFormInteressado('');
        setFormPaciente('');
        setFormTelefone('');
        setFormEmail('');
        setFormGrau('Grau 2');
        setFormStatus('Novo Lead');
        setFormValor('R$ 4.000,00');
        setFormObservacao('');
        setAbaAtivaModal('perfil');
        setModalAberta(true);
    };

    const abrirModalEdicao = (lead) => {
        setLeadAtual(lead);
        setFormInteressado(lead.interessado);
        setFormPaciente(lead.paciente);
        setFormTelefone(lead.telefone);
        setFormEmail(lead.email);
        setFormGrau(lead.grau);
        setFormStatus(lead.status);
        setFormValor(lead.valorEstimado);
        setFormObservacao(lead.observacao);
        setAbaAtivaModal('observacao');
        setModalAberta(true);
    };

    const handleSalvarLead = (e) => {
        e.preventDefault();
        if (!formInteressado) return;

        if (leadAtual) {
            setLeads(
                leads.map((l) =>
                    l.id === leadAtual.id
                        ? {
                            ...l,
                            interessado: formInteressado,
                            paciente: formPaciente,
                            telefone: formTelefone,
                            email: formEmail,
                            grau: formGrau,
                            status: formStatus,
                            valorEstimado: formValor,
                            observacao: formObservacao
                        }
                        : l
                )
            );
        } else {
            const novo = {
                id: Date.now(),
                interessado: formInteressado,
                paciente: formPaciente || 'A definir',
                telefone: formTelefone || '(11) 90000-0000',
                email: formEmail,
                grau: formGrau,
                status: formStatus,
                valorEstimado: formValor,
                observacao: formObservacao,
                historico: []
            };
            setLeads([novo, ...leads]);
        }

        setModalAberta(false);
    };

    const leadsFiltrados = leads.filter((l) => {
        const t = termoBusca.toLowerCase();
        return (
            l.interessado.toLowerCase().includes(t) ||
            l.paciente.toLowerCase().includes(t) ||
            l.telefone.includes(t) ||
            l.status.toLowerCase().includes(t)
        );
    });

    const exportarCSV = () => {
        const headers = 'Interessado,Paciente,Telefone,Email,Grau,Status,Valor Estimado\n';
        const rows = leads
            .map((l) => `"${l.interessado}","${l.paciente}","${l.telefone}","${l.email}","${l.grau}","${l.status}","${l.valorEstimado}"`)
            .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leads_funil.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="leads-container">
            {/* 1. Top Action Toolbar */}
            <div className="top-action-bar">
                <div className="search-filter-wrapper">
                    <div className="search-pill">
                        <FiSearch className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar lead ou interessado..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    <button className="filter-pill-btn" title="Filtrar">
                        <FiSliders size={18} />
                    </button>
                </div>

                <div className="action-buttons-group">
                    <button className="btn-csv-export" onClick={exportarCSV}>
                        <FiDownload size={16} />
                        <span>Exportar CSV</span>
                    </button>
                    <button className="btn-add-transaction" onClick={abrirModalCadastro}>
                        <FiPlus size={16} />
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>

            {/* 2. KPI Metrics Grid */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">ALCANCE DE MARKETING</span>
                        <span className="badge-trend trend-positive">
                            <FiTrendingUp size={12} />
                            ↑ 18% vs mês anterior
                        </span>
                    </div>
                    <span className="metric-value value-alcance">1.248</span>
                </div>

                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">NOVOS LEADS — JULHO</span>
                        <span className="badge-trend trend-positive">
                            <FiTrendingUp size={12} />
                            ↑ 12% vs mês anterior
                        </span>
                    </div>
                    <span className="metric-value value-entradas">34</span>
                </div>

                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">LEADS CONVERTIDOS</span>
                        <span className="badge-trend trend-positive">
                            Taxa: 23%
                        </span>
                    </div>
                    <span className="metric-value value-saldo">8</span>
                </div>
            </div>

            {/* 3. Main Split Section (Funnel Chart Left + Leads List Right) */}
            <div className="leads-main-split">
                {/* Left Card: Funil de Vendas */}
                <div className="chart-card funnel-card">
                    <div className="chart-header">
                        <h3 className="chart-title">Funil de Vendas</h3>
                        <p className="chart-subtitle">Taxa de conversão por etapa comercial</p>
                    </div>

                    <div className="funnel-steps-container">
                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Alcance</span>
                                <span className="funnel-step-count">1.248</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-alcance" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Novos Leads</span>
                                <span className="funnel-step-count">34</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-novos" style={{ width: '70%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Em Contato</span>
                                <span className="funnel-step-count">20</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-contato" style={{ width: '50%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Ag. Visita</span>
                                <span className="funnel-step-count">11</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-visita" style={{ width: '32%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Convertidos</span>
                                <span className="funnel-step-count">8</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-convertidos" style={{ width: '22%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="funnel-legend">
                        <div className="legend-item">
                            <span className="legend-dot dot-novo"></span>
                            <span>Novo</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot dot-contato"></span>
                            <span>Em Contato</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot dot-visita"></span>
                            <span>Ag. Visita</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot dot-convertido"></span>
                            <span>Convertido</span>
                        </div>
                    </div>
                </div>

                {/* Right Card: Lista de Leads */}
                <div className="table-card leads-list-card">
                    <div className="table-header-title">
                        <h3>Quadro de Interessados & Leads</h3>
                    </div>

                    <div className="leads-cards-grid">
                        {leadsFiltrados.length > 0 ? (
                            leadsFiltrados.map((lead) => (
                                <div key={lead.id} className="lead-item-row" onClick={() => abrirModalEdicao(lead)}>
                                    <div className="avatar-circle">
                                        {lead.interessado.charAt(0)}
                                    </div>

                                    <div className="lead-item-details">
                                        <div className="lead-item-top">
                                            <h4 className="lead-interessado-name">{lead.interessado}</h4>
                                            <span className={`lead-status-pill status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {lead.status}
                                            </span>
                                        </div>

                                        <p className="lead-paciente-meta">
                                            <span>Paciente: <strong>{lead.paciente}</strong></span>
                                            <span className="lead-grau-tag">{lead.grau}</span>
                                        </p>

                                        <div className="lead-item-bottom">
                                            <span className="lead-phone-text">
                                                <FiPhone size={13} />
                                                {lead.telefone}
                                            </span>
                                            <span className="lead-valor-text">{lead.valorEstimado}</span>
                                        </div>
                                    </div>

                                    <button className="btn-action-edit" title="Editar lead">
                                        <FiEdit2 size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                                Nenhum lead encontrado.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Multi-Tab Drawer / Modal ("Detalhes do Lead") */}
            {modalAberta && (
                <div className="modal-backdrop" onClick={() => setModalAberta(false)}>
                    <div className="modal-drawer-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div className="avatar-circle-large">
                                    {formInteressado ? formInteressado.charAt(0) : 'L'}
                                </div>
                                <div>
                                    <h2>{leadAtual ? leadAtual.interessado : 'Novo Lead'}</h2>
                                    <span className="subtitle-role">Paciente: {formPaciente || 'A definir'}</span>
                                </div>
                            </div>
                            <button className="btn-close-modal" onClick={() => setModalAberta(false)}>
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Navigation Tabs (Observação, Perfil, Histórico) */}
                        <div className="modal-tabs-wrapper">
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'observacao' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('observacao')}
                            >
                                <FiFileText size={15} />
                                <span>Observação</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'perfil' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('perfil')}
                            >
                                <FiUser size={15} />
                                <span>Perfil</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'historico' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('historico')}
                            >
                                <FiClock size={15} />
                                <span>Histórico</span>
                            </button>
                        </div>

                        {/* Tab Content 1: Observação */}
                        {abaAtivaModal === 'observacao' && (
                            <form onSubmit={handleSalvarLead} className="modal-form">
                                <div className="form-group">
                                    <label className="form-label">OBSERVAÇÕES / NOTAS DA FAMÍLIA</label>
                                    <textarea
                                        className="form-textarea"
                                        rows="4"
                                        placeholder="Digite as observações sobre a visita ou preferências da família..."
                                        value={formObservacao}
                                        onChange={(e) => setFormObservacao(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-grid-2col">
                                    <div className="form-group">
                                        <label className="form-label">STATUS DO LEAD</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formStatus}
                                                onChange={(e) => setFormStatus(e.target.value)}
                                            >
                                                <option value="Novo Lead">Novo Lead</option>
                                                <option value="Em Contato">Em Contato</option>
                                                <option value="Aguardando Visita">Aguardando Visita</option>
                                                <option value="Convertido">Convertido</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">VALOR ESTIMADO / MÊS</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            value={formValor}
                                            onChange={(e) => setFormValor(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="btn-modal-cancel"
                                        onClick={() => setModalAberta(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-modal-confirm">
                                        Salvar Lead
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Tab Content 2: Perfil */}
                        {abaAtivaModal === 'perfil' && (
                            <form onSubmit={handleSalvarLead} className="modal-form">
                                <div className="form-grid-2col">
                                    <div className="form-group">
                                        <label className="form-label">NOME DO INTERESSADO</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="Nome do contato principal"
                                            value={formInteressado}
                                            onChange={(e) => setFormInteressado(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">NOME DO IDOSO / PACIENTE</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="Nome do idoso"
                                            value={formPaciente}
                                            onChange={(e) => setFormPaciente(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">TELEFONE DE CONTATO</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="(00) 00000-0000"
                                            value={formTelefone}
                                            onChange={(e) => setFormTelefone(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">E-MAIL</label>
                                        <input
                                            type="email"
                                            className="form-input input-pill"
                                            placeholder="email@contato.com"
                                            value={formEmail}
                                            onChange={(e) => setFormEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">GRAU DE DEPENDÊNCIA</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formGrau}
                                                onChange={(e) => setFormGrau(e.target.value)}
                                            >
                                                <option value="Grau 1">Grau 1 — Independente</option>
                                                <option value="Grau 2">Grau 2 — Dependência Parcial</option>
                                                <option value="Grau 3">Grau 3 — Alta Dependência</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="btn-modal-cancel"
                                        onClick={() => setModalAberta(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-modal-confirm">
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Tab Content 3: Histórico */}
                        {abaAtivaModal === 'historico' && (
                            <div className="modal-tab-content">
                                <h4 className="subtable-title">Histórico de Atendimento</h4>
                                <div className="history-timeline">
                                    {leadAtual && leadAtual.historico && leadAtual.historico.length > 0 ? (
                                        leadAtual.historico.map((h, idx) => (
                                            <div key={idx} className="timeline-item">
                                                <span className="timeline-date">{h.data}</span>
                                                <p className="timeline-desc">{h.desc}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: '#888', fontStyle: 'italic', padding: '12px' }}>
                                            Nenhum histórico registrado até o momento.
                                        </p>
                                    )}
                                </div>

                                <div className="modal-actions">
                                    <button className="btn-modal-confirm" onClick={() => setModalAberta(false)}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
