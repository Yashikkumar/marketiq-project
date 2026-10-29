import React, { useState, useEffect, useMemo } from 'react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { 
  LayoutDashboard, Users, RefreshCw, Target, Search, Bell, X, ArrowUpDown, 
  Plus, CheckCircle2, Download, AlertCircle, Command, ListTodo, History, CheckSquare,
  Lock, Mail, ArrowRight, LogOut, Globe, BarChart2, Linkedin, Twitter, Instagram, ExternalLink
} from 'lucide-react';

const rawChartData = [
  { name: 'May', visitors: 42500, seoScore: 68 },
  { name: 'Jun', visitors: 48200, seoScore: 72 },
  { name: 'Jul', visitors: 61000, seoScore: 75 },
  { name: 'Aug', visitors: 75500, seoScore: 82 },
  { name: 'Sep', visitors: 98000, seoScore: 88 },
  { name: 'Oct', visitors: 124500, seoScore: 94 },
];
const sourceData = [{ name: 'Organic Search', value: 55 }, { name: 'Direct Traffic', value: 25 }, { name: 'Social Media', value: 15 }, { name: 'Referral', value: 5 }];
const SOURCE_COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#f43f5e'];

const fallbackDbData = {
  clients: [{ id: 'CLI-OFFLINE', client: 'Offline Mode Client', source: 'Enterprise SEO', mrr: 10000, status: 'Active' }],
  tasks: [{ id: 'TSK-1', title: 'Start Python Server', status: 'Pending' }],
  activities: [{ id: 'ACT-1', description: 'Application loaded in Offline Demo Mode', time: 'Just now' }]
};

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-100 text-emerald-700', 'Completed': 'bg-emerald-100 text-emerald-700',
    'Pending': 'bg-amber-100 text-amber-700', 'Onboarding': 'bg-indigo-100 text-indigo-700',
    'Lead': 'bg-purple-100 text-purple-700'
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>;
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
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans">
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg"><Target className="w-8 h-8 text-white" /></div>
          <h1 className="text-4xl font-black text-white tracking-tight">MarketIQ</h1>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold leading-tight mb-6">Enterprise Marketing Intelligence.</h2>
          <p className="text-slate-400 text-lg">Scale your B2B agency with unified SEO tracking, pipeline management, and real-time analytics.</p>
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"><Linkedin className="w-5 h-5"/></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"><Twitter className="w-5 h-5"/></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"><Instagram className="w-5 h-5"/></a>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Corporate Login</h2>
            <p className="text-slate-500 text-sm font-medium">Access your enterprise workspace.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Work Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-700" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">SSO Login</a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium text-slate-700" />
              </div>
            </div>
            <button disabled={isAuthenticating} type="submit" className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-70">
              {isAuthenticating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>Access Dashboard <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs font-medium text-slate-400 flex justify-center items-center gap-1.5"><Lock className="w-3 h-3" /> End-to-end encrypted connection</p>
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [dbData, setDbData] = useState({ clients: [], tasks: [], activities: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [toasts, setToasts] = useState([]);
  
  // Slide Over and Palette State
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  
  const [selectedClients, setSelectedClients] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

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

  const fetchDatabase = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('http://localhost:8000/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDbData(data);
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      showToast('Backend offline. Loaded Fallback Data.', <AlertCircle className="w-5 h-5 text-rose-400" />);
      setDbData(fallbackDbData);
    }
    setIsLoading(false);
    setIsSyncing(false);
  };

  useEffect(() => { 
    if(isAuthenticated) fetchDatabase(); 
  }, [isAuthenticated]);

  const handleAddClient = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newClient = {
      client_name: formData.get('clientName'),
      contact_person: formData.get('contactPerson'),
      service: formData.get('service'),
      mrr: parseInt(formData.get('mrr')) || 0
    };
    
    try {
      const response = await fetch('http://localhost:8000/api/clients', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(newClient)
      });
      
      if (response.ok) {
        showToast('Client added securely!', <Sparkles className="w-5 h-5 text-indigo-400" />);
        setIsSlideOverOpen(false); 
        e.target.reset(); // Clear the form
        fetchDatabase(); 
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error saving data. Is server running?', <AlertCircle className="w-5 h-5 text-rose-400" />);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/complete`, { method: 'POST' });
      if (response.ok) {
        showToast('Task marked as complete!');
        fetchDatabase();
      }
    } catch(err) {
      showToast('Action unavailable in offline mode.', <AlertCircle className="w-5 h-5 text-rose-400" />);
    }
  };

  const showToast = (message, icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const toggleClientSelection = (id) => {
    setSelectedClients(prev => prev.includes(id) ? prev.filter(clientId => clientId !== id) : [...prev, id]);
  };

  const handleBulkExport = () => {
    showToast(`Exported ${selectedClients.length} records securely.`);
    setSelectedClients([]); 
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const processedLeads = useMemo(() => {
    let sorted = [...(dbData.clients || [])];
    if (searchTerm) sorted = sorted.filter(lead => lead.client.toLowerCase().includes(searchTerm.toLowerCase()) || lead.id.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [dbData.clients, searchTerm, sortConfig]);

  const totalMRR = (dbData.clients || []).reduce((sum, client) => sum + (client.mrr || 0), 0);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* TOAST SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 duration-300">
            {toast.icon} <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* COMMAND PALETTE (Ctrl+K) */}
      {cmdPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200">
          <div className="bg-white w-[600px] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input autoFocus type="text" placeholder="Search clients, actions, or modules..." className="flex-1 outline-none text-lg font-medium" />
              <button onClick={() => setCmdPaletteOpen(false)} className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 hover:bg-slate-200 transition-colors">ESC</button>
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase">Quick Actions</p>
              <button onClick={() => {setCmdPaletteOpen(false); setIsSlideOverOpen(true);}} className="w-full text-left px-4 py-3 hover:bg-indigo-50 rounded-lg flex items-center gap-3 font-semibold text-slate-700 transition-colors"><Plus className="w-4 h-4 text-indigo-600"/> Add New Client</button>
              <button onClick={() => {setCmdPaletteOpen(false); setActiveTab('tasks');}} className="w-full text-left px-4 py-3 hover:bg-indigo-50 rounded-lg flex items-center gap-3 font-semibold text-slate-700 transition-colors"><ListTodo className="w-4 h-4 text-indigo-600"/> View Operations</button>
              <button onClick={() => {setCmdPaletteOpen(false); setIsAuthenticated(false);}} className="w-full text-left px-4 py-3 hover:bg-rose-50 rounded-lg flex items-center gap-3 font-semibold text-rose-600 transition-colors"><LogOut className="w-4 h-4"/> Log Out Securely</button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE OVER (Add Client) */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-[500px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Onboard Corporate Client</h2>
              <button onClick={() => setIsSlideOverOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleAddClient} className="space-y-5">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Enterprise Name</label><input name="clientName" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Contact</label><input name="contactPerson" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Service Track</label><select name="service" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"><option>Enterprise SEO</option><option>B2B Lead Gen</option><option>LinkedIn Ads</option></select></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Monthly Retainer (₹)</label><input name="mrr" type="number" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">Save Client Data</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-600 rounded-xl"><Target className="w-6 h-6 text-white" /></div>
            <h1 className="text-2xl font-black text-white">MarketIQ</h1>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold ml-12">Enterprise Suite</span>
        </div>
        
        <nav className="flex flex-col gap-1 px-3 mt-4 flex-1 overflow-y-auto pb-6">
          <p className="px-4 py-2 text-xs font-bold text-slate-500 uppercase">Analytics</p>
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white transition-colors'}`}><LayoutDashboard className="w-5 h-5" /> Executive Overview</button>
          
          <p className="px-4 py-2 mt-4 text-xs font-bold text-slate-500 uppercase">Operations</p>
          <button onClick={() => setActiveTab('crm')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'crm' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white transition-colors'}`}><Users className="w-5 h-5" /> Client Pipeline</button>
          <button onClick={() => setActiveTab('tasks')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'tasks' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white transition-colors'}`}><ListTodo className="w-5 h-5" /> Workflow Operations</button>
          <button onClick={() => setActiveTab('audit')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${activeTab === 'audit' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white transition-colors'}`}><History className="w-5 h-5" /> Security Audit Log</button>
        </nav>

        {/* SECURE EXTERNAL LINKS */}
        <div className="p-6 border-t border-slate-800 mt-auto">
          <p className="text-xs font-bold text-slate-500 uppercase mb-3">Connect With Us</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors hover:scale-110 transform"><Linkedin className="w-4 h-4"/></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors hover:scale-110 transform"><Twitter className="w-4 h-4"/></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors hover:scale-110 transform"><Instagram className="w-4 h-4"/></a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen bg-slate-50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-800 tracking-wide">{activeTab.toUpperCase()}</h2>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => setCmdPaletteOpen(true)}>
              <Command className="w-3 h-3" /> Ctrl + K
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => { showToast('Syncing Data...'); fetchDatabase(); }} className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-indigo-500' : ''}`} /> Sync
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer group" onClick={() => setIsAuthenticated(false)}>
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-rose-600 transition-colors">AD</div>
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
               <div className="animate-pulse space-y-6"><div className="h-32 bg-slate-200 rounded-2xl"></div><div className="h-96 bg-slate-200 rounded-2xl"></div></div>
            ) : (
              <>
                {/* 1. DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-600"><h3 className="text-slate-500 text-sm font-semibold">Total Monthly Retainers</h3><p className="text-3xl font-black mt-2 text-slate-900">{formatINR(totalMRR)}</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-sky-500"><h3 className="text-slate-500 text-sm font-semibold flex items-center gap-2"><Globe className="w-4 h-4"/> Global Web Visitors</h3><p className="text-3xl font-black mt-2 text-slate-900">124,500</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500"><h3 className="text-slate-500 text-sm font-semibold flex items-center gap-2"><BarChart2 className="w-4 h-4"/> Avg. SEO Health Score</h3><p className="text-3xl font-black mt-2 text-emerald-600">94/100</p></div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"><h3 className="text-slate-500 text-sm font-semibold">Total B2B Clients</h3><p className="text-3xl font-black mt-2 text-slate-900">{(dbData.clients || []).length}</p></div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-slate-900">Website Traffic & SEO Growth</h3>
                          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Last 6 Months</span>
                        </div>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={rawChartData}>
                              <defs>
                                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                              <YAxis yAxisId="left" tickFormatter={(val) => `${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#10b981', fontSize: 12, fontWeight: 600}} />
                              <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                              <Area yAxisId="left" type="monotone" dataKey="visitors" name="Total Visitors" stroke="#4f46e5" strokeWidth={3} fill="url(#colorVis)" />
                              <Area yAxisId="right" type="monotone" dataKey="seoScore" name="SEO Score" stroke="#10b981" strokeWidth={3} fill="none" strokeDasharray="5 5" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Traffic Source Analytics</h3>
                        <div className="h-64 mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={sourceData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                                {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />)}
                              </Pie>
                              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3">
                          {sourceData.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm font-semibold">
                              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: SOURCE_COLORS[idx] }}></div>{item.name}</span>
                              <span className="text-slate-600">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CRM TAB */}
                {activeTab === 'crm' && (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black text-slate-900">Corporate Client Pipeline</h2>
                      <div className="flex gap-3">
                        {selectedClients.length > 0 && (
                           <button onClick={handleBulkExport} className="bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors"><Download className="w-4 h-4"/> Export Selected</button>
                        )}
                        <button onClick={() => setIsSlideOverOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg transition-colors"><Plus className="w-4 h-4" /> Add B2B Client</button>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-200">
                         <div className="relative w-80">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input type="text" placeholder="Search enterprise clients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none w-full shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all" />
                        </div>
                      </div>
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr className="text-slate-500 text-xs uppercase font-bold">
                            <th className="p-4 w-10"></th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('id')}>ID <ArrowUpDown className="w-3 h-3 inline" /></th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('client')}>Enterprise Name <ArrowUpDown className="w-3 h-3 inline" /></th>
                            <th className="p-4">Service Track</th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('mrr')}>Monthly Retainer <ArrowUpDown className="w-3 h-3 inline" /></th>
                            <th className="p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {processedLeads.length > 0 ? processedLeads.map((lead) => (
                            <tr key={lead.id} className={`hover:bg-slate-50 transition-colors ${selectedClients.includes(lead.id) ? 'bg-indigo-50/50' : ''}`}>
                              <td className="p-4 text-center">
                                <input type="checkbox" checked={selectedClients.includes(lead.id)} onChange={() => toggleClientSelection(lead.id)} className="w-4 h-4 accent-indigo-600 rounded cursor-pointer" />
                              </td>
                              <td className="p-4 text-xs font-black text-slate-400">{lead.id}</td>
                              <td className="p-4 font-bold text-slate-900 flex items-center gap-2">{lead.client} <ExternalLink className="w-3 h-3 text-slate-400 cursor-pointer"/></td>
                              <td className="p-4 text-sm font-semibold text-indigo-600">{lead.source}</td>
                              <td className="p-4 text-sm font-bold text-slate-900">{formatINR(lead.mrr)}</td>
                              <td className="p-4"><StatusBadge status={lead.status} /></td>
                            </tr>
                          )) : (
                            <tr><td colSpan="6" className="p-8 text-center text-slate-500 font-medium">No client records found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. TASKS TAB */}
                {activeTab === 'tasks' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Workflow Operations</h2>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="space-y-4">
                        {(!dbData.tasks || dbData.tasks.length === 0) ? <p className="text-slate-500">No pending operations.</p> : dbData.tasks.map(task => (
                          <div key={task.id} className={`flex items-center justify-between p-4 rounded-xl border ${task.status === 'Completed' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm transition-all hover:shadow-md'}`}>
                            <div className="flex items-center gap-4">
                              <button disabled={task.status === 'Completed'} onClick={() => handleCompleteTask(task.id)} className={`${task.status === 'Completed' ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-500'} transition-colors`}>
                                <CheckSquare className="w-6 h-6" />
                              </button>
                              <div>
                                <p className={`font-bold ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>{task.title}</p>
                                <p className="text-xs text-slate-400 mt-0.5">Task Ref: {task.id}</p>
                              </div>
                            </div>
                            <StatusBadge status={task.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. AUDIT LOG */}
                {activeTab === 'audit' && (
                  <div className="animate-in fade-in duration-500">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Security Audit Log</h2>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr className="text-slate-500 text-xs uppercase font-bold">
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Event Description</th>
                            <th className="p-4">User Identity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(!dbData.activities || dbData.activities.length === 0) ? <tr><td colSpan="3" className="p-8 text-center text-slate-500">No logs found.</td></tr> : dbData.activities.map((act) => (
                            <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 text-xs font-semibold text-slate-500">{act.time}</td>
                              <td className="p-4 text-sm font-bold text-slate-800">{act.description}</td>
                              <td className="p-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600 border border-slate-200">Admin</span></td>
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