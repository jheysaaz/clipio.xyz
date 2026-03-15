# Welcome to Clipio

**Clipio** is a browser extension for Chrome and Firefox that lets you save your most-used texts as snippets and insert them anywhere on the web — instantly, with a single shortcut.

Stop retyping the same emails, greetings, code blocks, or support replies. Write once, reuse everywhere.

---

## What is a Snippet?

A snippet is a saved piece of text (or rich content) with three things:

| Field | Description | Example |
|---|---|---|
| **Label** | A friendly name only you see | "Support closing" |
| **Shortcut** | What you type to trigger it | `/closing` |
| **Content** | What gets inserted | "Thanks for reaching out! We'll get back to you within 24 hours." |

When you type `/closing` in any text field on any website and press **Space** or **Enter**, Clipio instantly replaces the shortcut with the full content.

---

## Core Features

### Instant Text Expansion

Type your shortcut anywhere on the web — Gmail, Notion, Slack, GitHub, your CMS — and Clipio expands it without you ever leaving the keyboard. No copy-paste, no switching windows.

- Works in any `<input>`, `<textarea>`, or rich text field
- Expansion triggers on **Space** after the shortcut (word-boundary detection prevents accidental triggers like `/compatibility` triggering `/comp`)
- Cursor is placed at the exact position you defined with `{{cursor}}`

---

### Rich Text Editor

Snippets aren't just plain text. The built-in editor lets you compose:

- **Bold**, *italic*, ~~strikethrough~~, and `inline code`
- Bulleted and numbered lists
- Block quotes and code blocks
- Headings (H1–H3)
- Links
- Inline images (stored locally)
- Animated GIFs (via Giphy)

Content is stored as Markdown and rendered as rich HTML when expanded into a formatted editor like Gmail or Notion.

---

### Dynamic Placeholders

Make your snippets smarter with placeholders that fill in automatically at expansion time:

| Placeholder | What it inserts |
|---|---|
| `{{clipboard}}` | The current contents of your clipboard |
| `{{date:iso}}` | Today's date in `YYYY-MM-DD` format |
| `{{date:us}}` | Today's date in `MM/DD/YYYY` format |
| `{{date:eu}}` | Today's date in `DD/MM/YYYY` format |
| `{{date:long}}` | Full date e.g. `March 14, 2026` |
| `{{date:short}}` | Abbreviated e.g. `Mar 14, 26` |
| `{{datepicker:YYYY-MM-DD}}` | Picks a specific date and formats it |
| `{{cursor}}` | Places your cursor here after expansion |

**Example snippet content:**

```
Hi {{clipboard}},

Thanks for reaching out on {{date:long}}. I'll follow up shortly.{{cursor}}

Best,
```

After expansion, the clipboard content is pasted in, today's date is written out, and your cursor lands exactly where you want it.

---

### Image Support

Insert images directly into your snippets:

- **Slash command**: type `/image` in the editor to open the **Image Picker** — a floating panel that shows all images you've already stored
- **Re-use stored images**: select a previously uploaded image without uploading again (SHA-256 deduplication ensures no duplicate storage)
- **New uploads**: click the Upload cell or drag and drop an image file onto the picker
- **Search**: filter stored images by their alt text
- Images are stored locally in your browser's IndexedDB — they never leave your device

---

### GIF Support

Insert animated GIFs from Giphy directly into snippets:

- Type `/gif` in the editor to open the GIF Picker
- Search Giphy's library or browse trending GIFs
- GIFs are stored as lightweight references (`giphy.com` links) — no blobs saved locally
- Use your own Giphy API key (configurable in Settings > Developers) or use the built-in default

---

### Import from Other Tools

Already using a snippet manager? Import your existing library without starting from scratch:

