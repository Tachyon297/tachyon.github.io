# Tachyon — Behnam Rajabi

Single-page, scroll-driven Persian RTL portfolio site. Vanilla HTML/CSS/JS, no build step, no framework.

## Structure

```
index.html          all sections/scenes, in order
css/style.css        design system + layout
js/scene3d.js         Three.js wireframe background, tied to scroll position
js/main.js             GSAP/ScrollTrigger reveals, nav, project rendering, CV button
data/projects.json    your projects — see schema below
assets/cv/            put your CV PDF here
assets/projects/       optional images/video for project cards
```

No build tooling is required. Open `index.html` in a browser, or serve the folder
with any static server (`python3 -m http.server`, VS Code Live Server, GitHub Pages, etc.).
The site can be opened directly via `index.html`; the Projects section has a built-in local fallback. A
static server is still recommended for the best browser compatibility.

## Adding a project

Edit `data/projects.json`. It's an array of objects:

```json
{
  "title": "Project Name",
  "description": "One or two sentences about what it does.",
  "role": "Solo developer",
  "technologies": ["Flutter", "Dart"],
  "demo": "https://your-demo-link.com",
  "github": "https://github.com/you/repo",
  "status": "In progress"
}
```

- `demo` and `github` are optional — omit the key (or leave it empty) and that button
  won't render. There is no placeholder/fake project data; the section stays empty
  with a "check back soon" note until you add entries here.
- Images/video aren't wired into the card markup yet (kept intentionally simple);
  if you want them, add an `<img>`/`<video>` inside `.project-card` in `js/main.js`
  and drop files in `assets/projects/`.

## Adding your CV

Drop your PDF at `assets/cv/Behnam-Rajabi-CV.pdf`. The "DOWNLOAD CV" button checks
for that exact file at click time and downloads it if present, or shows a
"not available yet" message if it isn't there. Rename the file or update the path
in `js/main.js` (`cvPath` constant) if you'd rather use a different name.

## Filling in contact details

`index.html`, Contact section — the current contact information is already filled in with the provided email and Telegram ID. GitHub is intentionally marked as not existing yet.

## Notes

- The 3D background is a single Three.js wireframe scene (icosahedron + grid +
  a few floating cubes) whose rotation and camera position respond to scroll.
  It runs a lighter version on small screens and fails silently (canvas hidden)
  if WebGL isn't available — the rest of the site works without it.
- Animations are GSAP + ScrollTrigger; both respect `prefers-reduced-motion`.
- Colors, type and spacing are all defined as CSS custom properties at the top
  of `css/style.css` if you want to adjust the system later.

### Media folders
- `assets/projects/roguelike/gameplay.mp4` — ویدیوی بازی روگ‌لایک
- `assets/projects/tgoal/tgoal-1.jpg` — تصویر اول Tgoal
- `assets/projects/tgoal/tgoal-2.jpg` — تصویر دوم Tgoal
- `assets/achievements/research-certificate.jpg` — تصویر تقدیرنامه پژوهشی

این فایل‌های تصویری در صورت موجود بودن به‌صورت خودکار در سایت نمایش داده می‌شوند؛ برای فایل‌های ناموجود جایگاه راهنما نمایش داده می‌شود.
