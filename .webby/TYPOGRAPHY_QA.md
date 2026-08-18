# Lạc Việt Media - Typography QA v1

Authority order:
1. Visible GD1 Approved UI master
2. TYPOGRAPHY_AUTHORITY.json
3. TYPOGRAPHY_ROUTE_MATRIX.json
4. Runtime implementation

Required implementation:
- Replace Noto Serif Display with Noto Serif.
- Replace Be Vietnam Pro with Inter.
- Use exact semantic roles; do not choose fonts per component ad hoc.
- No visual badge or UI redesign.
- Wait for `document.fonts.ready` before screenshots.
- At QA, computed `font-family` for all headings must resolve to Noto Serif and all body/UI text to Inter.
- Compare at 1440px and 390px.
- Check line breaks on every route; line-break drift is a blocker even when family is correct.
- Preserve approved gold-emphasis spans inside hero titles.
- Do not use synthetic font weight.