| Tool | How it works |
|---|---|
| **TextBlaze** | Export from TextBlaze as JSON, drag into Clipio. Folders become tags. HTML snippets are converted to Markdown. |
| **Power Text** | Export from Power Text, import directly. Placeholders like `%clip%` and `%d(YYYY-MM-DD)` are automatically converted to Clipio format. |
| **Clipio** | Import from any Clipio backup JSON — both current and legacy export formats are supported. |

The import wizard auto-detects the format, shows a preview, and flags any placeholders that couldn't be converted so you can review them before saving.

---

### Export & Backup

Export all your snippets at any time to a JSON file you can keep as a backup or share with others. Re-import it on any browser, any device.

---

### Cross-Device Sync

Clipio syncs your snippets across all your browsers using **browser.storage.sync** — the same mechanism used by browser settings. Install Clipio on your work machine and your personal laptop, and your snippets are available on both within seconds.

**Automatic fallback:** If your snippet library grows beyond the sync storage quota, Clipio automatically and transparently switches to local storage — no data loss, no interruption. A status indicator in Settings lets you see which mode is active.

**Disaster recovery:** A shadow copy of all your snippets is continuously written to your browser's IndexedDB as a backup. If anything goes wrong with sync or local storage, you can recover from this backup at any time from Settings > Developers.

---

### Shortcut Conflict Detection

Clipio warns you before you save a snippet that would conflict with an existing one:

- **Exact conflict**: `/comp` and `/comp` — same shortcut, different snippets
- **Prefix conflict**: `/comp` and `/compatible` — one is a prefix of the other, which would make the shorter one impossible to type without immediately triggering

The form blocks saving until the conflict is resolved.

---

### Tags & Organization

Assign tags to snippets to keep your library organized as it grows. Filter by tag in the popup to find the right snippet fast.

---

### Usage Statistics

Clipio tracks how many times each snippet has been expanded. View your top 5 most-used snippets in Settings > Developers to see what's saving you the most time.

---

## The Popup

Click the Clipio icon in your browser toolbar to open the popup:

- **Browse** your full snippet library
- **Search** by label, shortcut, or content
- **Create** a new snippet
- **Edit** or **delete** existing ones

---

## Settings & Options Page

Open **Settings** (right-click the extension icon > Options, or click Options in the popup) for:

- **Import / Export** — back up your library or migrate from another tool
- **Developers section** — power-user tools (see below)

---

## Developers Section (Power Users)

For users who want full control, the Developers tab in Settings exposes advanced tools:

| Tool | What it does |
|---|---|
| **Giphy API Key** | Override the default Giphy key with your own |
| **Extension Version & Update** | See your installed version; link to changelog when a new version is available |
| **Content Script Health** | Ping the active tab's content script to verify the extension is loaded and responsive |
| **Storage Mode** | See whether sync or local storage is active, view quota usage vs. the 100 KB limit, and force-switch between modes |
| **Typing Timeout** | Tune how long Clipio waits after you stop typing before attempting expansion (50–2000 ms, default 300 ms) |
| **Top 5 Usage** | Your five most-expanded snippets |
| **Debug Mode** | Enable verbose logging with a live in-page log panel — useful for diagnosing expansion issues |
| **Clear IDB Backup** | Wipe the IndexedDB backup store (requires two-step confirmation) |

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome (and Chromium-based: Edge, Brave, Arc) | Yes |
| Firefox | Yes |

Both use Manifest V3.

---

## Privacy

- All your snippets are stored **locally in your browser**. Nothing is sent to any server.
- Images are stored in your browser's IndexedDB — they never leave your device.
- GIFs are Giphy links only — no blobs stored.
- Error reporting (Sentry) is opt-in and scrubs any personally identifiable information before sending.
- Usage counts are stored locally and never transmitted.

---

## Keyboard Reference

| Trigger | Action |
|---|---|
| Type shortcut + Space | Expand snippet in any text field |
| `{{cursor}}` in content | Places cursor after expansion |
| `/image` in editor | Open Image Picker |
| `/gif` in editor | Open GIF Picker |
| `Escape` in any picker | Close without inserting |
