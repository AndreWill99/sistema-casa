import React, { useState } from 'react';
import {
    FiPlus,
    FiChevronLeft,
    FiChevronRight,
    FiCalendar,
    FiClock,
    FiX,
    FiChevronDown
} from 'react-icons/fi';
import './Agenda.css';

export default function Agenda() {
    // Initial Dataset matching Figma screenshot exactly
    const [eventos, setEventos] = useState([
        {
            id: 1,
            titulo: 'Fam. Sr. João',
            residente: 'Sr. João Silva',
            categoria: 'Visita Familiar', // 'Visita Familiar' | 'Evento' | 'Data Festiva'
            dia: 3,
            mesIndex: 6, // 6 = Julho
            ano: 2025,
            horaInicio: '14:00',
            horaFim: '15:30',
            responsavel: 'Família Silva',
            obs: 'Visita na recepção principal.'
        },
        {
            id: 2,
            titulo: 'Igreja Batista',
            residente: 'Todos os Residentes',
            categoria: 'Evento',
            dia: 4,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '10:00',
            horaFim: '11:30',
            responsavel: 'Pastor Marcos',
            obs: 'Culto ecumênico e cânticos.'
        },
        {
            id: 3,
            titulo: 'Fam. Sra. Rosa',
            residente: 'Sra. Rosa Oliveira',
            categoria: 'Visita Familiar',
            dia: 7,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '15:00',
            horaFim: '16:30',
            responsavel: 'Luciana (Filha)',
            obs: 'Passeio no jardim.'
        },
        {
            id: 4,
            titulo: 'Aniv. Sr. Pedro',
            residente: 'Sr. Pedro Santos',
            categoria: 'Data Festiva',
            dia: 9,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '16:00',
            horaFim: '17:30',
            responsavel: 'Equipe de Animação',
            obs: 'Comemoração de 85 anos com bolo.'
        },
        {
            id: 5,
            titulo: 'Fam. Sr. Carlos',
            residente: 'Sr. Carlos Mendes',
            categoria: 'Visita Familiar',
            dia: 10,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '14:30',
            horaFim: '15:30',
            responsavel: 'Carlos Filho',
            obs: 'Entrega de pertences pessoais.'
        },
        {
            id: 6,
            titulo: 'ONG Esperança',
            residente: 'Todos os Residentes',
            categoria: 'Evento',
            dia: 12,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '14:00',
            horaFim: '16:00',
            responsavel: 'Voluntários ONG',
            obs: 'Oficina de artesanato e pintura.'
        },
        {
            id: 7,
            titulo: 'Visita Ana Lima',
            residente: 'Sr. José Lima',
            categoria: 'Visita Familiar',
            dia: 15,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '14:00',
            horaFim: '15:30',
            responsavel: 'Ana Lima (Filha)',
            obs: 'Visita familiar na sala VIP.'
        },
        {
            id: 8,
            titulo: 'Aniv. Sra. Elza',
            residente: 'Sra. Elza dos Santos',
            categoria: 'Data Festiva',
            dia: 15,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '16:00',
            horaFim: '17:30',
            responsavel: 'Família Elza (4 pessoas)',
            obs: 'Comemoração de 83 anos.'
        },
        {
            id: 9,
            titulo: 'Coral da Paz',
            residente: 'Todos os Residentes',
            categoria: 'Evento',
            dia: 17,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '10:00',
            horaFim: '11:00',
            responsavel: 'Maestro Fernando',
            obs: 'Apresentação musical no auditório.'
        },
        {
            id: 10,
            titulo: 'Fam. Sra. Maria',
            residente: 'Sra. Maria Fernandes',
            categoria: 'Visita Familiar',
            dia: 18,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '15:30',
            horaFim: '16:30',
            responsavel: 'Carlos M.',
            obs: 'Visita de fim de semana.'
        },
        {
            id: 11,
            titulo: 'Fam. Sr. Antônio',
            residente: 'Sr. Antônio Costa',
            categoria: 'Visita Familiar',
            dia: 21,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '11:00',
            horaFim: '12:00',
            responsavel: 'Família Costa',
            obs: 'Almoço de domingo.'
        },
        {
            id: 12,
            titulo: 'Aniv. Sr. João',
            residente: 'Sr. João Silva',
            categoria: 'Data Festiva',
            dia: 23,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '15:00',
            horaFim: '16:30',
            responsavel: 'Recepção',
            obs: 'Aniversário de 88 anos.'
        },
        {
            id: 13,
            titulo: 'Visita Carlos M.',
            residente: 'Sr. Carlos Mendes',
            categoria: 'Visita Familiar',
            dia: 24,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '10:00',
            horaFim: '11:00',
            responsavel: 'Marcos M.',
            obs: 'Acompanhamento médico.'
        },
        {
            id: 14,
            titulo: 'Visita ONG',
            residente: 'Todos os Residentes',
            categoria: 'Evento',
            dia: 25,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '14:00',
            horaFim: '16:00',
            responsavel: 'Voluntários',
            obs: 'Terapia assistida com animais.'
        },
        {
            id: 15,
            titulo: 'Fam. Sra. Helena',
            residente: 'Sra. Maria Helena Silva',
            categoria: 'Visita Familiar',
            dia: 28,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '15:00',
            horaFim: '16:00',
            responsavel: 'Ana Silva',
            obs: 'Visita no quarto 102.'
        },
        {
            id: 16,
            titulo: 'Aniv. Sra. Rosa',
            residente: 'Sra. Rosa Oliveira',
            categoria: 'Data Festiva',
            dia: 31,
            mesIndex: 6,
            ano: 2025,
            horaInicio: '16:00',
            horaFim: '17:30',
            responsavel: 'Cuidadores',
            obs: 'Aniversário de 90 anos.'
        }
    ]);

    // UI States matching screenshot
    const [visaoAtiva, setVisaoAtiva] = useState('Mês'); // 'Mês' | 'Semana' | 'Lista'
    const [mesAtualIndex, setMesAtualIndex] = useState(6); // 6 = Julho
    const [anoAtual, setAnoAtual] = useState(2025);

    // Modal States
    const [modalZoomDiaAberta, setModalZoomDiaAberta] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState(15);
    const [modalNovoEventoAberta, setModalNovoEventoAberta] = useState(false);

    // Form States para Novo Evento
    const [formTitulo, setFormTitulo] = useState('');
    const [formResidente, setFormResidente] = useState('Família de Ana Lima');
    const [formCategoria, setFormCategoria] = useState('Visita Familiar');
    const [formData, setFormData] = useState('15/07/2025');
    const [formHoraInicio, setFormHoraInicio] = useState('14:00');
    const [formHoraFim, setFormHoraFim] = useState('15:00');
    const [formResponsavel, setFormResponsavel] = useState('Sr. José Lima');
    const [formObs, setFormObs] = useState('');

    const mesesNomes = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    // Dynamic Calendar Logic for selected Month and Year
    const primeiroDiaSemana = new Date(anoAtual, mesAtualIndex, 1).getDay(); // 0-6
    const totalDiasNoMes = new Date(anoAtual, mesAtualIndex + 1, 0).getDate(); // e.g. 31
    const totalDiasMesAnterior = new Date(anoAtual, mesAtualIndex, 0).getDate(); // e.g. 30

    // Build complete grid cells
    const gridCells = [];

    // Leading days from previous month
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
        gridCells.push({
            tipo: 'vazio',
            numero: totalDiasMesAnterior - i,
            mesIndex: mesAtualIndex === 0 ? 11 : mesAtualIndex - 1,
            ano: mesAtualIndex === 0 ? anoAtual - 1 : anoAtual
        });
    }

    // Days of current month
    for (let i = 1; i <= totalDiasNoMes; i++) {
        gridCells.push({
            tipo: 'dia',
            numero: i,
            mesIndex: mesAtualIndex,
            ano: anoAtual
        });
    }

    // Trailing days of next month to fill grid to multiple of 7
    let nextDayNum = 1;
    while (gridCells.length % 7 !== 0) {
        gridCells.push({
            tipo: 'vazio',
            numero: nextDayNum++,
            mesIndex: mesAtualIndex === 11 ? 0 : mesAtualIndex + 1,
            ano: mesAtualIndex === 11 ? anoAtual + 1 : anoAtual
        });
    }

    // Month Navigation
    const handleNavegarMes = (direcao) => {
        if (direcao === 'anterior') {
            if (mesAtualIndex === 0) {
                setMesAtualIndex(11);
                setAnoAtual(anoAtual - 1);
            } else {
                setMesAtualIndex(mesAtualIndex - 1);
            }
        } else {
            if (mesAtualIndex === 11) {
                setMesAtualIndex(0);
                setAnoAtual(anoAtual + 1);
            } else {
                setMesAtualIndex(mesAtualIndex + 1);
            }
        }
    };

    const getEventosDoDia = (dia, mesIdx = mesAtualIndex, anoVal = anoAtual) => {
        return eventos.filter(
            (ev) => ev.dia === dia && ev.mesIndex === mesIdx && ev.ano === anoVal
        );
    };

    const abrirZoomDia = (dia) => {
        setDiaSelecionado(dia);
        setModalZoomDiaAberta(true);
    };

    const abrirNovoEvento = (diaPre = 15) => {
        setDiaSelecionado(diaPre);
        const diaStr = diaPre < 10 ? '0' + diaPre : diaPre;
        const mesStr = mesAtualIndex + 1 < 10 ? '0' + (mesAtualIndex + 1) : mesAtualIndex + 1;
        setFormData(`${diaStr}/${mesStr}/${anoAtual}`);
        setFormTitulo('');
        setFormResidente('Família de Ana Lima');
        setFormCategoria('Visita Familiar');
        setFormHoraInicio('14:00');
        setFormHoraFim('15:00');
        setFormResponsavel('Sr. José Lima');
        setFormObs('');
        setModalNovoEventoAberta(true);
    };

    const handleSalvarEvento = (e) => {
        e.preventDefault();
        if (!formTitulo) return;

        const partesData = formData.split('/');
        const diaNum = parseInt(partesData[0]) || 15;
        const mesNum = (parseInt(partesData[1]) || (mesAtualIndex + 1)) - 1;
        const anoNum = parseInt(partesData[2]) || anoAtual;

        const novoEv = {
            id: Date.now(),
            titulo: formTitulo,
            residente: formResidente,
            categoria: formCategoria,
            dia: diaNum,
            mesIndex: mesNum,
            ano: anoNum,
            horaInicio: formHoraInicio,
            horaFim: formHoraFim,
            responsavel: formResponsavel || 'Família / Cuidador',
            obs: formObs || 'Sem observações adicionais.'
        };

        setEventos([novoEv, ...eventos]);
        setModalNovoEventoAberta(false);
    };

    const exportarCSV = () => {
        const headers = 'Data,Horário,Título,Categoria,Residente,Responsável,Observações\n';
        const rows = eventos
            .map((ev) => `"${ev.dia}/${ev.mesIndex + 1}/${ev.ano}","${ev.horaInicio} - ${ev.horaFim}","${ev.titulo}","${ev.categoria}","${ev.residente}","${ev.responsavel}","${ev.obs || ''}"`)
            .join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'agenda_eventos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter upcoming events for sidebar
    const proximosEventosSidebar = eventos
        .filter((ev) => ev.mesIndex === mesAtualIndex && ev.ano === anoAtual)
        .sort((a, b) => a.dia - b.dia);

    // Timeline Hours for Day Zoom Modal (07:00 to 18:00)
    const horasTimeline = [
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    return (
        <div className="agenda-container">
            {/* 1. Header Toolbar matching exact Figma layout screenshot */}
            <div className="top-header-row">
                <h1 className="agenda-page-title">Agenda</h1>

                {/* Categories Legend */}
                <div className="categories-legend-inline">
                    <span className="legend-item">
                        <span className="legend-dot dot-visita"></span>
                        Visita Familiar
                    </span>
                    <span className="legend-item">
                        <span className="legend-dot dot-evento"></span>
                        Evento
                    </span>
                    <span className="legend-item">
                        <span className="legend-dot dot-festiva"></span>
                        Data Festiva
                    </span>
                </div>

                {/* View Switcher Pills */}
                <div className="view-switcher-pill-box">
                    {['Mês', 'Semana', 'Lista'].map((v) => (
                        <button
                            key={v}
                            className={`view-pill-btn ${visaoAtiva === v ? 'active' : ''}`}
                            onClick={() => setVisaoAtiva(v)}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                {/* Action Button: Novo Evento */}
                <button className="btn-novo-evento-main" onClick={() => abrirNovoEvento(diaSelecionado)}>
                    Novo Evento
                </button>
            </div>

            {/* 2. Main Content Grid Layout */}
            <div className="agenda-main-layout">
                {/* Left Side: Calendar Container Card */}
                <div className="calendar-main-card">
                    {/* Month Navigator Header Inside Card */}
                    <div className="calendar-card-header">
                        <button className="nav-circle-btn" onClick={() => handleNavegarMes('anterior')}>
                            <FiChevronLeft size={18} />
                        </button>
                        <h2 className="month-title-display">
                            {mesesNomes[mesAtualIndex]} {anoAtual}
                        </h2>
                        <button className="nav-circle-btn" onClick={() => handleNavegarMes('proximo')}>
                            <FiChevronRight size={18} />
                        </button>
                    </div>

                    {/* VIEW 1: MÊS (MONTH VIEW) */}
                    {visaoAtiva === 'Mês' && (
                        <div className="calendar-grid">
                            {/* Days of Week Header */}
                            {diasSemana.map((d) => (
                                <div key={d} className="calendar-day-header">
                                    {d}
                                </div>
                            ))}

                            {/* Calendar Grid Cells */}
                            {gridCells.map((cell, idx) => {
                                const diaEvs = getEventosDoDia(cell.numero, cell.mesIndex, cell.ano);
                                const isSelected = cell.tipo === 'dia' && cell.numero === diaSelecionado;

                                return (
                                    <div
                                        key={idx}
                                        className={`calendar-day-cell ${cell.tipo === 'vazio' ? 'cell-dimmed' : ''} ${isSelected ? 'cell-selected' : ''
                                            }`}
                                        onClick={() => cell.tipo === 'dia' && abrirZoomDia(cell.numero)}
                                    >
                                        <div className="cell-day-num">{cell.numero}</div>

                                        <div className="events-pill-stack">
                                            {diaEvs.map((ev) => (
                                                <span
                                                    key={ev.id}
                                                    className={`event-pill-item cat-${ev.categoria
                                                        .toLowerCase()
                                                        .replace(' ', '-')
                                                        .replace('á', 'a')}`}
                                                >
                                                    {ev.titulo}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* VIEW 2: SEMANA (WEEK VIEW) */}
                    {visaoAtiva === 'Semana' && (
                        <div className="calendar-week-view">
                            <div className="calendar-grid">
                                {diasSemana.map((d) => (
                                    <div key={d} className="calendar-day-header">
                                        {d}
                                    </div>
                                ))}
                                {gridCells.slice(14, 21).map((cell, idx) => {
                                    const diaEvs = getEventosDoDia(cell.numero, cell.mesIndex, cell.ano);
                                    return (
                                        <div
                                            key={idx}
                                            className="calendar-day-cell cell-week-expanded"
                                            onClick={() => abrirZoomDia(cell.numero)}
                                        >
                                            <div className="cell-day-num">{cell.numero}</div>
                                            <div className="events-pill-stack">
                                                {diaEvs.map((ev) => (
                                                    <span
                                                        key={ev.id}
                                                        className={`event-pill-item cat-${ev.categoria
                                                            .toLowerCase()
                                                            .replace(' ', '-')
                                                            .replace('á', 'a')}`}
                                                    >
                                                        {ev.titulo} • {ev.horaInicio}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* VIEW 3: LISTA (LIST VIEW) */}
                    {visaoAtiva === 'Lista' && (
                        <div className="calendar-list-view">
                            <table className="financeiro-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Horário</th>
                                        <th>Título</th>
                                        <th>Categoria</th>
                                        <th>Residente / Participante</th>
                                        <th>Responsável</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proximosEventosSidebar.map((ev) => (
                                        <tr key={ev.id} style={{ cursor: 'pointer' }} onClick={() => abrirZoomDia(ev.dia)}>
                                            <td className="desc-cell">{ev.dia}/{mesAtualIndex + 1}/{anoAtual}</td>
                                            <td className="cargo-cell">{ev.horaInicio} - {ev.horaFim}</td>
                                            <td className="desc-cell">{ev.titulo}</td>
                                            <td>
                                                <span
                                                    className={`event-pill-item cat-${ev.categoria
                                                        .toLowerCase()
                                                        .replace(' ', '-')
                                                        .replace('á', 'a')}`}
                                                >
                                                    {ev.categoria}
                                                </span>
                                            </td>
                                            <td>{ev.residente}</td>
                                            <td>{ev.responsavel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right Side: Próximos Eventos Sidebar Card */}
                <div className="upcoming-sidebar-card">
                    <div className="sidebar-card-title">
                        <span>📅</span> Próximos Eventos
                    </div>

                    <div className="upcoming-events-stack">
                        {proximosEventosSidebar.length > 0 ? (
                            proximosEventosSidebar.slice(0, 5).map((ev) => (
                                <div
                                    key={ev.id}
                                    className="sidebar-event-item"
                                    onClick={() => abrirZoomDia(ev.dia)}
                                >
                                    <span
                                        className={`sidebar-cat-pill cat-${ev.categoria
                                            .toLowerCase()
                                            .replace(' ', '-')
                                            .replace('á', 'a')}`}
                                    >
                                        {ev.categoria}
                                    </span>
                                    <h4 className="sidebar-event-title">{ev.titulo}</h4>
                                    <p className="sidebar-event-sub">
                                        {ev.dia === 15 ? 'Hoje' : `Dia ${ev.dia}`}, {ev.horaInicio} • {ev.responsavel}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#888', fontStyle: 'italic', padding: '12px' }}>
                                Nenhum evento programado.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Modal 1: Zoom no Dia (Day Timeline Drawer) */}
            {modalZoomDiaAberta && (
                <div className="modal-backdrop" onClick={() => setModalZoomDiaAberta(false)}>
                    <div className="modal-drawer-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div className="avatar-circle-large">
                                    {diaSelecionado}
                                </div>
                                <div>
                                    <h2>Programação do Dia {diaSelecionado} de {mesesNomes[mesAtualIndex]} {anoAtual}</h2>
                                    <span className="subtitle-role">
                                        {getEventosDoDia(diaSelecionado).length} compromisso(s) cadastrado(s)
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn-close-modal"
                                onClick={() => setModalZoomDiaAberta(false)}
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="timeline-section-title">LINHA DO TEMPO HORÁRIA</span>
                            <button
                                className="btn-add-transaction"
                                onClick={() => {
                                    setModalZoomDiaAberta(false);
                                    abrirNovoEvento(diaSelecionado);
                                }}
                            >
                                <FiPlus size={15} />
                                <span>Adicionar no Dia</span>
                            </button>
                        </div>

                        {/* Hourly Timeline */}
                        <div className="day-timeline-container">
                            {horasTimeline.map((hora) => {
                                const evsHora = getEventosDoDia(diaSelecionado).filter(
                                    (ev) => ev.horaInicio.startsWith(hora.substring(0, 2))
                                );

                                return (
                                    <div key={hora} className="timeline-hour-row">
                                        <div className="timeline-time-label">{hora}</div>
                                        <div className="timeline-content-block">
                                            {evsHora.map((ev) => (
                                                <div
                                                    key={ev.id}
                                                    className={`timeline-event-card cat-${ev.categoria
                                                        .toLowerCase()
                                                        .replace(' ', '-')
                                                        .replace('á', 'a')}`}
                                                >
                                                    <div className="timeline-ev-header">
                                                        <span className="timeline-ev-title">
                                                            {ev.titulo}
                                                        </span>
                                                        <span className="timeline-ev-hours">
                                                            <FiClock size={12} /> {ev.horaInicio} - {ev.horaFim}
                                                        </span>
                                                    </div>
                                                    <div className="timeline-ev-meta">
                                                        <span>👤 {ev.residente}</span>
                                                        <span>• Responsável: {ev.responsavel}</span>
                                                    </div>
                                                    {ev.obs && <p className="timeline-ev-obs">{ev.obs}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn-modal-confirm"
                                onClick={() => setModalZoomDiaAberta(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Modal 2: Adicionar Evento */}
            {modalNovoEventoAberta && (
                <div className="modal-backdrop" onClick={() => setModalNovoEventoAberta(false)}>
                    <div className="modal-drawer-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div>
                                    <h2>Agendar Novo Evento</h2>
                                    <span className="subtitle-role">Preencha os detalhes do compromisso</span>
                                </div>
                            </div>
                            <button
                                className="btn-close-modal"
                                onClick={() => setModalNovoEventoAberta(false)}
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSalvarEvento} className="modal-form">
                            <div className="form-group">
                                <label className="form-label">TÍTULO DO EVENTO</label>
                                <input
                                    type="text"
                                    className="input-pill"
                                    placeholder="Ex.: Família de Ana Lima, Festa Aniversário..."
                                    value={formTitulo}
                                    onChange={(e) => setFormTitulo(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-grid-2col">
                                <div className="form-group">
                                    <label className="form-label">VINCULAR RESIDENTE / FAMÍLIA</label>
                                    <input
                                        type="text"
                                        className="input-pill"
                                        placeholder="Ex.: Sr. José Lima ou Todos"
                                        value={formResidente}
                                        onChange={(e) => setFormResidente(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">CATEGORIA</label>
                                    <div className="custom-select-wrapper">
                                        <select
                                            className="select-pill"
                                            value={formCategoria}
                                            onChange={(e) => setFormCategoria(e.target.value)}
                                        >
                                            <option value="Visita Familiar">Visita Familiar (Azul)</option>
                                            <option value="Evento">Evento (Verde)</option>
                                            <option value="Data Festiva">Data Festiva / Aniversário (Amarelo)</option>
                                        </select>
                                        <FiChevronDown className="select-arrow" size={18} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">DATA DO EVENTO</label>
                                    <input
                                        type="text"
                                        className="input-pill"
                                        placeholder="DD/MM/AAAA"
                                        value={formData}
                                        onChange={(e) => setFormData(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">RESPONSÁVEL / ACOMPANHANTE</label>
                                    <input
                                        type="text"
                                        className="input-pill"
                                        placeholder="Ex.: Sr. José Lima"
                                        value={formResponsavel}
                                        onChange={(e) => setFormResponsavel(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">HORÁRIO DE INÍCIO</label>
                                    <input
                                        type="text"
                                        className="input-pill"
                                        placeholder="HH:MM (ex.: 14:00)"
                                        value={formHoraInicio}
                                        onChange={(e) => setFormHoraInicio(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">HORÁRIO DE FIM</label>
                                    <input
                                        type="text"
                                        className="input-pill"
                                        placeholder="HH:MM (ex.: 15:30)"
                                        value={formHoraFim}
                                        onChange={(e) => setFormHoraFim(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">OBSERVAÇÕES / NOTAS</label>
                                <textarea
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Detalhes adicionais..."
                                    value={formObs}
                                    onChange={(e) => setFormObs(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-modal-cancel"
                                    onClick={() => setModalNovoEventoAberta(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-modal-confirm">
                                    Salvar Evento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
