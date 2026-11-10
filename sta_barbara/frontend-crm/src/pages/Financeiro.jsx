import React, { useState } from 'react';
import {
    FiPlus,
    FiSearch,
    FiSliders,
    FiDownload,
    FiArrowUpRight,
    FiArrowDownRight,
    FiCalendar,
    FiX,
    FiChevronDown,
    FiZoomIn,
    FiTrendingUp,
    FiTrendingDown,
    FiDollarSign,
    FiMaximize2
} from 'react-icons/fi';
import './Financeiro.css';

export default function Financeiro() {
    // Controls
    const [modalAberta, setModalAberta] = useState(false);
    const [modalZoomAberta, setModalZoomAberta] = useState(false);
    const [mesSelecionadoZoom, setMesSelecionadoZoom] = useState(null);

    const [termoBusca, setTermoBusca] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('Entrada');

    // Sorting state
    const [ordenacao, setOrdenacao] = useState({ campo: 'data', direcao: 'desc' });

    // Form state
    const [novaCategoria, setNovaCategoria] = useState('Receita de Aluguel');
    const [novaDescricao, setNovaDescricao] = useState('');
    const [novoValor, setNovoValor] = useState('');
    const [novaData, setNovaData] = useState('');
    const [novaObservacao, setNovaObservacao] = useState('');

    const [transacoes, setTransacoes] = useState([
        {
            id: 1,
            categoria: 'Mensalidade',
            descricao: 'mensalidade senhor chance',
            data: '02-04-2026',
            valor: 'R$ 2.600,00',
            tipo: 'Entrada'
        },
        {
            id: 2,
            categoria: 'Salário',
            descricao: 'Salário Enfermeira Ana',
            data: '05-04-2026',
            valor: 'R$ 2.000,00',
            tipo: 'Saida'
        },
        {
            id: 3,
            categoria: 'Mensalidade',
            descricao: 'Mensalidade Dna. Maria Helena',
            data: '08-04-2026',
            valor: 'R$ 4.200,00',
            tipo: 'Entrada'
        },
        {
            id: 4,
            categoria: 'Manutenção',
            descricao: 'Reparo no sistema elétrico',
            data: '10-04-2026',
            valor: 'R$ 650,00',
            tipo: 'Saida'
        },
        {
            id: 5,
            categoria: 'Mensalidade',
            descricao: 'Mensalidade Sr. Antônio Carlos',
            data: '12-04-2026',
            valor: 'R$ 4.500,00',
            tipo: 'Entrada'
        },
        {
            id: 6,
            categoria: 'Despesas Fixas',
            descricao: 'Compra de medicamentos farmácia',
            data: '15-04-2026',
            valor: 'R$ 1.350,00',
            tipo: 'Saida'
        }
    ]);

    // Monthly Chart Data (Jan - Dez)
    const dadosGrafico = [
        { mes: 'Jan', mesExtenso: 'Janeiro', valor: 62, entradas: 'R$ 21.400,00', despesas: 'R$ 10.200,00', saldo: 'R$ 11.200,00', atual: false },
        { mes: 'Fev', mesExtenso: 'Fevereiro', valor: 48, entradas: 'R$ 18.200,00', despesas: 'R$ 11.000,00', saldo: 'R$ 7.200,00', atual: false },
        { mes: 'Mar', mesExtenso: 'Março', valor: 75, entradas: 'R$ 23.500,00', despesas: 'R$ 10.500,00', saldo: 'R$ 13.000,00', atual: false },
        { mes: 'Abr', mesExtenso: 'Abril', valor: 83, entradas: 'R$ 25.100,00', despesas: 'R$ 11.800,00', saldo: 'R$ 13.300,00', atual: false },
        { mes: 'Mai', mesExtenso: 'Maio', valor: 59, entradas: 'R$ 20.000,00', despesas: 'R$ 12.100,00', saldo: 'R$ 7.900,00', atual: false },
        { mes: 'Jun', mesExtenso: 'Junho', valor: 91, entradas: 'R$ 26.800,00', despesas: 'R$ 11.200,00', saldo: 'R$ 15.600,00', atual: false },
        { mes: 'Jul', mesExtenso: 'Julho', valor: 68, entradas: 'R$ 22.100,00', despesas: 'R$ 10.900,00', saldo: 'R$ 11.200,00', atual: false },
        { mes: 'Ago', mesExtenso: 'Agosto', valor: 77, entradas: 'R$ 24.000,00', despesas: 'R$ 11.400,00', saldo: 'R$ 12.600,00', atual: false },
        { mes: 'Set', mesExtenso: 'Setembro', valor: 55, entradas: 'R$ 19.800,00', despesas: 'R$ 11.000,00', saldo: 'R$ 8.800,00', atual: false },
        { mes: 'Out', mesExtenso: 'Outubro', valor: 88, entradas: 'R$ 25.900,00', despesas: 'R$ 11.700,00', saldo: 'R$ 14.200,00', atual: false },
        { mes: 'Nov', mesExtenso: 'Novembro', valor: 94, entradas: 'R$ 27.500,00', despesas: 'R$ 12.000,00', saldo: 'R$ 15.500,00', atual: true },
        { mes: 'Dez', mesExtenso: 'Dezembro', valor: 70, entradas: 'R$ 23.000,00', despesas: 'R$ 11.500,00', saldo: 'R$ 11.500,00', atual: false }
    ];

    const categoriasComCores = [
        { nome: 'Receita de Aluguel', cor: '#007A33' },
        { nome: 'Serviços Prestados', cor: '#1A73E8' },
        { nome: 'Manutenção', cor: '#D97706' },
        { nome: 'Despesas Fixas', cor: '#7A1C1C' },
        { nome: 'Outros', cor: '#7C3AED' }
    ];

    const handleSalvarTransacao = (e) => {
        e.preventDefault();
        if (!novoValor) return;

        const formatarData = (d) => {
            if (!d) {
                const hoje = new Date();
                return `${String(hoje.getDate()).padStart(2, '0')}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${hoje.getFullYear()}`;
            }
            const partes = d.split('-');
            if (partes.length === 3) {
                return `${partes[2]}-${partes[1]}-${partes[0]}`;
            }
            return d;
        };

        const valorNum = parseFloat(novoValor.replace(',', '.')) || 0;
        const valorFormatado = `R$ ${valorNum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const novaItem = {
            id: Date.now(),
            categoria: novaCategoria,
            descricao: novaDescricao || (tipoTransacao === 'Entrada' ? 'Receita Diversa' : 'Despesa Diversa'),
            data: formatarData(novaData),
            valor: valorFormatado,
            tipo: tipoTransacao
        };

        setTransacoes([novaItem, ...transacoes]);
        setNovaDescricao('');
        setNovoValor('');
        setNovaData('');
        setNovaObservacao('');
        setModalAberta(false);
    };

    // Sort Handler
    const handleSort = (campo) => {
        setOrdenacao((prev) => {
            if (prev.campo === campo) {
                return { campo, direcao: prev.direcao === 'asc' ? 'desc' : 'asc' };
            }
            return { campo, direcao: 'asc' };
        });
    };

    const parseValor = (str) => {
        if (!str) return 0;
        const numStr = str.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(numStr) || 0;
    };

    const parseData = (str) => {
        if (!str) return 0;
        const partes = str.split('-');
        if (partes.length === 3) {
            return new Date(partes[2], partes[1] - 1, partes[0]).getTime();
        }
        return 0;
    };

    // Filtering & Sorting logic
    const transacoesFiltradasESorteadas = [...transacoes]
        .filter((t) => {
            const termo = termoBusca.toLowerCase();
            return (
                t.descricao.toLowerCase().includes(termo) ||
                t.categoria.toLowerCase().includes(termo) ||
                t.data.includes(termo)
            );
        })
        .sort((a, b) => {
            let valA = a[ordenacao.campo];
            let valB = b[ordenacao.campo];

            if (ordenacao.campo === 'valor') {
                valA = parseValor(a.valor);
                valB = parseValor(b.valor);
            } else if (ordenacao.campo === 'data') {
                valA = parseData(a.data);
                valB = parseData(b.data);
            } else {
                valA = (valA || '').toString().toLowerCase();
                valB = (valB || '').toString().toLowerCase();
            }

            if (valA < valB) return ordenacao.direcao === 'asc' ? -1 : 1;
            if (valA > valB) return ordenacao.direcao === 'asc' ? 1 : -1;
            return 0;
        });

    const getIconeOrdenacao = (campo) => {
        if (ordenacao.campo !== campo) return <span className="sort-icon neutral">⇅</span>;
        return <span className="sort-icon active">{ordenacao.direcao === 'asc' ? '▲' : '▼'}</span>;
    };

    const abrirZoomMes = (item) => {
        setMesSelecionadoZoom(item);
        setModalZoomAberta(true);
    };

    const exportarCSV = () => {
        const headers = 'Categoria,Descrição,Data,Valor,Tipo\n';
        const rows = transacoes
            .map((t) => `"${t.categoria}","${t.descricao}","${t.data}","${t.valor}","${t.tipo}"`)
            .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'extrato_financeiro.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="financeiro-container">
            {/* 1. KPI Cards Grid */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <span className="metric-label">Entradas</span>
                    <span className="metric-value value-entradas">R$ 24.560,00</span>
                </div>

                <div className="metric-card">
                    <span className="metric-label">Despesas</span>
                    <span className="metric-value value-despesas">R$ 12.000,00</span>
                </div>

                <div className="metric-card">
                    <span className="metric-label">Saldo total</span>
                    <span className="metric-value value-saldo">R$ 12.560,00</span>
                </div>
            </div>

            {/* 2. Monthly Performance Chart Card */}
            <div className="chart-card">
                <div className="chart-header">
                    <div>
                        <h3 className="chart-title">Desempenho Mensal</h3>
                        <p className="chart-subtitle">Visão geral do ano de 2024 (Clique na barra para dar zoom)</p>
                    </div>
                    <div className="chart-header-right">
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-box legend-anteriores"></span>
                                <span>MESES ANTERIORES</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-box legend-atual"></span>
                                <span>MÊS ATUAL</span>
                            </div>
                        </div>
                        <button
                            className="btn-zoom-global"
                            onClick={() => abrirZoomMes(dadosGrafico.find((d) => d.atual) || dadosGrafico[10])}
                            title="Ampliar visão do mês"
                        >
                            <FiMaximize2 size={15} />
                            <span>Zoom Mês</span>
                        </button>
                    </div>
                </div>

                <div className="chart-bars-container">
                    {dadosGrafico.map((item, idx) => (
                        <div
                            key={idx}
                            className="bar-column clickable-bar"
                            onClick={() => abrirZoomMes(item)}
                            title={`Clique para ampliar ${item.mesExtenso}`}
                        >
                            <span className="bar-value">{item.valor}</span>
                            <div className="bar-wrapper">
                                <div
                                    className={`bar-fill ${item.atual ? 'bar-atual' : 'bar-anteriores'}`}
                                    style={{ height: `${item.valor}%` }}
                                ></div>
                            </div>
                            <span className="bar-label">{item.mes}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Action Toolbar (Posicionada entre Desempenho Mensal e Extrato) */}
            <div className="top-action-bar">
                <div className="search-filter-wrapper">
                    <div className="search-pill">
                        <FiSearch className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar transação..."
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
                        <span>CSV Exportar</span>
                    </button>
                    <button className="btn-add-transaction" onClick={() => setModalAberta(true)}>
                        <FiPlus size={16} />
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>

            {/* 4. Transactions Table Section */}
            <div className="table-card">
                <div className="table-header-title">
                    <h3>Extrato de Transações</h3>
                </div>

                <div className="table-responsive">
                    <table className="financeiro-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('categoria')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Categoria</span>
                                        {getIconeOrdenacao('categoria')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('descricao')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Descrição</span>
                                        {getIconeOrdenacao('descricao')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('data')} className="sortable-th">
                                    <div className="th-content">
                                        <span>Data</span>
                                        {getIconeOrdenacao('data')}
                                    </div>
                                </th>
                                <th onClick={() => handleSort('valor')} className="sortable-th" style={{ textAlign: 'right' }}>
                                    <div className="th-content th-right">
                                        <span>Valor</span>
                                        {getIconeOrdenacao('valor')}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoesFiltradasESorteadas.length > 0 ? (
                                transacoesFiltradasESorteadas.map((t) => (
                                    <tr key={t.id}>
                                        <td>
                                            <span
                                                className={`categoria-badge ${t.tipo === 'Entrada' ? 'cat-entrada' : 'cat-saida'
                                                    }`}
                                            >
                                                {t.categoria}
                                            </span>
                                        </td>
                                        <td className="desc-cell">{t.descricao}</td>
                                        <td className="data-cell">{t.data}</td>
                                        <td className="valor-cell">
                                            <span
                                                className={t.tipo === 'Entrada' ? 'valor-pos' : 'valor-neg'}
                                            >
                                                {t.valor}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                                        Nenhuma transação encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal / Side Drawer "Nova Transação" */}
            {modalAberta && (
                <div className="modal-backdrop" onClick={() => setModalAberta(false)}>
                    <div className="modal-drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Nova Transação</h2>
                            <button className="btn-close-modal" onClick={() => setModalAberta(false)}>
                                <FiX size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSalvarTransacao} className="modal-form">
                            <div className="form-group">
                                <label className="form-label">TIPO</label>
                                <div className="segmented-toggle">
                                    <button
                                        type="button"
                                        className={`toggle-btn btn-entrada ${tipoTransacao === 'Entrada' ? 'active' : ''
                                            }`}
                                        onClick={() => setTipoTransacao('Entrada')}
                                    >
                                        <FiArrowUpRight size={16} />
                                        <span>Entrada</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`toggle-btn btn-saida ${tipoTransacao === 'Saida' ? 'active' : ''
                                            }`}
                                        onClick={() => setTipoTransacao('Saida')}
                                    >
                                        <FiArrowDownRight size={16} />
                                        <span>Saída</span>
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">CATEGORIA</label>
                                <div className="custom-select-wrapper">
                                    <select
                                        className="form-input select-pill"
                                        value={novaCategoria}
                                        onChange={(e) => setNovaCategoria(e.target.value)}
                                    >
                                        {categoriasComCores.map((cat, idx) => (
                                            <option key={idx} value={cat.nome}>
                                                {cat.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="select-arrow" size={18} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">DESCRIÇÃO</label>
                                <input
                                    type="text"
                                    className="form-input input-pill"
                                    placeholder="Ex: Mensalidade / Compra de Insumos"
                                    value={novaDescricao}
                                    onChange={(e) => setNovaDescricao(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">VALOR</label>
                                <input
                                    type="text"
                                    className="form-input input-pill"
                                    placeholder="R$ 0,00"
                                    value={novoValor}
                                    onChange={(e) => setNovoValor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">DATA</label>
                                <div className="input-with-icon">
                                    <input
                                        type="date"
                                        className="form-input input-pill"
                                        value={novaData}
                                        onChange={(e) => setNovaData(e.target.value)}
                                    />
                                    <FiCalendar className="field-icon" size={18} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">OBSERVAÇÃO</label>
                                <textarea
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Adicione uma observação..."
                                    value={novaObservacao}
                                    onChange={(e) => setNovaObservacao(e.target.value)}
                                ></textarea>
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
                    </div>
                </div>
            )}

            {/* Modal de Zoom do Mês (Visão Detalhada do Desempenho Mensal) */}
            {modalZoomAberta && mesSelecionadoZoom && (
                <div className="modal-backdrop" onClick={() => setModalZoomAberta(false)}>
                    <div className="modal-zoom-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-zoom-header">
                            <div>
                                <span className="zoom-badge-year">EXAMINANDO 2024</span>
                                <h2 className="zoom-title">
                                    <FiZoomIn className="zoom-icon-title" size={24} />
                                    Detalhamento de {mesSelecionadoZoom.mesExtenso}
                                </h2>
                            </div>
                            <button className="btn-close-modal" onClick={() => setModalZoomAberta(false)}>
                                <FiX size={22} />
                            </button>
                        </div>

                        <div className="zoom-kpi-grid">
                            <div className="zoom-kpi-card">
                                <span className="zoom-kpi-label">Receitas do Mês</span>
                                <span className="zoom-kpi-val val-green">{mesSelecionadoZoom.entradas}</span>
                            </div>
                            <div className="zoom-kpi-card">
                                <span className="zoom-kpi-label">Despesas Operacionais</span>
                                <span className="zoom-kpi-val val-wine">{mesSelecionadoZoom.despesas}</span>
                            </div>
                            <div className="zoom-kpi-card">
                                <span className="zoom-kpi-label">Resultado Líquido</span>
                                <span className="zoom-kpi-val val-wine">{mesSelecionadoZoom.saldo}</span>
                            </div>
                        </div>

                        <div className="zoom-section">
                            <h4 className="zoom-section-title">Distribuição Semanal em {mesSelecionadoZoom.mesExtenso}</h4>
                            <div className="zoom-weeks-grid">
                                <div className="week-card">
                                    <span className="week-name">Semana 1</span>
                                    <div className="week-progress-bg">
                                        <div className="week-progress-fill" style={{ width: '65%' }}></div>
                                    </div>
                                    <span className="week-val">65% do alvo</span>
                                </div>
                                <div className="week-card">
                                    <span className="week-name">Semana 2</span>
                                    <div className="week-progress-bg">
                                        <div className="week-progress-fill" style={{ width: '82%' }}></div>
                                    </div>
                                    <span className="week-val">82% do alvo</span>
                                </div>
                                <div className="week-card">
                                    <span className="week-name">Semana 3</span>
                                    <div className="week-progress-bg">
                                        <div className="week-progress-fill" style={{ width: '90%' }}></div>
                                    </div>
                                    <span className="week-val">90% do alvo</span>
                                </div>
                                <div className="week-card">
                                    <span className="week-name">Semana 4</span>
                                    <div className="week-progress-bg">
                                        <div className="week-progress-fill" style={{ width: `${mesSelecionadoZoom.valor}%` }}></div>
                                    </div>
                                    <span className="week-val">{mesSelecionadoZoom.valor}% do alvo</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: '10px' }}>
                            <button className="btn-modal-confirm" onClick={() => setModalZoomAberta(false)}>
                                Fechar Detalhamento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
