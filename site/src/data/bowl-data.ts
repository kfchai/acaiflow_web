// Shared Build-Your-Own-Bowl data: used by the calculator page and Flowi.
// Macros derived from USDA FoodData Central values with the serving sizes
// documented in menu/calculator-nutrition.md.

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
  bases: { label: 'Bases', note: 'Choose 2' },
  proteins: { label: 'Proteins', note: 'By size' },
  supplements: { label: 'Supplements', note: 'By size' },
  toppings: { label: 'Toppings', note: 'Choose 1' },
  dressings: { label: 'Dressings', note: 'Choose 1' },
  drinks: { label: 'Add-On Drinks', note: 'Optional' },
};

export const DATA: Record<string, IngredientRow[]> = {
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
  drinks: [
    ['heavenlykale', 'Heavenly Kale', 260, 6, 52, 5], ['powerkale', 'Rechargeable Power Kale', 280, 14, 48, 6],
    ['berrybooster', 'Berry Booster', 265, 7, 51, 5], ['supermaca', 'Super Maca', 405, 10, 52, 17],
    ['berrybuff', 'Berry Buff', 475, 32, 44, 20], ['cloud9', 'Cloud 9', 370, 7, 42, 20],
    ['yuzulemon', 'Honey Yuzu Lemon', 95, 0, 25, 0], ['berrytea', 'Super Berry Tea', 70, 0, 18, 0],
  ],
};

export const WHATSAPP = 'https://wa.me/60128853836';
