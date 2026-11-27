import React, { useState, useEffect } from 'react';
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
import { listarTransacoes, criarTransacao } from '../services/api';
import './Financeiro.css';

export default function Financeiro({ onAtualizar }) {
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

    // Lista dinâmica carregada da API (sem dados mockados)
    const [transacoes, setTransacoes] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const parseValor = (val) => {
        if (!val) return 0;
        if (typeof val === 'number') return val;
        const v = String(val).replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        return parseFloat(v) || 0;
    };

    const formatarMoeda = (val) => {
        return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const carregarTransacoes = async () => {
        setCarregando(true);
        try {
            const resp = await listarTransacoes();
            if (resp && resp.dados) {
                setTransacoes(resp.dados);
            }
        } catch (erro) {
            console.error('Erro ao carregar transações:', erro);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarTransacoes();
    }, []);

    // Monthly Chart Data gerado dinamicamente a partir das transações
    const mesesAbrev = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const mesesExtenso = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesAtualIndex = new Date().getMonth();

    const dadosGrafico = mesesAbrev.map((mes, idx) => {
        const transacoesMes = transacoes.filter((t) => {
            if (!t.data) return false;
            const partes = t.data.split(/[-/]/);
            const m = partes.length >= 2 ? parseInt(partes[1], 10) - 1 : -1;
            return m === idx;
        });

        const ent = transacoesMes
            .filter((t) => t.tipo === 'Entrada')
            .reduce((acc, t) => acc + (t.valorRaw || parseValor(t.valor)), 0);
        const desp = transacoesMes
            .filter((t) => t.tipo === 'Saida')
            .reduce((acc, t) => acc + (t.valorRaw || parseValor(t.valor)), 0);
        const sld = ent - desp;

        const maxVal = Math.max(ent, desp, 1);
        const valorBarra = ent > 0 ? Math.min(100, Math.round((ent / maxVal) * 80)) : 0;

        return {
            mes,
            mesExtenso: mesesExtenso[idx],
            valor: valorBarra,
            entradas: formatarMoeda(ent),
            despesas: formatarMoeda(desp),
            saldo: formatarMoeda(sld),
            atual: idx === mesAtualIndex
        };
    });

    const categoriasComCores = [
        { nome: 'Receita de Aluguel', cor: '#007A33' },
        { nome: 'Serviços Prestados', cor: '#1A73E8' },
        { nome: 'Manutenção', cor: '#D97706' },
        { nome: 'Despesas Fixas', cor: '#7A1C1C' },
        { nome: 'Outros', cor: '#7C3AED' }
    ];

    const handleSalvarTransacao = async (e) => {
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
        const valorFormatado = formatarMoeda(valorNum);

        const novaItem = {
            categoria: novaCategoria,
            descricao: novaDescricao || (tipoTransacao === 'Entrada' ? 'Receita Diversa' : 'Despesa Diversa'),
            data: formatarData(novaData),
            valor: valorFormatado,
            valorRaw: valorNum,
            tipo: tipoTransacao,
            observacao: novaObservacao
        };

        try {
            await criarTransacao(novaItem);
            await carregarTransacoes();
            if (onAtualizar) onAtualizar();
        } catch (err) {
            console.error('Falha ao salvar transação no backend:', err);
            setTransacoes([{ ...novaItem, id: Date.now() }, ...transacoes]);
        }

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

    const totalEntradas = transacoes
        .filter((t) => t.tipo === 'Entrada')
        .reduce((acc, t) => acc + (t.valorRaw || parseValor(t.valor)), 0);
    const totalDespesas = transacoes
        .filter((t) => t.tipo === 'Saida')
        .reduce((acc, t) => acc + (t.valorRaw || parseValor(t.valor)), 0);
    const saldoTotal = totalEntradas - totalDespesas;

    return (
        <div className="financeiro-container">
            {/* 1. KPI Cards Grid */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <span className="metric-label">Entradas</span>
                    <span className="metric-value value-entradas">{formatarMoeda(totalEntradas)}</span>
                </div>

                <div className="metric-card">
                    <span className="metric-label">Despesas</span>
                    <span className="metric-value value-despesas">{formatarMoeda(totalDespesas)}</span>
                </div>

                <div className="metric-card">
                    <span className="metric-label">Saldo total</span>
                    <span className="metric-value value-saldo">{formatarMoeda(saldoTotal)}</span>
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
                                        {carregando ? 'Carregando transações...' : 'Nenhuma transação encontrada no sistema.'}
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
