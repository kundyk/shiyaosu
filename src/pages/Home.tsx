import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  allEntities,
  mockEvents,
  BAISHIZHOU_CENTER,
  BaseEntity,
  Camera,
  Event,
  House,
  Person,
} from "../data/mockData";
import {
  Search as SearchIcon,
  User,
  Home as HomeIcon,
  Briefcase,
  TriangleAlert as AlertTriangle,
  Camera as CameraIcon,
  Layers,
  LocateFixed,
  Navigation,
  MapPin,
  ChevronUp,
  LayoutGrid,
  Building2,
  Mic,
  Sparkles,
  ChevronLeft,
  RefreshCw,
  Star,
  Share2
} from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { BuildingDetailSheet } from "../components/BuildingDetailSheet";
import { BuildingTechPanel } from "../components/BuildingTechPanel";
import { EventProfile } from "./EventProfile";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom HTML Icons
const createCustomIcon = (colorClass: string, iconHtml: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-8 h-8 rounded-full ${colorClass} text-white flex items-center justify-center shadow-lg border-2 border-white">${iconHtml}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const icons = {
  person: createCustomIcon(
    "bg-blue-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  ),
  house: createCustomIcon(
    "bg-green-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  ),
  enterprise: createCustomIcon(
    "bg-orange-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
  ),
  event: createCustomIcon(
    "bg-red-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>',
  ),
  building: createCustomIcon(
    "bg-teal-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>',
  ),
  camera: createCustomIcon(
    "bg-teal-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>',
  ),
  land: createCustomIcon(
    "bg-[#2dd4bf]",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>'
  ),
  ownership: createCustomIcon(
    "bg-[#f59e0b]",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>'
  ),
  parking: createCustomIcon(
    "bg-[#3b82f6]",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>'
  ),
  industry: createCustomIcon(
    "bg-[#8b5cf6]",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M12 18h1"></path><path d="M7 18h1"></path></svg>'
  ),
  iot: createCustomIcon(
    "bg-[#06b6d4]",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>'
  ),
  default: createCustomIcon(
    "bg-gray-500",
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  ),
};

const quickActions = [
  {
    icon: LayoutGrid,
    label: "全部",
    color: "bg-[#3b66f5]",
    path: "/search",
  },
  {
    icon: Building2,
    label: "楼栋",
    color: "bg-[#2dd4bf]",
    path: "/search?type=building",
  },
  {
    icon: HomeIcon,
    label: "房屋",
    color: "bg-[#8b5cf6]",
    path: "/search?type=house",
  },
  {
    icon: AlertTriangle,
    label: "事件",
    color: "bg-[#f59e0b]",
    path: "/search?type=event",
  },
  {
    icon: CameraIcon,
    label: "摄像头",
    color: "bg-[#f97316]",
    path: "/search?type=camera",
  },
];

function MapEventsHandler({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });
  return null;
}

function MapUpdater({ selectedEntity, centerTrigger, isEventProfile }: { selectedEntity: BaseEntity | null, centerTrigger: number, isEventProfile?: boolean }) {
  const map = useMap();
  
  useEffect(() => {
    if (centerTrigger > 0) {
      map.flyTo(BAISHIZHOU_CENTER, 16, {
        animate: true,
        duration: 1
      });
    }
  }, [centerTrigger, map]);

  useEffect(() => {
    if (selectedEntity) {
      const targetLatLng = L.latLng(selectedEntity.lat, selectedEntity.lng);
      const targetZoom = 18;
      const targetPoint = map.project(targetLatLng, targetZoom);
      // Offset the center by adding to Y (moves center down, marker up)
      // If event profile is open (68% height), move marker up by 34% to center it in the top 32%
      // Otherwise, move it up by 15%
      const yOffset = map.getSize().y * (isEventProfile ? 0.34 : 0.15);
      targetPoint.y += yOffset;
      const centerLatLng = map.unproject(targetPoint, targetZoom);
      
      map.flyTo(centerLatLng, targetZoom, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedEntity, map, isEventProfile]);
  return null;
}

export function Home() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(["person", "house", "enterprise", "event", "camera", "land", "building", "ownership", "parking", "industry"]),
  );
  const [selectedEntity, setSelectedEntity] = useState<BaseEntity | null>(null);
  const [mapType, setMapType] = useState<"streets" | "satellite">("streets");
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("实时快讯");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isEventProfile = location.pathname.startsWith('/event-profile/');
  const eventIdFromPath = isEventProfile ? location.pathname.split('/event-profile/')[1] : null;

  const handleStatChange = (layerId: string) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      next.add(layerId);
      return next;
    });
  };

  useEffect(() => {
    const entityId = isEventProfile ? eventIdFromPath : searchParams.get('entityId');
    if (entityId) {
      const entity = allEntities.find(e => e.id === entityId);
      if (entity) {
        setSelectedEntity(entity);
        setSheetExpanded(false);
      }
    } else {
      setSelectedEntity(null);
    }
  }, [searchParams, eventIdFromPath, isEventProfile]);

  const handleCloseEntity = () => {
    setSelectedEntity(null);
    if (isEventProfile) {
      navigate('/');
    } else if (searchParams.has('entityId')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('entityId');
      navigate(`/?${newParams.toString()}`, { replace: true });
    }
  };

  const entityIdParam = searchParams.get('entityId');

  const filteredEntities = allEntities.filter((e) => {
    if (isEventProfile) {
      return e.id === eventIdFromPath;
    }
    if (entityIdParam) {
      return e.id === entityIdParam;
    }
    return activeLayers.has(e.type);
  });

  const [centerTrigger, setCenterTrigger] = useState<number>(0);

  const handleLocate = () => {
    setCenterTrigger(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-100 overflow-hidden">
      {/* Floating Action Buttons (Right Side) */}
      {!isEventProfile && (
        <div className={cn(
          "absolute right-4 top-4 z-[1000] flex flex-col gap-3 pointer-events-none transition-all duration-300"
        )}>
          <button
            onClick={() =>
              setMapType((t) => (t === "streets" ? "satellite" : "streets"))
            }
            className="bg-white p-3 rounded-xl shadow-lg text-gray-700 hover:text-blue-600 pointer-events-auto active:bg-gray-50"
          >
            <Layers size={22} />
          </button>
          <button
            onClick={handleLocate}
            className="bg-white p-3 rounded-xl shadow-lg text-gray-700 hover:text-blue-600 pointer-events-auto active:bg-gray-50"
          >
            <LocateFixed size={22} />
          </button>
        </div>
      )}

      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={BAISHIZHOU_CENTER}
          zoom={16}
          zoomControl={false}
          className="w-full h-full"
        >
          <MapUpdater selectedEntity={selectedEntity} centerTrigger={centerTrigger} isEventProfile={isEventProfile} />
          <MapEventsHandler onMapClick={handleCloseEntity} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={
              mapType === "streets"
                ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            }
          />
          {filteredEntities.map((entity) => (
            <Marker
              key={entity.id}
              position={[entity.lat, entity.lng]}
              icon={icons[entity.type as keyof typeof icons] || icons.default}
              eventHandlers={{
                click: () => {
                  if (isEventProfile) {
                    if (entity.type === 'event') {
                      navigate(`/event-profile/${entity.id}`);
                    } else {
                      navigate(`/?entityId=${entity.id}`);
                    }
                  } else {
                    navigate(`/?entityId=${entity.id}`);
                  }
                },
              }}
            />
          ))}
          {selectedEntity && !filteredEntities.find(e => e.id === selectedEntity.id) && (
            <Marker
              key={`selected-${selectedEntity.id}`}
              position={[selectedEntity.lat, selectedEntity.lng]}
              icon={icons[selectedEntity.type as keyof typeof icons] || icons.default}
              eventHandlers={{
                click: () => {
                  if (isEventProfile) {
                    if (selectedEntity.type === 'event') {
                      navigate(`/event-profile/${selectedEntity.id}`);
                    } else {
                      navigate(`/?entityId=${selectedEntity.id}`);
                    }
                  } else {
                    navigate(`/?entityId=${selectedEntity.id}`);
                  }
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Entity Details Popup (Amap Style Bottom Sheet) */}
      {!isEventProfile && selectedEntity && selectedEntity.type === 'camera' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[1000] pb-6 animate-in slide-in-from-bottom-4">
          <div className="w-full py-3 flex justify-center items-center">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={handleCloseEntity} className="p-1 -ml-1 text-gray-700">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-[17px] font-bold text-gray-900">
                {selectedEntity.name}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <RefreshCw size={16} />
              </button>
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <Star size={16} />
              </button>
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="px-4">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black">
              <img 
                src={`https://picsum.photos/seed/${selectedEntity.id}/800/600`} 
                alt={selectedEntity.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end text-white text-[13px]">
                <span>切片更新倒计时3秒</span>
                <span>2026-02-27 12:30:20</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isEventProfile && selectedEntity && selectedEntity.type === 'house' && (
        <BuildingDetailSheet 
          entity={selectedEntity} 
          onClose={handleCloseEntity} 
        />
      )}

      {!isEventProfile && selectedEntity && selectedEntity.type === 'building' && (
        <BuildingTechPanel 
          entity={selectedEntity as any} 
          onClose={handleCloseEntity} 
          onStatChange={handleStatChange}
        />
      )}

      {!isEventProfile && selectedEntity && selectedEntity.type !== 'camera' && selectedEntity.type !== 'house' && selectedEntity.type !== 'building' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[1000] pb-6 animate-in slide-in-from-bottom-4">
          <div className="w-full py-3 flex justify-center items-center">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={handleCloseEntity} className="p-1 -ml-1 text-gray-700">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-[17px] font-bold text-gray-900">
                {selectedEntity.name}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <Navigation size={16} />
              </button>
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <Star size={16} />
              </button>
              <button className="p-1.5 rounded-xl border border-gray-200 hover:bg-gray-50">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="px-4">
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 mb-4">
              <img 
                src={`https://picsum.photos/seed/${selectedEntity.id}/800/400`} 
                alt={selectedEntity.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-[10px]">
                {selectedEntity.type === 'person' ? '人员信息' : 
                 selectedEntity.type === 'enterprise' ? '企业档案' : 
                 selectedEntity.type === 'event' ? '事件现场' : 
                 selectedEntity.type === 'land' ? '宗地全景' : 
                 selectedEntity.type === 'ownership' ? '权属证明' : 
                 selectedEntity.type === 'parking' ? '停车场实景' : 
                 selectedEntity.type === 'industry' ? '产业园风貌' : '实景图'}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <span>{selectedEntity.address}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                {selectedEntity.type === 'person' && (
                  <>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">联系电话</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).phone || '138****8000'}</div></div>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">身份证号</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).idCard || '440305********1234'}</div></div>
                  </>
                )}
                {selectedEntity.type === 'enterprise' && (
                  <>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">法人代表</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).legalPerson || '王某某'}</div></div>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">信用代码</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).creditCode || '91440300MA5F***'}</div></div>
                  </>
                )}
                {selectedEntity.type === 'event' && (
                  <>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">事件状态</div><div className="text-[13px] font-medium mt-0.5 text-orange-500">{(selectedEntity as any).status === 'processing' ? '处理中' : '待处理'}</div></div>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">上报时间</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).reportTime?.split('T')[0] || '2026-03-10'}</div></div>
                    <div className="col-span-2 bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">事件描述</div><div className="text-[13px] font-medium mt-0.5">{(selectedEntity as any).description || '暂无详细描述'}</div></div>
                  </>
                )}
                {['land', 'ownership', 'parking', 'industry'].includes(selectedEntity.type) && (
                  <>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">管理单位</div><div className="text-[13px] font-medium mt-0.5">白石洲管理处</div></div>
                    <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[11px] text-gray-400">更新时间</div><div className="text-[13px] font-medium mt-0.5">2026-03-10</div></div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  if (selectedEntity.type === 'event') {
                    navigate(`/event-profile/${selectedEntity.id}`);
                  } else {
                    navigate(`/entity/${selectedEntity.id}`);
                  }
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-[15px] font-medium shadow-sm shadow-blue-200 active:bg-blue-700 transition-colors"
              >
                查看详细档案
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Sheet (Explore / Quick Actions) */}
      {!isEventProfile && !selectedEntity && (
        <div
          className={cn(
            "absolute left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[900] transition-all duration-300 ease-in-out flex flex-col",
            sheetExpanded ? "bottom-0 h-[55vh]" : "bottom-0 h-auto",
          )}
        >
          {/* Drag Handle */}
          <div
            className="w-full py-3 flex justify-center items-center cursor-pointer"
            onClick={() => setSheetExpanded(!sheetExpanded)}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="px-4 pb-6 overflow-y-auto hide-scrollbar flex-1">
            {/* Search Bar */}
            <div
              onClick={() => navigate("/search")}
              className="bg-white rounded-xl shadow-sm p-3 mb-4 flex items-center gap-3 pointer-events-auto active:scale-[0.98] transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center opacity-80">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-gray-400 text-sm flex-1">
                智能搜索，支持多要素查询
              </span>
              <div className="w-px h-4 bg-gray-200" />
              <button className="text-blue-500 pr-1">
                <Mic size={20} />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className={cn("bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center", sheetExpanded ? "mb-4" : "")}>
              {quickActions.map((action, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 active:opacity-70"
                >
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm",
                      action.color,
                    )}
                  >
                    <action.icon size={20} />
                  </div>
                  <span className="text-[13px] text-gray-700 font-medium">
                    {action.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            {sheetExpanded && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300">
                <div className="flex border-b border-gray-100">
                  {['实时快讯', '直击现场', '专题应用'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 py-3 text-[15px] font-medium transition-colors",
                        activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === '实时快讯' && (
                  <div>
                    <div className="text-red-500 text-sm font-medium mb-4">
                      今日重点关注事件：3
                    </div>
                    
                    <div className="space-y-4">
                      {mockEvents.map((event, index) => (
                        <div 
                          key={event.id}
                          className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            navigate(`/?entityId=${event.id}`);
                          }}
                        >
                          <img 
                            src={`https://picsum.photos/seed/${event.id}/200/150`} 
                            alt={event.name} 
                            className="w-[100px] h-[75px] rounded-lg object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{event.name}</h4>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded">
                                {event.eventType === 'security' ? '安防' : event.eventType === 'complaint' ? '投诉' : '报修'}
                              </span>
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded",
                                event.status === 'pending' ? "bg-red-50 text-red-500" : 
                                event.status === 'processing' ? "bg-orange-50 text-orange-500" : 
                                "bg-green-50 text-green-500"
                              )}>
                                {event.status === 'pending' ? '待处理' : event.status === 'processing' ? '处理中' : '已办结'}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">IOT系统</span>
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1.5 flex justify-between">
                              <span className="truncate max-w-[120px]">{event.address}</span>
                              <span>{new Date(event.reportTime).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab !== '实时快讯' && (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    暂无数据
                  </div>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
      )}

      {isEventProfile && <EventProfile />}
    </div>
  );
}
