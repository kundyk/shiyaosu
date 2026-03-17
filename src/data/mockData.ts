export const BAISHIZHOU_CENTER: [number, number] = [22.540, 113.965];

export type EntityType = 'person' | 'house' | 'enterprise' | 'event' | 'camera' | 'poi' | 'road' | 'building' | 'land' | 'ownership' | 'parking' | 'industry';

export interface BaseEntity {
  id: string;
  name: string;
  type: EntityType;
  lat: number;
  lng: number;
  address: string;
  imageUrl?: string;
}

export interface Building extends BaseEntity {
  type: 'building';
  area: string;
  floors: number;
  community: string;
  usage: string;
  code: string;
  imageUrl: string;
}

export interface Person extends BaseEntity {
  type: 'person';
  phone: string;
  idCard: string;
  houseId: string;
  gender: string;
  age: number;
  nativePlace: string;
  imageUrl: string;
}

export interface House extends BaseEntity {
  type: 'house';
  houseType: string;
  owner: string;
  buildingId: string;
  status: 'occupied' | 'vacant';
  area: string;
  layout: string;
  imageUrl: string;
}

export interface Enterprise extends BaseEntity {
  type: 'enterprise';
  legalPerson: string;
  creditCode: string;
  status: 'active' | 'closed';
  industry: string;
  regCapital: string;
  imageUrl: string;
}

export interface Event extends BaseEntity {
  type: 'event';
  description: string;
  status: 'pending' | 'processing' | 'resolved';
  eventType: 'complaint' | 'repair' | 'security';
  reportTime: string;
  handler: string;
  imageUrl: string;
}

export interface Camera extends BaseEntity {
  type: 'camera';
  status: 'online' | 'offline';
  area: string;
  resolution: string;
  ip: string;
  imageUrl: string;
}

export interface Land extends BaseEntity {
  type: 'land';
  area: string;
  usageRight: string;
  nature: string;
  imageUrl: string;
}

export interface Ownership extends BaseEntity {
  type: 'ownership';
  certNumber: string;
  issueDate: string;
  owner: string;
  imageUrl: string;
}

export interface Parking extends BaseEntity {
  type: 'parking';
  totalSpots: number;
  availableSpots: number;
  feeRate: string;
  imageUrl: string;
}

export interface Industry extends BaseEntity {
  type: 'industry';
  sector: string;
  outputValue: string;
  keyCompanies: number;
  imageUrl: string;
}

