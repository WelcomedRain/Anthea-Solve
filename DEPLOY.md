# antheasolve.com

Live site for Anthea Solve. Repo `WelcomedRain/Anthea-Solve`, published by
GitHub Pages from `main` / root.

## Files

| File | What it is |
|---|---|
| `index.html` | The entire site, one self-contained compiled file (~1.4 MB). Build output — never hand-edit. |
| `og.jpg` | Social share image. Referenced absolutely, so it must sit at the root. |
| `favicon.png` | The AS mark. |
| `CNAME` | Serves the site at `antheasolve.com`. Repo-managed; the deploy script deliberately ignores the export's copy. |
| `.nojekyll` | Skips GitHub's Jekyll processing. |
| `tools/static-head.html` | **Source of truth** for the `<head>` meta tags. Edit here. |
| `tools/apply_static_head.py` | Splices those tags into `index.html`. |
| `tools/deploy.ps1` | Stage an export, splice, verify, publish. |

## Why the splice step exists

Claude Design's bundler owns the outer `<head>` of the export and emits only a
charset, title, style and noscript block. Anything declared in the design source
gets inlined into the JavaScript bundle instead.

That breaks link previews. Social scrapers — LinkedIn, Facebook, X, Slack,
iMessage — and some crawlers do not execute JavaScript. They fetch the raw HTML,
scan the head, and stop. Tags trapped in the bundle are invisible to them, so
the site shows up as a bare link with no thumbnail and no description.

Claude Design confirmed it cannot configure this. So the tags are spliced back in
after bundling. **This is required after every single export.** It fails silently
if skipped: the build goes green, the site looks perfect, and previews are dead.

## Publishing an update

```powershell
.\tools\deploy.ps1 -Zip "path\to\export.zip"          # stage + splice + verify
.\tools\deploy.ps1 -Zip "path\to\export.zip" -Push    # ...and commit + push
```

Without `-Push` nothing is published — changes sit in the working tree for
review. The script refuses to commit if verification fails, so a skipped or
broken splice cannot reach the live site.

`-Source <folder>` works instead of `-Zip` for an already-extracted export.

## Changing the meta tags

Edit `tools/static-head.html`, then:

```powershell
python tools\apply_static_head.py
```

Re-running is safe — the block is delimited by `static-head:begin/end` markers
and gets replaced, never duplicated. `--check` verifies without modifying.

## Verifying

```powershell
python tools\apply_static_head.py --check     # local
curl -s https://antheasolve.com/ | Select-String "og:image"   # live
```

If the live check prints nothing, the tags were lost in an export and need
re-splicing.

To check the rendered preview itself, paste the URL into LinkedIn's Post
Inspector or Facebook's Sharing Debugger — both will re-scrape on demand.

## DNS

At Namecheap (BasicDNS). Apex `A` → the four GitHub Pages IPs
(`185.199.108-111.153`), `AAAA` → `2606:50c0:8000-8003::153`,
`www` CNAME → `welcomedrain.github.io`.

Verify GitHub's current IPs against `https://api.github.com/meta` before
relying on them — they change rarely, but they do change.

**Do not touch the MX records, the SPF TXT record, the `mail` CNAME, or the
MAIL SETTINGS dropdown on Namecheap's Advanced DNS page.** Those are Namecheap
Private Email for `hello@antheasolve.com`, and are unrelated to the website.
Switching that dropdown to "No Email Service" deletes the MX records and mail
stops arriving.

## Notes

- No analytics, no tracking script, no cookie banner — consistent with what the
  site says about itself.
- The page requests `/.image-slots.state.json` and gets a harmless 404. That is
  a Claude Design editor artifact; it fails silently and affects nothing.
