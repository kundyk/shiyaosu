import { User, Settings, Bell, Shield, LogOut, ChevronRight, FileText, CircleHelp as HelpCircle, Star, CreditCard, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function Profile() {
  return (
    <div className="flex flex-col h-full bg-slate-50 pb-8 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="bg-primary pt-20 pb-12 px-8 rounded-b-3xl shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 relative z-10"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-inner backdrop-blur-md overflow-hidden">
              <User size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold tracking-tight font-display">张管理员</h2>
            <p className="text-white/70 text-[14px] mt-1 flex items-center font-medium">
              <Shield size={14} className="mr-1.5 text-emerald-400" /> 社区网格员 · 南山街道
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-xl bg-white/10 text-[11px] font-bold tracking-wider backdrop-blur-sm border border-white/10 uppercase">
              ID: 8839201
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl shadow-premium p-6 grid grid-cols-3 divide-x divide-slate-100"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 font-mono">12</span>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">本周处理</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-primary font-mono">3</span>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">待办事项</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-emerald-600 font-mono">98%</span>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">完结率</span>
          </div>
        </motion.div>
      </div>

      {/* Menu List */}
      <div className="px-6 mt-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">常用功能</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem icon={FileText} label="我的上报" color="text-blue-500" bg="bg-blue-50" />
            <MenuItem icon={Bell} label="消息通知" color="text-orange-500" bg="bg-orange-50" badge="2" />
            <MenuItem icon={Star} label="我的收藏" color="text-amber-500" bg="bg-amber-50" />
            <MenuItem icon={Shield} label="权限管理" color="text-purple-500" bg="bg-purple-50" isLast />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">系统设置</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem icon={Settings} label="通用设置" color="text-slate-600" bg="bg-slate-100" />
            <MenuItem icon={HelpCircle} label="帮助与反馈" color="text-emerald-500" bg="bg-emerald-50" isLast />
          </div>
        </motion.div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full bg-rose-50 text-rose-600 font-bold py-5 rounded-xl flex items-center justify-center hover:bg-rose-100 transition-all border border-rose-100 shadow-sm"
        >
          <LogOut size={20} className="mr-2" />
          退出登录
        </motion.button>
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, color, bg, badge, isLast }: any) {
  return (
    <motion.div 
      whileTap={{ backgroundColor: "rgba(241, 245, 249, 1)" }}
      className={cn(
        "flex items-center justify-between p-5 transition-colors cursor-pointer",
        !isLast && "border-b border-slate-50"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", bg, color)}>
          <Icon size={22} />
        </div>
        <span className="font-bold text-slate-700 text-[15px]">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm shadow-rose-200">
            {badge}
          </span>
        )}
        <ChevronRight size={20} className="text-slate-300" />
      </div>
    </motion.div>
  );
}
