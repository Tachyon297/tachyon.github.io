document.getElementById('year').textContent = new Date().getFullYear();

// Nav toggle (mobile)
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll reveals
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = reduced ? 0.01 : 0.8;

  gsap.utils.toArray('.reveal-line').forEach((line, i) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: dur,
      delay: reduced ? 0 : i * 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: line, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.build-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: dur,
      delay: reduced ? 0 : i * 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.scene-title').forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 24,
      duration: dur,
      ease: 'power2.out',
      scrollTrigger: { trigger: title, start: 'top 90%' }
    });
  });
} else {
  document.querySelectorAll('.reveal-line, .build-item').forEach((el) => {
    el.style.opacity = 1;
    el.style.transform = 'none';
  });
}

// Projects — data-driven with a local fallback so the site also works when index.html is opened directly.
const fallbackProjects = [
  {
    title: 'بازی روگ‌لایک — در حال توسعه',
    description: 'یک بازی دوبعدی روگ‌لایک که هنوز در حال توسعه است. بازیکن برای بقا، بهتر شدن، قوی‌تر شدن و ثبت رکوردهای جدید تلاش می‌کند؛ هر تلاش فرصتی برای پیشرفت و عبور از رکورد قبلی است.',
    role: 'توسعه مستقل',
    technologies: ['Godot', 'AI-assisted Development'],
    status: 'در حال توسعه',
    video: 'assets/projects/roguelike/gameplay.mp4'
  },
  {
    title: 'Tgoal',
    description: 'یک اپلیکیشن اندرویدی ساخته‌شده با Flutter که با توجه به علایق، نیاز به درآمد و هدف‌های شخصی کاربر کمک می‌کند مسیر مناسب خود را پیدا کند و حتی برای رسیدن به هدف‌ها، قدم‌های روزانه قابل انجام بسازد. این اپلیکیشن هنوز در هیچ اپ‌استوری منتشر نشده و دلیل اصلی آن بازاریابی ضعیف و نرسیدن پروژه به مرحله انتشار عمومی است.',
    role: 'توسعه مستقل',
    technologies: ['Flutter', 'Dart', 'Android'],
    status: 'نسخه اولیه',
    images: ['assets/projects/tgoal/tgoal-1.jpg', 'assets/projects/tgoal/tgoal-2.jpg']
  }
];

function renderProjects(projects) {
  const list = document.getElementById('projectList');
  const empty = document.getElementById('projectEmpty');
  list.innerHTML = '';

  if (!Array.isArray(projects) || projects.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  projects.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const main = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = p.title || 'بدون عنوان';
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = p.description || '';
    main.appendChild(title);
    main.appendChild(desc);

    if (Array.isArray(p.images) && p.images.length) {
      const gallery = document.createElement('div');
      gallery.className = 'project-gallery';
      p.images.forEach((src, index) => {
        const figure = document.createElement('figure');
        figure.className = 'project-image-frame';

        const placeholder = document.createElement('div');
        placeholder.className = 'project-image-placeholder';
        placeholder.innerHTML = `<span>تصویر پروژه</span><small>${src}</small>`;

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${p.title || 'پروژه'} — تصویر ${index + 1}`;
        img.loading = 'lazy';
        img.addEventListener('load', () => { placeholder.style.display = 'none'; });
        img.addEventListener('error', () => { img.hidden = true; });

        figure.appendChild(placeholder);
        figure.appendChild(img);
        gallery.appendChild(figure);
      });
      main.appendChild(gallery);
    }

    if (p.video) {
      const videoWrap = document.createElement('div');
      videoWrap.className = 'project-video';

      const video = document.createElement('video');
      video.className = 'project-video-player';
      video.src = p.video;
      video.loop = true;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.controls = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', `ویدیوی معرفی ${p.title || 'پروژه'}`);

      videoWrap.appendChild(video);
      main.appendChild(videoWrap);

      video.addEventListener('error', () => {
        videoWrap.classList.add('video-unavailable');
      });

      // Some browsers require an explicit play() even when autoplay + muted are set.
      const tryPlay = () => video.play().catch(() => {});
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
      tryPlay();
    }

    if (p.role || (p.technologies && p.technologies.length)) {
      const meta = document.createElement('div');
      meta.className = 'project-meta';
      if (p.role) {
        const roleEl = document.createElement('span');
        roleEl.textContent = p.role;
        meta.appendChild(roleEl);
      }
      (p.technologies || []).forEach((tech) => {
        const tag = document.createElement('span');
        tag.className = 'project-tag';
        tag.textContent = tech;
        meta.appendChild(tag);
      });
      main.appendChild(meta);
    }

    const links = document.createElement('div');
    links.className = 'project-links';
    if (p.demo) {
      const a = document.createElement('a');
      a.href = p.demo;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'دمو';
      links.appendChild(a);
    }
    if (p.github) {
      const a = document.createElement('a');
      a.href = p.github;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'گیت‌هاب';
      links.appendChild(a);
    }
    if (links.children.length) main.appendChild(links);

    card.appendChild(main);

    if (p.status) {
      const status = document.createElement('span');
      status.className = 'project-status';
      status.textContent = p.status;
      card.appendChild(status);
    }

    list.appendChild(card);
  });
}

fetch('data/projects.json', { cache: 'no-store' })
  .then((res) => {
    if (!res.ok) throw new Error('Project data unavailable');
    return res.json();
  })
  .then(renderProjects)
  .catch(() => renderProjects(fallbackProjects));

