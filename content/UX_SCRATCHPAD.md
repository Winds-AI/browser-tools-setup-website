# UX Scratchpad

This scratchpad captures observations, a rubric, and concrete actions to improve the documentation website UI/UX.

## Current UI Observations

- Layout: Left sidebar navigation, main content column (max width ~820px), right aside placeholder "On this page".
- Setup page: Sequential `StepCard` components with code blocks and callouts. Clear order but long scrolling and no local table of contents or anchors.
- Typography: Inter for sans, JetBrains Mono for code; legibility is good in dark mode but hierarchy between headings, paragraphs, and code blocks can be improved.
- Navigation: Primary link list shows only `Setup`; other pages commented out. Tool docs are grouped under a collapsible section, rendered from markdown as a plain `<pre>` block.
- Accessibility: Keyboard focus outlines present; contrast largely sufficient; some areas (muted text) approach low contrast.

## Rubric for Improvements

1. Information Architecture

   - Clear top-level sections visible in sidebar.
   - Per-page table of contents with anchor links.
   - Cross-links between setup steps and tool docs.

2. Readability & Typography

   - Adequate text size (16–18px base), 1.7 line-height.
   - Distinct hierarchy for H1/H2/H3; consistent spacing.
   - Code blocks with titles, copy button, and language labels.

3. Progress & Orientation

   - Step numbering persistent in a mini TOC.
   - “Back to top” and “Next step” controls.
   - Sticky "On this page" with active section highlight.

4. Interaction & Feedback

   - Smooth scroll to anchors; focus management after navigation.
   - Hover/pressed states for links and sidebar items.
   - Copy-to-clipboard feedback.

5. Accessibility

   - Sufficient color contrast for all text and UI controls.
   - Landmarks: nav, main, aside; semantic headings.
   - Keyboard navigability and visible focus indicators.

6. Visual Design

   - Use subtle elevation and borders; avoid heavy boxes.
   - Spacing rhythm: 4/8/12/16 scale.
   - Consistent iconography and status colors for callouts.

7. Performance
   - Static generation for docs pages; avoid unnecessary client components.
   - Lazy load heavy assets; avoid layout shift.

## Concrete Actions

- Implement in-page anchors for each setup step and generate an "On this page" menu.
- Expose additional primary pages in sidebar (Quickstart, How To Use, Project Overview, Troubleshooting, Contributing).
- Parse markdown to HTML with a lightweight renderer instead of `<pre>` so headings generate anchors automatically.
- Add next/previous step buttons to the bottom of the Setup page.
- Improve `StepCard` spacing, headings, and allow an optional aside tip per step.
- Enhance `CodeBlock` with filename/description support and better contrast.

## Notes

- Keep dark mode as default; consider a light theme switch later.
- Maintain current font choices; tighten letter-spacing on headings.
