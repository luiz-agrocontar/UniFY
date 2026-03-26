'use client';

import React, { useMemo, useState } from 'react';
import {
  BellIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { TicketIcon as TicketSolid } from '@heroicons/react/24/solid';

const INITIAL_TICKETS = [
  {
    id: '123',
    titulo: 'Erro ao processar NF de saída, sistema não coletou as informações...',
    dataAbertura: '21/01/2026',
    horaAbertura: '08:24:29',
    status: 'Novo',
    classificacao1: 'UniFISCAL',
    classificacao2: 'Error',
    responsavel: 'Elaine Calaz...',
    dataAtualizacao: '21/01/2026',
    horaAtualizacao: '08:24:29',
    solicitante: 'Ana Silva',
    solicitanteInicial: 'AS',
    caminhoTela: 'UniFISCAL > D+1 > entrada > Espelho NF-e',
    mensagem:
      'Olá, boa tarde!\nHoje foi gerado e enviado o relatório de notas não lançadas ao cliente, porém eles nos retornaram questionando que estão aparecendo muitas notas canceladas. O print em anexo mostra algumas notas com esse problema.',
  },
  {
    id: '124',
    titulo: 'Divergência na classificação de ticket da rotina fiscal',
    dataAbertura: '21/01/2026',
    horaAbertura: '09:10:11',
    status: 'Em Atendimento',
    classificacao1: 'UniDP',
    classificacao2: 'Error',
    responsavel: 'Elaine Calaz...',
    dataAtualizacao: '21/01/2026',
    horaAtualizacao: '09:10:11',
  },
  {
    id: '125',
    titulo: 'Solicitação de ajuste na configuração de integração',
    dataAbertura: '21/01/2026',
    horaAbertura: '10:20:05',
    status: 'Pendente',
    classificacao1: 'UniCONFIG',
    classificacao2: 'Melhoria',
    responsavel: 'Elaine Calaz...',
    dataAtualizacao: '21/01/2026',
    horaAtualizacao: '10:20:05',
  },
];

const MODULE_OPTIONS = ['UNIATEND', 'UNIFISCAL', 'UNIDP', 'UNICONFIG'];
const TYPE_OPTIONS = ['Error', 'Dúvida', 'Melhoria'];
const PRIORITY_OPTIONS = ['Alta', 'Média', 'Baixa'];

const emptyForm = {
  solicitante: 'LUIZ FELIPE MENDONCA SILVA',
  empresa: 'AGROCONTAR BHUB - FL GOIANIA - 0 - 63.229.644/0002-57',
  caminho: 'UniAtend',
  categoria: 'UNIATEND',
  tipo: 'Error',
  prioridade: 'Alta',
  convidados: '',
  empresasAfetadas: '',
  titulo: '',
  descricao: '',
};

const LogoIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 111" fill="none" className={className}>
    <path d="M44.75 27.15C45.38 26.87 46.9 26.69 47.57 26.62C52.23 26.11 56.87 27.31 61.01 30.48C66.26 34.51 70.01 41.33 71.7 49.59C72.18 51.96 72.61 54.98 72.74 57.46C72.97 60.03 72.94 63.26 72.94 65.87L72.94 75.94L72.93 109.06C70.27 109.22 67.88 108.47 65.6 106.37C62.58 103.6 60.23 98.43 60.19 93.13C60.06 92.63 60.12 86.31 60.12 85.38L60.13 69.58C60.13 64.81 60.24 61.15 59.83 56.42C59.78 56.01 59.72 55.6 59.65 55.2C58.88 50.77 57.43 47.84 54.75 45.51C54.5 45.36 54.05 45.02 53.78 44.83C52.92 44.34 52.26 43.99 51.33 43.75C47.55 42.79 42.88 43.92 39.39 46.13C38.94 46.42 38.5 46.72 38.06 47.02L38.02 47.06C37.62 47.44 37.16 47.75 36.75 48.12C32.46 52.00 29.64 58.08 27.46 64.57C26.89 66.26 26.41 68.12 25.80 69.78C25.76 69.35 25.72 69.04 25.73 68.61C25.64 63.17 25.68 59.14 26.53 53.73C27.62 46.74 29.72 40.44 33.34 35.48C34.03 34.54 35.00 33.35 35.79 32.61C35.90 32.45 36.72 31.68 36.88 31.53C38.98 29.63 42.29 27.61 44.76 27.15Z" fill="url(#tealGradient)" />
    <path d="M81.29 43.31C81.31 42.97 81.35 42.55 81.39 42.21C81.86 37.98 83.48 34.21 85.88 31.73C88.04 29.50 91.34 27.95 93.99 28.62C93.93 29.24 93.96 32.57 93.97 33.42L93.97 44.22L93.96 75.67L93.96 85.85C93.96 87.63 94.00 89.78 93.94 91.55C94.05 96.06 92.92 100.45 90.79 103.73C88.56 107.21 85.70 108.98 82.45 109.10C82.15 109.11 81.84 109.11 81.54 109.11C81.40 108.96 81.23 108.72 81.10 108.54L81.10 64.87L81.11 52.06C81.11 49.29 81.06 46.02 81.29 43.31Z" fill="url(#tealGradient)" />
    <path d="M80.63 12.97C80.42 11.58 80.63 9.50 80.91 8.16C81.52 5.30 83.12 2.62 84.94 1.25C86.75 -0.12 88.86 -0.37 90.80 0.53C92.75 1.46 94.27 3.43 95.19 6.09C96.10 8.75 96.25 11.82 95.61 14.65C95.16 16.58 94.10 18.90 92.94 20.04C92.42 20.62 91.23 21.68 90.60 21.90C89.19 22.75 87.05 22.78 85.63 21.98C83.23 21.18 80.71 16.54 80.63 12.97Z" fill="url(#tealGradient)" />
    <path d="M0.02 28.45C0.57 28.41 1.13 28.35 1.68 28.36C4.74 28.48 7.64 30.35 9.77 33.56C10.42 34.54 11.73 37.12 11.89 38.42C12.11 39.09 12.35 40.20 12.45 40.94C12.58 41.70 12.72 42.78 12.74 43.56C12.88 44.79 12.90 46.72 12.91 47.98C12.92 50.11 12.93 52.25 12.92 54.38C12.92 61.41 12.86 68.59 12.92 75.60C12.95 79.91 13.15 82.47 14.42 86.43C14.83 87.45 15.14 88.13 15.65 89.07C15.85 89.38 16.06 89.69 16.26 90.00C17.35 91.45 17.56 91.43 18.70 92.49C23.41 95.42 29.42 94.30 32.39 87.73C32.64 87.18 32.86 86.60 33.09 86.03C33.10 85.83 33.52 84.45 33.61 84.11C33.82 83.29 34.00 82.45 34.17 81.61C34.55 79.70 34.89 77.63 35.30 75.75C36.93 68.30 39.62 59.83 43.46 54.25C44.87 52.17 46.55 50.50 48.39 49.34C48.59 49.21 49.23 48.80 49.42 48.80L49.37 48.89C48.76 50.48 48.17 52.08 47.79 53.83C46.93 57.81 47.04 61.64 47.01 65.71C46.97 70.68 47.17 76.23 46.84 81.15C46.35 88.34 44.56 94.91 41.24 100.30C38.47 104.74 34.90 107.96 30.94 109.58C29.82 110.05 27.68 110.72 26.51 110.77C26.06 110.97 24.01 111.02 23.46 110.99C22.99 111.00 22.56 110.98 22.08 110.95C21.45 110.95 20.22 110.78 19.60 110.62C19.05 110.57 18.05 110.26 17.50 110.10C13.70 108.99 9.26 105.75 6.56 101.60C6.11 101.01 5.67 100.27 5.28 99.61C4.90 98.99 4.55 98.33 4.23 97.64C3.94 97.21 3.19 95.34 2.99 94.80C2.79 94.29 2.66 93.92 2.48 93.39C2.27 92.76 2.06 92.04 1.87 91.40C-0.18 83.09 0.00 78.66 0.01 69.98L0.01 57.15L0.02 28.45Z" fill="url(#tealGradient)" />
    <defs>
      <linearGradient id="tealGradient" x1="0" y1="0" x2="96" y2="111" gradientUnits="userSpaceOnUse">
        <stop stopColor="#02b2b1" />
        <stop offset="1" stopColor="#0d6d67" />
      </linearGradient>
    </defs>
  </svg>
);

