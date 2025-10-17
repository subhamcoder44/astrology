export interface DiamondData {
  diamond_name: string
  name: string
  details: string
  price_usd_per_carat_estimate: string
  url: string
  image_url: string
}

const diamondData: DiamondData[] = [
  {
    "diamond_name": "Natural Round Brilliant",
    "name": "Round Brilliant (Natural)",
    "details": "The classic round brilliant cut, 57-58 facets, optimized for maximum brilliance. (GIA's standard for cut grades)",
    "price_usd_per_carat_estimate": "2000-16000",
    "url": "https://4cs.gia.edu/en-us/diamond-cut/",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Princess Cut",
    "name": "Princess Cut (Natural)",
    "details": "Square or rectangular modified brilliant cut, good face-up size and strong fire.",
    "price_usd_per_carat_estimate": "1500-12000",
    "url": "https://en.wikipedia.org/wiki/Princess_cut",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Cushion Cut",
    "name": "Cushion Cut (Natural)",
    "details": "Rounded square / pillow shape, blends vintage style and modern brilliance.",
    "price_usd_per_carat_estimate": "1200-10000",
    "url": "https://www.gia.edu/cushion-cut-diamond",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Emerald Cut",
    "name": "Emerald Cut (Natural)",
    "details": "Step cut with long facets and rectangular shape; emphasizes clarity over sparkle.",
    "price_usd_per_carat_estimate": "1400-11000",
    "url": "https://www.gia.edu/emerald-cut-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Asscher Cut",
    "name": "Asscher Cut (Natural)",
    "details": "Square step cut with trimmed corners, vintage Art Deco feel.",
    "price_usd_per_carat_estimate": "1500-12000",
    "url": "https://en.wikipedia.org/wiki/Asscher_cut",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Oval Brilliant",
    "name": "Oval Brilliant (Natural)",
    "details": "Elongated brilliant shape, gives an appearance of larger size; may show bow-tie effect.",
    "price_usd_per_carat_estimate": "1400-12000",
    "url": "https://www.gia.edu/oval-cut-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Pear Cut",
    "name": "Pear / Teardrop (Natural)",
    "details": "Hybrid between round and marquise, teardrop shape; often used as pendants or side stones.",
    "price_usd_per_carat_estimate": "1300-11000",
    "url": "https://www.gia.edu/pear-shaped-diamond",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Marquise Cut",
    "name": "Marquise (Natural)",
    "details": "Elongated with pointed ends, maximizes perceived size; classic 'navette' shape.",
    "price_usd_per_carat_estimate": "1300-10000",
    "url": "https://www.gia.edu/marquise-cut-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Heart Shape",
    "name": "Heart Shape Diamond (Natural)",
    "details": "Fancy shape in form of a heart; emotionally symbolic, but requires careful symmetry.",
    "price_usd_per_carat_estimate": "1600-14000",
    "url": "https://www.gia.edu/heart-shaped-diamond",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Radiant Cut",
    "name": "Radiant Cut (Natural)",
    "details": "Rectangular or square with brilliant facets, blends step and brilliant styles.",
    "price_usd_per_carat_estimate": "1300-11000",
    "url": "https://www.gia.edu/radiant-cut-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Trilliant / Trillion",
    "name": "Trilliant / Triangular Brilliant (Natural)",
    "details": "Triangular shaped brilliant cut, often used as side stones; 31-50 facets typical.",
    "price_usd_per_carat_estimate": "1000-9000",
    "url": "https://en.wikipedia.org/wiki/Trilliant_cut",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Old Mine Cut",
    "name": "Old Mine Cut Diamond (Natural)",
    "details": "Antique style: cushionish shape, small table, high crown, deep depth; classic in vintage jewelry.",
    "price_usd_per_carat_estimate": "1500-12000",
    "url": "https://www.gia.edu/gia-news-research-old-mine-cut-diamonds",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Rose Cut",
    "name": "Rose Cut Diamond (Natural)",
    "details": "Flat base with triangular facets on top; low brilliance but wide appearance; vintage style.",
    "price_usd_per_carat_estimate": "800-7000",
    "url": "https://www.gia.edu/gia-news-research-rose-cut-diamonds",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Fancy Yellow",
    "name": "Fancy Yellow Diamond (Natural)",
    "details": "Color caused by nitrogen, from faint to vivid hues; colored diamond premium applies.",
    "price_usd_per_carat_estimate": "3000-16000",
    "url": "https://www.gia.edu/fancy-color-yellow-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Fancy Pink",
    "name": "Fancy Pink Diamond (Natural)",
    "details": "Very rare; color from lattice distortion; huge premium for intense to vivid hues.",
    "price_usd_per_carat_estimate": "20000-100000+",
    "url": "https://www.gia.edu/fancy-color-pink-diamond",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Fancy Blue",
    "name": "Fancy Blue Diamond (Natural)",
    "details": "Color usually from boron; extremely rare; strong premium. Example: Hope Diamond.",
    "price_usd_per_carat_estimate": "30000-200000+",
    "url": "https://www.gia.edu/fancy-color-blue-diamond",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Natural Fancy Green",
    "name": "Fancy Green Diamond (Natural)",
    "details": "Color from natural irradiation; rare; green hue is subtle and prized.",
    "price_usd_per_carat_estimate": "10000-80000+",
    "url": "https://www.gia.edu/fancy-color-green-diamond",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Lab Grown Diamond (HPHT / CVD)",
    "name": "Lab-Grown Diamond",
    "details": "Manufactured in laboratory (HPHT or CVD); same chemical structure as natural, but generally lower cost.",
    "price_usd_per_carat_estimate": "600-5000",
    "url": "https://www.gia.edu/laboratory-grown-diamonds",
    "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Treated (HPHT Color Enhancement)",
    "name": "HPHT Treated Diamond",
    "details": "Natural diamond color artificially improved by HPHT heat/pressure treatment; must be disclosed.",
    "price_usd_per_carat_estimate": "800-8000",
    "url": "https://www.gia.edu/diamond-treatment",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    "diamond_name": "Treated (Irradiation / Annealing)",
    "name": "Irradiated / Annealed Diamond",
    "details": "Natural diamond exposed to radiation + heat to generate or modify color (blue, green, etc.); disclosed treatment.",
    "price_usd_per_carat_estimate": "700-6000",
    "url": "https://www.gia.edu/diamond-treatment",
    "image_url": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  }
];

export default diamondData;