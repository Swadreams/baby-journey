# Baby journey — YouTube hub

A static one-page site that groups family YouTube playlists by chapter (baby shower through naming ceremony) and surfaces **must-watch** clips when visitors are short on time.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure, playlist embeds, must-watch cards |
| `styles.css` | Layout, typography, and visual design |
| `.nojekyll` | Tells GitHub Pages not to run Jekyll (safe for root deploys) |

## Edit playlists or must-watch videos

1. **Playlist sections** — In `index.html`, find each `<section id="...">`. Update:
   - The `href` on **Open playlist in YouTube** (full playlist URL).
   - The `src` on the `<iframe>` to  
     `https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID`.

2. **Must watch** — Duplicate a `<li>...</li>` block inside `<ul class="card-grid">`. Set:
   - `href` to `https://www.youtube.com/watch?v=VIDEO_ID`
   - `img src` to `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`
   - Badge text (e.g. Baby shower) and video title in `.video-card__badge` / `.video-card__name`.

3. **Nav labels** — Adjust text inside `.nav__links` if section titles change; keep `href` values in sync with section `id` attributes.

## Host on GitHub Pages

1. Create a repository on GitHub and push this project (for example branch `main`).
2. In the repo on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then save.

After a short build, the site is available at:

`https://<your-username>.github.io/<repository-name>/`

Replace the placeholder sentence in the page footer with your real repo URL if you like.

### Optional: publish from `/docs`

Move `index.html`, `styles.css`, and `.nojekyll` into a `docs/` folder, enable Pages with the **`/docs`** folder on `main`, and update any absolute asset paths if you add more files later.

## Preview locally

From this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser.

## License

Add a license file to the repository if you want to specify terms for the site content and code.
