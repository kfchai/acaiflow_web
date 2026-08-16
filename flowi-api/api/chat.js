// Flowi chat proxy — holds the Gemini key server-side (GOOGLE_AI_API_KEY env
// var) and relays conversations from the AcaiFlow site. The system prompt and
// model config live here so the endpoint can't be repurposed as an open relay.
//
// Ingredient data mirrors site/src/data/bowl-data.ts (macros documented in
// menu/calculator-nutrition.md) — keep the two in sync when the menu changes.

const MODEL = 'gemini-2.5-flash';

const ALLOWED_ORIGINS = [
  'https://acaiflow.my',
  'https://www.acaiflow.my',
  'http://localhost:4321',
];

const DATA = {
  bases: [
    ['romaine', 'Romaine Lettuce', 10, 1, 2, 0], ['pasta', 'Whole-Grain Pasta', 125, 5, 27, 1],
    ['sweetpotato', 'Mashed Sweet Potato', 75, 2, 18, 0], ['brownrice', 'Brown Rice', 125, 3, 26, 1],
    ['quinoa', 'Quinoa', 120, 4, 21, 2], ['kale', 'Shredded Kale', 15, 1, 2, 0],
  ],
  proteins: [
    ['chicken', 'Sous Vide Chicken Breast', 150, 28, 0, 3], ['chickenleg', 'Roasted Chicken Leg', 210, 23, 0, 12],
    ['fish', 'Herb-Crusted Ocean Fish', 150, 22, 3, 5], ['beef', 'Roast Beef', 150, 22, 0, 6],
    ['salmon', 'Blackened Salmon', 200, 20, 1, 12],
  ],
  supplements: [
    ['broccoli', 'Charred Broccoli', 35, 2, 4, 1], ['cauliflower', 'Roasted Turmeric Cauliflower', 35, 1, 3, 2],
    ['carrots', 'Miso-Glazed Carrots', 40, 1, 8, 1], ['corn', 'Sweet Corn', 60, 2, 13, 1],
    ['mushroom', 'King Oyster Mushroom', 35, 2, 4, 1], ['potato', 'Roasted Potato', 85, 2, 14, 2],
    ['pumpkin', 'Pumpkin Wedges', 40, 1, 5, 2], ['edamame', 'Edamame', 60, 5, 4, 3],
    ['onsen', 'Onsen Egg', 70, 6, 0, 5], ['eggwhite', 'Scrambled Egg White', 35, 7, 0, 0],
    ['cucumberdill', 'Cucumber Dill Salad', 20, 1, 3, 1], ['tofu', 'Thai Basil Tofu', 80, 7, 3, 5],
    ['tempeh', 'Tempeh Chips', 100, 6, 7, 6], ['hummus', 'Roasted Beet Hummus', 65, 2, 6, 3],
    ['cherrytomato', 'Apple Cider Cherry Tomato w/ Gula Apong', 40, 1, 9, 0], ['avocado', 'Half Avocado', 110, 1, 6, 10],
  ],
  toppings: [
    ['furikake', 'Furikake', 15, 1, 1, 1], ['seeds', 'Power Mix Seed', 85, 3, 3, 7],
    ['parmesan', 'Parmesan Breadcrumbs', 50, 3, 4, 2], ['pickledonion', 'Pickled Red Onions', 10, 0, 3, 0],
    ['seaweed', 'Seaweed Flake', 10, 1, 1, 0], ['cashew', 'Salted Cashew Nuts', 85, 3, 5, 7],
    ['radish', 'Pink Pickled Radish', 10, 0, 2, 0],
  ],
  dressings: [
    ['yuzu', 'Yuzu Soy', 35, 1, 4, 1], ['pesto', 'Pesto', 115, 2, 2, 11],
    ['salsa', 'Salsa Verde', 75, 1, 1, 7], ['harissa', 'Harissa', 40, 1, 3, 3],
    ['honeymustard', 'Golden Honey Mustard', 65, 1, 8, 3], ['thyme', 'Thyme Olive Oil', 105, 0, 0, 12],
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
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

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

  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) return res.status(500).json({ error: 'server not configured' });

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 512,
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );
    if (!r.ok) return res.status(502).json({ error: 'upstream ' + r.status });
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
    return res.status(200).json({ text });
  } catch {
    return res.status(502).json({ error: 'upstream failure' });
  }
}
