# Visual Verification Workflow

Last updated: 2026-03-23 UTC

This document defines the verification procedure for all website changes. Every visual change must pass these checks before reporting completion to a collaborator.

## Full-page screenshots are mandatory

**Never use viewport-only screenshots to verify a page.** Playwright's `page.screenshot()` without `fullPage: true` only captures the initial viewport (~852px on mobile, ~900px on desktop). Most pages have content below the fold that won't appear.

Always use:
```js
await page.screenshot({ path: 'verify.png', fullPage: true });
```

Or with headless Chrome CLI:
```bash
# Use a tall viewport to capture full page content
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --screenshot=/tmp/verify.png --window-size=1280,2400 \
  "https://murphytheagent.github.io/agent-monitor-web/tokenizers/"
```

When reviewing the screenshot, scroll through the entire image. Specifically look for color or style discontinuities between the above-fold and below-fold sections.

## Always verify the live URL

Local verification alone is not sufficient. After every change, verify both:

1. **Local file** — `file:///...` or `http://127.0.0.1:PORT/route/`
2. **Live public URL** — `https://murphytheagent.github.io/agent-monitor-web/route/`

If local looks correct but live does not, this is a publish-state problem (wrong branch, unmerged PR, stale cache). See `docs/dev/plans/2026-03-23-static-site-publish-mismatch-skill.md` for triage steps.

## Check multiple viewport sizes

Every page must be verified at:

- **Desktop:** 1280x900 (or taller for full-page capture)
- **Mobile:** 393x852 (iPhone 14/15 logical size)

Take full-page screenshots at both sizes.

## When scrolling fails, notice it

If you attempt to scroll programmatically and the page doesn't move:
- `window.scrollTo(0, Y)` returning `scrollY: 0` means the scroll did not work. Do not move on.
- `page.mouse.wheel(deltaX, deltaY)` — the first argument is horizontal, the second is vertical. `wheel(420, 0)` scrolls sideways, not down.
- After any scroll attempt, verify the new scroll position before taking a screenshot.

If scrolling doesn't work, use `fullPage: true` instead of trying to scroll manually.

## Read the user's screenshots carefully

When a collaborator sends a screenshot showing a problem:
1. Look at what the screenshot actually shows — don't assume it confirms your current hypothesis.
2. Compare specific elements: background colors, text content, layout structure.
3. If the screenshot shows a problem you can't reproduce locally, the discrepancy itself is the bug to investigate (publish state, caching, branch mismatch).

Do not dismiss or redirect from what the user is showing you. If they point at white blocks, verify that specific area is fixed, not a different area.

## Pre-completion checklist

Before reporting a visual change as done:

- [ ] Full-page screenshot taken (not viewport-only)
- [ ] Verified at desktop AND mobile widths
- [ ] Verified on the LIVE public URL (not just local)
- [ ] Compared against the user's reported issue specifically
- [ ] No style discontinuities between above-fold and below-fold content
- [ ] If dark theme: no white/light backgrounds anywhere on the page (`#ffffff`, `rgba(247,...)`, `rgba(255,255,255,0.8+)` are red flags)
