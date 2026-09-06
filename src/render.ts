import { icon } from './icons.ts';
import { profile, projects, experience, stack, socials, metrics } from './content.ts';
import type { Social, Metric } from './content.ts';
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
export function safeUrl(value: string): string {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''; }
  catch { return ''; }
}
function imagePath(value: string | null): string {
  return value && /^\/images\/[a-zA-Z0-9_.\/-]+\.(avif|webp|png|jpg|jpeg|svg)$/.test(value) && !value.includes('..') ? value : '';
}
export function renderSocials(items: Social[]): string {
  const links = items.flatMap(({label,icon: name,url}) => {
    const href = safeUrl(url);
    return href ? [`<a class="social-link" href="${escapeHtml(href)}" aria-label="${escapeHtml(label)}">${icon(name)}<span class="tooltip">${escapeHtml(label)}</span></a>`] : [];
  });
  return links.length ? `<div class="social-links">${links.join('')}</div>` : '';
}
export function renderMetrics(items: Metric[]): string {
  const valid = items.filter((m) => m.source.trim() && Number.isFinite(m.value) && m.value >= 0);
  if (!valid.length) return '';
  return `<div class="metrics" aria-label="Selected figures">${valid.map((m) => `<div class="metric"><span class="sr-only">${escapeHtml(String(m.value) + (m.suffix ?? ''))} ${escapeHtml(m.label)}</span><strong aria-hidden="true" data-count="${m.value}" data-suffix="${escapeHtml(m.suffix ?? '')}">${m.value}${escapeHtml(m.suffix ?? '')}</strong><span aria-hidden="true">${escapeHtml(m.label)}</span></div>`).join('')}</div>`;
}
export function renderPage(): Record<string, string> {
  const portrait = imagePath(profile.portrait), socialHtml = renderSocials(socials);
  return {
    NAV: [['home','Home','home'],['work','Work','folder'],['experience','Experience','briefcase'],['stack','Stack','wrench'],['about','About','edit']].map(([id,label,name], i) => `<a href="#${id}" class="nav-link${i === 0 ? ' is-active' : ''}" aria-label="${label}"${i === 0 ? ' aria-current="location"' : ''}>${icon(name)}<span class="tooltip">${label}</span></a>`).join(''),
    PORTRAIT: portrait ? `<img src="${portrait}" alt="刘凌" width="512" height="512" fetchpriority="high">` : `<div class="monogram" aria-label="Liu Ling monogram"><span>L<span class="second-l">L</span></span><small>CRAFTED WITH INTENT</small></div>`,
    PROFILE_NAME: escapeHtml(profile.name), PROFILE_CHINESE: escapeHtml(profile.chineseName), ROLE: escapeHtml(profile.role),
    FLAME: icon('flame'), SOCIALS: socialHtml, METRICS: renderMetrics(metrics), LAYERS: icon('layers'), WINDOW: icon('window'), ARROW: icon('arrow'),
    PROJECTS: projects.map((p, i) => {
      const img = imagePath(p.image), link = p.url ? safeUrl(p.url) : '';
      return `<details class="project reveal${i === 0 ? ' project-featured' : ''}" style="--order:${i}"><summary><span class="project-art art-${i}">${img ? `<img src="${img}" alt="" width="160" height="160" loading="lazy">` : `${icon(p.icon)}<span class="art-index">0${i+1}</span>`}</span><span class="project-copy"><span class="project-title">${escapeHtml(p.title)}</span><span class="project-subtitle" lang="zh-CN">${escapeHtml(p.subtitle)}<span class="project-description"> · ${escapeHtml(p.description)}</span></span><span class="project-tags">${p.tags.map(escapeHtml).join(' <span> / </span> ')}</span></span><span class="project-action">${icon('arrow')}<span class="sr-only">Expand project details</span></span></summary><div class="project-detail"><dl><div><dt>ROLE</dt><dd>${escapeHtml(p.role)}</dd></div><div><dt>CHALLENGE</dt><dd>${escapeHtml(p.challenge)}</dd></div><div><dt>SOLUTION</dt><dd>${escapeHtml(p.solution)}</dd></div></dl>${link ? `<a class="case-link" href="${escapeHtml(link)}">View case ${icon('arrow')}</a>` : ''}</div></details>`;
    }).join(''),
    EXPERIENCE: experience.map((e) => `<article class="experience-item reveal"><div class="experience-top"><h3>${escapeHtml(e.title)}</h3>${e.current ? '<span class="current-label">CURRENT</span>' : ''}</div><p class="company">${escapeHtml(e.company)}</p><p class="experience-note" lang="zh-CN">${escapeHtml(e.note)}</p><p class="period">${escapeHtml(e.period)}</p></article>`).join(''),
    STACK: stack.map((s) => `<div class="stack-item reveal"><span class="stack-icon ${s.tone}">${icon(s.icon)}</span><span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.note)}</p></span></div>`).join(''),
    SOCIAL_SECTION: socialHtml ? `<div id="socials" class="about-socials"><span class="eyebrow">ELSEWHERE</span>${socialHtml}</div>` : '',
    FLOAT_SOCIAL: socialHtml ? '<a class="float-link lime" href="#socials">Social Links</a>' : '<a class="float-link lime" href="#about">About Me</a>',
    UP: icon('up'),
  };
}