const LogoFull = ({ className = '' }) => (
  <div className={`flex items-end gap-1.5 ${className}`}>
    <LogoIcon className="h-8 w-auto" />
    <span className="text-[#0d6d67] font-bold tracking-[0.03em] text-[18px] leading-[1.1] mb-[3px] font-sans">ATEND</span>
  </div>
);

function formatNow() {
  const now = new Date();
  return {
    data: now.toLocaleDateString('pt-BR'),
    hora: now.toLocaleTimeString('pt-BR', { hour12: false }),
  };
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function StatusBadge({ status }) {
  const styles = {
    Novo: 'bg-blue-50 text-blue-600 border border-blue-100',
    'Em Atendimento': 'bg-gray-100 text-gray-600 border border-gray-200',
    Pendente: 'bg-yellow-50 text-yellow-600 border border-yellow-100',
    Concluído: 'bg-green-50 text-green-600 border border-green-100',
    Cancelado: 'bg-red-50 text-red-600 border border-red-100',
  };

  return <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${styles[status]}`}>{status}</span>;
}

function ClassBadge({ text, type }) {
  const bg = type === 'main' ? 'bg-[#e0f2fe] text-[#0369a1]' : 'bg-[#fee2e2] text-[#b91c1c]';
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${bg} mr-1`}>{text}</span>;
}

