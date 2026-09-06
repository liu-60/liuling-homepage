import { icon } from './icons.ts';
import { profile, projects, experience, stack, software, socials, metrics, contactEmail, projectPaths } from './content.ts';
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
  const links = items.flatMap(({label,icon: name,url,pending}) => {
    const href = safeUrl(url);
    return href ? [`<a class="social-link" href="${escapeHtml(href)}" aria-label="${escapeHtml(label)}">${icon(name)}<span class="tooltip">${escapeHtml(label)}</span></a>`] : pending && !url ? [`<span class="social-link social-pending" role="img" aria-label="${escapeHtml(label)} · link pending">${icon(name)}<span class="tooltip">${escapeHtml(label)} · coming soon</span></span>`] : [];
  });
  const pending = items.some(item => item.pending && !item.url);
  return links.length ? `<div class="social-links">${links.join('')}${pending ? '<span class="social-status">More links coming soon</span>' : ''}</div>` : '';
}
export function renderContact(email: string | null): string {
  // A missing email never leaks the private address from the original resume.
  if (!email || !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return '';
  return `<a class="contact-rail" href="mailto:${escapeHtml(email)}">${icon('mail')}<span>${escapeHtml(email)}</span></a>`;
}
export function renderMetrics(items: Metric[]): string {
  const valid = items.filter((m) => m.source.trim() && Number.isFinite(m.value) && m.value >= 0);
  if (!valid.length) return '';
  return `<div class="metrics" aria-label="Selected figures">${valid.map((m) => `<div class="metric"><span class="sr-only">${escapeHtml(String(m.value) + (m.suffix ?? ''))} ${escapeHtml(m.label)}</span><strong aria-hidden="true" data-count="${m.value}" data-suffix="${escapeHtml(m.suffix ?? '')}">${m.value}${escapeHtml(m.suffix ?? '')}</strong><span aria-hidden="true">${escapeHtml(m.label)}</span></div>`).join('')}</div>`;
}
export function renderPage(): Record<string, string> {
  const portrait = imagePath(profile.portrait), socialHtml = renderSocials(socials);
  return {
    NAV: [['home','Home','home'],['work','Work','folder'],['experience','Experience','briefcase'],['stack','Stack','wrench'],['about','About','edit']].map(([id,label,name], i) => `<a href="${id === 'home' ? '/' : '/' + id + '.html'}" class="nav-link${i === 0 ? ' is-active' : ''}" aria-label="${label}"${i === 0 ? ' aria-current="location"' : ''}>${icon(name)}<span class="tooltip">${label}</span></a>`).join(''),
    PORTRAIT: portrait ? `<img src="${portrait}"${portrait === '/images/liu-ling-512.webp' ? ' srcset="/images/liu-ling-256.webp 256w, /images/liu-ling-512.webp 512w" sizes="(max-width: 1023px) 105px, 264px"' : ''} alt="刘凌" width="512" height="512" fetchpriority="high">` : `<div class="monogram" aria-label="Liu Ling monogram"><span>L<span class="second-l">L</span></span><small>CRAFTED WITH INTENT</small></div>`,
    PROFILE_NAME: escapeHtml(profile.name), PROFILE_CHINESE: escapeHtml(profile.chineseName), ROLE: escapeHtml(profile.role),
    FLAME: icon('flame'), SOCIALS: socialHtml, METRICS: renderMetrics(metrics), LAYERS: icon('layers'), WINDOW: icon('window'), ARROW: icon('arrow'),
    PROJECTS: projects.map((p, i) => {
      const img = imagePath(p.image);
      return `<article class="project reveal${i === 0 ? ' project-featured' : ''}" style="--order:${i}"><a class="project-summary" href="${projectPaths[i]}"><span class="project-art art-${i}">${img ? `<img src="${img}" alt="" width="160" height="160" loading="lazy">` : `${icon(p.icon)}<span class="art-index">0${i+1}</span>`}</span><span class="project-copy"><span class="project-title">${escapeHtml(p.title)}</span><span class="project-subtitle" lang="zh-CN">${escapeHtml(p.subtitle)}<span class="project-description"> · ${escapeHtml(p.description)}</span></span><span class="project-tags">${p.tags.map(escapeHtml).join(' <span> / </span> ')}</span></span><span class="project-action">${icon('arrow')}<span class="sr-only">View project</span></span></a></article>`;
    }).join(''),
    EXPERIENCE: experience.map((e) => `<article class="experience-item reveal"><div class="experience-top"><h3>${escapeHtml(e.title)}</h3>${e.current ? '<span class="current-label">CURRENT</span>' : ''}</div><p class="company">${escapeHtml(e.company)}</p><p class="experience-note" lang="zh-CN">${escapeHtml(e.note)}</p><p class="period">${escapeHtml(e.period)}</p></article>`).join(''),
    STACK: stack.map((s,i) => `<div class="stack-item reveal" data-motion="skill" style="--order:${i % 2}"><span class="stack-icon ${s.brand ? 'brand-icon' : s.tone}">${s.brand ? `<img src="/brands/${s.brand}" alt="" width="32" height="32" loading="lazy">` : icon(s.icon)}</span><span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.note)}</p></span></div>`).join(''),
    SOFTWARE: software.map((s,i) => `<a class="stack-item software-item reveal" data-motion="skill" style="--order:${i % 2}" href="${safeUrl(s.url)}" aria-label="${escapeHtml(s.title)} official website"><span class="stack-icon brand-icon"><img src="/brands/${s.brand}" alt="" width="32" height="32" loading="lazy"></span><span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.note)}</p></span><span class="tool-arrow">${icon('arrow')}</span></a>`).join(''),
    SOCIAL_SECTION: socialHtml ? `<div id="socials" class="about-socials"><span class="eyebrow">ELSEWHERE</span>${socialHtml}</div>` : '',
    FLOAT_SOCIAL: socialHtml ? '<a class="float-link lime" href="/socials.html">Social Links</a>' : '<a class="float-link lime" href="/about.html">About Me</a>',
    CONTACT: renderContact(contactEmail), UP: icon('up'),
  };
}
