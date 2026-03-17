import { useState } from 'react';
import { BaseEntity } from '../data/mockData';
import { ChevronUp, ChevronDown, ChevronLeft, User, X, MapPin, Building2, Info, Users, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface BuildingDetailSheetProps {
  entity: BaseEntity;
  onClose: () => void;
}

export function BuildingDetailSheet({ entity, onClose }: BuildingDetailSheetProps) {
  const [floorPlanExpanded, setFloorPlanExpanded] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState('11F');
  const [selectedRoom, setSelectedRoom] = useState('1101');
  const [activeTab, setActiveTab] = useState<'person' | 'enterprise'>('person');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();

  const floors = ['7F', '8F', '9F', '10F', '11F'];
  const rooms = ['1101', '1102', '1103', '1104', '1105', '1106', '1107', '1108', '1109', '1110', '1111'];

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
      className="absolute bottom-0 left-0 right-0 glass shadow-premium z-[1000] flex flex-col overflow-hidden"
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

      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8 hide-scrollbar">
        {/* Header Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="p-1 -ml-2 text-slate-700 hover:bg-slate-100 rounded transition-colors">
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                {entity.name.replace(/\d+栋\d+/, '') || '向南商业大厦'}
              </h2>
            </div>
            <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">商业</span>
          </div>
          <p className="text-[13px] text-slate-500 mb-4 leading-relaxed flex items-start gap-1.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
            广东省深圳市南山区南山街道北头社区{entity.address}
          </p>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-lg border border-blue-100">办公楼</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg border border-emerald-100">已竣工</span>
          </div>
        </div>

        {/* Building Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">楼栋编码</div>
            <div className="text-[13px] text-slate-900 font-mono font-medium truncate">4403050020010400015</div>
          </div>
          <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">户室概况</div>
            <div className="text-[13px] text-slate-900 font-bold">12层 / 144户</div>
          </div>
        </div>

        {/* Floor Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary rounded-full shadow-sm shadow-primary/20" />
              <h3 className="text-lg font-bold text-slate-900">楼盘表</h3>
            </div>
            <button 
              className="text-primary text-[13px] font-bold flex items-center hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors"
              onClick={() => setFloorPlanExpanded(!floorPlanExpanded)}
            >
              {floorPlanExpanded ? '收起' : '展开'}
              {floorPlanExpanded ? <ChevronUp size={16} className="ml-0.5" /> : <ChevronDown size={16} className="ml-0.5" />}
            </button>
          </div>
          
          <AnimatePresence>
            {floorPlanExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border border-slate-100 rounded-3xl flex overflow-hidden h-56 shadow-sm bg-white"
              >
                {/* Floors Column */}
                <div className="w-20 bg-slate-50 border-r border-slate-100 overflow-y-auto hide-scrollbar">
                  {floors.map(floor => (
                    <button
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      className={cn(
                        "w-full py-4 text-[13px] text-center transition-all relative",
                        selectedFloor === floor 
                          ? "bg-white text-primary font-bold" 
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      {selectedFloor === floor && (
                        <motion.div layoutId="floor-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                      {floor}
                    </button>
                  ))}
                </div>
                {/* Rooms Column */}
                <div className="flex-1 p-4 overflow-y-auto bg-white hide-scrollbar">
                  <div className="grid grid-cols-3 gap-2">
                    {rooms.map(room => (
                      <button
                        key={room}
                        onClick={() => setSelectedRoom(room)}
                        className={cn(
                          "py-2.5 text-[13px] font-bold rounded-xl transition-all text-center border",
                          selectedRoom === room
                            ? "border-primary text-primary bg-primary/5 shadow-sm"
                            : "border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Room Details Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-900 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 size={18} className="text-primary" />
            </div>
            <h4 className="font-bold text-lg text-slate-900">
              {selectedRoom} 室
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">户型结构</div>
              <div className="text-[14px] font-medium text-slate-900">标准单房</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">建筑面积</div>
              <div className="text-[14px] font-medium font-mono text-slate-900">27.5 m²</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">房屋编码</div>
              <div className="text-[13px] font-mono text-slate-700">4403050020010400015000020</div>
            </div>
          </div>
        </div>

        {/* Tabs for Associated Entities */}
        <div className="pb-4">
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab('person')}
              className={cn(
                "flex-1 py-2.5 text-[14px] font-bold rounded-xl transition-all",
                activeTab === 'person' ? "bg-white text-primary shadow-sm" : "text-slate-500"
              )}
            >
              关联人员 (3)
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={cn(
                "flex-1 py-2.5 text-[14px] font-bold rounded-xl transition-all",
                activeTab === 'enterprise' ? "bg-white text-primary shadow-sm" : "text-slate-500"
              )}
            >
              关联企业 (0)
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'person' ? (
              <motion.div 
                key="person-list"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {[
                  { name: '黄盛庆', tags: ['汉族', '初中以下', '35岁'], gender: '♂' },
                  { name: '唐灿森', tags: ['汉族', '大专', '28岁'], gender: '♂' },
                  { name: '刘亮', tags: ['汉族', '大专', '30岁'], gender: '♂' },
                ].map((person, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex gap-4 hover:border-primary/20 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                      <User size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[16px] font-bold text-slate-900">{person.name}</span>
                          <span className="text-primary font-bold">{person.gender}</span>
                        </div>
                        <button 
                          className="text-[12px] font-bold text-primary hover:underline"
                          onClick={() => navigate('/entity/ps-1')}
                        >
                          详情
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {person.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="enterprise-empty"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="py-12 flex flex-col items-center justify-center text-slate-300"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                  <Briefcase size={32} />
                </div>
                <p className="text-sm font-bold">暂无关联企业</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
