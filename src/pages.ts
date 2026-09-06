import { projects, projectPaths, socials } from './content.ts';
import { escapeHtml, renderSocials } from './render.ts';
export const pagePaths = ['/work.html','/experience.html','/stack.html','/about.html','/socials.html',...projectPaths];
const titles: Record<string,string> = {work:'Selected Work',experience:'Experience',stack:'Tools & Stack',about:'About Liu Ling',socials:'Elsewhere'};

export function pageDocument(home: string, path: string): string {
  if (!pagePaths.includes(path)) throw new Error(`Unknown page: ${path}`);
  const key = path.slice(1).replace('.html','');
  const projectIndex = projectPaths.indexOf(path);
  const project = projects[projectIndex];
  const title = project?.title ?? titles[key];
  let content: string;
  if (project) {
    content = `<section class="project-case" aria-labelledby="case-title"><p class="eyebrow">SELECTED WORK / 0${projectIndex + 1}</p><h1 id="case-title">${escapeHtml(project.title)}</h1><p class="case-subtitle" lang="zh-CN">${escapeHtml(project.subtitle)} · ${escapeHtml(project.description)}</p><p class="case-tags">${project.tags.map(escapeHtml).join(' / ')}</p><div class="case-facts">${[['Role',project.role],['Challenge',project.challenge],['Solution',project.solution]].map(([label,text])=>`<article class="case-fact reveal"><h2>${label}</h2><p>${escapeHtml(text)}</p></article>`).join('')}</div><a class="case-back" href="/work.html">← All selected work</a></section>`;
  } else if (key === 'socials') {
    content = `<section class="social-page" aria-labelledby="social-title"><p class="eyebrow">AROUND THE WEB</p><h1 id="social-title">FIND ME<br><span class="quiet">ELSEWHERE.</span></h1><p class="section-intro">Code, ideas, and conversations.</p>${renderSocials(socials)}</section>`;
  } else {
    const match = home.match(new RegExp(`<section id="${key}"[\\s\\S]*?<\\/section>`));
    if (!match) throw new Error(`Missing section: ${key}`);
    // The standalone page uses its original section title as the sole H1.
    content = match[0].replace(/<h2([^>]*)>/,'<h1$1>').replace('</h2>','</h1>').replaceAll('<h3','<h2').replaceAll('</h3>','</h2>')
      .replace(/<a class="section-page-link"[^>]*>([\s\S]*?)<span class="section-page-arrow"[^>]*>[^<]*<\/span><\/a>/,'$1');
  }
  const footer = home.match(/<footer class="horizon-footer[\s\S]*?<\/footer>/)?.[0] ?? '';
  const current = project ? 'work' : key;
  return home.replace('<body>','<body class="detail-page">')
    .replace(/<title>[^<]*<\/title>/,`<title>${escapeHtml(title)} — Liu Ling</title>`)
    .replace(/<main id="main-content">[\s\S]*?<\/main>/,`<main id="main-content"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>${escapeHtml(title)}</span></nav>${content}${footer}</main>`)
    .replace('nav-link is-active','nav-link').replace(' aria-current="location"','')
    .replace(`href="/${current}.html" class="nav-link"`,`href="/${current}.html" class="nav-link is-active" aria-current="page"`);
}
