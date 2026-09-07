# Deploying antheasolve.com to GitHub Pages

Repo: **WelcomedRain/Anthea-Solve**, branch `main`.

## Step 1 — clear out the abandoned React app

The repo currently holds a Vite/React version of the site that is no longer used.
Delete everything in it before uploading, so nothing shadows the new `index.html`:

    index.html  metadata.json  package.json  tsconfig.json  vite.config.ts
    src/  public/

(`.gitignore` is harmless to keep.)

## Step 2 — upload these files to the repo root

- `index.html` — the entire site as one self-contained file (~1.3 MB). All CSS and
  images are inlined; the only external request is the Google Fonts link for
  Gruppo/Archivo. Nothing to build, nothing to install.
- `og.jpg` — the social share preview image (referenced absolutely as
  `https://antheasolve.com/og.jpg`, so it must sit at the root).
- `favicon.png` — the AS mark. The page also inlines its own icon, so this is a
  belt-and-braces copy for `/favicon.png` requests.
- `CNAME` — serves the site at `antheasolve.com`. Must be at the root.
- `.nojekyll` — skips GitHub's Jekyll processing.

`DEPLOY.md` is for you, not the site — upload it or don't.

## Step 3 — turn on Pages

**Settings → Pages → Build and deployment → Deploy from a branch** → `main` /
`(root)` → Save.

Confirm the **Custom domain** field reads `antheasolve.com`, and tick
**Enforce HTTPS** once the certificate is issued. That can take up to an hour
after DNS resolves; the checkbox stays greyed out until then.

## Step 4 — DNS at your registrar

`antheasolve.com` is an apex (bare) domain, so it needs **A records**, not a
CNAME. Create four A records on `@`:

    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153

Optionally the matching AAAA records for IPv6:

    2606:50c0:8000::153
    2606:50c0:8001::153
    2606:50c0:8002::153
    2606:50c0:8003::153

And one CNAME record so `www` works too:

    www  ->  WelcomedRain.github.io

Verify these against GitHub's current published IPs before relying on them —
they change rarely, but they do change.

## Updating the site later

`index.html` is compiled output — don't hand-edit it. The source is
`Anthea Solve.dc.html` in the project root, with images in `assets/`. Change the
source, recompile to `site/index.html`, re-upload that one file.

## Notes

- The `.jpg` files in `assets/` are web-optimised copies (~600 KB total) of the
  original PNG screenshots, which are kept alongside as masters.
- `assets/banner.mp4` is not referenced by the current build — kept for the
  animated-banner experiment.
- No analytics, no tracking script, no cookie banner — consistent with what the
  site says about itself.
- Arcanum Resero has no screenshot yet; its card shows an empty image slot.