function CreateTicketModal({ open, onClose, onSubmit, form, onChange }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-gray-200">
          <h2 className="text-[18px] font-semibold text-gray-900">Criar Ticket</h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-500">Progresso</span>
              <div className="w-48 h-3 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-3/4 bg-[#d9dce2]"></div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-700 hover:text-black">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#19c2b3] text-white flex items-center justify-center text-2xl font-semibold">L</div>
            <div>
              <div className="text-sm text-gray-500">Solicitante</div>
              <div className="text-[16px] font-semibold text-gray-900">{form.solicitante}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Empresa</label>
              <input value={form.empresa} readOnly className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Caminho</label>
              <input value={form.caminho} readOnly className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-gray-50" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Categoria</label>
              <select name="categoria" value={form.categoria} onChange={onChange} className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white">
                {MODULE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Tipo *</label>
              <select name="tipo" value={form.tipo} onChange={onChange} className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white">
                {TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Prioridade *</label>
              <select name="prioridade" value={form.prioridade} onChange={onChange} className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white">
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Adicionar Empresas</label>
              <input name="empresasAfetadas" value={form.empresasAfetadas} onChange={onChange} placeholder="Selecione outras empresas afetadas (opcional)" className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Convidados</label>
              <input name="convidados" value={form.convidados} onChange={onChange} placeholder="Opcional" className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white" />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm text-gray-700 mb-2">Título *</label>
              <input name="titulo" value={form.titulo} onChange={onChange} maxLength={80} className="w-full h-12 rounded-lg border border-gray-300 px-4 text-gray-700 bg-white" />
              <div className="text-right text-xs text-gray-400 mt-1">{form.titulo.length}/80</div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm text-gray-700 mb-2">Descrição *</label>
              <div className="border border-gray-300 rounded-xl overflow-hidden">
                <div className="h-12 border-b border-gray-200 px-4 flex items-center gap-5 text-gray-700">
                  <span className="font-bold text-[20px]">B</span>
                  <span className="italic text-[20px]">I</span>
                  <span className="underline text-[20px]">U</span>
                  <span className="text-[20px] font-semibold">A</span>
                </div>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={onChange}
                  placeholder="Descreva o problema ou solicitação..."
                  rows={10}
                  className="w-full resize-none p-4 outline-none text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-5 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Cancelar</button>
          <button onClick={onSubmit} className="px-8 py-3 rounded-md bg-[#67b8ba] hover:bg-[#56a8aa] text-white font-semibold">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedRows, setExpandedRows] = useState({ '123': true });
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [form, setForm] = useState(emptyForm);

  const filteredTickets = useMemo(() => {
    const term = search.toLowerCase();
    return tickets.filter((ticket) => {
      return (
        ticket.id.toLowerCase().includes(term) ||
        ticket.titulo.toLowerCase().includes(term) ||
        ticket.classificacao1.toLowerCase().includes(term)
      );
    });
  }, [search, tickets]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTicket = () => {
    if (!form.titulo.trim() || !form.descricao.trim()) return;

    const now = formatNow();
    const nextId = String(Math.max(...tickets.map((ticket) => Number(ticket.id))) + 1);

    const newTicket = {
      id: nextId,
      titulo: form.titulo.trim(),
      dataAbertura: now.data,
      horaAbertura: now.hora,
      status: 'Novo',
      classificacao1: form.categoria,
      classificacao2: form.tipo,
      responsavel: 'Fila UniATEND',
      dataAtualizacao: now.data,
      horaAtualizacao: now.hora,
      solicitante: form.solicitante,
      solicitanteInicial: getInitials(form.solicitante),
      caminhoTela: form.caminho,
      mensagem: form.descricao.trim(),
    };

    setTickets((prev) => [newTicket, ...prev]);
    setExpandedRows((prev) => ({ ...prev, [nextId]: true }));
    setForm(emptyForm);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-['Open_Sans',_sans-serif] text-gray-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        `}
      </style>

      <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative z-20 ${isSidebarOpen ? 'w-[240px]' : 'w-[80px]'}`}>
        <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 shadow-sm text-gray-400 hover:text-[#02b2b1] transition-colors">
          {isSidebarOpen ? <ChevronLeftIcon className="w-3 h-3" /> : <ChevronRightIcon className="w-3 h-3" />}
        </button>

        <div className="h-20 flex items-center justify-center px-4 mt-2">
          {isSidebarOpen ? <LogoFull /> : <LogoIcon className="h-8 w-auto" />}
        </div>

        <div className="flex flex-col px-3 mt-4 gap-1">
          {isSidebarOpen && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">Overview</span>}
          <button className="flex items-center gap-3 w-full bg-[#ebf9f9] text-[#02b2b1] px-3 py-2.5 rounded-lg transition-colors">
            <TicketSolid className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-semibold">Tickets</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div></div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2.5 bg-[#f4f4f5] rounded-xl p-1.5">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 ml-1.5" />
              <div className="bg-white border border-gray-100 shadow-sm rounded-lg px-4 py-1.5 text-xs font-semibold text-gray-700 w-[380px] tracking-wide truncate">
                AGROCONTAR BHUB - FL GOIANIA - 0 - 63.229.644/0002-57
              </div>
            </div>

            <button className="relative text-gray-400 hover:text-[#02b2b1] transition-colors rounded-full p-1 hover:bg-gray-100">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="w-8 h-8 rounded-full bg-[#02b2b1] text-white flex items-center justify-center font-semibold">L</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <span>Home</span>
              <span className="text-gray-300">•</span>
              <span className="text-[#02b2b1] font-medium">Tickets</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="relative w-[300px]">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar" className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm w-full outline-none focus:border-[#02b2b1]" />
              </div>
              <button className="bg-[#02b2b1] hover:bg-[#029594] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors h-[38px] shadow-sm">Filtrar</button>
              <button onClick={() => setSearch('')} className="bg-white border border-[#02b2b1] hover:bg-gray-50 text-[#02b2b1] px-5 py-2 rounded-lg text-sm font-semibold transition-colors h-[38px]">Limpar</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-[11px] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4">Título</th>
                    <th className="px-5 py-4">Data Abertura</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Classificação</th>
                    <th className="px-5 py-4">Responsável</th>
                    <th className="px-5 py-4">Últ. Atualização</th>
                    <th className="px-5 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTickets.map((ticket) => (
                    <React.Fragment key={ticket.id}>
                      <tr className={`hover:bg-gray-50/50 transition-colors ${expandedRows[ticket.id] ? 'bg-gray-50/30' : ''}`}>
                        <td className="px-5 py-3">
                          <div className="font-semibold text-gray-800">{ticket.id}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5 truncate w-48 cursor-default">{ticket.titulo}</div>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600">
                          <div>{ticket.dataAbertura}</div>
                          <div className="text-gray-400 mt-0.5">{ticket.horaAbertura}</div>
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={ticket.status} /></td>
                        <td className="px-5 py-3">
                          <ClassBadge text={ticket.classificacao1} type="main" />
                          <ClassBadge text={ticket.classificacao2} type="error" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#dff7f3] text-[#02b2b1] flex items-center justify-center text-[10px] font-bold">{getInitials(ticket.responsavel)}</div>
                            <span className="text-xs text-gray-700">{ticket.responsavel}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600">
                          <div>{ticket.dataAtualizacao}</div>
                          <div className="text-gray-400 mt-0.5">{ticket.horaAtualizacao}</div>
                        </td>
                        <td className="px-5 py-3 text-center align-middle">
                          <button onClick={() => setExpandedRows((prev) => ({ ...prev, [ticket.id]: !prev[ticket.id] }))} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 transition-colors">
                            {expandedRows[ticket.id] ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {expandedRows[ticket.id] && ticket.solicitante && (
                        <tr className="bg-[#fafafa]">
                          <td colSpan="7" className="p-0">
                            <div className="px-5 py-4 flex gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="flex gap-3 min-w-[220px]">
                                <div className="w-10 h-10 rounded-full bg-[#02b2b1] text-white flex items-center justify-center font-bold text-sm shrink-0">{ticket.solicitanteInicial ?? getInitials(ticket.solicitante)}</div>
                                <div className="flex flex-col text-xs">
                                  <span className="text-gray-500 mb-0.5">Solicitante</span>
                                  <span className="font-bold text-gray-800">{ticket.solicitante}</span>
                                  <div className="mt-3 text-gray-500 mb-0.5">Caminho da Tela</div>
                                  <span className="text-gray-800 font-medium">{ticket.caminhoTela}</span>
                                </div>
                              </div>
                              <div className="flex-1 max-w-3xl text-xs">
                                <span className="text-gray-500 mb-1 block">Solicitação</span>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ticket.mensagem}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between gap-6 text-xs text-gray-500">
              <span>{filteredTickets.length} ticket(s) exibido(s)</span>
              <span>Atualização dinâmica da sessão atual</span>
            </div>
          </div>

          <footer className="mt-12 mb-4 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
            <LogoIcon className="w-10 h-auto mb-2 grayscale hover:grayscale-0 transition-all" />
            <p className="text-[10px] text-gray-500">© Todos os Direitos Reservados <span className="text-[#02b2b1] font-semibold">Plataforma Unifica 2026</span></p>
          </footer>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="fixed right-8 bottom-8 z-40 inline-flex items-center gap-3 rounded-full bg-[#02b2b1] px-6 py-4 text-white shadow-xl hover:bg-[#029594] transition-colors">
          <PlusIcon className="w-5 h-5" />
          <span className="font-semibold">Criar mockdata</span>
        </button>

        <CreateTicketModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTicket} form={form} onChange={handleFormChange} />
      </main>
    </div>
  );
}
