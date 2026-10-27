import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { 
  LayoutDashboard, Users, TrendingUp, RefreshCw, Target, Search, Bell, X, ArrowUpDown, 
  Megaphone, Plug, ToggleRight, ToggleLeft, Phone, MapPin, Plus, CheckCircle2,
  Receipt, CreditCard, Bot, Sparkles, Download, FileText, AlertCircle, Command, ListTodo, History, CheckSquare,
  Lock, Mail, ArrowRight, LogOut
} from 'lucide-react';

// --- MOCK DATA FOR CHARTS ---
const rawChartData = [
  { name: 'May', revenue: 42000, leads: 240, adSpend: 12000 },
  { name: 'Jun', revenue: 48000, leads: 310, adSpend: 14000 },
  { name: 'Jul', revenue: 61000, leads: 420, adSpend: 15000 },
  { name: 'Aug', revenue: 75000, leads: 520, adSpend: 18000 },
  { name: 'Sep', revenue: 98000, leads: 680, adSpend: 22000 },
  { name: 'Oct', revenue: 115000, leads: 740, adSpend: 25000 },
];
const sourceData = [{ name: 'Google SEO', value: 45 }, { name: 'Meta Ads', value: 35 }, { name: 'WhatsApp', value: 12 }, { name: 'Direct', value: 8 }];
const SOURCE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];
const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-100 text-emerald-700', 'Completed': 'bg-emerald-100 text-emerald-700',
    'Pending': 'bg-amber-100 text-amber-700', 'Onboarding': 'bg-blue-100 text-blue-700',
    'Lead': 'bg-purple-100 text-purple-700'
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
};

