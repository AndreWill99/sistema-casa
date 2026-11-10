import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import './Header.css';

export default function Header({ usuario = 'Administrador', onQuickAction }) {
    return (
        <header className="header-container">
            <div className="header-search">
                <FiSearch className="search-icon" size={16} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar residente, lead ou funcionário..."
                />
            </div>

            <div className="header-right">
                <button className="quick-action-btn" onClick={onQuickAction}>
                    <FiPlus size={16} />
                    <span>Ação Rápida</span>
                </button>

                <div className="user-profile">
                    <div className="user-avatar">
                        {usuario.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{usuario}</span>
                        <span className="user-role">Gestor(a) Geral</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
