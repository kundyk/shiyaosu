import { useParams, useNavigate } from 'react-router-dom';
import { allEntities, Person, House, Enterprise, Event, Camera, Building, Land, Ownership, Parking, Industry } from '../data/mockData';
import { ArrowLeft, MapPin, Phone, CreditCard, Building as BuildingIcon, User, TriangleAlert as AlertTriangle, Camera as CameraIcon, Share2, Star, Map, Landmark, Car, Factory, Briefcase, Info, Clock, Shield, FileText, Globe, TrendingUp, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function EntityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const entity = allEntities.find(e => e.id === id);

  if (!entity) return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-6">
        <Info size={40} className="text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">未找到该要素信息</h3>
      <p className="text-sm text-slate-500">该要素可能已被删除或不存在</p>
      <button onClick={() => navigate(-1)} className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-2xl">返回</button>
    </div>
  );

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'person': return { icon: User, color: 'text-blue-600', bg: 'bg-blue-100', label: '人口' };
      case 'house': return { icon: BuildingIcon, color: 'text-emerald-600', bg: 'bg-emerald-100', label: '房屋' };
      case 'building': return { icon: BuildingIcon, color: 'text-teal-600', bg: 'bg-teal-100', label: '楼宇' };
      case 'enterprise': return { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100', label: '企业' };
      case 'event': return { icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100', label: '事件' };
      case 'camera': return { icon: CameraIcon, color: 'text-cyan-600', bg: 'bg-cyan-100', label: '物联' };
      case 'land': return { icon: Map, color: 'text-teal-500', bg: 'bg-teal-50', label: '宗地' };
      case 'ownership': return { icon: Landmark, color: 'text-amber-600', bg: 'bg-amber-100', label: '权属' };
      case 'parking': return { icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-100', label: '停车' };
      case 'industry': return { icon: Factory, color: 'text-purple-600', bg: 'bg-purple-100', label: '产业' };
      default: return { icon: MapPin, color: 'text-slate-600', bg: 'bg-slate-100', label: '未知' };
    }
  };

  const config = getTypeConfig(entity.type);
  const Icon = config.icon;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className={cn(
        "px-4 pt-14 pb-4 sticky top-0 z-30 flex items-center justify-between transition-colors",
        entity.imageUrl ? "bg-transparent text-white" : "bg-white text-slate-900 shadow-sm border-b border-slate-100"
      )}>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)} 
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors backdrop-blur-md",
            entity.imageUrl ? "bg-black/20 hover:bg-black/30 text-white border border-white/10" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h1 className="text-[17px] font-bold tracking-tight flex-1 text-center pr-10">
          要素详情
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-8">
        {/* Image Banner */}
        {entity.imageUrl && (
          <div className="absolute top-0 left-0 right-0 h-72 z-0">
            <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-50" />
          </div>
        )}

        <div className={cn("px-4 space-y-6 relative z-10", entity.imageUrl ? "mt-40" : "mt-6")}>
          {/* Basic Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-premium border border-slate-100 p-6 relative overflow-hidden"
          >
            <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 opacity-10", config.bg.replace('100', '500').replace('50', '500'))} />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-white/50", config.bg, config.color)}>
                <Icon size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 font-display leading-tight">{entity.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-widest">
                    {config.label}
                  </span>
                  {entity.type === 'event' && (
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest",
                      (entity as Event).status === 'processing' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                      (entity as Event).status === 'resolved' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      "bg-rose-50 text-rose-600 border border-rose-100"
                    )}>
                      {(entity as Event).status === 'processing' ? '处置中' : (entity as Event).status === 'resolved' ? '已解决' : '待处理'}
                    </span>
                  )}
                  {entity.type === 'camera' && (
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest",
                      (entity as Camera).status === 'online' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                    )}>
                      {(entity as Camera).status === 'online' ? '在线' : '离线'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <MapPin size={20} className="shrink-0 text-slate-400 mt-0.5" />
              <span className="text-[14px] font-medium leading-relaxed">{entity.address}</span>
            </div>
          </motion.div>

          {/* Detailed Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-premium border border-slate-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-primary rounded-full" />
                详细档案
              </h3>
            </div>
            
            <div className="space-y-1">
              {entity.type === 'person' && (
                <>
                  <InfoRow icon={User} label="性别" value={(entity as Person).gender} />
                  <InfoRow icon={Clock} label="年龄" value={`${(entity as Person).age}岁`} />
                  <InfoRow icon={MapPin} label="籍贯" value={(entity as Person).nativePlace} />
                  <InfoRow icon={Phone} label="联系电话" value={(entity as Person).phone} />
                  <InfoRow icon={CreditCard} label="身份证号" value={(entity as Person).idCard} />
                  <InfoRow icon={BuildingIcon} label="关联房屋" value={(entity as Person).houseId} link={`/entity/${(entity as Person).houseId}`} />
                </>
              )}
              {entity.type === 'house' && (
                <>
                  <InfoRow icon={BuildingIcon} label="房屋类型" value={(entity as House).houseType} />
                  <InfoRow icon={User} label="权属人" value={(entity as House).owner} />
                  <InfoRow icon={Map} label="建筑面积" value={(entity as House).area} />
                  <InfoRow icon={FileText} label="户型结构" value={(entity as House).layout} />
                  <InfoRow icon={Shield} label="使用状态" value={(entity as House).status === 'occupied' ? '已入住' : '空置'} />
                </>
              )}
              {entity.type === 'building' && (
                <>
                  <InfoRow icon={Map} label="建筑面积" value={`${(entity as Building).area} m²`} />
                  <InfoRow icon={BuildingIcon} label="总楼层数" value={`${(entity as Building).floors}层`} />
                  <InfoRow icon={Users} label="所属社区" value={(entity as Building).community} />
                  <InfoRow icon={Briefcase} label="建筑用途" value={(entity as Building).usage} />
                  <InfoRow icon={FileText} label="建筑编码" value={(entity as Building).code} />
                </>
              )}
              {entity.type === 'enterprise' && (
                <>
                  <InfoRow icon={User} label="法人代表" value={(entity as Enterprise).legalPerson} />
                  <InfoRow icon={CreditCard} label="统一社会信用代码" value={(entity as Enterprise).creditCode} />
                  <InfoRow icon={Briefcase} label="所属行业" value={(entity as Enterprise).industry} />
                  <InfoRow icon={Landmark} label="注册资本" value={(entity as Enterprise).regCapital} />
                  <InfoRow icon={Shield} label="经营状态" value={(entity as Enterprise).status === 'active' ? '正常营业' : '已注销'} />
                </>
              )}
              {entity.type === 'event' && (
                <>
                  <InfoRow icon={AlertTriangle} label="事件类型" value={(entity as Event).eventType === 'security' ? '安全隐患' : (entity as Event).eventType === 'complaint' ? '投诉建议' : '维修上报'} />
                  <InfoRow icon={Clock} label="上报时间" value={new Date((entity as Event).reportTime).toLocaleString('zh-CN')} />
                  <InfoRow icon={User} label="处理人" value={(entity as Event).handler} />
                  <div className="pt-4 mt-2 border-t border-slate-50">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">事件描述</p>
                    <p className="text-[14px] text-slate-700 bg-slate-50 p-4 rounded-2xl leading-relaxed border border-slate-100">{(entity as Event).description}</p>
                  </div>
                </>
              )}
              {entity.type === 'camera' && (
                <>
                  <InfoRow icon={MapPin} label="所属区域" value={(entity as Camera).area} />
                  <InfoRow icon={CameraIcon} label="分辨率" value={(entity as Camera).resolution} />
                  <InfoRow icon={Globe} label="IP地址" value={(entity as Camera).ip} />
                </>
              )}
              {entity.type === 'land' && (
                <>
                  <InfoRow icon={Map} label="宗地面积" value={(entity as Land).area} />
                  <InfoRow icon={User} label="使用权人" value={(entity as Land).usageRight} />
                  <InfoRow icon={Briefcase} label="土地性质" value={(entity as Land).nature} />
                </>
              )}
              {entity.type === 'ownership' && (
                <>
                  <InfoRow icon={FileText} label="不动产权证号" value={(entity as Ownership).certNumber} />
                  <InfoRow icon={User} label="权利人" value={(entity as Ownership).owner} />
                  <InfoRow icon={Clock} label="发证日期" value={(entity as Ownership).issueDate} />
                </>
              )}
              {entity.type === 'parking' && (
                <>
                  <InfoRow icon={Car} label="总车位数" value={`${(entity as Parking).totalSpots} 个`} />
                  <InfoRow icon={Car} label="空余车位" value={`${(entity as Parking).availableSpots} 个`} />
                  <InfoRow icon={CreditCard} label="收费标准" value={(entity as Parking).feeRate} />
                </>
              )}
              {entity.type === 'industry' && (
                <>
                  <InfoRow icon={Factory} label="主导产业" value={(entity as Industry).sector} />
                  <InfoRow icon={TrendingUp} label="年产值" value={(entity as Industry).outputValue} />
                  <InfoRow icon={Briefcase} label="重点企业数" value={`${(entity as Industry).keyCompanies} 家`} />
                </>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          {entity.type === 'camera' && (entity as Camera).status === 'online' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <button 
                onClick={() => navigate(`/camera/${entity.id}`)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-[15px] active:scale-95 transition-all shadow-premium flex items-center justify-center gap-2"
              >
                <CameraIcon size={20} />
                查看实时画面
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, link }: any) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3 text-slate-500">
        {Icon && <Icon size={16} className="text-slate-400" />}
        <span className="text-[13px] font-bold">{label}</span>
      </div>
      {link ? (
        <button onClick={() => navigate(link)} className="text-[14px] font-medium text-primary hover:underline">
          {value}
        </button>
      ) : (
        <span className="text-[14px] font-medium text-slate-900 text-right max-w-[60%] truncate">{value}</span>
      )}
    </div>
  );
}
