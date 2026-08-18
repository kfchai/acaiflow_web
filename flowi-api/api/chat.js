// Flowi chat proxy — holds the OpenRouter key server-side (OPENROUTER_API_KEY
// env var) and relays conversations from the AcaiFlow site. The system prompt
// and model config live here so the endpoint can't be repurposed as an open
// relay.
//
// Ingredient data mirrors site/src/data/bowl-data.ts (macros documented in
// menu/calculator-nutrition.md) — keep the two in sync when the menu changes.

const MODEL = 'deepseek/deepseek-v4-flash-0731';

const ALLOWED_ORIGINS = [
  'https://acaiflow.my',
  'https://www.acaiflow.my',
  'https://acaiflow-web.vercel.app',
  'https://acaiflow.pages.dev',
];
// site preview deployments (acaiflow-web-*.vercel.app, <hash>.acaiflow.pages.dev)
const PREVIEW_RE = /^https:\/\/(acaiflow-web[a-z0-9-]*\.vercel\.app|[a-z0-9-]+\.acaiflow\.pages\.dev)$/;
// any localhost port, for local development
const LOCAL_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function originAllowed(origin) {
  return ALLOWED_ORIGINS.includes(origin) || PREVIEW_RE.test(origin) || LOCAL_RE.test(origin);
}

const DATA = {
  bases: [
    ['romaine', 'Romaine Lettuce', 3, 0, 1, 0], ['pasta', 'Whole-Grain Pasta', 105, 4, 21, 0],
    ['sweetpotato', 'Mashed Sweet Potato', 125, 1, 18, 5], ['brownrice', 'Brown Rice', 155, 3, 32, 1],
    ['quinoa', 'Quinoa', 49, 2, 9, 1], ['kale', 'Shredded Kale', 5, 0, 1, 0],
  ],
  proteins: [
    ['chicken', 'Sous Vide Chicken Breast', 107, 13, 2, 5], ['chickenleg', 'Roasted Chicken Leg', 195, 21, 2, 11],
    ['fish', 'Herb-Crusted Ocean Fish', 51, 9, 0, 1], ['beef', 'Roast Beef', 118, 18, 0, 5],
    ['salmon', 'Blackened Salmon', 148, 14, 0, 10],
  ],
  supplements: [
    ['broccoli', 'Charred Broccoli', 12, 1, 1, 0], ['cauliflower', 'Roasted Turmeric Cauliflower', 4, 0, 1, 0],
    ['carrots', 'Miso-Glazed Carrots', 50, 1, 7, 2], ['corn', 'Sweet Corn', 35, 1, 6, 0],
    ['mushroom', 'King Oyster Mushroom', 29, 2, 3, 1], ['potato', 'Roasted Potato', 44, 2, 8, 1],
    ['pumpkin', 'Pumpkin Wedges', 45, 1, 9, 1], ['edamame', 'Edamame', 77, 8, 5, 3],
    ['onsen', 'Onsen Egg', 68, 6, 0, 5], ['eggwhite', 'Scrambled Egg White', 11, 2, 0, 0],
    ['cucumberdill', 'Cucumber Dill Salad', 5, 0, 1, 0], ['tofu', 'Thai Basil Tofu', 31, 4, 2, 1],
    ['tempeh', 'Tempeh Chips', 13, 1, 1, 1], ['hummus', 'Roasted Beet Hummus', 106, 5, 14, 4],
    ['cherrytomato', 'Apple Cider Cherry Tomato w/ Gula Apong', 19, 1, 4, 0], ['avocado', 'Half Avocado', 144, 2, 0, 15],
  ],
  toppings: [
    ['furikake', 'Furikake', 9, 1, 1, 0], ['seeds', 'Power Mix Seed', 17, 1, 1, 1],
    ['parmesan', 'Parmesan Breadcrumbs', 8, 1, 1, 0], ['pickledonion', 'Pickled Red Onions', 1, 0, 0, 0],
    ['seaweed', 'Seaweed Flake', 3, 0, 1, 0], ['cashew', 'Salted Cashew Nuts', 11, 0, 1, 1],
    ['radish', 'Pink Pickled Radish', 1, 0, 0, 0],
  ],
  dressings: [
    ['yuzu', 'Yuzu Soy', 7, 0, 1, 0], ['pesto', 'Pesto', 100, 1, 1, 10],
    ['salsa', 'Salsa Verde', 30, 0, 1, 3], ['harissa', 'Harissa', 45, 0, 1, 5],
    ['honeymustard', 'Golden Honey Mustard', 94, 0, 4, 9], ['thyme', 'Thyme Olive Oil', 86, 0, 0, 10],
    ['vcosambal', 'Virgin Coconut Oil Sambal', 39, 0, 3, 3],
  ],
};

const ING_LIST = Object.entries(DATA)
  .map(([cat, rows]) => cat + ': ' + rows.map((r) => `${r[0]}|${r[1]}|${r[2]}kcal|${r[3]}p|${r[4]}c|${r[5]}f`).join('; '))
  .join('\n');

