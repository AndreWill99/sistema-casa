import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { FiPlus, FiUsers, FiHome, FiTrendingUp } from 'react-icons/fi';
import { buscarResumoDashboard, listarTransacoes } from '../services/api';
import './DashboardView.css';

export default function DashboardView({ onNavegar }) {
    const [resumo, setResumo] = useState({
        totalResidentes: 0,
        totalLeads: 0,
        capacidadeTotal: 20,
        taxaOcupacao: 0,
        vagasDisponiveis: 20,
        receitasMes: 0,
        despesasMes: 0,
        saldoMes: 0,
        visitasHoje: []
    });
    const [transacoesRecentes, setTransacoesRecentes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const carregarDadosDashboard = async () => {
        setCarregando(true);
        try {
            const [respResumo, respTransacoes] = await Promise.all([
                buscarResumoDashboard(),
                listarTransacoes()
            ]);

            if (respResumo && respResumo.dados) {
                setResumo(respResumo.dados);
            }

            if (respTransacoes && respTransacoes.dados) {
                setTransacoesRecentes(respTransacoes.dados.slice(0, 3));
            }
        } catch (erro) {
            console.error('Erro ao carregar dados do dashboard:', erro);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarDadosDashboard();
    }, []);

    const formatarMoeda = (valor) => {
        return Number(valor || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    // Cálculo dinâmico das barras da proporção de receitas e despesas
    const totalMovimentado = (resumo.receitasMes + resumo.despesasMes) || 1;
    const pctReceitas = resumo.receitasMes > 0 ? Math.round((resumo.receitasMes / totalMovimentado) * 100) : 50;
    const pctDespesas = resumo.despesasMes > 0 ? 100 - pctReceitas : (resumo.receitasMes > 0 ? 0 : 50);

    // Data de hoje em tempo real
    const hoje = new Date();
    const diaSemanaTexto = hoje.toLocaleDateString('pt-BR', { weekday: 'long' });
    const diaSemanaCapitalizado = diaSemanaTexto.charAt(0).toUpperCase() + diaSemanaTexto.slice(1);
    const diaNumero = hoje.getDate();

    return (
        <div className="figma-dashboard">
            {/* Grid Superior: 3 Cards calculados dinamicamente */}
            <div className="top-cards-grid">
                {/* Card 1: Total de Residentes */}
                <div className="figma-card">
                    <div className="card-top-row">
                        <span className="card-figma-title">Total de residentes</span>
                        <span className="tag-mensal">Mensal</span>
                    </div>

                    <div className="card-value-row">
                        <span className="card-big-number">{resumo.totalResidentes}</span>
                        <div className="trend-badge">
                            <FaArrowUp size={12} />
                            <span>{resumo.totalResidentes}</span>
                        </div>
                    </div>

                    <button
                        className="figma-btn-action"
                        onClick={() => onNavegar && onNavegar('residentes')}
                    >
                        <FiPlus size={15} />
                        <span>Novo Residente</span>
                    </button>
                </div>

                {/* Card 2: Total de Leads */}
                <div className="figma-card">
                    <div className="card-top-row">
                        <span className="card-figma-title">Total de Leads</span>
                        <span className="tag-mensal">Mensal</span>
                    </div>

                    <div className="card-value-row">
                        <span className="card-big-number">{resumo.totalLeads}</span>
                        <div className="trend-badge">
                            <FaArrowUp size={12} />
                            <span>{resumo.totalLeads}</span>
                        </div>
                    </div>

                    <button
                        className="figma-btn-action"
                        onClick={() => onNavegar && onNavegar('leads')}
                    >
                        <FiPlus size={15} />
                        <span>Novo lead</span>
                    </button>
                </div>

                {/* Card 3: Taxa de Ocupação */}
                <div className="figma-card">
                    <div className="card-top-row">
                        <span className="card-figma-title">Taxa de Ocupação</span>
                        <span
                            className="tag-mensal"
                            style={{
                                backgroundColor: resumo.taxaOcupacao > 80 ? '#FCE8E6' : '#E6F4EA',
                                color: resumo.taxaOcupacao > 80 ? '#C5221F' : '#137333'
                            }}
                        >
                            {resumo.taxaOcupacao}% Ocupado
                        </span>
                    </div>

                    <div className="card-value-row">
                        <span className="card-big-number">
                            {resumo.totalResidentes}
                            <span style={{ fontSize: '20px', fontWeight: 600, color: '#786565' }}>
                                /{resumo.capacidadeTotal}
                            </span>
                        </span>
                        <div className="trend-badge" style={{ color: '#137333' }}>
                            <FiHome size={16} />
                            <span style={{ fontSize: '13px' }}>{resumo.vagasDisponiveis} Vagas</span>
                        </div>
                    </div>

                    <button
                        className="figma-btn-action"
                        style={{ backgroundColor: '#FFF8EE', color: '#810F0F', border: '1px solid #810F0F' }}
                        onClick={() => onNavegar && onNavegar('residentes')}
                    >
                        <FiUsers size={15} />
                        <span>Gerenciar Leitos</span>
                    </button>
                </div>
            </div>

            {/* Grid Inferior: Saldo do Mês & Agenda */}
            <div className="bottom-cards-grid">
                {/* Card Saldo do Mês */}
                <div className="saldo-card">
                    <div className="card-top-row">
                        <div>
                            <span className="card-figma-title">Saldo do mês</span>
                            <div className="saldo-amount">{formatarMoeda(resumo.saldoMes)}</div>
                        </div>
                    </div>

                    <div className="saldo-breakdown">
                        <div className="progress-bar-container">
                            <div className="bar-receitas" style={{ width: `${pctReceitas}%` }}></div>
                            <div className="bar-despesas" style={{ width: `${pctDespesas}%` }}></div>
                        </div>

                        <div className="legend-row">
                            <div className="legend-item">
                                <span className="legend-dot-green"></span>
                                <span style={{ color: '#166534' }}>Receitas: {formatarMoeda(resumo.receitasMes)}</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot-red"></span>
                                <span style={{ color: '#810F0F' }}>Despesas: {formatarMoeda(resumo.despesasMes)}</span>
                            </div>
                        </div>

                        <div className="items-list">
                            {transacoesRecentes.length > 0 ? (
                                transacoesRecentes.map((t, idx) => (
                                    <div key={t.id || idx} className="item-row">
                                        <span>• {t.descricao}</span>
                                        <strong style={{ color: t.tipo === 'Entrada' ? '#166534' : '#810F0F' }}>
                                            {t.tipo === 'Entrada' ? '+ ' : '- '}
                                            {t.valor}
                                        </strong>
                                    </div>
                                ))
                            ) : (
                                <div style={{ color: '#786565', fontSize: '13.5px', padding: '12px 0' }}>
                                    Nenhuma transação financeira registrada neste mês.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Card Calendário de Visitas */}
                <div className="calendario-card">
                    <div className="cal-header-row">
                        <div>
                            <div style={{ fontSize: '12.5px', color: '#786565', fontWeight: 600 }}>Agenda de Hoje</div>
                            <div className="cal-day-title">{diaSemanaCapitalizado}</div>
                        </div>
                        <div className="cal-day-number">{diaNumero}</div>
                    </div>

                    <div className="visitas-list">
                        {resumo.visitasHoje && resumo.visitasHoje.length > 0 ? (
                            resumo.visitasHoje.map((visita, idx) => (
                                <div key={visita.id || idx} className="visita-item">
                                    <div className="visita-info">
                                        <FiUsers size={16} />
                                        <span>{visita.titulo} ({visita.residente})</span>
                                    </div>
                                    <span className="visita-horario">{visita.horaInicio}</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0', color: '#786565', fontSize: '13.5px' }}>
                                Nenhum compromisso ou visita agendada para hoje.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
