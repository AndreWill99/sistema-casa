import React, { useState, useEffect } from 'react';
import {
    FiPlus,
    FiSearch,
    FiSliders,
    FiDownload,
    FiEdit2,
    FiX,
    FiUser,
    FiAlertCircle,
    FiCalendar,
    FiPhone,
    FiChevronDown,
    FiCheck,
    FiTrash2
} from 'react-icons/fi';
import { listarResidentes, criarResidente } from '../services/api';
import './Residentes.css';

export default function Residentes({ onAtualizar }) {
    // Lista dinâmica carregada da API (sem dados mockados)
    const [residentes, setResidentes] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const carregarResidentes = async () => {
        setCarregando(true);
        try {
            const resp = await listarResidentes();
            if (resp && resp.dados) {
                setResidentes(resp.dados);
            }
        } catch (erro) {
            console.error('Erro ao carregar residentes:', erro);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarResidentes();
    }, []);

    // UI States
    const [termoBusca, setTermoBusca] = useState('');
    const [filtroGrau, setFiltroGrau] = useState('Todos');
    const [sortField, setSortField] = useState('nome');
    const [sortDirection, setSortDirection] = useState('asc');

    // Modal States
    const [modalAberta, setModalAberta] = useState(false);
    const [abaAtivaModal, setAbaAtivaModal] = useState('perfil'); // 'perfil' | 'incidentes'
    const [residenteAtual, setResidenteAtual] = useState(null);

    // Form States
    const [formNome, setFormNome] = useState('');
    const [formDataNasc, setFormDataNasc] = useState('');
    const [formDataEntrada, setFormDataEntrada] = useState('');
    const [formQuarto, setFormQuarto] = useState('Quarto 101-A');
    const [formStatus, setFormStatus] = useState('Residente');
    const [formResponsavel, setFormResponsavel] = useState('');
    const [formTelefone, setFormTelefone] = useState('');
    const [formGrau, setFormGrau] = useState('Grau 1');
    const [formAlergias, setFormAlergias] = useState([]);
    const [novaAlergiaText, setNovaAlergiaText] = useState('');

    // Incidente Form States
    const [novoIncidenteDesc, setNovoIncidenteDesc] = useState('');
    const [novoIncidenteData, setNovoIncidenteData] = useState('30/09/2026');
    const [novoIncidenteNivel, setNovoIncidenteNivel] = useState('Atenção');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const abrirCadastro = () => {
        setResidenteAtual(null);
        setFormNome('');
        setFormDataNasc('01/01/1945');
        setFormDataEntrada('30-09-2026');
        setFormQuarto('Quarto 101-A');
        setFormStatus('Residente');
        setFormResponsavel('');
        setFormTelefone('');
        setFormGrau('Grau 1');
        setFormAlergias([]);
        setAbaAtivaModal('perfil');
        setModalAberta(true);
    };

    const abrirEdicao = (residente) => {
        setResidenteAtual(residente);
        setFormNome(residente.nome);
        setFormDataNasc(residente.dataNascimento || '14/05/1944');
        setFormDataEntrada(residente.dataEntrada);
        setFormQuarto(residente.quarto);
        setFormStatus(residente.status);
        setFormResponsavel(residente.responsavel);
        setFormTelefone(residente.telefone);
        setFormGrau(residente.grau);
        setFormAlergias(residente.alergias || []);
        setAbaAtivaModal('perfil');
        setModalAberta(true);
    };

    const handleAdicionarAlergia = (e) => {
        e.preventDefault();
        if (novaAlergiaText.trim() && !formAlergias.includes(novaAlergiaText.trim())) {
            setFormAlergias([...formAlergias, novaAlergiaText.trim()]);
            setNovaAlergiaText('');
        }
    };

    const handleRemoverAlergia = (tag) => {
        setFormAlergias(formAlergias.filter((a) => a !== tag));
    };

    const handleAdicionarIncidente = (e) => {
        e.preventDefault();
        if (!novoIncidenteDesc.trim() || !residenteAtual) return;

        const novoInc = {
            id: Date.now(),
            data: novoIncidenteData,
            nivel: novoIncidenteNivel,
            desc: novoIncidenteDesc.trim()
        };

        const listaAtualizada = residentes.map((r) =>
            r.id === residenteAtual.id
                ? { ...r, incidentes: [novoInc, ...(r.incidentes || [])] }
                : r
        );

        setResidentes(listaAtualizada);
        setResidenteAtual({ ...residenteAtual, incidentes: [novoInc, ...(residenteAtual.incidentes || [])] });
        setNovoIncidenteDesc('');
    };

    const handleSalvarResidente = async (e) => {
        e.preventDefault();
        if (!formNome) return;

        const grauDescMap = {
            'Grau 1': 'Grau I - independente, apresentando autonomia funcional',
            'Grau 2': 'Grau II - dependência em até três atividades de autocuidado',
            'Grau 3': 'Grau III - alta dependência funcional e cuidados contínuos'
        };

        if (residenteAtual) {
            setResidentes(
                residentes.map((r) =>
                    r.id === residenteAtual.id
                        ? {
                            ...r,
                            nome: formNome,
                            dataNascimento: formDataNasc,
                            dataEntrada: formDataEntrada,
                            quarto: formQuarto,
                            status: formStatus,
                            responsavel: formResponsavel,
                            telefone: formTelefone,
                            grau: formGrau,
                            grauDesc: grauDescMap[formGrau] || '',
                            alergias: formAlergias
                        }
                        : r
                )
            );
        } else {
            const novo = {
                nome: formNome,
                idade: 80,
                grau: formGrau === 'Grau 2' ? 2 : (formGrau === 'Grau 3' ? 3 : 1),
                quarto: formQuarto,
                status: formStatus,
                responsavel: formResponsavel || 'A definir',
                telefone: formTelefone || '(11) 90000-0000',
                data_entrada: formDataEntrada,
                dataNascimento: formDataNasc,
                grauDesc: grauDescMap[formGrau] || '',
                alergias: formAlergias.join(', '),
                incidentes: []
            };

            try {
                await criarResidente(novo);
                await carregarResidentes();
                if (onAtualizar) onAtualizar();
            } catch (err) {
                console.error('Falha ao salvar residente no backend:', err);
                setResidentes([{ ...novo, id: Date.now() }, ...residentes]);
            }
        }

        setModalAberta(false);
    };

    // Filter & Sort
    const residentesFiltrados = residentes.filter((r) => {
        const atendeFiltroGrau = filtroGrau === 'Todos' || r.grau === filtroGrau;
        const t = termoBusca.toLowerCase();
        const atendeBusca =
            r.nome.toLowerCase().includes(t) ||
            r.quarto.toLowerCase().includes(t) ||
            r.responsavel.toLowerCase().includes(t) ||
            r.telefone.includes(t);
        return atendeFiltroGrau && atendeBusca;
    });

    const residentesOrdenados = [...residentesFiltrados].sort((a, b) => {
        let aVal = a[sortField] || '';
        let bVal = b[sortField] || '';
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const exportarCSV = () => {
        const headers = 'Nome,Grau,Quarto,Responsável,Telefone,Data Entrada\n';
        const rows = residentes
            .map((r) => `"${r.nome}","${r.grau}","${r.quarto}","${r.responsavel}","${r.telefone}","${r.dataEntrada}"`)
            .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'residentes_sta_barbara.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="residentes-container">
            {/* 1. Top Action Toolbar */}
            <div className="top-action-bar">
                <div className="search-filter-wrapper">
                    <div className="search-pill">
                        <FiSearch className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar residente..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    <button className="filter-pill-btn" title="Filtrar">
                        <FiSliders size={18} />
                    </button>
                </div>

                <div className="grau-filter-segmented">
                    {['Todos', 'Grau 1', 'Grau 2', 'Grau 3'].map((grau) => (
                        <button
                            key={grau}
                            className={`grau-tab-btn ${filtroGrau === grau ? 'active' : ''}`}
                            onClick={() => setFiltroGrau(grau)}
                        >
                            {grau}
                        </button>
                    ))}
                </div>

                <div className="action-buttons-group">
                    <button className="btn-csv-export" onClick={exportarCSV}>
                        <FiDownload size={16} />
                        <span>Exportar CSV</span>
                    </button>
                    <button className="btn-add-transaction" onClick={abrirCadastro}>
                        <FiPlus size={16} />
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>

            {/* 2. Residentes Table Card */}
            <div className="table-card">
                <div className="table-header-title">
                    <h3>Quadro de Residentes</h3>
                </div>

                <div className="table-responsive">
                    <table className="financeiro-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>Ação</th>
                                <th style={{ width: '60px' }}>Foto</th>
                                <th className="sortable-th" onClick={() => handleSort('nome')}>
                                    <div className="th-content">
                                        <span>Nome</span>
                                        <span className={`sort-icon ${sortField === 'nome' ? 'active' : 'neutral'}`}>
                                            {sortField === 'nome' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                        </span>
                                    </div>
                                </th>
                                <th className="sortable-th" onClick={() => handleSort('grau')}>
                                    <div className="th-content">
                                        <span>Grau</span>
                                        <span className={`sort-icon ${sortField === 'grau' ? 'active' : 'neutral'}`}>
                                            {sortField === 'grau' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                        </span>
                                    </div>
                                </th>
                                <th className="sortable-th" onClick={() => handleSort('telefone')}>
                                    <div className="th-content">
                                        <span>Tel. Responsável</span>
                                        <span className={`sort-icon ${sortField === 'telefone' ? 'active' : 'neutral'}`}>
                                            {sortField === 'telefone' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                        </span>
                                    </div>
                                </th>
                                <th className="sortable-th" onClick={() => handleSort('dataEntrada')}>
                                    <div className="th-content">
                                        <span>Data Entrada</span>
                                        <span className={`sort-icon ${sortField === 'dataEntrada' ? 'active' : 'neutral'}`}>
                                            {sortField === 'dataEntrada' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {residentesOrdenados.length > 0 ? (
                                residentesOrdenados.map((residente) => (
                                    <tr key={residente.id}>
                                        <td>
                                            <button
                                                className="btn-action-edit"
                                                onClick={() => abrirEdicao(residente)}
                                                title="Editar perfil"
                                            >
                                                <FiEdit2 size={15} />
                                            </button>
                                        </td>
                                        <td>
                                            <div className="avatar-circle">
                                                {residente.nome.charAt(0)}
                                            </div>
                                        </td>
                                        <td className="desc-cell">{residente.nome}</td>
                                        <td>
                                            <span
                                                className={`residente-grau-badge grau-${residente.grau
                                                    .toLowerCase()
                                                    .replace(' ', '-')}`}
                                            >
                                                <span className="grau-dot"></span>
                                                {residente.grau}
                                            </span>
                                        </td>
                                        <td className="cargo-cell">{residente.telefone}</td>
                                        <td className="data-cell">{residente.dataEntrada}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: '#786565' }}>
                                        {carregando ? 'Carregando residentes...' : 'Nenhum residente cadastrado no sistema. Clique em "Adicionar" para registrar o primeiro residente.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. Multi-Tab Drawer / Modal ("Perfil & Incidentes") */}
            {modalAberta && (
                <div className="modal-backdrop" onClick={() => setModalAberta(false)}>
                    <div className="modal-drawer-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div className="avatar-circle-large">
                                    {formNome ? formNome.charAt(0) : 'R'}
                                </div>
                                <div>
                                    <h2>{residenteAtual ? residenteAtual.nome : 'Novo Residente'}</h2>
                                    <span className="subtitle-role">{formQuarto} • Status: {formStatus}</span>
                                </div>
                            </div>
                            <button className="btn-close-modal" onClick={() => setModalAberta(false)}>
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Navigation Tabs (Perfil, Incidentes) */}
                        <div className="modal-tabs-wrapper">
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'perfil' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('perfil')}
                            >
                                <FiUser size={15} />
                                <span>Perfil</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'incidentes' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('incidentes')}
                            >
                                <FiAlertCircle size={15} />
                                <span>Incidentes</span>
                            </button>
                        </div>

                        {/* Tab 1: Perfil */}
                        {abaAtivaModal === 'perfil' && (
                            <form onSubmit={handleSalvarResidente} className="modal-form">
                                <div className="form-grid-2col">
                                    <div className="form-group">
                                        <label className="form-label">NOME COMPLETO</label>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            value={formNome}
                                            onChange={(e) => setFormNome(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">DATA DE NASCIMENTO</label>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            placeholder="DD/MM/AAAA"
                                            value={formDataNasc}
                                            onChange={(e) => setFormDataNasc(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">DATA DE ENTRADA</label>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            placeholder="DD-MM-AAAA"
                                            value={formDataEntrada}
                                            onChange={(e) => setFormDataEntrada(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">QUARTO / ACOMODAÇÃO</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="select-pill"
                                                value={formQuarto}
                                                onChange={(e) => setFormQuarto(e.target.value)}
                                            >
                                                <option value="Quarto 101-A">Quarto 101-A</option>
                                                <option value="Quarto 102-A">Quarto 102-A</option>
                                                <option value="Quarto 104-B">Quarto 104-B</option>
                                                <option value="Quarto 105-A">Quarto 105-A</option>
                                                <option value="Quarto 201-A">Quarto 201-A</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">STATUS</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="select-pill"
                                                value={formStatus}
                                                onChange={(e) => setFormStatus(e.target.value)}
                                            >
                                                <option value="Residente">Residente</option>
                                                <option value="Em Tratamento">Em Tratamento</option>
                                                <option value="Alta Médica">Alta Médica</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">RESPONSÁVEL DIRETO</label>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            value={formResponsavel}
                                            onChange={(e) => setFormResponsavel(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">TELEFONE DO RESPONSÁVEL</label>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            value={formTelefone}
                                            onChange={(e) => setFormTelefone(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">GRAU PATOLÓGICO DE DEPENDÊNCIA</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="select-pill"
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

                                {/* Removable Allergy Chips */}
                                <div className="form-group">
                                    <label className="form-label">ALERGIAS CONHECIDAS</label>
                                    <div className="allergies-chips-container">
                                        {formAlergias.map((tag, idx) => (
                                            <span key={idx} className="allergy-chip">
                                                {tag}
                                                <FiX
                                                    className="chip-remove-icon"
                                                    size={14}
                                                    onClick={() => handleRemoverAlergia(tag)}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                        <input
                                            type="text"
                                            className="input-pill"
                                            placeholder="Digite uma nova alergia e clique em +"
                                            value={novaAlergiaText}
                                            onChange={(e) => setNovaAlergiaText(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn-add-transaction"
                                            onClick={handleAdicionarAlergia}
                                        >
                                            <FiPlus size={16} />
                                        </button>
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

                        {/* Tab 2: Incidentes */}
                        {abaAtivaModal === 'incidentes' && (
                            <div className="modal-tab-content">
                                {/* Form Section: Adicionar Incidente */}
                                <div className="modal-subtable-section">
                                    <h4 className="subtable-title">Adicionar Incidente / Ocorrência</h4>
                                    <form onSubmit={handleAdicionarIncidente} className="incident-form">
                                        <textarea
                                            className="form-textarea"
                                            rows="3"
                                            placeholder="Descreva a ocorrência registrada pela enfermagem ou cuidador..."
                                            value={novoIncidenteDesc}
                                            onChange={(e) => setNovoIncidenteDesc(e.target.value)}
                                            required
                                        ></textarea>

                                        <div className="form-grid-3col">
                                            <div className="form-group">
                                                <label className="form-label">DATA</label>
                                                <input
                                                    type="text"
                                                    className="input-pill"
                                                    value={novoIncidenteData}
                                                    onChange={(e) => setNovoIncidenteData(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">SEVERIDADE</label>
                                                <div className="custom-select-wrapper">
                                                    <select
                                                        className="select-pill"
                                                        value={novoIncidenteNivel}
                                                        onChange={(e) => setNovoIncidenteNivel(e.target.value)}
                                                    >
                                                        <option value="Atenção">Atenção</option>
                                                        <option value="Crítico">Crítico</option>
                                                    </select>
                                                    <FiChevronDown className="select-arrow" size={18} />
                                                </div>
                                            </div>

                                            <button type="submit" className="btn-modal-confirm" style={{ height: '42px', padding: '0 20px' }}>
                                                Adicionar
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* List Section: Incidentes Registrados */}
                                <div className="modal-subtable-section">
                                    <h4 className="subtable-title">Incidentes Registrados</h4>
                                    <div className="incidents-list">
                                        {residenteAtual && residenteAtual.incidentes && residenteAtual.incidentes.length > 0 ? (
                                            residenteAtual.incidentes.map((inc) => (
                                                <div key={inc.id} className="incident-card-item">
                                                    <div className="incident-card-header">
                                                        <span className="incident-date">{inc.data}</span>
                                                        <span className={`incident-severity-badge severity-${inc.nivel.toLowerCase().replace('çã', 'ca')}`}>
                                                            • {inc.nivel}
                                                        </span>
                                                    </div>
                                                    <p className="incident-desc">{inc.desc}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ color: '#888', fontStyle: 'italic', padding: '8px' }}>
                                                Nenhum incidente registrado para este residente.
                                            </p>
                                        )}
                                    </div>
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
