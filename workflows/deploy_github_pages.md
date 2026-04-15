# Workflow: Deploy to GitHub Pages (crispintony.com)

## One-time setup

### 1. Create the GitHub repo

1. Go to https://github.com/new
2. Owner: `tonypauljose`
3. Name: `Crispin-Grade5`
4. Visibility: Public (required for free GitHub Pages)
5. **Do NOT** initialise with a README, `.gitignore`, or licence (we already have them).
6. Create.

### 2. Push this folder

From `d:\Crispin-Grade5\`:

```bash
git init
git add -A
git commit -m "Initial portal with Chapter 1 and Fun Zone"
git branch -M main
git remote add origin https://github.com/tonypauljose/Crispin-Grade5.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Repo → **Settings → Pages**.
2. **Source:** Deploy from a branch.
3. **Branch:** `main` · folder `/ (root)`.
4. Save. Wait ~30 s. You'll see the default URL `https://tonypauljose.github.io/Crispin-Grade5/` — verify it works.

### 4. Add the custom domain

1. Still in Settings → Pages.
2. **Custom domain:** `crispintony.com` → Save.
3. GitHub will run a DNS check. It may fail at first (DNS not yet configured — that's OK, move to step 5).

### 5. Configure DNS at the domain registrar

Log in to wherever you bought `crispintony.com` (GoDaddy / Namecheap / Google Domains / etc.). Open the DNS settings.

**Delete any existing A, AAAA, ALIAS, ANAME, or CNAME record on the apex (`@`).**

Then add these records:

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| AAAA (optional IPv6) | `@` | `2606:50c0:8000::153` | 3600 |
| AAAA (optional IPv6) | `@` | `2606:50c0:8001::153` | 3600 |
| AAAA (optional IPv6) | `@` | `2606:50c0:8002::153` | 3600 |
| AAAA (optional IPv6) | `@` | `2606:50c0:8003::153` | 3600 |
| CNAME | `www` | `tonypauljose.github.io.` | 3600 |

**Do NOT put an A record for `www` and a CNAME for `www` at the same time** — CNAME only.

### 6. Wait for DNS + HTTPS

- DNS propagation typically takes 5–30 minutes. Can stretch to 24 h.
- Refresh GitHub Pages settings until the green check shows "DNS check successful".
- Once that's done, wait another ~15 min for the Let's Encrypt cert to issue.
- **Then** tick **Enforce HTTPS**. Don't tick it too early — it greys out until the cert is ready.

### 7. Verify

- `https://crispintony.com` loads with padlock ✓
- `https://www.crispintony.com` redirects to the apex (or vice versa — GitHub picks one canonical)
- No mixed-content warnings
- Mobile looks correct

## Subsequent deploys

Normal git push to `main` triggers Pages to rebuild within 1–2 minutes:

```bash
git add .
git commit -m "Add Chapter 2"
git push
```

## Rollback

If a deploy breaks the site:

```bash
git revert HEAD           # create an undo commit
git push
```

Do NOT force-push to main — it can break the Pages cache.

## Checking Pages status from CLI

```bash
gh api repos/tonypauljose/Crispin-Grade5/pages
gh api repos/tonypauljose/Crispin-Grade5/pages/builds/latest
```
