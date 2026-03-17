import { useLocation, useNavigate } from 'react-router-dom';
import { allEntities, Event } from '../data/mockData';
import { ArrowLeft, MoreHorizontal, RefreshCw, Star, Share2, Play, MapPin, Crosshair, Building2, Info, Clock, Shield, CircleAlert as AlertCircle, TrendingUp, ChevronRight, ChevronDown, Phone, CircleCheck as CheckCircle2, User, Navigation, Video, Camera } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function EventProfile() {
  const location = useLocation();
  const id = location.pathname.split('/event-profile/')[1];
  const navigate = useNavigate();
  const event = allEntities.find(e => e.id === id && e.type === 'event') as Event || allEntities.find(e => e.type === 'event') as Event;
  
  const [activeTab, setActiveTab] = useState('虚实映射');
  const [activeSubTab, setActiveSubTab] = useState('事件概况');
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!event) return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">未找到事件</h3>
      <p className="text-sm text-slate-500">该事件可能已被删除或不存在</p>
      <button onClick={() => navigate(-1)} className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-2xl">返回</button>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[2000] pointer-events-none flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="bg-primary text-white px-6 pt-14 pb-4 sticky top-0 z-30 flex items-center justify-between shadow-lg pointer-events-auto">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h1 className="text-[17px] font-bold tracking-tight">事件画像</h1>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <MoreHorizontal size={24} />
        </motion.button>
      </div>

      {/* Bottom Sheet */}
      <motion.div 
        initial={{ y: "100%", height: "68%" }}
        animate={{ 
          y: 0, 
          height: isFullScreen ? "calc(100% - 112px)" : "68%",
          borderTopLeftRadius: isFullScreen ? 0 : 24,
          borderTopRightRadius: isFullScreen ? 0 : 24
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col overflow-hidden pointer-events-auto"
      >
        {/* Drag Handle */}
        <div 
          className="w-full shrink-0 transition-all cursor-pointer pt-4 pb-2"
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
            <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-8">
          {/* Sheet Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-[19px] font-bold text-slate-900 truncate max-w-[200px] font-display">{event.name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(event.reportTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">一般等级</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><RefreshCw size={18} /></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><Star size={18} /></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><Share2 size={18} /></motion.button>
            </div>
          </div>

          {/* Video Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-[16/9] bg-slate-100 rounded overflow-hidden relative mb-8 shadow-sm group"
          >
            <img 
              src="https://picsum.photos/seed/video/800/450" 
              alt="Video thumbnail" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/90 backdrop-blur-md rounded flex items-center justify-center pl-1 shadow-xl text-slate-900"
              >
                <Play size={32} />
              </motion.button>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
              实时监控 · 01
            </div>
          </motion.div>

          {/* Main Tabs */}
          <div className="flex bg-slate-100/80 rounded p-1.5 mb-8 border border-slate-200/50">
            {['虚实映射', '实施监控', '镜头切片'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 text-[13px] font-bold rounded transition-all uppercase tracking-widest relative",
                  activeTab === tab ? "text-primary" : "text-slate-500"
                )}
              >
                {activeTab === tab && (
                  <motion.div layoutId="event-main-tab" className="absolute inset-0 bg-white rounded shadow-sm" />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Sub Tabs and Content */}
          {activeTab === '虚实映射' && (
            <>
              <div className="flex border-b border-slate-100 mb-8 overflow-x-auto hide-scrollbar">
                {['事件概况', '应急人员', '事件流程', '事件动态'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={cn(
                      "px-6 py-4 text-[13px] font-bold whitespace-nowrap border-b-4 transition-all uppercase tracking-widest",
                      activeSubTab === tab ? "border-primary text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <AnimatePresence mode="wait">
                {activeSubTab === '事件概况' ? (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2 pb-12"
                  >
                    <InfoRow label="事件描述" value={event.description} />
                    <InfoRow label="上报时间" value={new Date(event.reportTime).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-')} />
                    <InfoRow label="事发地点" value={event.name} />
                    <InfoRow 
                      label="当前环节" 
                      value={
                        <span className={cn(
                          "px-3 py-1 text-[11px] font-bold rounded uppercase tracking-widest",
                          event.status === 'processing' ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"
                        )}>
                          {event.status === 'processing' ? '处置中' : event.status === 'pending' ? '待处理' : '已解决'}
                        </span>
                      } 
                    />
                    <InfoRow label="事件标签" value="事故多发;人口密集;临近工地" />
                    <InfoRow 
                      label="事件来源" 
                      value={
                        <span className="px-3 py-1 bg-primary text-white text-[11px] font-bold rounded uppercase tracking-widest">
                          AI识别
                        </span>
                      } 
                    />
                  </motion.div>
                ) : activeSubTab === '应急人员' ? (
              <motion.div 
                key="personnel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 pb-12"
              >
                {[
                  { name: '张建国', role: '网格员', distance: '120m', phone: '138****1234', status: '已到达', time: '10分钟前' },
                  { name: '李明', role: '安保人员', distance: '350m', phone: '139****5678', status: '赶往中', time: '预计5分钟' },
                  { name: '王医生', role: '医疗人员', distance: '1.2km', phone: '137****9012', status: '待命', time: '-' },
                ].map((person, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900">{person.name}</h4>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-widest">{person.role}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[12px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><Navigation size={12} className="text-primary" /> {person.distance}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {person.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={cn(
                        "text-[11px] font-bold uppercase tracking-widest",
                        person.status === '已到达' ? "text-emerald-500" : person.status === '赶往中' ? "text-amber-500" : "text-slate-400"
                      )}>
                        {person.status}
                      </span>
                      <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Phone size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : activeSubTab === '事件流程' ? (
              <motion.div 
                key="flow"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="pb-12 px-2"
              >
                <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
                  {[
                    { time: '08:30', date: '2026-03-12', title: '事件上报', desc: '系统AI识别到异常情况并自动上报', status: 'completed' },
                    { time: '08:35', date: '2026-03-12', title: '指挥中心调度', desc: '指挥中心已确认事件，并指派附近网格员张建国前往核实', status: 'completed' },
                    { time: '08:45', date: '2026-03-12', title: '人员到达现场', desc: '网格员张建国已到达现场，正在进行初步处置', status: 'completed' },
                    { time: '09:10', date: '2026-03-12', title: '事件处置中', desc: '安保人员李明正在协助处理，现场秩序已控制', status: 'processing' },
                    { time: '预计 10:00', date: '-', title: '事件办结', desc: '等待最终处理结果确认及结案报告', status: 'pending' },
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div className={cn(
                        "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center",
                        step.status === 'completed' ? "border-emerald-500" : step.status === 'processing' ? "border-primary" : "border-slate-200"
                      )}>
                        {step.status === 'completed' && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
                        {step.status === 'processing' && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <h4 className={cn(
                            "font-bold text-[15px]",
                            step.status === 'pending' ? "text-slate-400" : "text-slate-900"
                          )}>{step.title}</h4>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">
                            {step.time}
                          </span>
                        </div>
                        <p className={cn(
                          "text-[13px] leading-relaxed mt-1",
                          step.status === 'pending' ? "text-slate-400" : "text-slate-600"
                        )}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <Info size={24} className="text-slate-200" />
                </div>
                <p className="text-[14px] font-bold text-slate-300 uppercase tracking-widest">暂无数据</p>
              </motion.div>
            )}
          </AnimatePresence>
            </>
          )}

          {activeTab === '实施监控' && (
            <motion.div 
              key="monitoring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">周边监控画面</h3>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded uppercase tracking-widest flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  实时接入中
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'CAM-01', location: '路口西北角', status: '在线' },
                  { id: 'CAM-02', location: '人行道东侧', status: '在线' },
                  { id: 'CAM-03', location: '主干道全景', status: '在线' },
                  { id: 'CAM-04', location: '辅道监控', status: '在线' },
                ].map((cam, idx) => (
                  <div key={idx} className="bg-slate-100 rounded-xl overflow-hidden relative group cursor-pointer">
                    <img 
                      src={`https://picsum.photos/seed/cam${idx}/400/300`} 
                      alt={cam.location} 
                      className="w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105 duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-white text-[11px] font-bold truncate pr-2">{cam.location}</span>
                      <Camera size={12} className="text-white/70" />
                    </div>
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/40 backdrop-blur-md rounded border border-white/10 text-[9px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                      {cam.id}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === '镜头切片' && (
            <motion.div 
              key="clips"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">事件关键片段</h3>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">共 3 段</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '08:30:12', title: '异常情况初现', duration: '00:15', type: 'AI自动截取' },
                  { time: '08:45:05', title: '网格员到达现场', duration: '00:42', type: '手动保存' },
                  { time: '09:10:30', title: '现场秩序控制', duration: '01:20', type: '手动保存' },
                ].map((clip, idx) => (
                  <div key={idx} className="flex gap-3 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm group hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="w-28 shrink-0 aspect-video bg-slate-100 rounded-xl overflow-hidden relative">
                      <img 
                        src={`https://picsum.photos/seed/clip${idx}/400/225`} 
                        alt={clip.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <Play size={20} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      </div>
                      <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/60 rounded text-[9px] font-bold text-white">
                        {clip.duration}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center py-1 pr-2 flex-1 min-w-0">
                      <h4 className="font-bold text-[13px] text-slate-900 truncate mb-1">{clip.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Clock size={10} /> {clip.time}</span>
                        <div className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                        <span className="text-primary">{clip.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex py-5 border-b border-slate-50 last:border-0 items-start group">
      <div className="w-24 shrink-0 text-[13px] text-slate-400 font-bold uppercase tracking-widest pt-0.5">{label}</div>
      <div className="flex-1 text-[15px] text-slate-700 font-medium text-right leading-relaxed group-hover:text-slate-900 transition-colors">{value}</div>
    </div>
  );
}
