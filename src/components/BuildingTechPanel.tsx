import { useState } from 'react';
import { Building } from '../data/mockData';
import { ChevronLeft, ChevronDown, X, MapPin, Radio, Building2, Home, Users, Briefcase, Calendar, Globe, Car, Landmark, LineChart, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface BuildingTechPanelProps {
  entity: Building;
  onClose: () => void;
  onStatChange?: (layerId: string) => void;
}

export function BuildingTechPanel({ entity, onClose, onStatChange }: BuildingTechPanelProps) {
  const [showSurroundings, setShowSurroundings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStat, setSelectedStat] = useState('权属');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const stats = [
    { id: '宗地', label: '宗地', value: 0, icon: MapPin, layerId: 'poi' },
    { id: '楼宇', label: '楼宇', value: 1, icon: Building2, layerId: 'building' },
    { id: '房屋', label: '房屋', value: 564, icon: Home, layerId: 'house' },
    { id: '权属', label: '权属', value: 1, icon: Landmark, layerId: 'enterprise' },
    { id: '人口', label: '人口', value: 1460, icon: Users, layerId: 'person' },
    { id: '企业', label: '企业', value: 639, icon: Briefcase, layerId: 'enterprise' },
    { id: '事件', label: '事件', value: 421, icon: Calendar, layerId: 'event' },
    { id: '物联', label: '物联', value: 0, icon: Globe, layerId: 'camera' },
    { id: '停车', label: '停车', value: 0, icon: Car, layerId: 'poi' },
    { id: '产业', label: '产业', value: 0, icon: LineChart, hiddenInGrid: true, layerId: 'enterprise' },
  ];

  const radarData = stats.map(stat => {
    const num = parseInt(stat.value.toString().replace(/[^0-9]/g, '')) || 0;
    let score = 30;
    if (num > 1000) score = 95;
    else if (num > 500) score = 85;
    else if (num > 100) score = 75;
    else if (num > 10) score = 60;
    else if (num > 0) score = 50;
    else score = 35;
    
    const base = (stat.id.charCodeAt(0) + stat.id.charCodeAt(stat.id.length - 1)) % 15;
    score = Math.min(100, score + base - 5);
    
    return {
      subject: stat.label,
      score: score,
      fullMark: 100,
    };
  });

  const genderData = [
    { name: '男', value: 52, color: '#3b82f6' },
    { name: '女', value: 48, color: '#ec4899' }
  ];

  const ageData = [
    { name: '0-18岁', value: 15 },
    { name: '19-35岁', value: 40 },
    { name: '36-55岁', value: 30 },
    { name: '56岁+', value: 15 }
  ];

  const enterpriseData = [
    { name: '科技', value: 45, color: '#8b5cf6' },
    { name: '金融', value: 25, color: '#f59e0b' },
    { name: '零售', value: 15, color: '#10b981' },
    { name: '服务', value: 15, color: '#64748b' }
  ];

  const houseData = [
    { name: '自住', value: 60, color: '#14b8a6' },
    { name: '出租', value: 30, color: '#f43f5e' },
    { name: '空置', value: 10, color: '#94a3b8' }
  ];

  const handleStatClick = (statId: string, layerId: string) => {
    setSelectedStat(statId);
    if (onStatChange) {
      onStatChange(layerId);
    }
  };

  return (
    <motion.div 
      initial={{ y: "100%", height: "55vh" }}
      animate={{ 
        y: 0, 
        height: isFullScreen ? "100%" : "55vh",
        borderTopLeftRadius: isFullScreen ? 0 : 24,
        borderTopRightRadius: isFullScreen ? 0 : 24
      }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 glass shadow-premium z-[1000] flex flex-col text-slate-900 font-sans overflow-hidden"
    >
      {/* Drag Handle */}
      <div 
        className={cn(
          "w-full shrink-0 transition-all cursor-pointer",
          isFullScreen ? "pt-12 pb-4" : "py-4"
        )} 
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        <div className="relative flex justify-center items-center w-full h-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <AnimatePresence>
              {isFullScreen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullScreen(false);
                  }}
                  className="p-1.5 bg-slate-100/80 hover:bg-slate-200 backdrop-blur-md rounded-full text-slate-700 shadow-sm"
                >
                  <ChevronDown size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight truncate pr-4">
          {entity.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => {
              if (showProfile) setShowProfile(false);
              else setShowSurroundings(false);
            }} 
            className={cn(
              "w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-primary transition-colors shadow-sm",
              (!showSurroundings && !showProfile) ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-rose-500 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto hide-scrollbar flex-1 pb-10">
        <AnimatePresence mode="wait">
          {!showSurroundings ? (
            <motion.div 
              key="main-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Top Section: Area & Image */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary shadow-sm shadow-primary/10">
                      <Building2 size={32} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary tracking-tighter">{entity.area}</span>
                        <span className="text-sm font-bold text-primary/60">m²</span>
                      </div>
                      <div className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">建筑面积</div>
                    </div>
                  </div>
                </div>
                <div className="w-36 h-28 rounded-2xl border border-slate-100 overflow-hidden shrink-0 shadow-md">
                  <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">总楼层数</span>
                  <span className="text-[15px] font-bold text-slate-900">{entity.floors} 层</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">所属社区</span>
                  <span className="text-[15px] font-bold text-slate-900">{entity.community}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">建筑用途</span>
                  <span className="text-[15px] font-bold text-slate-900">{entity.usage}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">建筑编码</span>
                  <span className="text-[13px] font-mono font-bold text-slate-900 truncate">{entity.code}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-[14px] font-medium text-slate-700 leading-relaxed">{entity.address}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setShowSurroundings(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl text-[15px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  <Radio size={18} className="animate-pulse" />
                  查看周边要素
                </button>
              </div>
            </motion.div>
          ) : showProfile ? (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <LineChart size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">十要素画像分析</h3>
                  <p className="text-xs text-slate-500">多维度综合评估周边配套设施</p>
                </div>
              </div>

              <div className="w-full aspect-square bg-slate-50/50 rounded-3xl border border-slate-100 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="综合评分"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-1">优势维度</div>
                  <div className="text-sm font-bold text-emerald-900">
                    {[...radarData].sort((a, b) => b.score - a.score).slice(0, 3).map(d => d.subject).join('、')}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">待提升维度</div>
                  <div className="text-sm font-bold text-amber-900">
                    {[...radarData].sort((a, b) => a.score - b.score).slice(0, 3).map(d => d.subject).join('、')}
                  </div>
                </div>
              </div>

              {/* 人口画像 */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-primary" />
                  <h4 className="font-bold text-slate-900 text-sm">人口画像</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={genderData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" stroke="none">
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* 企业画像 */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={16} className="text-primary" />
                  <h4 className="font-bold text-slate-900 text-sm">企业画像</h4>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={enterpriseData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {enterpriseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 房屋画像 */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={16} className="text-primary" />
                  <h4 className="font-bold text-slate-900 text-sm">房屋画像</h4>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={houseData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                        {houseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="surroundings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Radar Chart Area */}
              <div className="relative w-full aspect-square max-w-[300px] mx-auto my-6">
                {/* Concentric Circles */}
                <div className="absolute inset-0 rounded-full border border-slate-100 bg-slate-50/30" />
                <div className="absolute inset-[15%] rounded-full border border-slate-100" />
                <div className="absolute inset-[30%] rounded-full border border-slate-100" />
                
                {/* Center Text */}
                <div className="absolute inset-[35%] rounded-full border-4 border-white bg-primary flex items-center justify-center z-10 shadow-xl">
                  <div className="text-center text-white">
                    <div className="font-bold text-[14px] leading-tight">核心</div>
                    <div className="font-bold text-[14px] leading-tight">资产</div>
                  </div>
                </div>

                {/* Spider Web Lines */}
                {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                  <div 
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-slate-100 origin-left"
                    style={{ transform: `rotate(${deg}deg)` }}
                  />
                ))}

                {/* Nodes */}
                {stats.map((stat, index) => {
                  const angle = (index * 36 - 90) * (Math.PI / 180);
                  const radius = 45; // percentage
                  const left = 50 + radius * Math.cos(angle);
                  const top = 50 + radius * Math.sin(angle);
                  const isSelected = selectedStat === stat.id;

                  // Position for the label (closer to center)
                  const labelRadius = 25;
                  const labelLeft = 50 + labelRadius * Math.cos(angle);
                  const labelTop = 50 + labelRadius * Math.sin(angle);

                  return (
                    <div key={stat.id}>
                      {/* Icon Node */}
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "absolute w-11 h-11 -ml-5.5 -mt-5.5 rounded-2xl flex items-center justify-center cursor-pointer transition-all z-20 shadow-lg",
                          isSelected 
                            ? "bg-primary text-white scale-110" 
                            : "bg-white border border-slate-100 text-slate-400 hover:text-primary"
                        )}
                        style={{ left: `${left}%`, top: `${top}%` }}
                        onClick={() => handleStatClick(stat.id, stat.layerId)}
                      >
                        {isSelected ? (
                          <span className="font-bold text-lg font-mono">{stat.value}</span>
                        ) : (
                          <stat.icon size={20} />
                        )}
                      </motion.div>
                      
                      {/* Label */}
                      <div 
                        className={cn(
                          "absolute -ml-4 -mt-3 text-[11px] font-bold uppercase tracking-tighter z-10 transition-colors",
                          isSelected ? "text-primary" : "text-slate-300"
                        )}
                        style={{ left: `${labelLeft}%`, top: `${labelTop}%` }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                {stats.filter(s => !s.hiddenInGrid).map((stat) => (
                  <motion.div 
                    key={stat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatClick(stat.id, stat.layerId)}
                    className={cn(
                      "flex flex-col items-center justify-center py-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden shadow-sm",
                      selectedStat === stat.id
                        ? "bg-primary/5 border-primary shadow-primary/5"
                        : "bg-white border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
                      <stat.icon size={14} className={selectedStat === stat.id ? "text-primary" : ""} />
                      <span className={cn("text-[12px] font-bold", selectedStat === stat.id ? "text-primary" : "")}>{stat.label}</span>
                    </div>
                    <span className={cn(
                      "text-xl font-bold font-mono tracking-tighter",
                      selectedStat === stat.id ? "text-primary" : "text-slate-900"
                    )}>
                      {stat.value}
                    </span>
                    {selectedStat === stat.id && (
                      <motion.div layoutId="stat-active" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button 
                  onClick={() => setShowProfile(true)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-[15px] font-bold shadow-lg shadow-slate-900/20 transition-all active:scale-95"
                >
                  <LineChart size={18} />
                  画像分析
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
