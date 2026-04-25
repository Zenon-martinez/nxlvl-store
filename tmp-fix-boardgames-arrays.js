const fs = require('fs');
const path = 'src/assets/board-games.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  if (typeof value === 'object') {
    const vals = Object.values(value);
    return vals.every((v) => typeof v !== 'undefined') ? vals : [];
  }
  return [];
};

for (const p of data.products || []) {
  p.media = p.media || {};
  p.media.images = asArray(p.media.images);
  p.media.videos = asArray(p.media.videos);

  p.description = p.description || {};
  p.description.components = asArray(p.description.components);
  p.description.highlights = asArray(p.description.highlights);

  p.howToPlay = asArray(p.howToPlay);
  p.expansions = asArray(p.expansions);

  p.classification = p.classification || { categories: [], mechanics: [], complexity: 'medium' };
  p.classification.categories = asArray(p.classification.categories);
  p.classification.mechanics = asArray(p.classification.mechanics);

  p.seo = p.seo || { title: '', description: '', keywords: [] };
  p.seo.keywords = asArray(p.seo.keywords);

  p.additionalInfo = p.additionalInfo || {};
  p.additionalInfo.tags = asArray(p.additionalInfo.tags);
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('ARRAY_FIELDS_FIXED');
