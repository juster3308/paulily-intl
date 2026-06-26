// ═══════════════════════════════════════════
// PAULILY International — Product Data (B2B)
// ═══════════════════════════════════════════

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  series: string;
  seriesEn: string;
  priceUnit: string;       // B2B: per-unit price range
  priceRange: string;      // e.g. "From ¥3,800 / Unit"
  material: string;
  materialEn: string;
  description: string;
  descriptionEn: string;
  dimensions: string;      // e.g. "32 × 25 × 12 cm"
  moq: number;             // Minimum order quantity
  image: string;
  features: string[];
  storyEn?: string;        // Full story text for STORY tab (CMS-driven)
}

export const products: Product[] = [
  {
    id: 'sovereign',
    name: '至尊',
    nameEn: 'The Sovereign',
    series: '墨龙',
    seriesEn: 'INK DRAGON',
    priceUnit: '¥3,800',
    priceRange: 'From ¥3,800 / Unit',
    material: '全粒面真皮',
    materialEn: 'Full-grain leather · Brass hardware',
    description: '墨龙系列的旗舰作品。全粒面真皮经47道手工工序精制，黄铜五金件随岁月渐生古韵，每一处细节都在讲述东方匠人的故事。',
    descriptionEn: 'The flagship of our INK DRAGON series. Full-grain leather refined through 47 hand-crafted steps, with brass hardware that develops a living patina over years — each detail narrates the story of Eastern artisanry.',
    dimensions: '38 × 28 × 14 cm',
    moq: 50,
    image: '/images/sovereign.jpg',
    features: ['Full-grain leather', 'Solid brass hardware', 'Double-reinforced saddle stitching', 'Interior suede lining', 'Hand-polished edges'],
  },
  {
    id: 'phantom',
    name: '幽灵',
    nameEn: 'The Phantom',
    series: '暗影',
    seriesEn: 'SHADOW',
    priceUnit: '¥2,600',
    priceRange: 'From ¥2,600 / Unit',
    material: '哑光小牛皮',
    materialEn: 'Matte calfskin · Titanium clasp',
    description: '暗影系列的标志性廓形。哑光小牛皮与钛合金搭扣的碰撞，诞生出一种安静而坚定的力量感。',
    descriptionEn: 'The signature silhouette of our SHADOW series. The collision of matte calfskin and titanium clasp creates a quiet but unmistakable authority.',
    dimensions: '30 × 22 × 10 cm',
    moq: 100,
    image: '/images/phantom.jpg',
    features: ['Matte calfskin', 'PVD-coated titanium clasp', 'Hidden magnetic closure', 'Microfiber interior', 'Weight: 680g'],
  },
  {
    id: 'wanderer',
    name: '行者',
    nameEn: 'The Wanderer',
    series: '独行',
    seriesEn: 'LONELY WALKER',
    priceUnit: '¥4,200',
    priceRange: 'From ¥4,200 / Unit',
    material: '蜡面帆布',
    materialEn: 'Waxed canvas · PVD-coated steel',
    description: '独行系列的精神象征。蜡面帆布经受风雨洗礼而不失型态，PVD镀膜钢件永远沉默可靠——真正的行者的选择。',
    descriptionEn: 'The spiritual symbol of LONELY WALKER. Waxed canvas endures rain and wind without losing form, PVD-coated steel remains silently reliable — the true wanderer\'s choice.',
    dimensions: '42 × 30 × 16 cm',
    moq: 30,
    image: '/images/wanderer.jpg',
    features: ['Waxed canvas body', 'PVD-coated steel hardware', 'Adjustable shoulder strap', 'Water-resistant lining', 'Reinforced bottom panel'],
  },
  {
    id: 'cathedral',
    name: '殿堂',
    nameEn: 'The Cathedral',
    series: '哥特',
    seriesEn: 'GOTHIC',
    priceUnit: '¥5,600',
    priceRange: 'From ¥5,600 / Unit',
    material: '漆皮',
    materialEn: 'Patent leather · Gothic arch hardware',
    description: '哥特系列的最高表达。漆皮的光泽如教堂穹顶的反光，哥特拱形五金件致敬建筑中最永恒的线条。',
    descriptionEn: 'The highest expression of GOTHIC. Patent leather gleams like the vaulted ceiling of a cathedral, Gothic arch hardware honors the most eternal lines in architecture.',
    dimensions: '35 × 25 × 13 cm',
    moq: 20,
    image: '/images/cathedral.jpg',
    features: ['Patent leather shell', 'Gothic arch brass hardware', 'Suede interior with divider', 'Lock-and-key closure', 'Artisan serial number'],
  },
  {
    id: 'crescent',
    name: '新月',
    nameEn: 'The Crescent',
    series: '暗影',
    seriesEn: 'SHADOW',
    priceUnit: '¥2,200',
    priceRange: 'From ¥2,200 / Unit',
    material: '纳帕羔羊皮',
    materialEn: 'Nappa lambskin · Hidden magnetic clasp',
    description: '暗影系列的轻奢入门。纳帕羔羊皮触感如第二层肌肤，磁吸暗扣让开合成为无声的仪式。',
    descriptionEn: 'The accessible luxury of SHADOW. Nappa lambskin feels like a second skin, hidden magnetic closure makes opening and closing a wordless ritual.',
    dimensions: '26 × 20 × 8 cm',
    moq: 150,
    image: '/images/crescent.jpg',
    features: ['Nappa lambskin', 'Hidden magnetic closure', 'Slim profile design', 'Gold-tone interior accents', 'Dust bag included'],
  },
  {
    id: 'citadel',
    name: '堡垒',
    nameEn: 'The Citadel',
    series: '墨龙',
    seriesEn: 'INK DRAGON',
    priceUnit: '¥3,200',
    priceRange: 'From ¥3,200 / Unit',
    material: 'Saffiano十字纹皮',
    materialEn: 'Saffiano crosshatch · Gold-tone lock',
    description: '墨龙系列的结构之美。Saffiano十字纹压花赋予表面秩序感与耐磨性，金色锁扣是匠人信心的封印。',
    descriptionEn: 'Structural beauty from INK DRAGON. Saffiano crosshatch embossing gives the surface both order and durability, the gold-tone lock is the seal of artisan confidence.',
    dimensions: '34 × 26 × 12 cm',
    moq: 80,
    image: '/images/citadel.jpg',
    features: ['Saffiano crosshatch leather', 'Gold-tone turn-lock', 'Double compartment interior', 'Detachable shoulder strap', 'Scratch-resistant surface'],
  },
  {
    id: 'doodles',
    name: '涂鸦',
    nameEn: 'The Doodles',
    series: '涂鸦',
    seriesEn: 'GRAFFITI',
    priceUnit: '¥2,800',
    priceRange: 'From ¥2,800 / Unit',
    material: 'PVC/PU涂层帆布',
    materialEn: 'PVC/PU coated canvas · Spray-paint hardware',
    description: '涂鸦系列的代表作。手绘涂鸦覆盖皮革表面，拒绝致敬与重复——每一只都是独一无二的叛逆宣言。',
    descriptionEn: 'The defining piece of GRAFFITI. Hand-painted strokes over leather — refusing tribute, refusing repetition. Each bag is a one-of-a-kind declaration of rebellion.',
    dimensions: '32 × 24 × 11 cm',
    moq: 60,
    image: '/images/doodles.jpg',
    features: ['PVC/PU coated canvas', 'Hand-painted graffiti overlay', 'Spray-paint-effect hardware', 'Raw-cut edges', 'Unique per piece — no two identical'],
  },
];

