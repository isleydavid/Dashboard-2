
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  LayoutGrid,
  Zap,
  Star,
  ArrowUpRight,
  User,
  Activity,
  Maximize,
  Minimize
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, DeptEfficiency } from '../types';

const METRICS_DATA: ServiceMetric[] = [
  { label: 'Limpeza Urbana', days: 2.5, totalPercentage: 75, operational: 40, fiscalization: 25, administrative: 10 },
  { label: 'Iluminação', days: 1.8, totalPercentage: 60, operational: 35, fiscalization: 20, administrative: 5 },
  { label: 'Poda de Árvore', days: 4.2, totalPercentage: 45, operational: 25, fiscalization: 15, administrative: 5 },
  { label: 'Drenagem', days: 3.0, totalPercentage: 30, operational: 15, fiscalization: 10, administrative: 5 },
];

const EFFICIENCY_DATA: DeptEfficiency[] = [
  { id: 1, code: 'EM', name: 'EMLUR', subName: 'LIMPEZA & COLETA', efficiency: 95, solicitations: '12.5k', color: 'bg-emerald-500' },
  { id: 2, code: 'SE', name: 'SEURB', subName: 'URBANISMO', efficiency: 88, solicitations: '10.2k', color: 'bg-blue-500' },
  { id: 3, code: 'SM', name: 'SEMOB', subName: 'MOBILIDADE', efficiency: 72, solicitations: '8.1k', color: 'bg-orange-500' },
  { id: 4, code: 'SS', name: 'SESAU', subName: 'SAÚDE', efficiency: 81, solicitations: '5.4k', color: 'bg-emerald-400' },
];

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
  type: 'trend' | 'rating' | 'demand' | 'alert';
}

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1024560);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [highlights, setHighlights] = useState<Highlight[]>([
    { icon: <Zap size={14} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana', type: 'demand' },
    { icon: <Star size={14} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)', type: 'rating' },
    { icon: <ArrowUpRight size={14} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore', type: 'trend' },
    { icon: <Bell size={14} />, label: 'ALERTA EM TEMPO REAL', value: 'Novo vazamento em Tambaú', type: 'alert' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 20));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  // Lógica para detectar se saiu do modo tela cheia (via teclado por exemplo)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      dashboardRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={dashboardRef}
      className={`w-screen flex flex-col bg-[#0a0f1e] text-white p-4 md:p-6 2xl:p-10 custom-scrollbar transition-all duration-500 
        ${isFullscreen || window.innerWidth >= 1920 ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* HEADER COMPACTO */}
      <nav className="flex items-center justify-between mb-4 md:mb-6 2xl:mb-8 relative z-10 shrink-0">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="bg-blue-600 p-2 md:p-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <LayoutGrid className="size-5 md:size-6 2xl:size-8" />
          </div>
          <div>
            <h1 className="font-black text-xl md:text-2xl 2xl:text-4xl tracking-tighter leading-none">Cidade<span className="text-blue-400 font-light">Conectada</span></h1>
            <p className="text-[9px] 2xl:text-base font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Command Center v4.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-3 text-[10px] 2xl:text-lg font-black tracking-widest text-emerald-400 bg-emerald-500/5 px-5 py-2.5 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 2xl:w-3 2xl:h-3 rounded-full bg-emerald-500 animate-pulse" />
            LIVE MONITORING
          </div>
          
          <button 
            onClick={toggleFullscreen}
            className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 group"
            title="Alternar Tela Cheia"
          >
            {isFullscreen ? <Minimize className="size-4 md:size-5 2xl:size-8 text-blue-400" /> : <Maximize className="size-4 md:size-5 2xl:size-8 text-blue-400" />}
            <span className="hidden sm:block text-[9px] 2xl:text-lg font-black text-gray-400 group-hover:text-white uppercase">Tela Cheia</span>
          </button>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-xl">
            <div className="w-8 h-8 2xl:w-14 2xl:h-14 rounded-lg 2xl:rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
              <User size={18} className="2xl:size-8" />
            </div>
            <div className="hidden lg:block pr-4">
               <p className="text-[10px] 2xl:text-base font-black text-white leading-none">ADMIN_ROOT</p>
               <p className="text-[8px] 2xl:text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">Ativo</p>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Ajustado para ser mais flexível */}
      <div className="flex-none lg:flex lg:items-center justify-between gap-6 md:gap-10 mb-6 2xl:mb-10 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-blue-400 mb-2 md:mb-3">
            <Activity size={16} className="2xl:size-8 animate-pulse" />
            <span className="text-[10px] 2xl:text-xl font-black uppercase tracking-[0.4em]">Gestão Urbana em Tempo Real</span>
          </div>
          <h2 className="text-6xl sm:text-8xl md:text-9xl 2xl:text-[14rem] font-black tracking-tighter leading-[0.8] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <AnimatedCounter target={total} />
          </h2>
          
          <div className="h-14 md:h-18 2xl:h-28 w-full max-w-xl 2xl:max-w-4xl relative">
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 flex items-center gap-4 md:gap-6 bg-white/5 backdrop-blur-md px-6 md:px-8 py-3 rounded-2xl 2xl:rounded-[2.5rem] border border-white/10 transition-all duration-700
                  ${idx === highlightIndex ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
              >
                <div className="p-2 md:p-3 bg-blue-500/20 rounded-xl text-blue-400">
                  {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<any>, { className: 'size-5 md:size-6 2xl:size-10' })}
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] md:text-[10px] 2xl:text-lg font-black text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="font-bold text-white text-sm md:text-lg 2xl:text-3xl truncate">{item.value}</p>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                   <span className="text-[8px] 2xl:text-sm font-black text-blue-400 tracking-tighter">FEED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS PANEL: Visível em telas maiores para preencher o "retângulo" */}
        <div className="hidden lg:grid grid-cols-2 gap-3 md:gap-4 w-[400px] 2xl:w-[700px]">
           <StatusBox label="SLA GLOBAL" value="94.2%" color="text-emerald-400" />
           <StatusBox label="UPTIME" value="99.9%" color="text-blue-400" />
           <StatusBox label="CONEXÕES" value="1.4k" color="text-indigo-400" />
           <StatusBox label="ALERTAS" value="02" color="text-orange-500" />
        </div>
      </div>

      {/* MAIN CONTENT AREA: Com rolagem interna se necessário em telas menores */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 2xl:gap-10 overflow-hidden relative z-10 mb-4">
        
        {/* COLUNA 1: Métricas de Resumo */}
        <div className="flex flex-col gap-4 2xl:gap-8">
           <CompactMetricCard label="PENDÊNCIAS TOTAIS" value={Math.floor(total * 0.05)} icon={<Clock />} color="orange" />
           <CompactMetricCard label="RESOLVIDOS (24H)" value={2450} icon={<CheckCircle />} color="emerald" />
           <CompactMetricCard label="EM PROCESSAMENTO" value={1820} icon={<TrendingUp />} color="blue" />
        </div>

        {/* COLUNA 2: Carga Operacional */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] 2xl:rounded-[4rem] p-6 2xl:p-12 flex flex-col shadow-2xl overflow-hidden min-h-[300px]">
           <div className="flex justify-between items-center mb-6 2xl:mb-10 shrink-0">
              <h3 className="font-black text-xl 2xl:text-4xl tracking-tight">Carga Operacional</h3>
              <div className="text-[8px] 2xl:text-lg font-black text-gray-500 tracking-[0.3em]">SEC_STATS</div>
           </div>
           <div className="flex-1 space-y-6 2xl:space-y-12 overflow-y-auto pr-2 custom-scrollbar">
              {METRICS_DATA.map((metric) => (
                <div key={metric.label} className="group">
                  <div className="flex justify-between items-end mb-2 2xl:mb-4">
                    <span className="font-bold text-sm 2xl:text-3xl text-gray-300 group-hover:text-blue-400 transition-colors">{metric.label}</span>
                    <span className="text-[10px] 2xl:text-xl font-black text-gray-500">{metric.totalPercentage}%</span>
                  </div>
                  <div className="w-full h-2 md:h-3 2xl:h-6 bg-white/5 rounded-full overflow-hidden flex ring-2 ring-white/5">
                    <div className="bg-blue-600 h-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${metric.operational}%` }} />
                    <div className="bg-indigo-500 h-full" style={{ width: `${metric.fiscalization}%` }} />
                    <div className="bg-white/5 h-full" style={{ width: `${metric.administrative}%` }} />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* COLUNA 3: Ranking Eficiência */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] 2xl:rounded-[4rem] p-6 2xl:p-12 flex flex-col shadow-2xl overflow-hidden min-h-[300px]">
           <h3 className="font-black text-xl 2xl:text-4xl mb-6 2xl:mb-10 tracking-tight shrink-0 flex items-center gap-3">
             <Star className="text-yellow-500 size-5 2xl:size-10 fill-current" /> Eficiência Depto
           </h3>
           <div className="flex-1 space-y-4 2xl:space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {EFFICIENCY_DATA.map((dept) => (
                <div key={dept.id} className="p-4 2xl:p-8 bg-white/[0.03] rounded-2xl 2xl:rounded-[2.5rem] border border-white/5 hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-3 md:gap-4 2xl:gap-8 mb-3 2xl:mb-5">
                    <div className="w-10 h-10 2xl:w-20 2xl:h-20 rounded-xl bg-white/10 flex items-center justify-center font-black text-[10px] 2xl:text-2xl text-blue-400 shrink-0">
                      {dept.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs 2xl:text-3xl truncate">{dept.name}</h4>
                      <p className="text-[8px] 2xl:text-lg font-bold text-gray-500 uppercase tracking-widest">{dept.solicitations}</p>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="text-lg 2xl:text-5xl font-black text-emerald-400 leading-none">{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 2xl:h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} transition-all duration-[2s] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]`} style={{ width: `${dept.efficiency}%` }} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* FOOTER BAR: Fixo no rodapé para manter a estética de retângulo */}
      <footer className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between text-[8px] 2xl:text-base font-black text-gray-600 uppercase tracking-[0.3em] shrink-0 relative z-10">
         <div className="flex items-center gap-6">
            <span>TERMINAL: CN-JPA-01</span>
            <span className="hidden sm:inline text-blue-600/50">SECURED_ENCRYPTION_ACTIVE</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ESTÁVEL</span>
            <span className="ml-4 text-gray-800">© 2025 CIDADE CONECTADA</span>
         </div>
      </footer>
    </div>
  );
};

const StatusBox: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="bg-white/5 border border-white/10 p-4 2xl:p-10 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all group">
    <p className="text-[8px] 2xl:text-lg font-black text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-300">{label}</p>
    <p className={`text-2xl 2xl:text-6xl font-black ${color}`}>{value}</p>
  </div>
);

const CompactMetricCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl 2xl:rounded-[3rem] p-5 2xl:p-10 flex flex-col justify-center relative overflow-hidden hover:bg-white/[0.08] transition-all group">
    <div className="flex justify-between items-start mb-2 2xl:mb-6 relative z-10">
      <p className="text-blue-500 font-black text-[9px] 2xl:text-xl tracking-widest uppercase">{label}</p>
      <div className={`text-${color}-500 opacity-40 group-hover:opacity-100 transition-opacity`}>
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: 'size-4 md:size-5 2xl:size-10' })}
      </div>
    </div>
    <p className="text-4xl 2xl:text-8xl font-black tracking-tighter text-white relative z-10 leading-none">
      <AnimatedCounter target={value} />
    </p>
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 2xl:w-48 2xl:h-48 bg-${color}-500/5 rounded-full blur-2xl group-hover:bg-${color}-500/10 transition-all`} />
  </div>
);

export default Dashboard;
