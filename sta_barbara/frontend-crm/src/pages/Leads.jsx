import React, { useState, useEffect } from 'react';
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
import { listarLeads, criarLead } from '../services/api';
import './Leads.css';

export default function Leads({ onAtualizar }) {
    // Lista dinâmica carregada da API (sem dados mockados)
    const [leads, setLeads] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const carregarLeads = async () => {
        setCarregando(true);
        try {
            const resp = await listarLeads();
            if (resp && resp.dados) {
                setLeads(resp.dados);
            }
        } catch (erro) {
            console.error('Erro ao carregar leads:', erro);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarLeads();
    }, []);

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

    const totalLeads = leads.length;
    const novosLeads = leads.filter(l => l.status === 'Novo Lead').length;
    const emContato = leads.filter(l => l.status === 'Em Contato').length;
    const aguardandoVisita = leads.filter(l => l.status === 'Aguardando Visita').length;
    const leadsConvertidos = leads.filter(l => l.status === 'Convertido').length;
    const taxaConversao = totalLeads > 0 ? Math.round((leadsConvertidos / totalLeads) * 100) : 0;

    const handleSalvarLead = async (e) => {
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

            try {
                await criarLead(novo);
                await carregarLeads();
                if (onAtualizar) onAtualizar();
            } catch (err) {
                console.error('Falha ao salvar lead no backend:', err);
                setLeads([{ ...novo, id: Date.now() }, ...leads]);
            }
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

            {/* 2. KPI Metrics Grid calculados dinamicamente */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">TOTAL DE LEADS NO FUNIL</span>
                        <span className="badge-trend trend-positive">
                            <FiTrendingUp size={12} />
                            {totalLeads} no pipeline
                        </span>
                    </div>
                    <span className="metric-value value-alcance">{totalLeads}</span>
                </div>

                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">NOVOS LEADS</span>
                        <span className="badge-trend trend-positive">
                            <FiTrendingUp size={12} />
                            {novosLeads} novos
                        </span>
                    </div>
                    <span className="metric-value value-entradas">{novosLeads}</span>
                </div>

                <div className="metric-card">
                    <div className="metric-card-header">
                        <span className="metric-label">LEADS CONVERTIDOS</span>
                        <span className="badge-trend trend-positive">
                            Taxa: {taxaConversao}%
                        </span>
                    </div>
                    <span className="metric-value value-saldo">{leadsConvertidos}</span>
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
                                <span className="funnel-step-name">Alcance Total</span>
                                <span className="funnel-step-count">{totalLeads}</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-alcance" style={{ width: totalLeads > 0 ? '100%' : '0%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Novos Leads</span>
                                <span className="funnel-step-count">{novosLeads}</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-novos" style={{ width: totalLeads > 0 ? `${Math.round((novosLeads / totalLeads) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Em Contato</span>
                                <span className="funnel-step-count">{emContato}</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-contato" style={{ width: totalLeads > 0 ? `${Math.round((emContato / totalLeads) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Ag. Visita</span>
                                <span className="funnel-step-count">{aguardandoVisita}</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-visita" style={{ width: totalLeads > 0 ? `${Math.round((aguardandoVisita / totalLeads) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>

                        <div className="funnel-step-item">
                            <div className="funnel-step-info">
                                <span className="funnel-step-name">Convertidos</span>
                                <span className="funnel-step-count">{leadsConvertidos}</span>
                            </div>
                            <div className="funnel-bar-bg">
                                <div className="funnel-bar-fill fill-convertidos" style={{ width: totalLeads > 0 ? `${Math.round((leadsConvertidos / totalLeads) * 100)}%` : '0%' }}></div>
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
                            <div style={{ textAlign: 'center', padding: '36px', color: '#786565' }}>
                                {carregando ? 'Carregando leads...' : 'Nenhum lead cadastrado no momento. Clique em "Adicionar" para registrar um novo interessado.'}
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
