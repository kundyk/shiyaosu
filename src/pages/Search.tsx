import { useState } from "react";
import {
  Search as SearchIcon,
  Filter,
  User,
  Home,
  Briefcase,
  TriangleAlert as AlertTriangle,
  Camera,
  Box,
  MapPin,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  CircleX as XCircle,
  Clock,
  Trash2,
  Navigation,
  Building2,
  Map,
  Landmark,
  Users,
  Wifi,
  Car,
  Factory,
  Star,
  TrendingUp,
  CarTaxiFront,
  LocateFixed,
} from "lucide-react";
import { allEntities, BaseEntity } from "../data/mockData";
import { cn } from "../lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories = [
  { id: "all", label: "全部" },
  { id: "person", label: "人员" },
  { id: "house", label: "房屋" },
  { id: "building", label: "楼栋" },
  { id: "event", label: "事件" },
];

const quickCategories = [
  { id: "land", label: "宗地", icon: Map, color: "bg-[#2dd4bf]" },
  { id: "building", label: "楼宇", icon: Building2, color: "bg-[#3b82f6]" },
  { id: "house", label: "房屋", icon: Home, color: "bg-[#10b981]" },
  { id: "ownership", label: "权属", icon: Landmark, color: "bg-[#f59e0b]" },
  { id: "person", label: "人口", icon: Users, color: "bg-[#6366f1]" },
  { id: "enterprise", label: "企业", icon: Briefcase, color: "bg-[#0ea5e9]" },
  { id: "event", label: "事件", icon: AlertTriangle, color: "bg-[#ef4444]" },
  { id: "camera", label: "物联", icon: Wifi, color: "bg-[#06b6d4]" },
  { id: "parking", label: "停车", icon: Car, color: "bg-[#3b82f6]" },
  { id: "industry", label: "产业", icon: Factory, color: "bg-[#8b5cf6]" },
];

