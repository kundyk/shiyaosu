import { useParams, useNavigate } from 'react-router-dom';
import { allEntities, Camera } from '../data/mockData';
import { ArrowLeft, Maximize2, Pause, Play, Volume2, Camera as CameraIcon, Video, Settings, Share2, Info, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CameraView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const camera = allEntities.find(e => e.id === id && e.type === 'camera') as Camera;
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!camera) return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-slate-400 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
        <CameraIcon size={40} className="opacity-20" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">未找到摄像头</h3>
      <p className="text-sm opacity-60">该设备可能已离线或不存在</p>
      <button onClick={() => navigate(-1)} className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-2xl">返回</button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-hidden">
      {/* Header Overlay */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent absolute top-0 left-0 right-0 z-30 pt-14"
      >
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)} 
          className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-[17px] font-bold tracking-tight">{camera.name}</h1>
          <div className="flex items-center justify-center mt-1.5 gap-2">
            <div className="flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">LIVE</span>
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">4K ULTRA HD</span>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all"
        >
          <Settings size={22} />
        </motion.button>
      </motion.div>

      {/* Video Area */}
      <div className="flex-1 relative flex items-center justify-center bg-slate-900 overflow-hidden group">
        {/* Simulated video feed */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517732306149-e8f829eb588a?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center" 
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="w-full h-[2px] bg-primary/50 absolute top-0 animate-[scan_4s_linear_infinite]" />
        </div>

        {/* Overlay UI */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          <div className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase">REC 00:42:18</span>
          </div>
          <div className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10">
            <span className="text-[11px] font-mono font-bold tracking-widest">{currentTime.toLocaleString()}</span>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center"
          >
            {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-2" />}
          </motion.button>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col gap-3">
          <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <Maximize2 size={22} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <Share2 size={22} />
          </motion.button>
        </div>
      </div>

      {/* Controls Panel */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-slate-900/80 backdrop-blur-3xl border-t border-white/5 pb-12 pt-8 px-8"
      >
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <ControlButton icon={Volume2} label="声音" />
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all">
              {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-1.5" />}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">{isPlaying ? '暂停' : '播放'}</span>
          </motion.button>

          <ControlButton icon={CameraIcon} label="截图" />
          <ControlButton icon={Video} label="录像" />
        </div>

        <div className="mt-10 flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Info size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold">设备状态良好</p>
            <p className="text-[11px] text-white/40 font-medium">当前码率 4.2Mbps · 帧率 60fps</p>
          </div>
          <ChevronRight size={20} className="text-white/20" />
        </div>
      </motion.div>
    </div>
  );
}

function ControlButton({ icon: Icon, label }: any) {
  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/10 transition-all">
        <Icon size={24} className="text-white/60 group-hover:text-white transition-colors" />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{label}</span>
    </motion.button>
  );
}
