# Design QA

Source: user-provided hero reference screenshot.

Scope: hero layout style adaptation, not a pixel-for-pixel clone.

Checks:
- Floating pill navigation matches the reference structure while preserving this portfolio's dark sci-fi brand.
- Hero title now uses a large two-line portfolio composition with a bright accent.
- Mid-hero buttons were removed to prevent overlap with the new bottom work preview strip.
- Bottom work preview strip uses real portfolio images and links to the selected works section.
- 1269x912 viewport screenshot reviewed; no visible text/card overlap found.
- Hero preview cards and selected-work cards now open a full-image lightbox.
- Lightbox supports previous/next buttons, keyboard left/right navigation, mouse wheel sequence browsing, thumbnail selection, and Esc/close button.
- Full-image assets verified through the local dev server with HTTP 200 responses.
- Hero preview strip now loops from right to left with duplicated card groups for continuous marquee motion.
- 1269x912 viewport screenshot reviewed after marquee update; card strip remains aligned and clickable.
- Work experience section redesigned from the provided reference: large title header, portrait card, profile/info grid, stats, tag row, and horizontal career path timeline.
- Local build passed after the work experience redesign.

Final result: passed
