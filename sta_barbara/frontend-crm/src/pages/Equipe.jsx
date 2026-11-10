import React, { useState } from 'react';
import {
    FiPlus,
    FiSearch,
    FiSliders,
    FiDownload,
    FiEdit2,
    FiX,
    FiCalendar,
    FiChevronDown,
    FiUser,
    FiCreditCard,
    FiFileText,
    FiCheckCircle,
    FiAlertCircle,
    FiClock
} from 'react-icons/fi';
import './Equipe.css';

export default function Equipe() {
    // Initial employee dataset matching Figma prototype
    const [colaboradores, setColaboradores] = useState([
        {
            id: 1,
            nome: 'Chance Vetrovs',
            cargo: 'Enfermeiro Chefe',
            telefone: '(11) 98765-4321',
            status: 'Ativo',
            dataEntrada: '02-01-2023',
            nascimento: '1988-04-12',
            cpf: '123.456.789-00',
            email: 'chance.vetrovs@santabarbara.com',
            turno: 'Plantão Diurno',
            salario: 'R$ 4.500,00',
            escala: '12x36',
            banco: 'Banco do Brasil',
            tipoConta: 'Conta Corrente',
            historicoPagamentos: [
                { titulo: 'pagamento2026/1', mes: 'Janeiro', valor: 'R$ 4.500,00' },
                { titulo: 'pagamento2026/2', mes: 'Fevereiro', valor: 'R$ 4.500,00' }
            ],
            registros: [
                { tipo: 'Falta Justificada', motivo: 'Motivos de saúde (Atestado)', data: '15/02/2026' }
            ]
        },
        {
            id: 2,
            nome: 'Emery Aminoff',
            cargo: 'Cozinheira',
            telefone: '(11) 97654-3210',
            status: 'Ativo',
            dataEntrada: '15-03-2024',
            nascimento: '1992-08-25',
            cpf: '234.567.890-11',
            email: 'emery.aminoff@santabarbara.com',
            turno: 'Manhã',
            salario: 'R$ 2.800,00',
            escala: '6x1',
            banco: 'Bradesco',
            tipoConta: 'Conta Corrente',
            historicoPagamentos: [
                { titulo: 'pagamento2026/1', mes: 'Janeiro', valor: 'R$ 2.800,00' }
            ],
            registros: []
        },
        {
            id: 3,
            nome: 'Gustavo Geidt',
            cargo: 'Administrador',
            telefone: '(11) 96543-2109',
            status: 'Ativo',
            dataEntrada: '10-10-2022',
            nascimento: '1985-11-30',
            cpf: '345.678.901-22',
            email: 'gustavo.geidt@santabarbara.com',
            turno: 'Horário Comercial',
            salario: 'R$ 6.200,00',
            escala: '5x2',
            banco: 'Itaú',
            tipoConta: 'Conta Corrente',
            historicoPagamentos: [
                { titulo: 'pagamento2026/1', mes: 'Janeiro', valor: 'R$ 6.200,00' }
            ],
            registros: []
        },
        {
            id: 4,
            nome: 'Makenna Dokidis',
            cargo: 'Médica Geriatra',
            telefone: '(11) 95432-1098',
            status: 'Afastado',
            dataEntrada: '01-06-2021',
            nascimento: '1980-02-14',
            cpf: '456.789.012-33',
            email: 'makenna.dokidis@santabarbara.com',
            turno: 'Terças e Quintas',
            salario: 'R$ 9.800,00',
            escala: 'Horário Comercial',
            banco: 'Santander',
            tipoConta: 'Conta Corrente',
            historicoPagamentos: [
                { titulo: 'pagamento2026/1', mes: 'Janeiro', valor: 'R$ 9.800,00' }
            ],
            registros: [
                { tipo: 'Licença Médica', motivo: 'Cirurgia agendada', data: '01/03/2026' }
            ]
        },
        {
            id: 5,
            nome: 'Carla Beatriz',
            cargo: 'Cuidadora de Idosos',
            telefone: '(11) 94321-0987',
            status: 'Ativo',
            dataEntrada: '20-08-2023',
            nascimento: '1995-07-19',
            cpf: '567.890.123-44',
            email: 'carla.beatriz@santabarbara.com',
            turno: 'Plantão Noturno',
            salario: 'R$ 3.100,00',
            escala: '12x36',
            banco: 'Caixa Econômica',
            tipoConta: 'Conta Poupança',
            historicoPagamentos: [
                { titulo: 'pagamento2026/1', mes: 'Janeiro', valor: 'R$ 3.100,00' }
            ],
            registros: []
        },
        {
            id: 6,
            nome: 'Roberto Souza',
            cargo: 'Técnico de Enfermagem',
            telefone: '(11) 93210-9876',
            status: 'Desligado',
            dataEntrada: '12-05-2020',
            nascimento: '1983-09-05',
            cpf: '678.901.234-55',
            email: 'roberto.souza@santabarbara.com',
            turno: 'Integral',
            salario: 'R$ 3.400,00',
            escala: '12x36',
            banco: 'Nubank',
            tipoConta: 'Conta Corrente',
            historicoPagamentos: [],
            registros: [
                { tipo: 'Rescisão', motivo: 'Desligamento a pedido', data: '10/01/2026' }
            ]
        }
    ]);

    // UI Control States
    const [termoBusca, setTermoBusca] = useState('');
    const [ordenacao, setOrdenacao] = useState({ campo: 'nome', direcao: 'asc' });
    const [modalAberta, setModalAberta] = useState(false);
    const [abaAtivaModal, setAbaAtivaModal] = useState('perfil'); // 'perfil' | 'financeiro' | 'registro'
    const [colaboradorAtual, setColaboradorAtual] = useState(null);

    // Form fields state
    const [formNome, setFormNome] = useState('');
    const [formCargo, setFormCargo] = useState('Enfermeiro Chefe');
    const [formTelefone, setFormTelefone] = useState('');
    const [formStatus, setFormStatus] = useState('Ativo');
    const [formDataEntrada, setFormDataEntrada] = useState('');
    const [formNascimento, setFormNascimento] = useState('');
    const [formCpf, setFormCpf] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formTurno, setFormTurno] = useState('Plantão Diurno');
    const [formSalario, setFormSalario] = useState('');
    const [formEscala, setFormEscala] = useState('12x36');
    const [formBanco, setFormBanco] = useState('Banco do Brasil');
    const [formTipoConta, setFormTipoConta] = useState('Conta Corrente');

    // New Registro field state
    const [novoRegTipo, setNovoRegTipo] = useState('Falta Justificada');
    const [novoRegMotivo, setNovoRegMotivo] = useState('');
    const [novoRegData, setNovoRegData] = useState('');

    const abrirModalCadastro = () => {
        setColaboradorAtual(null);
        setFormNome('');
        setFormCargo('Enfermeiro Chefe');
        setFormTelefone('');
        setFormStatus('Ativo');
        setFormDataEntrada('');
        setFormNascimento('');
        setFormCpf('');
        setFormEmail('');
        setFormTurno('Plantão Diurno');
        setFormSalario('R$ 3.500,00');
        setFormEscala('12x36');
        setFormBanco('Banco do Brasil');
        setFormTipoConta('Conta Corrente');
        setAbaAtivaModal('perfil');
        setModalAberta(true);
    };

    const abrirModalEdicao = (colab) => {
        setColaboradorAtual(colab);
        setFormNome(colab.nome);
        setFormCargo(colab.cargo);
        setFormTelefone(colab.telefone);
        setFormStatus(colab.status);
        setFormDataEntrada(colab.dataEntrada);
        setFormNascimento(colab.nascimento || '');
        setFormCpf(colab.cpf || '');
        setFormEmail(colab.email || '');
        setFormTurno(colab.turno || 'Plantão Diurno');
        setFormSalario(colab.salario || 'R$ 3.500,00');
        setFormEscala(colab.escala || '12x36');
        setFormBanco(colab.banco || 'Banco do Brasil');
        setFormTipoConta(colab.tipoConta || 'Conta Corrente');
        setAbaAtivaModal('perfil');
        setModalAberta(true);
    };

    const handleSalvarColaborador = (e) => {
        e.preventDefault();
        if (!formNome) return;

        if (colaboradorAtual) {
            // Edit existing
            setColaboradores(
                colaboradores.map((c) =>
                    c.id === colaboradorAtual.id
                        ? {
                            ...c,
                            nome: formNome,
                            cargo: formCargo,
                            telefone: formTelefone,
                            status: formStatus,
                            dataEntrada: formDataEntrada || c.dataEntrada,
                            nascimento: formNascimento,
                            cpf: formCpf,
                            email: formEmail,
                            turno: formTurno,
                            salario: formSalario,
                            escala: formEscala,
                            banco: formBanco,
                            tipoConta: formTipoConta
                        }
                        : c
                )
            );
        } else {
            // Add new
            const novo = {
                id: Date.now(),
                nome: formNome,
                cargo: formCargo,
                telefone: formTelefone || '(11) 90000-0000',
                status: formStatus,
                dataEntrada: formDataEntrada || '01-04-2026',
                nascimento: formNascimento,
                cpf: formCpf,
                email: formEmail,
                turno: formTurno,
                salario: formSalario,
                escala: formEscala,
                banco: formBanco,
                tipoConta: formTipoConta,
                historicoPagamentos: [],
                registros: []
            };
            setColaboradores([novo, ...colaboradores]);
        }

        setModalAberta(false);
    };

    const handleAdicionarRegistro = (e) => {
        e.preventDefault();
        if (!novoRegMotivo || !colaboradorAtual) return;

        const novoReg = {
            tipo: novoRegTipo,
            motivo: novoRegMotivo,
            data: novoRegData || '30/09/2026'
        };

        const atualizados = colaboradores.map((c) => {
            if (c.id === colaboradorAtual.id) {
                return {
                    ...c,
                    registros: [novoReg, ...(c.registros || [])]
                };
            }
            return c;
        });

        setColaboradores(atualizados);
        setColaboradorAtual({
            ...colaboradorAtual,
            registros: [novoReg, ...(colaboradorAtual.registros || [])]
        });
        setNovoRegMotivo('');
        setNovoRegData('');
    };

    // Sorting logic
    const handleSort = (campo) => {
        setOrdenacao((prev) => {
            if (prev.campo === campo) {
                return { campo, direcao: prev.direcao === 'asc' ? 'desc' : 'asc' };
            }
            return { campo, direcao: 'asc' };
        });
    };

    const colaboradoresFiltradosESortheados = [...colaboradores]
        .filter((c) => {
            const termo = termoBusca.toLowerCase();
            return (
                c.nome.toLowerCase().includes(termo) ||
                c.cargo.toLowerCase().includes(termo) ||
                c.telefone.includes(termo) ||
                c.status.toLowerCase().includes(termo)
            );
        })
        .sort((a, b) => {
            let valA = (a[ordenacao.campo] || '').toString().toLowerCase();
            let valB = (b[ordenacao.campo] || '').toString().toLowerCase();

            if (valA < valB) return ordenacao.direcao === 'asc' ? -1 : 1;
            if (valA > valB) return ordenacao.direcao === 'asc' ? 1 : -1;
            return 0;
        });

    const getIconeOrdenacao = (campo) => {
        if (ordenacao.campo !== campo) return <span className="sort-icon neutral">⇅</span>;
        return <span className="sort-icon active">{ordenacao.direcao === 'asc' ? '▲' : '▼'}</span>;
    };

    const exportarCSV = () => {
        const headers = 'Nome,Cargo,Telefone,Status,Data Entrada\n';
        const rows = colaboradores
            .map((c) => `"${c.nome}","${c.cargo}","${c.telefone}","${c.status}","${c.dataEntrada}"`)
            .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'equipe_colaboradores.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="equipe-container">
            {/* Top Toolbar / Action Bar */}
            <div className="top-action-bar">
                <div className="search-filter-wrapper">
                    <div className="search-pill">
                        <FiSearch className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar colaborador..."
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

            {/* Table / List Card */}
            <div className="table-card">
                <div className="table-header-title">
                    <h3>Quadro de Funcionários & Equipe</h3>
                </div>

                <div className="table-responsive">
                    <table className="financeiro-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px', textAlign: 'center' }}>Ação</th>
                                <th style={{ width: '70px' }}>Foto</th>
                                <th onClick={() => handleSort('nome')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Nome</span>
                                        {getIconeOrdenacao('nome')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('cargo')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Cargo</span>
                                        {getIconeOrdenacao('cargo')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('telefone')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Telefone</span>
                                        {getIconeOrdenacao('telefone')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('status')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Status</span>
                                        {getIconeOrdenacao('status')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('dataEntrada')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Data Entrada</span>
                                        {getIconeOrdenacao('dataEntrada')}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {colaboradoresFiltradosESortheados.length > 0 ? (
                                colaboradoresFiltradosESortheados.map((colab) => (
                                    <tr key={colab.id}>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className="btn-action-edit"
                                                onClick={() => abrirModalEdicao(colab)}
                                                title="Editar colaborador"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                        </td>
                                        <td>
                                            <div className="avatar-circle">
                                                {colab.nome.charAt(0)}
                                            </div>
                                        </td>
                                        <td className="desc-cell">{colab.nome}</td>
                                        <td className="cargo-cell">{colab.cargo}</td>
                                        <td className="data-cell">{colab.telefone}</td>
                                        <td>
                                            <span
                                                className={`categoria-badge status-${colab.status.toLowerCase()}`}
                                            >
                                                {colab.status}
                                            </span>
                                        </td>
                                        <td className="data-cell">{colab.dataEntrada}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                                        Nenhum colaborador encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Multi-Tab Drawer / Modal "Cadastro / Detalhes de Colaborador" */}
            {modalAberta && (
                <div className="modal-backdrop" onClick={() => setModalAberta(false)}>
                    <div className="modal-drawer-large" onClick={(e) => e.stopPropagation()}>
                        {/* Drawer Header */}
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div className="avatar-circle-large">
                                    {formNome ? formNome.charAt(0) : 'N'}
                                </div>
                                <div>
                                    <h2>{colaboradorAtual ? colaboradorAtual.nome : 'Novo Colaborador'}</h2>
                                    <span className="subtitle-role">{formCargo}</span>
                                </div>
                            </div>
                            <button className="btn-close-modal" onClick={() => setModalAberta(false)}>
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Navigation Tabs (Perfil, Financeiro, Registro) */}
                        <div className="modal-tabs-wrapper">
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'perfil' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('perfil')}
                            >
                                <FiUser size={15} />
                                <span>Perfil</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'financeiro' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('financeiro')}
                            >
                                <FiCreditCard size={15} />
                                <span>Financeiro</span>
                            </button>
                            <button
                                className={`modal-tab-btn ${abaAtivaModal === 'registro' ? 'active' : ''}`}
                                onClick={() => setAbaAtivaModal('registro')}
                            >
                                <FiFileText size={15} />
                                <span>Registro</span>
                            </button>
                        </div>

                        {/* Tab Content 1: Perfil */}
                        {abaAtivaModal === 'perfil' && (
                            <form onSubmit={handleSalvarColaborador} className="modal-form">
                                <div className="form-grid-2col">
                                    <div className="form-group">
                                        <label className="form-label">NOME COMPLETO</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="Nome do colaborador"
                                            value={formNome}
                                            onChange={(e) => setFormNome(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">CARGO</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formCargo}
                                                onChange={(e) => setFormCargo(e.target.value)}
                                            >
                                                <option value="Enfermeiro Chefe">Enfermeiro Chefe</option>
                                                <option value="Técnico de Enfermagem">Técnico de Enfermagem</option>
                                                <option value="Médica Geriatra">Médica Geriatra</option>
                                                <option value="Cuidadora de Idosos">Cuidadora de Idosos</option>
                                                <option value="Cozinheira">Cozinheira</option>
                                                <option value="Fisioterapeuta">Fisioterapeuta</option>
                                                <option value="Nutricionista">Nutricionista</option>
                                                <option value="Administrador">Administrador</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">DATA DE NASCIMENTO</label>
                                        <input
                                            type="date"
                                            className="form-input input-pill"
                                            value={formNascimento}
                                            onChange={(e) => setFormNascimento(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">DATA DE ADMISSÃO</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="DD-MM-AAAA"
                                            value={formDataEntrada}
                                            onChange={(e) => setFormDataEntrada(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">CPF</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="000.000.000-00"
                                            value={formCpf}
                                            onChange={(e) => setFormCpf(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">STATUS</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formStatus}
                                                onChange={(e) => setFormStatus(e.target.value)}
                                            >
                                                <option value="Ativo">Ativo</option>
                                                <option value="Afastado">Afastado</option>
                                                <option value="Desligado">Desligado</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">E-MAIL</label>
                                        <input
                                            type="email"
                                            className="form-input input-pill"
                                            placeholder="email@santabarbara.com"
                                            value={formEmail}
                                            onChange={(e) => setFormEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">TELEFONE</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="(00) 00000-0000"
                                            value={formTelefone}
                                            onChange={(e) => setFormTelefone(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">TURNO</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formTurno}
                                                onChange={(e) => setFormTurno(e.target.value)}
                                            >
                                                <option value="Plantão Diurno">Plantão Diurno</option>
                                                <option value="Plantão Noturno">Plantão Noturno</option>
                                                <option value="Manhã">Manhã</option>
                                                <option value="Tarde">Tarde</option>
                                                <option value="Integral">Integral</option>
                                                <option value="Horário Comercial">Horário Comercial</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">SALÁRIO BASE</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="R$ 0,00"
                                            value={formSalario}
                                            onChange={(e) => setFormSalario(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">ESCALA</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formEscala}
                                                onChange={(e) => setFormEscala(e.target.value)}
                                            >
                                                <option value="12x36">12x36</option>
                                                <option value="6x1">6x1</option>
                                                <option value="5x2">5x2</option>
                                                <option value="Horário Comercial">Horário Comercial</option>
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

                        {/* Tab Content 2: Financeiro */}
                        {abaAtivaModal === 'financeiro' && (
                            <div className="modal-tab-content">
                                <div className="form-grid-2col">
                                    <div className="form-group">
                                        <label className="form-label">INSTITUIÇÃO FINANCEIRA</label>
                                        <input
                                            type="text"
                                            className="form-input input-pill"
                                            placeholder="Ex: Banco do Brasil"
                                            value={formBanco}
                                            onChange={(e) => setFormBanco(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">TIPO CONTA</label>
                                        <div className="custom-select-wrapper">
                                            <select
                                                className="form-input select-pill"
                                                value={formTipoConta}
                                                onChange={(e) => setFormTipoConta(e.target.value)}
                                            >
                                                <option value="Conta Corrente">Conta Corrente</option>
                                                <option value="Conta Poupança">Conta Poupança</option>
                                                <option value="Conta Salário">Conta Salário</option>
                                            </select>
                                            <FiChevronDown className="select-arrow" size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-subtable-section">
                                    <h4 className="subtable-title">Histórico de Pagamentos</h4>
                                    <table className="financeiro-table subtable">
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Mês</th>
                                                <th style={{ textAlign: 'right' }}>R$</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {colaboradorAtual && colaboradorAtual.historicoPagamentos && colaboradorAtual.historicoPagamentos.length > 0 ? (
                                                colaboradorAtual.historicoPagamentos.map((pag, idx) => (
                                                    <tr key={idx}>
                                                        <td className="desc-cell">{pag.titulo}</td>
                                                        <td className="data-cell">{pag.mes}</td>
                                                        <td className="valor-cell valor-pos">{pag.valor}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                                                        Nenhum histórico registrado.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="modal-actions">
                                    <button className="btn-modal-confirm" onClick={() => setModalAberta(false)}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tab Content 3: Registro (Faltas ou Horas Extras) */}
                        {abaAtivaModal === 'registro' && (
                            <div className="modal-tab-content">
                                <h4 className="subtable-title">Registro de faltas ou horas extras</h4>

                                {colaboradorAtual && (
                                    <form onSubmit={handleAdicionarRegistro} className="form-grid-3col">
                                        <div className="form-group">
                                            <label className="form-label">TIPO</label>
                                            <div className="custom-select-wrapper">
                                                <select
                                                    className="form-input select-pill"
                                                    value={novoRegTipo}
                                                    onChange={(e) => setNovoRegTipo(e.target.value)}
                                                >
                                                    <option value="Falta Justificada">Falta Justificada</option>
                                                    <option value="Falta Injustificada">Falta Injustificada</option>
                                                    <option value="Hora Extra">Hora Extra</option>
                                                    <option value="Atestado Médico">Atestado Médico</option>
                                                </select>
                                                <FiChevronDown className="select-arrow" size={18} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">DATA</label>
                                            <input
                                                type="text"
                                                className="form-input input-pill"
                                                placeholder="DD/MM/AAAA"
                                                value={novoRegData}
                                                onChange={(e) => setNovoRegData(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">MOTIVO / DETALHES</label>
                                            <input
                                                type="text"
                                                className="form-input input-pill"
                                                placeholder="Motivo..."
                                                value={novoRegMotivo}
                                                onChange={(e) => setNovoRegMotivo(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn-csv-export" style={{ height: '42px', alignSelf: 'flex-end' }}>
                                            + Registrar
                                        </button>
                                    </form>
                                )}

                                <div className="modal-subtable-section" style={{ marginTop: '16px' }}>
                                    <table className="financeiro-table subtable">
                                        <thead>
                                            <tr>
                                                <th>Motivo / Tipo</th>
                                                <th>Detalhes</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {colaboradorAtual && colaboradorAtual.registros && colaboradorAtual.registros.length > 0 ? (
                                                colaboradorAtual.registros.map((reg, idx) => (
                                                    <tr key={idx}>
                                                        <td className="desc-cell">{reg.tipo}</td>
                                                        <td className="data-cell">{reg.motivo}</td>
                                                        <td className="data-cell">{reg.data}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                                                        Nenhum registro de falta ou hora extra.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