// Series data for filtering
export interface Series {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image?: string;          // Series cover image URL (from CMS or static)
  _rawImage?: any;         // Raw Sanity image object for urlFor()
}

export const seriesList: Series[] = [
  {
    id: 'ink-dragon',
    name: '墨龙',
    nameEn: 'INK DRAGON',
    description: '东方匠艺的最高表达',
    descriptionEn: 'The highest expression of Eastern artisanry — where heritage meets sovereignty.',
  },
  {
    id: 'shadow',
    name: '暗影',
    nameEn: 'SHADOW',
    description: '沉默的力量美学',
    descriptionEn: 'The aesthetics of silent power — designed for those who command without speaking.',
  },
  {
    id: 'lonely-walker',
    name: '独行',
    nameEn: 'LONELY WALKER',
    description: '行者的精神装备',
    descriptionEn: 'The wanderer\'s spiritual equipment — built to endure, designed to accompany.',
  },
  {
    id: 'gothic',
    name: '哥特',
    nameEn: 'GOTHIC',
    description: '建筑与意志的交汇',
    descriptionEn: 'Where architecture and will intersect — structural drama in every stitch.',
  },
  {
    id: 'graffiti',
    name: '涂鸦',
    nameEn: 'GRAFFITI',
    description: '国潮叛逆 · 不致敬超越',
    descriptionEn: 'NOT OBEDIENT — Chinese street culture meets leather craft. Rebel spirit, raw energy, no rules.',
  },
];

// Craftsmanship steps
export interface CraftStep {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export const craftSteps: CraftStep[] = [
  {
    number: '01',
    title: '材料甄选',
    titleEn: 'Material Selection',
    description: '我们仅从意大利和中国山东认证鞣革工坊采购全粒面皮革。每张皮料均经手工检查表面一致性、粒面密度和天然肌理。',
    descriptionEn: 'We source only full-grain leather from certified tanneries in Italy and China\'s Shandong province. Each hide is hand-inspected for surface consistency, grain density, and natural character.',
  },
  {
    number: '02',
    title: '手工裁剪与缝合',
    titleEn: 'Hand Cutting & Stitching',
    description: '匠师以传统中式裁剪刀手工切割每片样板。双线加固鞍缝确保结构完整性，寿命为机缝的三倍。',
    descriptionEn: 'Master artisans cut each pattern by hand using traditional Chinese shears. Double-reinforced saddle stitching ensures structural integrity that outlasts machine-sewn alternatives by a factor of three.',
  },
  {
    number: '03',
    title: '五金与精修',
    titleEn: 'Hardware & Finishing',
    description: '定制铣削黄铜与PVD镀膜钛合金五金——随岁月生长天然锈变。每一个搭扣、每一枚铰链、每一处边缘经过七个渐进工序的抛光。',
    descriptionEn: 'Custom-milled brass and PVD-coated titanium hardware — designed to develop a living patina over years of use. Every clasp, every buckle, every edge is polished through seven progressive stages.',
  },
];

// Heritage stats
export const heritageStats = [
  { number: '47', label: 'Steps Per Piece', labelZh: '每件工序' },
  { number: '12+', label: 'Countries', labelZh: '覆盖国家' },
  { number: '98%', label: 'Repeat Orders', labelZh: '复购率' },
];

// Wholesale benefits
export const wholesaleBenefits = [
  'Competitive tiered pricing',
  'Low minimum order quantities',
  'Custom branding & packaging options',
  'Dedicated account manager',
  'Worldwide shipping support',
  'Quality guarantee on every unit',
];