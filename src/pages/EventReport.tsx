import { useState, FormEvent } from 'react';
import { ArrowLeft, Camera, MapPin, CloudUpload as UploadCloud, CircleCheck as CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function EventReport() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedType, setSelectedType] = useState('环境卫生');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-32 h-32 bg-emerald-50 rounded-xl flex items-center justify-center mb-8 shadow-sm border border-emerald-100"
        >
          <CheckCircle2 size={64} className="text-emerald-500" />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-slate-900 mb-3 font-display"
        >
          上报成功
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 text-center max-w-xs font-medium leading-relaxed"
        >
          您的事件已成功提交至社区管理平台，工作人员将尽快处理。
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center gap-2 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]"
        >
          正在返回首页
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-slate-200 rounded-full animate-bounce" />
            <span className="w-1 h-1 bg-slate-200 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1 h-1 bg-slate-200 rounded-full animate-bounce [animation-delay:0.4s]" />
          </span>
        </motion.div>
      </div>
    );
  }

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
          <h1 className="text-[17px] font-bold text-slate-900 flex-1 text-center pr-10 tracking-tight">事件上报</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 pb-8">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">事件类型</label>
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">必填</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['环境卫生', '公共设施', '安全隐患', '邻里纠纷', '噪音扰民', '其他'].map(type => (
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  key={type} 
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "py-4 px-2 rounded-2xl text-[13px] font-bold transition-all border shadow-sm",
                    selectedType === type 
                      ? "bg-primary border-primary text-white shadow-primary/20" 
                      : "bg-white border-slate-100 text-slate-600 hover:border-primary/20"
                  )}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">事件描述</label>
            <div className="relative">
              <textarea 
                rows={5} 
                placeholder="请详细描述事件情况，包括时间、地点、具体内容等..."
                className="w-full bg-white border border-slate-100 rounded-xl p-6 text-[15px] font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none shadow-sm"
                required
              />
              <div className="absolute bottom-4 right-6 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                0 / 500
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">发生地点</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within:text-primary transition-colors">
                <MapPin size={20} />
              </div>
              <input 
                type="text" 
                placeholder="点击获取当前位置或手动输入"
                className="w-full bg-white border border-slate-100 rounded-xl py-5 pl-20 pr-20 text-[15px] font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                required
              />
              <motion.button 
                whileTap={{ scale: 0.95 }}
                type="button" 
                className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary/10 text-primary text-[12px] font-bold rounded-xl hover:bg-primary/20 transition-colors"
              >
                自动定位
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">现场照片/视频</label>
            <div className="grid grid-cols-3 gap-4">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                type="button" 
                className="aspect-square bg-white border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary/20 hover:text-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
                  <Camera size={28} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest">拍照</span>
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                type="button" 
                className="aspect-square bg-white border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary/20 hover:text-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
                  <UploadCloud size={28} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest">相册</span>
              </motion.button>
            </div>
          </div>

          <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Info size={20} />
            </div>
            <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
              温馨提示：请确保上报内容真实有效，恶意上报可能会影响您的个人信用评分。
            </p>
          </div>

          <div className="pt-4">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-5 rounded-xl font-bold text-[17px] hover:bg-blue-600 transition-all shadow-premium disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                '提交上报'
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
