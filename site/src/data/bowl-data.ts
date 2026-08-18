// Shared Build-Your-Own-Bowl data: used by the calculator page and Flowi.
// Macros are dietitian-measured single portions from
// assets/Acai Flow - Single Portions.xlsx (see menu/calculator-nutrition.md).
// Proteins are FULL portions (2x the sheet's half-portion rows). Drinks are
// estimates (not covered by the sheet).

export interface SizeSpec {
  label: string;
  includes: string;
}

// [id, name, kcal, protein, carbs, fat]
export type IngredientRow = [string, string, number, number, number, number];

export const SIZES: Record<string, SizeSpec> = {
  small: { label: 'Small', includes: '2 bases · ½ protein · 2 supplements · 1 topping · 1 dressing' },
  medium: { label: 'Medium', includes: '2 bases · 1 protein · 3 supplements · 1 topping · 1 dressing' },
  large: { label: 'Large', includes: '2 bases · 2 proteins · 3 supplements · 1 topping · 1 dressing' },
};

// per-size allowance per category (from the BYO menu)
export const LIMITS: Record<string, Record<string, number>> = {
  small: { bases: 2, proteins: 1, supplements: 2, toppings: 1, dressings: 1 },
  medium: { bases: 2, proteins: 1, supplements: 3, toppings: 1, dressings: 1 },
  large: { bases: 2, proteins: 2, supplements: 3, toppings: 1, dressings: 1 },
};

export const GROUP_META: Record<string, { label: string; note: string }> = {
  bases: { label: 'Bases', note: '2 included · extras welcome' },
  proteins: { label: 'Proteins', note: 'Included by size · extras welcome' },
  supplements: { label: 'Supplements', note: 'Included by size · extras welcome' },
  toppings: { label: 'Toppings', note: '1 included · extras welcome' },
  dressings: { label: 'Dressings', note: '1 included · extras welcome' },
  drinks: { label: 'Add-On Drinks', note: 'Optional' },
};

export const DATA: Record<string, IngredientRow[]> = {
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
  drinks: [
    ['heavenlykale', 'Heavenly Kale', 260, 6, 52, 5], ['powerkale', 'Rechargeable Power Kale', 280, 14, 48, 6],
    ['berrybooster', 'Berry Booster', 265, 7, 51, 5], ['supermaca', 'Super Maca', 405, 10, 52, 17],
    ['berrybuff', 'Berry Buff', 475, 32, 44, 20], ['cloud9', 'Cloud 9', 370, 7, 42, 20],
    ['yuzulemon', 'Honey Yuzu Lemon', 95, 0, 25, 0], ['berrytea', 'Super Berry Tea', 70, 0, 18, 0],
  ],
};

export const WHATSAPP = 'https://wa.me/60128853836';