export const mockCameras: Camera[] = [
  { id: 'cam-1', name: '高新南四道-01', type: 'camera', lat: 22.541, lng: 113.965, address: '深圳市南山区高新南四道', status: 'online', area: '科技园南区', resolution: '4K', ip: '192.168.1.101', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'cam-2', name: '东区路口监控', type: 'camera', lat: 22.540, lng: 113.966, address: '东区十字路口', status: 'online', area: '东区', resolution: '1080p', ip: '192.168.1.102', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'cam-3', name: '西区小巷监控', type: 'camera', lat: 22.539, lng: 113.964, address: '西区3巷', status: 'offline', area: '西区', resolution: '1080p', ip: '192.168.1.103', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'cam-4', name: '南区广场监控', type: 'camera', lat: 22.538, lng: 113.965, address: '南区休闲广场', status: 'online', area: '南区', resolution: '4K', ip: '192.168.1.104', imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const mockEvents: Event[] = [
  { id: 'evt-1', name: '科苑路路面塌陷', type: 'event', lat: 22.5405, lng: 113.9655, address: '南山区科苑路与高新南四道交汇处', description: '受近期连续强降雨影响，科苑路南行方向出现约2平方米的路面塌陷，深度约50cm，已设置警戒线并安排人员值守。', status: 'processing', eventType: 'security', reportTime: '2025-09-24T13:20:30Z', handler: '张建国 (路政巡查员)', imageUrl: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'evt-2', name: '夜间施工噪音扰民', type: 'event', lat: 22.5395, lng: 113.9645, address: '西区2巷5栋', description: '夜间施工噪音过大，严重影响附近居民休息，已多次沟通无果。', status: 'processing', eventType: 'complaint', reportTime: '2023-10-24T22:30:00Z', handler: '李明 (社区民警)', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356fce?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'evt-3', name: '消防通道车辆违停', type: 'event', lat: 22.5415, lng: 113.9665, address: '东区入口', description: '私家车(粤B·12345)占用消防通道，车主电话无法接通。', status: 'resolved', eventType: 'security', reportTime: '2023-10-23T14:15:00Z', handler: '王强 (物业安保)', imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const mockHouses: House[] = [
  { id: 'hs-1', name: '科技园社区1栋201', type: 'house', lat: 22.5402, lng: 113.9662, address: '深圳市南山区科技园社区1栋201', houseType: '住宅', owner: '张伟', buildingId: 'bld-1', status: 'occupied', area: '89m²', layout: '三室一厅', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'hs-2', name: '西区3巷2栋202', type: 'house', lat: 22.5392, lng: 113.9642, address: '白石洲西区3巷2栋202', houseType: '住宅', owner: '李四', buildingId: 'bld-2', status: 'occupied', area: '65m²', layout: '两室一厅', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1e52508492?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'hs-3', name: '主街商铺A01', type: 'house', lat: 22.5408, lng: 113.9651, address: '白石洲主街A01', houseType: '商铺', owner: '王五', buildingId: 'bld-3', status: 'occupied', area: '120m²', layout: '单层商铺', imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const mockPersons: Person[] = [
  { id: 'ps-1', name: '张伟', type: 'person', lat: 22.5402, lng: 113.9662, address: '深圳市南山区科技园社区1栋201', phone: '138****8000', idCard: '440305********1234', houseId: 'hs-1', gender: '男', age: 35, nativePlace: '广东深圳', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'ps-2', name: '李四', type: 'person', lat: 22.5392, lng: 113.9642, address: '白石洲西区3巷2栋202', phone: '139****9000', idCard: '440305********5678', houseId: 'hs-2', gender: '女', age: 28, nativePlace: '湖南长沙', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const mockEnterprises: Enterprise[] = [
  { id: 'ent-1', name: '大疆创新科技有限公司', type: 'enterprise', lat: 22.5408, lng: 113.9651, address: '深圳市南山区高新南四道18号创维半导体设计大厦西座', legalPerson: '汪滔', creditCode: '9144030079542574XQ', status: 'active', industry: '智能制造/无人机', regCapital: '3000万人民币', imageUrl: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800&h=600' },
  { id: 'ent-2', name: '腾讯科技（深圳）有限公司', type: 'enterprise', lat: 22.540, lng: 113.934, address: '深圳市南山区科技中一路腾讯大厦', legalPerson: '马化腾', creditCode: '9144030071526726XG', status: 'active', industry: '互联网/软件', regCapital: '6500万人民币', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=600' },
];

export const mockLands: Land[] = [
  { id: 'land-1', name: '宗地 T208-0054', type: 'land', lat: 22.541, lng: 113.965, address: '深圳市南山区深南大道与科技南路交汇处', area: '15,000m²', usageRight: '深圳市投资控股有限公司', nature: '商业用地', imageUrl: 'https://images.unsplash.com/photo-1541888087425-ce81dfc46928?auto=format&fit=crop&q=80&w=800&h=600' }
];

export const mockOwnerships: Ownership[] = [
  { id: 'own-1', name: '粤(2023)深圳市不动产权第0001234号', type: 'ownership', lat: 22.540, lng: 113.965, address: '深圳市南山区高新南九道', certNumber: '粤(2023)深圳市不动产权第0001234号', issueDate: '2023-05-12', owner: '张伟', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600' }
];

export const mockParkings: Parking[] = [
  { id: 'park-1', name: '创维半导体大厦地下停车场', type: 'parking', lat: 22.536, lng: 114.025, address: '深圳市南山区高新南四道18号', totalSpots: 800, availableSpots: 124, feeRate: '首小时15元，之后5元/小时', imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800&h=600' }
];

export const mockIndustries: Industry[] = [
  { id: 'ind-1', name: '南山科技园核心区', type: 'industry', lat: 22.540, lng: 113.945, address: '深圳市南山区科技园', sector: '高新技术产业', outputValue: '约3000亿元', keyCompanies: 1500, imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800&h=600' }
];

export const mockBuildings: Building[] = [
  {
    id: 'bld-1',
    name: '创维半导体设计大厦',
    type: 'building',
    lat: 22.540,
    lng: 113.965,
    address: '深圳市南山区高新南四道18号',
    area: '114,676',
    floors: 33,
    community: '科技园社区',
    usage: '商业办公',
    code: '4403050070050700002',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export const mockHistoryEntities: BaseEntity[] = [
  { id: 'hist-1', name: '宗地 T208-0054', type: 'land', lat: 22.541, lng: 113.965, address: '深圳市南山区深南大道与科技南路交汇处' },
  { id: 'hist-2', name: '平安金融中心', type: 'building', lat: 22.533, lng: 114.055, address: '深圳市福田区益田路5033号' },
  { id: 'hist-3', name: '白石洲洲湾一阁 1201', type: 'house', lat: 22.540, lng: 113.965, address: '深圳市南山区白石洲洲湾一阁 1201' },
  { id: 'hist-4', name: '粤(2023)深圳市不动产权第0001234号', type: 'ownership', lat: 22.540, lng: 113.965, address: '深圳市南山区高新南九道' },
  { id: 'hist-5', name: '张三 (440305...)', type: 'person', lat: 22.540, lng: 113.966, address: '深圳市南山区白石洲东区' },
  { id: 'hist-6', name: '腾讯科技（深圳）有限公司', type: 'enterprise', lat: 22.540, lng: 113.934, address: '深圳市南山区科技中一路腾讯大厦' },
  { id: 'hist-7', name: '深南大道交通事故', type: 'event', lat: 22.540, lng: 113.950, address: '深圳市南山区深南大道' },
  { id: 'hist-8', name: '摄像头-南山大道01', type: 'camera', lat: 22.535, lng: 113.925, address: '深圳市南山区南山大道' },
  { id: 'hist-9', name: '车公庙地下停车场', type: 'parking', lat: 22.536, lng: 114.025, address: '深圳市福田区深南大道车公庙' },
  { id: 'hist-10', name: '南山科技园', type: 'industry', lat: 22.540, lng: 113.945, address: '深圳市南山区科技园' },
];

export const allEntities: BaseEntity[] = [
  ...mockBuildings,
  ...mockCameras,
  ...mockEvents,
  ...mockHouses,
  ...mockPersons,
  ...mockEnterprises,
  ...mockLands,
  ...mockOwnerships,
  ...mockParkings,
  ...mockIndustries,
];
