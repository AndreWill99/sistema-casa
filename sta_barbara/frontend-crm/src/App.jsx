import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './pages/DashboardView';
import Residentes from './pages/Residentes';
import Leads from './pages/Leads';
import Equipe from './pages/Equipe';
import Financeiro from './pages/Financeiro';
import Agenda from './pages/Agenda';
import Configuracoes from './pages/Configuracoes';

function App() {
  const [logado, setLogado] = useState(false);
  const [telaAuth, setTelaAuth] = useState('login'); // 'login' | 'cadastro'
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [usuarioAtual, setUsuarioAtual] = useState('Admin Bárbara');

  const handleLoginSuccess = (dados) => {
    if (dados && dados.usuario) {
      setUsuarioAtual(dados.usuario);
    }
    setLogado(true);
  };

  if (!logado) {
    if (telaAuth === 'cadastro') {
      return <Register onVoltarLogin={() => setTelaAuth('login')} />;
    }
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const renderConteudoPrincipal = () => {
    switch (abaAtiva) {
      case 'dashboard':
        return <DashboardView onNavegar={setAbaAtiva} />;
      case 'residentes':
        return <Residentes />;
      case 'leads':
        return <Leads />;
      case 'equipe':
        return <Equipe />;
      case 'financeiro':
        return <Financeiro />;
      case 'agenda':
        return <Agenda />;
      case 'cadastro':
        return <Register onVoltarLogin={() => setAbaAtiva('dashboard')} />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <DashboardView onNavegar={setAbaAtiva} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF8EE' }}>
      <Sidebar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        onLogout={() => setLogado(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          usuario={usuarioAtual}
          onQuickAction={() => setAbaAtiva('residentes')}
        />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderConteudoPrincipal()}
        </main>
      </div>
    </div>
  );
}

export default App;