import React, { useState, useEffect } from 'react';
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
import { buscarResumoDashboard } from './services/api';

function App() {
  const [logado, setLogado] = useState(false);
  const [telaAuth, setTelaAuth] = useState('login'); // 'login' | 'cadastro'
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [usuarioAtual, setUsuarioAtual] = useState('Admin Bárbara');
  const [contadores, setContadores] = useState({ residentes: 0, leads: 0 });

  const atualizarContadores = async () => {
    try {
      const resp = await buscarResumoDashboard();
      if (resp && resp.dados) {
        setContadores({
          residentes: resp.dados.totalResidentes || 0,
          leads: resp.dados.totalLeads || 0
        });
      }
    } catch (erro) {
      console.error('Erro ao atualizar contadores do sidebar:', erro);
    }
  };

  useEffect(() => {
    if (logado) {
      atualizarContadores();
    }
  }, [logado, abaAtiva]);

  const handleLoginSuccess = (dados) => {
    if (dados && dados.usuario) {
      setUsuarioAtual(dados.usuario);
    }
    setLogado(true);
  };

  if (!logado) {
    if (telaAuth === 'cadastro') {
      return (
        <Register
          onVoltarLogin={() => setTelaAuth('login')}
          onRegisterSuccess={(usuarioCriado) => {
            if (usuarioCriado && usuarioCriado.nome) {
              setUsuarioAtual(usuarioCriado.nome);
            }
            setTelaAuth('login');
          }}
        />
      );
    }
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onIrParaCadastro={() => setTelaAuth('cadastro')}
      />
    );
  }

  const renderConteudoPrincipal = () => {
    switch (abaAtiva) {
      case 'dashboard':
        return <DashboardView onNavegar={setAbaAtiva} />;
      case 'residentes':
        return <Residentes onAtualizar={atualizarContadores} />;
      case 'leads':
        return <Leads onAtualizar={atualizarContadores} />;
      case 'equipe':
        return <Equipe onAtualizar={atualizarContadores} />;
      case 'financeiro':
        return <Financeiro onAtualizar={atualizarContadores} />;
      case 'agenda':
        return <Agenda onAtualizar={atualizarContadores} />;
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
        contadores={contadores}
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
