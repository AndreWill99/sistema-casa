import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { FiPlus, FiUsers, FiHome, FiTrendingUp } from 'react-icons/fi';
import './DashboardView.css';

export default function DashboardView({ onNavegar }) {
    return (
        <div className="figma-dashboard">
            {/* Grid Superior: 3 Cards (Residentes, Leads, Taxa de Ocupação) */}
            <div className="top-cards-grid">
                {/* Card 1: Total de Residentes */}
                <div className="figma-card">
                    <div className="card-top-row">
                        <span className="card-figma-title">Total de residentes</span>
                        <span className="tag-mensal">Mensal</span>
                    </div>

                    <div className="card-value-row">
                        <span className="card-big-number">35</span>
                        <div className="trend-badge">
                            <FaArrowUp size={12} />
                            <span>3</span>
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
                        <span className="card-big-number">23</span>
                        <div className="trend-badge">
                            <FaArrowUp size={12} />
                            <span>3</span>
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
                        <span className="tag-mensal" style={{ backgroundColor: '#E6F4EA', color: '#137333' }}>70% Ocupado</span>
                    </div>

                    <div className="card-value-row">
                        <span className="card-big-number">14<span style={{ fontSize: '20px', fontWeight: 600, color: '#786565' }}>/20</span></span>
                        <div className="trend-badge" style={{ color: '#137333' }}>
                            <FiHome size={16} />
                            <span style={{ fontSize: '13px' }}>6 Vagas</span>
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

            {/* Grid Inferior: Saldo do Mês & Agenda (Home-dashboard2) */}
            <div className="bottom-cards-grid">
                {/* Card Saldo do Mês */}
                <div className="saldo-card">
                    <div className="card-top-row">
                        <div>
                            <span className="card-figma-title">Saldo do mês</span>
                            <div className="saldo-amount">R$ 12.000,00</div>
                        </div>
                    </div>

                    <div className="saldo-breakdown">
                        <div className="progress-bar-container">
                            <div className="bar-receitas" style={{ width: '74%' }}></div>
                            <div className="bar-despesas" style={{ width: '26%' }}></div>
                        </div>

                        <div className="legend-row">
                            <div className="legend-item">
                                <span className="legend-dot-green"></span>
                                <span style={{ color: '#166534' }}>receitas: R$ 18.500,00</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot-red"></span>
                                <span style={{ color: '#810F0F' }}>Despesas: R$ 6.500,00</span>
                            </div>
                        </div>

                        <div className="items-list">
                            <div className="item-row">
                                <span>• Mensalidades recebidas</span>
                                <strong>+ R$ 18.500,00</strong>
                            </div>
                            <div className="item-row">
                                <span>• Salários e folha de pagamentos</span>
                                <strong>- R$ 5.200,00</strong>
                            </div>
                            <div className="item-row">
                                <span>• Internet e utilidades</span>
                                <strong>- R$ 1.300,00</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Calendário de Visitas (Figma Home-dashboard2) */}
                <div className="calendario-card">
                    <div className="cal-header-row">
                        <div>
                            <div style={{ fontSize: '12.5px', color: '#786565', fontWeight: 600 }}>Agenda de Hoje</div>
                            <div className="cal-day-title">Quinta-feira</div>
                        </div>
                        <div className="cal-day-number">19</div>
                    </div>

                    <div className="visitas-list">
                        <div className="visita-item">
                            <div className="visita-info">
                                <FiUsers size={16} />
                                <span>Visita Família Santos</span>
                            </div>
                            <span className="visita-horario">15h</span>
                        </div>

                        <div className="visita-item">
                            <div className="visita-info">
                                <FiUsers size={16} />
                                <span>Visita Família Oliveira</span>
                            </div>
                            <span className="visita-horario">17h</span>
                        </div>

                        <div className="visita-item">
                            <div className="visita-info">
                                <FiUsers size={16} />
                                <span>Visita Família Rocha</span>
                            </div>
                            <span className="visita-horario">18h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
