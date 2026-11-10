import React from 'react';
import {
    FiGrid,
    FiUsers,
    FiUserPlus,
    FiDollarSign,
    FiCalendar,
    FiSettings,
    FiLogOut,
    FiBriefcase,
    FiPlusCircle
} from 'react-icons/fi';
import logoImg from '../assets/logo.png';
import './Sidebar.css';

export default function Sidebar({ abaAtiva, setAbaAtiva, onLogout }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
        { id: 'residentes', label: 'Residentes', icon: <FiUsers />, badge: '35' },
        { id: 'leads', label: 'Gestão de Leads', icon: <FiBriefcase />, badge: '23' },
        { id: 'equipe', label: 'Equipe', icon: <FiUsers /> },
        { id: 'financeiro', label: 'Financeiro', icon: <FiDollarSign /> },
        { id: 'agenda', label: 'Agenda', icon: <FiCalendar /> },
        { id: 'cadastro', label: 'Novo Usuário', icon: <FiPlusCircle /> },
        { id: 'configuracoes', label: 'Configuração', icon: <FiSettings /> },
    ];

    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                <img src={logoImg} alt="Logo" className="sidebar-logo" />
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${abaAtiva === item.id ? 'active' : ''}`}
                        onClick={() => setAbaAtiva(item.id)}
                    >
                        <div className="nav-item-left">
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={onLogout}>
                    <FiLogOut size={16} />
                    <span>Sair da conta</span>
                </button>
            </div>
        </aside>
    );
}
