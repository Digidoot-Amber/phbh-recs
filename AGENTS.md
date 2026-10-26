# phbh-recs — rules for anyone (or any AI) working on this directory

This is the group's directory of recommendations. Read this whole file before
you change anything.

---

## Before you start

**Always pull the latest `main` first.**

```bash
git checkout main
git pull
```

---

## ⚠️ Privacy — the most important rule here

This site is **public**. Anyone with the link can read every word of it. The
recommendations come from a private group chat, so the people in that chat did
not agree to have their messages published.

**Only ever publish:**

- First names or nicknames — `Jen`, not `Jennifer Lastname`
- What someone said *about a place or service*

**Never publish:**

- Phone numbers, email addresses or social handles
- Home addresses, or anyone's workplace
- Private messages — anything that isn't a recommendation
- Anything about someone's health, relationships or money
- Photos of people, unless that person has said yes

If you are unsure whether a line belongs on a public site, **leave it out and
ask Amber.** Taking something down later doesn't help — it has already been
public, and search engines and scrapers aren't the only things that copy pages.

### Never commit the chat export

The raw WhatsApp export contains everyone's phone numbers. `.gitignore` blocks
`*.zip`, `WhatsApp*`, `exports/` and `_chat.txt`, but **do not rely on that** —
keep the export outside this folder entirely. Read it, pull out what you need,
and write only the cleaned result into `data/recs.json`.

---

## Where things live

| What | Where |
|---|---|
| The recommendations | `data/recs.json` |
| How the data is read | `lib/recs.ts` |
| The page | `app/page.tsx` |
| The UI | `components/` |

**Read data through `lib/recs.ts` and nothing else.** Right now it reads the
JSON file. When this moves to a real database, only that file changes — as long
as no component imports the JSON directly.

### Adding a recommendation

Add an object to `data/recs.json`:

```json
{
  "id": "kebab-case-unique-id",
  "name": "What it's called",
  "service": "Restaurants",
  "category": "Tacos",
  "area": "Roma Norte",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=...",
  "thread": [
    { "who": "Jen", "said": "What she said about it.", "date": "2025-03-14" }
  ]
}
```

- `service` is the broad group — **Restaurants, Beauty, Health, Events,
  Business**. Reuse an existing one rather than inventing a near-duplicate.
- `category` is the specific type within it — Tacos, Hair, Dentist.
- `mapsUrl` can be an empty string for anything with no address.
- `date` is `YYYY-MM-DD`.

---

## Never

- **No secrets, API keys, passwords or tokens.** Not in code, not in a comment.
- Compress any image before adding it.
- **Never push straight to `main`.**

---

## How to submit your change

If you have never done this before, follow it exactly. Your AI assistant can run
these for you — ask it to.

**1. Make a branch.**

```bash
git checkout -b add-taqueria
```

**2. Commit, in plain English.**

```bash
git add .
git commit -m "Add the taquería Jen recommended in Roma Norte"
```

**3. Push it.**

```bash
git push -u origin add-taqueria
```

**4. Open a pull request.**

```bash
gh pr create --fill
```

No `gh`? Open the repo on GitHub — there will be a banner offering to open a
pull request from the branch you just pushed.

**5. Send Amber the preview link.** Vercel comments a preview URL on your pull
request within a minute or two. Send it to Amber — she reviews and merges.

**Don't merge your own pull request.** Amber's review is the step that catches a
phone number or a real name before it goes public.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
