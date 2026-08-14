# Calculator Nutrition Data — Sources & Serving Assumptions

The macros in `site/src/pages/calculator.astro` are computed as:

> **per-100g reference values (USDA FoodData Central, SR Legacy / FNDDS)** × **assumed serving size** + **preparation additions** (cooking oil, glaze, crust), rounded to whole numbers.

They are estimates for guidance, not lab-analyzed values. If kitchen portions differ,
update the serving column here, recompute, and mirror the numbers into the calculator.

**Calibration note:** the HCL-certified signature bowls (menu board) average lower totals
than a same-ingredient build in the calculator (e.g. Zen Sleep 312 kcal certified vs ~475
summed). This implies signature-bowl kitchen portions are smaller than the BYO servings
assumed below. If you have the actual BYO portion spec sheet, plugging it in here will
close that gap.

## Bases

| Ingredient | Serving | Basis (per 100g) | kcal | P | C | F |
|---|---|---|---|---|---|---|
| Romaine Lettuce | 60g | 17 kcal, 1.2p, 3.3c, 0.3f | 10 | 1 | 2 | 0 |
| Whole-Grain Pasta (cooked) | 100g | 124 kcal, 5.3p, 26.5c, 0.5f | 125 | 5 | 27 | 1 |
| Mashed Sweet Potato | 100g | 76 kcal, 1.4p, 17.7c, 0.1f (boiled, mashed) | 75 | 2 | 18 | 0 |
| Brown Rice (cooked) | 100g | 123 kcal, 2.7p, 25.6c, 1.0f | 125 | 3 | 26 | 1 |
| Quinoa (cooked) | 100g | 120 kcal, 4.4p, 21.3c, 1.9f | 120 | 4 | 21 | 2 |
| Shredded Kale (raw) | 40g | 35 kcal, 2.9p, 4.4c, 1.5f | 15 | 1 | 2 | 0 |

## Proteins

| Ingredient | Serving | Basis | kcal | P | C | F |
|---|---|---|---|---|---|---|
| Sous Vide Chicken Breast | 90g | 165/100g cooked breast, 31p, 3.6f | 150 | 28 | 0 | 3 |
| Roasted Chicken Leg | 90g | 232/100g meat+skin roasted, 26p, 13f | 210 | 23 | 0 | 12 |
| Herb-Crusted Ocean Fish (sea bass) | 90g | 124/100g cooked + herb crust (oil/crumb ≈ +35 kcal) | 150 | 22 | 3 | 5 |
| Roast Beef | 80g | 187/100g lean roasted, 28p, 7.6f | 150 | 22 | 0 | 6 |
| Blackened Salmon | 90g | 206/100g farmed cooked, 22p, 12f + spice rub | 200 | 20 | 1 | 12 |

## Supplements

| Ingredient | Serving | Basis | kcal | P | C | F |
|---|---|---|---|---|---|---|
| Charred Broccoli | 60g | 35/100g cooked + light oil | 35 | 2 | 4 | 1 |
| Roasted Turmeric Cauliflower | 60g | 25/100g + roasting oil | 35 | 1 | 3 | 2 |
| Miso-Glazed Carrots | 60g | 41/100g + miso glaze sugar | 40 | 1 | 8 | 1 |
| Sweet Corn | 60g | 96/100g kernels cooked | 60 | 2 | 13 | 1 |
| King Oyster Mushroom | 60g | 35/100g cooked + light oil | 35 | 2 | 4 | 1 |
| Roasted Potato | 75g | 93/100g baked + roasting oil | 85 | 2 | 14 | 2 |
| Pumpkin Wedges | 70g | 26/100g + roasting oil | 40 | 1 | 5 | 2 |
| Edamame (shelled) | 50g | 121/100g, 12p, 5f | 60 | 5 | 4 | 3 |
| Onsen Egg | 1 egg (50g) | 143/100g whole egg | 70 | 6 | 0 | 5 |
| Scrambled Egg White | 2 whites (66g) | 52/100g, 11p | 35 | 7 | 0 | 0 |
| Cucumber Dill Salad | 70g | 15/100g + light dressing | 20 | 1 | 3 | 1 |
| Thai Basil Tofu | 70g | 78/100g firm tofu + sauce/oil | 80 | 7 | 3 | 5 |
| Tempeh Chips | 25g | 192/100g tempeh, fried (≈ 400/100g as chips) | 100 | 6 | 7 | 6 |
| Roasted Beet Hummus | 40g | ≈ 160/100g (hummus w/ beet) | 65 | 2 | 6 | 3 |
| Apple Cider Cherry Tomato w/ Gula Apong | 50g | 18/100g tomato + palm sugar syrup | 40 | 1 | 9 | 0 |
| Half Avocado | 68g edible | 160/100g, 15f | 110 | 1 | 6 | 10 |

