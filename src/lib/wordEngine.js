// Client-side word unscrambler engine.

const SCRABBLE = {
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
  d: 2, g: 2,
  b: 3, c: 3, m: 3, p: 3,
  f: 4, h: 4, v: 4, w: 4, y: 4,
  k: 5,
  j: 8, x: 8,
  q: 10, z: 10,
};

export function scoreWord(word) {
  let total = 0;
  for (const c of word) total += SCRABBLE[c] || 0;
  return total;
}

let cache = null;
let loadPromise = null;

export function loadDictionary() {
  if (cache) return Promise.resolve(cache);
  if (loadPromise) return loadPromise;
  loadPromise = fetch('/words.txt')
    .then((r) => r.text())
    .then((text) => {
      const words = text.split('\n').map((w) => w.trim()).filter(Boolean);
      const set = new Set(words);
      cache = { words, set };
      return cache;
    });
  return loadPromise;
}

function letterCounts(str) {
  const counts = {};
  let wild = 0;
  for (const raw of str.toLowerCase()) {
    if (raw === '?' || raw === '*') {
      wild += 1;
    } else if (raw >= 'a' && raw <= 'z') {
      counts[raw] = (counts[raw] || 0) + 1;
    }
  }
  return { counts, wild };
}

function canForm(word, counts, wild) {
  const need = {};
  for (const c of word) need[c] = (need[c] || 0) + 1;
  let deficit = 0;
  for (const c in need) {
    const have = counts[c] || 0;
    if (need[c] > have) deficit += need[c] - have;
    if (deficit > wild) return false;
  }
  return true;
}

// options: { startsWith, endsWith, contains, exactLength, minLength }
export function unscramble(dict, input, options = {}) {
  const { counts, wild } = letterCounts(input);
  const totalLetters = Object.values(counts).reduce((a, b) => a + b, 0) + wild;
  if (totalLetters < 1) return [];

  const startsWith = (options.startsWith || '').toLowerCase().trim();
  const endsWith = (options.endsWith || '').toLowerCase().trim();
  const contains = (options.contains || '').toLowerCase().trim();
  const exactLength = options.exactLength || 0;
  const minLength = options.minLength || 1;

  const results = [];
  for (const word of dict.words) {
    if (word.length > totalLetters) continue;
    if (word.length < minLength) continue;
    if (exactLength && word.length !== exactLength) continue;
    if (startsWith && !word.startsWith(startsWith)) continue;
    if (endsWith && !word.endsWith(endsWith)) continue;
    if (contains && !word.includes(contains)) continue;
    if (!canForm(word, counts, wild)) continue;
    results.push(word);
  }

  results.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    const sb = scoreWord(b) - scoreWord(a);
    if (sb !== 0) return sb;
    return a.localeCompare(b);
  });
  return results;
}