// ==========================================
// AUTHENTICATION SCREEN COMPONENT
// ==========================================
const LoginScreen = ({ onLogin }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState('admin@marketiq.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    // Simulate API Network Delay for verifying credentials
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#1C1917] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl shadow-lg"><Target className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl font-black text-white tracking-tight">MarketIQ</h1>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold leading-tight mb-6">The Operating System for Modern Marketing Agencies.</h2>
          <p className="text-stone-400 text-lg">Manage pipelines, track ROAS, and automate client onboarding from a single enterprise dashboard.</p>
        </div>
        <div className="relative z-10 flex items-center gap-4 text-sm font-bold text-stone-500">
          <span>Enterprise Edition 2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
          <span>SOC2 Compliant</span>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-stone-900 mb-2">Welcome Back</h2>
            <p className="text-stone-500 text-sm font-medium">Enter your admin credentials to access the workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium text-stone-700" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
                <a href="#" className="text-xs font-bold text-amber-600 hover:text-amber-700">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium text-stone-700" />
              </div>
            </div>
            <button disabled={isAuthenticating} type="submit" className="w-full flex justify-center items-center gap-2 bg-stone-900 text-white py-3.5 rounded-xl font-bold hover:bg-stone-800 shadow-lg shadow-stone-900/20 transition-all disabled:opacity-70">
              {isAuthenticating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>Sign In Securely <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs font-medium text-gray-400 flex justify-center items-center gap-1.5"><Lock className="w-3 h-3" /> End-to-end encrypted connection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP DASHBOARD
// ==========================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Security Gate State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDbData] = useState({ clients: [], tasks: [], activities: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [toasts, setToasts] = useState([]);
  const [slideOver, setSlideOver] = useState({ isOpen: false });
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);

  // --- SHORTCUT LISTENER (Ctrl+K) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- FULL-STACK FETCH ---
  const fetchDatabase = async () => {
    try {
      const response = await fetch('https://marketiq-project.onrender.com/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDbData(data);
      }
    } catch (error) {
      showToast('Backend offline. Check Python server.', <AlertCircle className="w-5 h-5 text-rose-400" />);
    }
    setIsLoading(false);
  };

  // Only fetch data once logged in
  useEffect(() => { 
    if(isAuthenticated) fetchDatabase(); 
  }, [isAuthenticated]);

  // --- HANDLERS ---
  const handleAddClient = async (e) => {
    e.preventDefault();
    const newClient = {
      client_name: e.target.clientName.value,
      contact_person: e.target.contactPerson.value,
      service: e.target.service.value,
      mrr: parseInt(e.target.mrr.value) || 0
    };
    try {
      await fetch('https://marketiq-project.onrender.com/api/clients', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newClient)
      });
      showToast('Client added & onboarding tasks generated!', <Sparkles className="w-5 h-5 text-emerald-400" />);
      setSlideOver({ isOpen: false });
      fetchDatabase(); 
    } catch (error) {
      showToast('Error saving data.', <AlertCircle className="w-5 h-5 text-rose-400" />);
    }
  };

  const handleCompleteTask = async (taskId) => {
    await fetch(`https://marketiq-project.onrender.com/api/tasks/${taskId}/complete`, { method: 'POST' });
    showToast('Task marked as complete!');
    fetchDatabase();
  };

  const showToast = (message, icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const toggleClientSelection = (id) => {
    setSelectedClients(prev => prev.includes(id) ? prev.filter(clientId => clientId !== id) : [...prev, id]);
  };

  // --- DYNAMIC KPI CALCULATIONS ---
  const totalMRR = dbData.clients.reduce((sum, client) => sum + (client.mrr || 0), 0);
  const annualizedRevenue = (totalMRR * 12) + 215000;

  // --- AUTHENTICATION GATE ---
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- MAIN RENDER ---
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-stone-800 overflow-hidden">
      
      {/* TOAST SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-stone-900 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 duration-300">
            {toast.icon} <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* COMMAND PALETTE (Ctrl+K) */}
      {cmdPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200">
          <div className="bg-white w-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input autoFocus type="text" placeholder="Search clients, actions, or modules..." className="flex-1 outline-none text-lg font-medium" />
              <button onClick={() => setCmdPaletteOpen(false)} className="text-xs bg-gray-100 px-2 py-1 rounded font-bold text-gray-500">ESC</button>
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">Quick Actions</p>
              <button onClick={() => {setCmdPaletteOpen(false); setSlideOver({isOpen:true});}} className="w-full text-left px-4 py-3 hover:bg-amber-50 rounded-lg flex items-center gap-3 font-semibold text-stone-700"><Plus className="w-4 h-4 text-amber-600"/> Add New Client</button>
              <button onClick={() => {setCmdPaletteOpen(false); setActiveTab('tasks');}} className="w-full text-left px-4 py-3 hover:bg-amber-50 rounded-lg flex items-center gap-3 font-semibold text-stone-700"><ListTodo className="w-4 h-4 text-amber-600"/> View My Tasks</button>
              <button onClick={() => {setCmdPaletteOpen(false); setIsAuthenticated(false);}} className="w-full text-left px-4 py-3 hover:bg-rose-50 rounded-lg flex items-center gap-3 font-semibold text-rose-600"><LogOut className="w-4 h-4"/> Log Out Securely</button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE OVER */}
      {slideOver.isOpen && (
        <div className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-[500px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-stone-900">Onboard New Client</h2>
              <button onClick={() => setSlideOver({ isOpen: false })} className="p-2 hover:bg-gray-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleAddClient} className="space-y-5">
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Business Name</label><input name="clientName" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Contact Person</label><input name="contactPerson" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service</label><select name="service" className="w-full px-4 py-2 border rounded-lg outline-none"><option>Google Local SEO</option><option>Meta Ads</option><option>WhatsApp CRM</option></select></div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Retainer (₹ / Month)</label><input name="mrr" type="number" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
                <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 shadow-lg">Save & Generate Tasks</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1C1917] text-white flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-stone-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl"><Target className="w-6 h-6 text-white" /></div>
            <h1 className="text-2xl font-black text-white">MarketIQ</h1>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold ml-12">Enterprise Suite</span>
        </div>
        
        <nav className="flex flex-col gap-1 px-3 mt-4 flex-1 overflow-y-auto pb-6">
          <p className="px-4 py-2 text-xs font-bold text-stone-500 uppercase">Analytics</p>
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'dashboard' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:bg-stone-800'}`}><LayoutDashboard className="w-5 h-5" /> Executive Overview</button>
          
          <p className="px-4 py-2 mt-4 text-xs font-bold text-stone-500 uppercase">Team Operations</p>
          <button onClick={() => setActiveTab('crm')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'crm' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:bg-stone-800'}`}><Users className="w-5 h-5" /> Client Pipeline</button>
          <button onClick={() => setActiveTab('tasks')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'tasks' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:bg-stone-800'}`}><ListTodo className="w-5 h-5" /> Task Workflows</button>
          <button onClick={() => setActiveTab('audit')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'audit' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:bg-stone-800'}`}><History className="w-5 h-5" /> Security Audit Log</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen bg-[#F3F4F6]">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-stone-800 tracking-wide">{activeTab.toUpperCase()}</h2>
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 cursor-pointer hover:bg-gray-200" onClick={() => setCmdPaletteOpen(true)}>
              <Command className="w-3 h-3" /> Ctrl + K
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => { fetchDatabase(); showToast('Database Synced.'); }} className="flex items-center gap-2 text-xs font-bold text-stone-600 bg-gray-50 border px-4 py-2 rounded-lg hover:bg-gray-100"><RefreshCw className="w-3 h-3" /> Sync</button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200 cursor-pointer group" onClick={() => setIsAuthenticated(false)}>
              <div className="h-8 w-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-rose-600 transition-colors">AD</div>
              <LogOut className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-colors" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
               <div className="animate-pulse space-y-6"><div className="h-32 bg-gray-200 rounded-2xl"></div><div className="h-96 bg-gray-200 rounded-2xl"></div></div>
            ) : (
              <>
                {/* 1. DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 bg-gradient-to-br from-white to-emerald-50"><h3 className="text-gray-500 text-sm font-semibold">Proj. Annual Revenue</h3><p className="text-3xl font-black mt-2 text-emerald-700">{formatINR(annualizedRevenue)}</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border"><h3 className="text-gray-500 text-sm font-semibold">Total Monthly Retainers</h3><p className="text-3xl font-black mt-2">{formatINR(totalMRR)}</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border"><h3 className="text-gray-500 text-sm font-semibold">Total Clients</h3><p className="text-3xl font-black mt-2">{dbData.clients.length}</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border"><h3 className="text-gray-500 text-sm font-semibold">Pending Tasks</h3><p className="text-3xl font-black mt-2">{dbData.tasks.filter(t => t.status==='Pending').length}</p></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
                        <h3 className="text-lg font-bold text-stone-900 mb-6">Revenue & Spend Trajectory</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={rawChartData}>
                              <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} dy={10} />
                              <YAxis tickFormatter={(val) => `₹${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} />
                              <RechartsTooltip cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#colorRev)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border">
                        <h3 className="text-lg font-bold text-stone-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          {dbData.activities.slice(0, 5).map((act, i) => (
                            <div key={i} className="flex gap-3 text-sm">
                              <div className="mt-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div></div>
                              <div><p className="font-semibold text-stone-800">{act.description}</p><p className="text-xs text-gray-500">{act.time}</p></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CRM TAB (WITH BULK ACTIONS) */}
                {activeTab === 'crm' && (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black text-stone-900">Client Pipeline</h2>
                      <div className="flex gap-3">
                        {selectedClients.length > 0 && (
                           <button onClick={() => showToast(`Exported ${selectedClients.length} records.`)} className="bg-white border px-4 py-2.5 rounded-lg text-sm font-bold text-stone-700 shadow-sm flex items-center gap-2"><Download className="w-4 h-4"/> Export Selected</button>
                        )}
                        <button onClick={() => setSlideOver({ isOpen: true })} className="flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-amber-700 shadow-lg"><Plus className="w-4 h-4" /> Add Client</button>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b">
                          <tr className="text-gray-500 text-xs uppercase font-bold">
                            <th className="p-4 w-10"></th>
                            <th className="p-4">ID</th>
                            <th className="p-4">Business</th>
                            <th className="p-4">Source</th>
                            <th className="p-4">Retainer</th>
                            <th className="p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {dbData.clients.map((lead) => (
                            <tr key={lead.id} className={`hover:bg-gray-50 transition-colors ${selectedClients.includes(lead.id) ? 'bg-amber-50/30' : ''}`}>
                              <td className="p-4 text-center">
                                <input type="checkbox" checked={selectedClients.includes(lead.id)} onChange={() => toggleClientSelection(lead.id)} className="w-4 h-4 accent-amber-600 rounded cursor-pointer" />
                              </td>
                              <td className="p-4 text-xs font-black text-stone-500">{lead.id}</td>
                              <td className="p-4 font-bold text-stone-900">{lead.client}</td>
                              <td className="p-4 text-sm text-stone-500">{lead.source}</td>
                              <td className="p-4 text-sm font-bold text-stone-900">{formatINR(lead.mrr)}</td>
                              <td className="p-4"><StatusBadge status={lead.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. TASKS TAB (NEW) */}
                {activeTab === 'tasks' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-black text-stone-900 mb-6">Workflow Tasks</h2>
                    <div className="bg-white rounded-2xl border shadow-sm p-6">
                      <div className="space-y-4">
                        {dbData.tasks.length === 0 ? <p className="text-gray-500">No pending tasks.</p> : dbData.tasks.map(task => (
                          <div key={task.id} className={`flex items-center justify-between p-4 rounded-xl border ${task.status === 'Completed' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 shadow-sm'}`}>
                            <div className="flex items-center gap-4">
                              <button disabled={task.status === 'Completed'} onClick={() => handleCompleteTask(task.id)} className={`${task.status === 'Completed' ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-500'} transition-colors`}>
                                <CheckSquare className="w-6 h-6" />
                              </button>
                              <div>
                                <p className={`font-bold ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-stone-900'}`}>{task.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">Task ID: {task.id}</p>
                              </div>
                            </div>
                            <StatusBadge status={task.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. AUDIT LOG (NEW) */}
                {activeTab === 'audit' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-black text-stone-900 mb-6">Security Audit Log</h2>
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b">
                          <tr className="text-gray-500 text-xs uppercase font-bold">
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Event Description</th>
                            <th className="p-4">User</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {dbData.activities.map((act) => (
                            <tr key={act.id} className="hover:bg-gray-50">
                              <td className="p-4 text-xs font-semibold text-stone-500">{act.time}</td>
                              <td className="p-4 text-sm font-bold text-stone-800">{act.description}</td>
                              <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">Admin</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}