const quickTags = [
  { id: 'home', icon: Home, label: "家" },
  { id: 'company', icon: Briefcase, label: "公司" },
  { id: 'treasure', label: "深圳市宝藏买手店榜", icon: TrendingUp, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
  { id: 'yangmeikeng', label: "杨梅坑" },
  { id: 'fav', icon: Star, label: "收藏夹", iconColor: "text-yellow-500" },
  { id: 'xianhu', label: "深圳仙湖植物园" },
  { id: 'malatang', label: "深圳市麻辣烫榜", icon: TrendingUp, iconColor: "text-orange-500", bgColor: "bg-orange-50" },
];

const mockHistory = [
  { title: "宗地 T208-0054", subtitle: "宗地", tag: "常搜" },
  { title: "创维半导体设计大厦", subtitle: "楼宇", tag: "常搜" },
  { title: "科技园社区1栋201", subtitle: "房屋" },
  { title: "粤(2023)深圳市不动产权第0001234号", subtitle: "权属" },
  { title: "张伟", subtitle: "人口" },
  { title: "大疆创新科技有限公司", subtitle: "企业" },
  { title: "科苑路路面塌陷", subtitle: "事件" },
  { title: "高新南四道-01", subtitle: "物联" },
  { title: "创维半导体大厦地下停车场", subtitle: "停车" },
  { title: "南山科技园核心区", subtitle: "产业" },
];

export function Search() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialType);
  const [history, setHistory] = useState(mockHistory);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const filteredResults = allEntities.filter((entity) => {
    const matchesCategory =
      activeCategory === "all" || entity.type === activeCategory;
    const matchesQuery =
      entity.name.includes(query) || entity.address.includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text && !history.find(h => h.title === text)) {
      setHistory([{ title: text, subtitle: "搜索记录" }, ...history].slice(0, 10));
    }
  };

  const handleHistoryClick = (item: { title: string }) => {
    const matchedEntity = allEntities.find(e => e.name === item.title);
    if (matchedEntity) {
      navigate(`/?entityId=${matchedEntity.id}`);
    } else {
      handleSearch(item.title);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Amap Style Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-gray-700 active:bg-gray-100 rounded-xl"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-3 py-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white focus-within:border focus-within:border-blue-500">
          <SearchIcon size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="搜索地点、人员、房屋、事件..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            className="w-full bg-transparent border-none outline-none pl-2 pr-2 text-sm text-gray-900 placeholder-gray-400"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 shrink-0"
            >
              <XCircle size={16} className="fill-gray-300 text-white" />
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="text-sm font-medium text-gray-700 whitespace-nowrap active:text-blue-600"
        >
          搜索
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 hide-scrollbar">
        {!query && activeCategory === "all" ? (
          /* Discovery / Empty State */
          <div className="bg-white min-h-full">
            {/* Quick Categories Grid */}
            <div className="pt-4 pb-2">
              <div className={cn(
                "px-4 transition-all duration-300",
                isExpanded 
                  ? "grid grid-cols-5 gap-y-5" 
                  : "grid grid-rows-1 grid-flow-col auto-cols-[20%] overflow-x-auto hide-scrollbar snap-x snap-mandatory"
              )}>
                {quickCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity",
                      !isExpanded && "snap-start"
                    )}
                  >
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm",
                        cat.color,
                      )}
                    >
                      <cat.icon size={22} strokeWidth={2} />
                    </div>
                    <span className="text-[12px] text-gray-700">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Toggle Button */}
              <div className="flex justify-center mt-3">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 bg-gray-50 px-3 py-1 rounded-xl transition-colors"
                >
                  {isExpanded ? (
                    <>收起 <ChevronUp size={12} /></>
                  ) : (
                    <>展开全部 <ChevronDown size={12} /></>
                  )}
                </button>
              </div>
            </div>

            {/* Search History */}
            {history.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between px-4 py-3">
                  <h3 className="text-[15px] font-bold text-gray-900">历史记录</h3>
                  <div className="flex items-center gap-3 text-[13px] text-gray-400">
                    <button onClick={clearHistory} className="hover:text-gray-600">清空</button>
                    <div className="w-[1px] h-3 bg-gray-200" />
                    <button className="hover:text-gray-600">管理</button>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-3 border-b border-gray-50 active:bg-gray-50 transition-colors"
                    >
                      <div 
                        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleHistoryClick(item)}
                      >
                        <MapPin size={18} className="text-gray-600 shrink-0" />
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[15px] text-gray-900 font-medium truncate">{item.title}</span>
                          {item.subtitle && (
                            <span className="text-[13px] text-gray-400 shrink-0">{item.subtitle}</span>
                          )}
                          {item.tag && (
                            <span className="px-1 py-0.5 bg-blue-50 text-blue-500 text-[10px] rounded shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <button 
                          className="flex flex-col items-center gap-0.5 text-blue-500 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHistoryClick(item);
                          }}
                        >
                          <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center">
                            <LocateFixed size={14} />
                          </div>
                          <span className="text-[10px]">定位</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results State */
          <div className="bg-white min-h-full flex flex-col">
            {/* Horizontal Categories Filter */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100 bg-white sticky top-0 z-10 px-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors relative",
                    activeCategory === cat.id
                      ? "text-blue-600"
                      : "text-gray-600",
                  )}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="flex-1">
              {filteredResults.length > 0 ? (
                filteredResults.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => {
                      navigate(`/?entityId=${entity.id}`);
                    }}
                    className="flex items-center py-4 px-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
                  >
                    <div className="mr-3 text-gray-400 shrink-0 mt-1 self-start">
                      {entity.type === "person" ? (
                        <User size={20} className="text-blue-500" />
                      ) : entity.type === "house" ? (
                        <Home size={20} className="text-green-500" />
                      ) : entity.type === "building" ? (
                        <Building2 size={20} className="text-teal-500" />
                      ) : entity.type === "enterprise" ? (
                        <Briefcase size={20} className="text-orange-500" />
                      ) : entity.type === "event" ? (
                        <AlertTriangle size={20} className="text-red-500" />
                      ) : entity.type === "camera" ? (
                        <Camera size={20} className="text-teal-500" />
                      ) : entity.type === "land" ? (
                        <Map size={20} className="text-teal-400" />
                      ) : entity.type === "ownership" ? (
                        <Landmark size={20} className="text-amber-500" />
                      ) : entity.type === "parking" ? (
                        <Car size={20} className="text-blue-400" />
                      ) : entity.type === "industry" ? (
                        <Factory size={20} className="text-purple-500" />
                      ) : (
                        <MapPin size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-base font-medium text-gray-900 truncate">
                        {entity.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {entity.address}
                      </div>
                      <div className="flex gap-1 mt-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 border border-gray-200 text-gray-500 rounded uppercase tracking-wider">
                          {entity.type}
                        </span>
                        {entity.type === "person" && (
                          <span className="text-[10px] px-1.5 py-0.5 border border-blue-200 text-blue-600 rounded">
                            常住人口
                          </span>
                        )}
                        {entity.type === "house" && (
                          <span className="text-[10px] px-1.5 py-0.5 border border-green-200 text-green-600 rounded">
                            已入住
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center shrink-0 pl-4 border-l border-gray-100">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                        <Navigation size={16} className="ml-0.5" />
                      </div>
                      <span className="text-[10px] text-gray-500">详情</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <SearchIcon size={48} className="mb-4 opacity-20" />
                  <p className="text-sm">未找到相关结果</p>
                  <p className="text-xs mt-1 opacity-60">
                    请尝试更换关键词或分类
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
