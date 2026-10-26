# phbh-recs

The group's directory of recommendations — years of them, finally in one place.

**Live:** https://phbh-recs.vercel.app

---

## What this is

Everything the group has recommended to each other, organised so you can
actually find it again. Search by keyword, or browse by category. Each listing
keeps the original thread — who recommended it, what they said, and what
everyone else added — plus a button that opens it in Maps.

You can add it to your phone's home screen and it behaves like an app.

---

## ⚠️ Read this before adding anything

**This site is public.** Anyone with the link can read it. The recommendations
come from a private group chat, and the people in that chat didn't agree to
being published.

**Only ever publish** first names or nicknames, and what someone said about a
place or service.

**Never publish** phone numbers, email addresses, home addresses, workplaces,
private messages, or anything about someone's health, relationships or money.

**Never commit the raw chat export** — it contains everyone's phone numbers.
Keep it outside this folder entirely.

If you're unsure whether something belongs on a public site, leave it out and
ask Amber. You can't un-publish something.

---

## One-time setup

You need these installed once. If any step fails, send Amber the error.

**1. Install Node.js.** Go to [nodejs.org](https://nodejs.org) and install the
version it offers you. Restart your terminal afterwards.

**2. Install Git.** [git-scm.com/downloads](https://git-scm.com/downloads).

**3. Get the code.**

```bash
git clone https://github.com/Digidoot-Amber/phbh-recs.git
cd phbh-recs
```

**4. Install the project's bits.** This takes a minute.

```bash
npm install
```

**5. Start it up.**

```bash
npm run dev
```

Open <http://localhost:3000>. Press `Ctrl+C` in the terminal to stop it.

---

## Every time after that

```bash
git checkout main
git pull
npm run dev
```

---

## Adding a recommendation

The full rules are in **[AGENTS.md](./AGENTS.md)** — most AI coding tools read
that automatically, so you may be able to just say *"add the taquería in Roma
Norte that Jen recommended"* and let it work.

By hand: add an entry to `data/recs.json`.

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

`service` is the broad group — Restaurants, Beauty, Health, Events, Business.
`category` is the specific type inside it. Reuse what's already there rather
than inventing near-duplicates.

Then: make a branch, commit, push, open a pull request, send Amber the preview
link. **Never push to `main`** — her review is what catches a real name or a
phone number before it goes public.

---

## For later

The data lives in a JSON file for now. Everything reads it through
`lib/recs.ts`, so moving to a real database later means changing that one file
and nothing else.
