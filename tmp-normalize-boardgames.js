const fs = require('fs');
const path = 'src/assets/board-games.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const toIso = (value) => {
  if (!value) return null;
  const s = String(value);
  return s.includes('T') ? s : `${s}T00:00:00.000Z`;
};

const toPlayTime = (playTime) => {
  if (playTime == null) return { min: 30, max: 30 };
  if (typeof playTime === 'number') return { min: playTime, max: playTime };
  if (typeof playTime === 'object' && playTime.min != null && playTime.max != null) {
    return { min: Number(playTime.min), max: Number(playTime.max) };
  }
  return { min: 30, max: 30 };
};

const normalizeProduct = (p) => {
  const pricing = p.pricing || {
    price: p.price ?? 0,
    originalPrice: p.originalPrice ?? null,
    currency: p.currency ?? 'MXN',
    discountPercentage:
      p.originalPrice && p.originalPrice > p.price
        ? Number((((p.originalPrice - p.price) / p.originalPrice) * 100).toFixed(1))
        : null,
  };

  const inventory = p.inventory || {
    stock: p.stock ?? 0,
    reserved: 0,
    status: p.status ?? 'in_stock',
    condition: p.condition ?? 'sealed',
  };

  const media = p.media || {
    thumbnail: p.thumbnail ?? '',
    images: p.images ?? [],
    videos: [],
  };

  const classification = p.classification || {
    categories: p.categories ?? [],
    mechanics: p.mechanics ?? [],
    complexity: 'medium',
  };

  const gameplay = p.gameplay || {
    players: p.players ?? { min: 2, max: 4 },
    playTime: toPlayTime(p.playTime),
    age: p.age ?? 8,
    language: p.language ?? 'Español',
  };

  const editorial = p.editorial || {
    publisher: p.publisher ?? '',
    designer: '',
  };

  const description =
    typeof p.description === 'object' && p.description !== null
      ? {
          short: p.description.short ?? '',
          long: p.description.long ?? p.description.short ?? '',
          components: p.description.components ?? p.contents ?? [],
          highlights: p.description.highlights ?? [],
        }
      : {
          short: p.description ?? '',
          long: p.description ?? '',
          components: p.contents ?? [],
          highlights: [],
        };

  const additionalInfo = p.additionalInfo || {
    weight: { value: 0, unit: 'kg' },
    dimensions: { width: 0, height: 0, depth: 0, unit: 'cm' },
    material: '',
    tags: [],
  };

  const rating =
    typeof p.rating === 'object' && p.rating !== null
      ? { average: p.rating.average ?? 0, count: p.rating.count ?? 0 }
      : { average: p.rating ?? 0, count: p.reviewsCount ?? 0 };

  const flags = p.flags || {
    isFeatured: p.isFeatured ?? false,
    isNew: false,
    isBestSeller: false,
  };

  const seo = p.seo || {
    title: `${p.name} Juego de Mesa | Compra en Next Level`,
    description: p.description?.short
      ? `Compra ${p.name} en español al mejor precio. ${p.description.short}`
      : `Compra ${p.name} en Next Level.`,
    keywords: [p.slug, 'juego de mesa', 'estrategia'],
  };

  const audit = p.audit || {
    createdAt: toIso(p.createdAt) || '2026-01-10T00:00:00.000Z',
    updatedAt: toIso(p.updatedAt) || toIso(p.createdAt) || '2026-01-10T00:00:00.000Z',
  };

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    pricing,
    inventory,
    media,
    classification,
    gameplay,
    editorial,
    description,
    additionalInfo,
    howToPlay: p.howToPlay ?? [],
    expansions: p.expansions ?? [],
    rating,
    flags,
    seo,
    audit,
  };
};

data.products = (data.products || []).map(normalizeProduct);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log(`Normalized products: ${data.products.length}`);
