import { useState } from 'react';
import { ArrowLeft, PieChart, BarChart2, Map as MapIcon, Layers, Users, Home, Briefcase, TrendingUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const pieData = [
  { name: '自住', value: 400 },
  { name: '出租', value: 300 },
  { name: '空置', value: 100 },
  { name: '商用', value: 200 },
];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const barData = [
  { name: '东区', 人口: 4000 },
  { name: '西区', 人口: 3000 },
  { name: '南区', 人口: 2000 },
  { name: '北区', 人口: 2780 },
];

export function EntityProfile() {
  const [activeTab, setActiveTab] = useState<'aoi' | 'building'>('aoi');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white px-6 pt-14 pb-6 border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 className="text-[17px] font-bold text-slate-900 flex-1 text-center pr-10 tracking-tight">空间实体画像</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 pb-32">
        {/* Tabs */}
        <div className="flex p-1.5 bg-slate-200/50 rounded-xl backdrop-blur-sm border border-slate-200/50">
          <button 
            onClick={() => setActiveTab('aoi')}
            className={cn(
              "flex-1 py-3 text-[13px] font-bold rounded-xl transition-all uppercase tracking-widest relative",
              activeTab === 'aoi' ? "text-primary" : "text-slate-500"
            )}
          >
            {activeTab === 'aoi' && (
              <motion.div layoutId="profile-tab" className="absolute inset-0 bg-white rounded-xl shadow-sm" />
            )}
            <span className="relative z-10">片区画像</span>
          </button>
          <button 
            onClick={() => setActiveTab('building')}
            className={cn(
              "flex-1 py-3 text-[13px] font-bold rounded-xl transition-all uppercase tracking-widest relative",
              activeTab === 'building' ? "text-primary" : "text-slate-500"
            )}
          >
            {activeTab === 'building' && (
              <motion.div layoutId="profile-tab" className="absolute inset-0 bg-white rounded-xl shadow-sm" />
            )}
            <span className="relative z-10">楼栋画像</span>
          </button>
        </div>

        {/* Basic Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-premium border border-slate-100 p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-inner border border-primary/10">
              {activeTab === 'aoi' ? <MapIcon size={36} /> : <Layers size={36} />}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">{activeTab === 'aoi' ? '白石洲东区' : '东区1栋'}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-widest">
                  {activeTab === 'aoi' ? 'AOI片区' : '居民楼栋'}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  <TrendingUp size={12} />
                  活跃度 92%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={Users} label="总人口" value="11,780" color="text-blue-600" bg="bg-blue-50" delay={0.1} />
          <StatCard icon={Home} label="房屋总数" value="1,000" color="text-emerald-600" bg="bg-emerald-50" delay={0.2} />
          <StatCard icon={Briefcase} label="企业数量" value="150" color="text-amber-600" bg="bg-amber-50" delay={0.3} />
          <StatCard icon={BarChart2} label="事件发生率" value="2.4%" color="text-rose-600" bg="bg-rose-50" delay={0.4} />
        </div>

        {/* Charts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-premium border border-slate-100 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <PieChart size={20} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">房屋使用类型分布</h3>
            </div>
            <button className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">详情</button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[13px] font-bold text-slate-600">{entry.name}</span>
                </div>
                <span className="text-[13px] font-mono font-bold text-slate-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-premium border border-slate-100 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BarChart2 size={20} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">各片区人口分布</h3>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 12 }} 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
                <Bar 
                  dataKey="人口" 
                  fill="#3B82F6" 
                  radius={[12, 12, 12, 12]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Info size={24} />
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-900">画像分析报告</p>
            <p className="text-[12px] text-slate-500 font-medium mt-1 leading-relaxed">
              当前片区人口密度较高，建议加强公共设施维护与安全巡查。房屋出租率稳定在30%左右。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl p-6 shadow-premium border border-slate-100 flex flex-col items-center justify-center text-center group"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm transition-transform group-hover:scale-110", bg, color)}>
        <Icon size={24} />
      </div>
      <span className="text-2xl font-bold text-slate-900 mb-1 font-mono">{value}</span>
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">{label}</span>
    </motion.div>
  );
}