const SYSTEM = `You are Flowi, the friendly assistant on acaiflow.my — the website of AcaiFlow, a healthy bowl café in Kuching, Sarawak, Malaysia. Motto: "eat well, feel good".

FACTS
- Outlets: (1) Green Heights Mall, Lot LG09, Ground Floor, 129 Lorong Lapangan Terbang 2, 93250 Kuching — open daily 10:00am–7:00pm, phone +60 13-816 0023. (2) Kuching International Airport, L2A19, Level 2, Domestic Departure (airside) — hours follow the flight schedule.
- Ordering: WhatsApp +60 12-885 3836 (wa.me/60128853836) or GrabFood; pickup in store. Instagram @acaiflow.my. Site pages: /menu, /calculator, /catering, /location, /contact.
- Menu: 6 Signature Wholefood Bowls — Zen Sleep, Beauty Bowl, Plant Protein, Energy Bowl, Anti-Inflammatory, High Protein — all Healthier Choice (HCL) certified by Kementerian Kesihatan Malaysia, macros shown on the menu. Sourdough focaccia sandwiches: Carprese Chicken, Roasted Fuel Chicken, Classic Beef, Omega Boost Tuna. 9 açaí bowls with peanut/almond butter drizzle (best sellers: Island Escape, Coco Glow). 6 Longevity Smoothies plus add-on boosters (cocoa + monk fruit whey, creatine, collagen, protein powder). Catering for corporate meals, events, gym & wellness partnerships, platters.
- Never quote prices. Prices are available in-store or via WhatsApp.
- Halal or certification questions: politely direct to the WhatsApp team.

BUILD-YOUR-OWN BOWL
Size limits (must NEVER be exceeded): small = 2 bases, 1 protein, 2 supplements, 1 topping, 1 dressing. medium = 2 bases, 1 protein, 3 supplements, 1 topping, 1 dressing. large = 2 bases, 2 proteins, 3 supplements, 1 topping, 1 dressing.
Ingredients (id|name|kcal|protein|carbs|fat):
${ING_LIST}
All proteins are meat/fish. For vegetarian/vegan users pick no proteins and use plant-protein supplements (tofu, tempeh, edamame, hummus; eggwhite/onsen only if vegetarian, not vegan).

RESPONSE FORMAT — always reply with ONLY this JSON object:
{"reply": "<plain text, no markdown>", "bowl": null}
or, when recommending a build-your-own bowl:
{"reply": "<short intro sentence>", "bowl": {"size": "small|medium|large", "ids": ["id1", "id2", ...]}}

RULES
- Warm, upbeat, concise: reply under 80 words. Match the user's language (English, Malay, Chinese...).
- When the user gives nutrition needs (goals, calories, macros, restrictions), build a bowl: choose a size that fits their calorie needs if unspecified (light <450kcal→small, ~450-600→medium, hearty→large) and pick ingredients whose summed macros best match their needs, within the size limits.
- When a bowl is included, the site renders the ingredient list and macros — keep reply to one intro sentence, no ingredient list, no numbers.
- If key details are missing, ask ONE short clarifying question instead of guessing.
- Only discuss AcaiFlow; politely steer other topics back.`;

function cors(req, res) {
  const origin = req.headers.origin || '';
  if (originAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// In-memory rate limiting (per warm instance). Not airtight across parallel
// instances, but bounds abuse and Gemini spend without extra infrastructure.
const WINDOW_MS = 60_000;
const IP_MAX = 10;      // requests per IP per minute
const GLOBAL_MAX = 120; // requests per instance per minute
const buckets = new Map();
let globalCount = 0;
let globalReset = Date.now() + WINDOW_MS;

function rateLimited(ip) {
  const now = Date.now();
  if (now > globalReset) {
    globalCount = 0;
    globalReset = now + WINDOW_MS;
  }
  if (++globalCount > GLOBAL_MAX) return true;
  if (buckets.size > 5000) buckets.clear(); // memory guard
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  return ++b.count > IP_MAX;
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'rate limited' });
  }

  const contents = req.body?.contents;
  if (
    !Array.isArray(contents) || contents.length === 0 || contents.length > 16 ||
    !contents.every(
      (c) =>
        c && (c.role === 'user' || c.role === 'model') &&
        Array.isArray(c.parts) && c.parts.length === 1 &&
        typeof c.parts[0]?.text === 'string' && c.parts[0].text.length <= 4000
    )
  ) {
    return res.status(400).json({ error: 'bad request' });
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(500).json({ error: 'server not configured' });

  // the widget sends Gemini-style contents; convert to chat-completions messages
  const messages = [
    { role: 'system', content: SYSTEM },
    ...contents.map((c) => ({
      role: c.role === 'model' ? 'assistant' : 'user',
      content: c.parts[0].text,
    })),
  ];

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'HTTP-Referer': 'https://acaiflow-web.vercel.app',
        'X-Title': 'AcaiFlow Flowi',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 768,
        response_format: { type: 'json_object' },
        // hybrid reasoning model: without this, long hidden reasoning can
        // exhaust max_tokens and return empty content
        reasoning: { enabled: false },
      }),
    });
    if (!r.ok) return res.status(502).json({ error: 'upstream ' + r.status });
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content ?? '';
    if (!text.trim()) return res.status(502).json({ error: 'empty completion' });
    return res.status(200).json({ text });
  } catch {
    return res.status(502).json({ error: 'upstream failure' });
  }
}