## Toppings

| Ingredient | Serving | Basis | kcal | P | C | F |
|---|---|---|---|---|---|---|
| Furikake | 5g | sesame/nori blend ≈ 300/100g | 15 | 1 | 1 | 1 |
| Power Mix Seed | 15g | mixed seeds ≈ 560/100g | 85 | 3 | 3 | 7 |
| Parmesan Breadcrumbs | 12g | parmesan 431/100g + crumb | 50 | 3 | 4 | 2 |
| Pickled Red Onions | 20g | ≈ 50/100g (onion + pickling sugar) | 10 | 0 | 3 | 0 |
| Seaweed Flake | 3g | nori ≈ 350/100g | 10 | 1 | 1 | 0 |
| Salted Cashew Nuts | 15g | 553/100g, 18p, 44f | 85 | 3 | 5 | 7 |
| Pink Pickled Radish | 20g | ≈ 45/100g | 10 | 0 | 2 | 0 |

## Dressings (serving ≈ 25g unless noted)

| Dressing | Basis | kcal | P | C | F |
|---|---|---|---|---|---|
| Yuzu Soy | ponzu-style, minimal oil | 35 | 1 | 4 | 1 |
| Pesto | basil pesto ≈ 460/100g | 115 | 2 | 2 | 11 |
| Salsa Verde | olive-oil herb sauce ≈ 300/100g | 75 | 1 | 1 | 7 |
| Harissa | chili paste w/ oil ≈ 160/100g | 40 | 1 | 3 | 3 |
| Golden Honey Mustard | ≈ 260/100g | 65 | 1 | 8 | 3 |
| Thyme Olive Oil (12g) | olive oil 884/100g | 105 | 0 | 0 | 12 |

## Add-On Drinks (per cup, ingredient-summed)

| Drink | Assumed build | kcal | P | C | F |
|---|---|---|---|---|---|
| Heavenly Kale | pineapple 80g + banana 80g + kale 30g + honey 15g + plant milk 200ml | 260 | 6 | 52 | 5 |
| Rechargeable Power Kale | banana 80g + kale 30g + greek yogurt 100g + honey 15g + plant milk 200ml | 280 | 14 | 48 | 6 |
| Berry Booster | mixed berries 120g + banana 80g + honey 15g + plant milk 200ml | 265 | 7 | 51 | 5 |
| Super Maca | banana 80g + honey 15g + almond butter 16g + maca 10g + cacao nibs 10g + plant milk 200ml | 405 | 10 | 52 | 17 |
| Berry Buff | açaí 100g + banana 80g + almond butter 16g + tahini 8g + protein powder 25g + plant milk 200ml | 475 | 32 | 44 | 20 |
| Cloud 9 | coconut milk 150ml + pineapple 80g + blue spirulina 2g + chia pudding 80g + granola 20g + coconut flakes 10g | 370 | 7 | 42 | 20 |
| Honey Yuzu Lemon | honey 20g + yuzu + lemon, iced | 95 | 0 | 25 | 0 |
| Super Berry Tea | berry tea, lightly sweetened | 70 | 0 | 18 | 0 |
