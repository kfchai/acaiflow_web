# Calculator Nutrition Data — Source & Notes

The macros in `site/src/data/bowl-data.ts` (used by the calculator and Flowi, and
mirrored in `flowi-api/api/chat.js`) come from the **dietitian-measured single
portions** in `assets/Acai Flow - Single Portions.xlsx`, rounded to whole numbers.

## Conventions

- **Proteins**: the spreadsheet lists *half portions* (matching the Small size's
  "½ protein"). The calculator stores **full portions = 2× the sheet values**,
  since Medium includes 1 full protein and Large includes 2.
- All other categories are stored exactly as the sheet's single portions.
- Fibre from the sheet is not currently displayed on the site.

## Deviations from the sheet

| Item | Issue | What the site uses |
|---|---|---|
| Roast Beef | Not in the sheet (it is on the BYO menu board) | Estimated from USDA lean roast beef at a portion consistent with the other proteins (full portion ≈ 63 g): 118 kcal, 18p, 0c, 5f. Replace when the dietitian measures it. |
| Furikake | Sheet lists 6.2 g carbs for a 2 g serving (data-entry error — exceeds serving weight) | Carbs capped at 1 g; kcal (8.7) kept as-is |
| Add-On Drinks | Not covered by the sheet | Still ingredient-summed estimates (see git history for assumptions). Replace when measured values exist. |

## Additions

- **Virgin Coconut Oil Sambal** dressing (20 g — 39 kcal, 0.4p, 3.3c, 2.8f) is in
  the sheet and now selectable in the calculator, alongside the 6 board dressings.

## Updating

When the kitchen or dietitian revises portions, update the spreadsheet, then
mirror the new values into:

1. `site/src/data/bowl-data.ts` (calculator + Flowi widget)
2. `flowi-api/api/chat.js` (Flowi's system prompt) and redeploy with
   `vercel deploy --prod` from `flowi-api/`
