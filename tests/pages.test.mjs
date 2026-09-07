import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderPage } from '../src/render.ts';
import { pageDocument, pagePaths } from '../src/pages.ts';
import { moduleVisibility } from '../src/scroll-motion.ts';
const template = readFileSync(new URL('../index.html',import.meta.url),'utf8');
const blocks = renderPage();
const home = template.replace(/<!-- BLOCK:([A-Z_]+) -->/g,(_,key)=>blocks[key]??'');

test('each standalone page has its own title, one H1 and correct active navigation',()=>{
  for(const path of pagePaths){
    const html=pageDocument(home,path);
    assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,path);
    assert.match(html, /<title>.+ — Liu Ling<\/title>/);
    if(path!=='/socials.html')assert.match(html,/aria-current="page"/);
    assert.ok(!html.includes('<!-- BLOCK:'),path);
  }
});

test('all module and project links resolve to known static pages without anchor navigation',()=>{
  const links=[...home.matchAll(/href="(\/[^"#]*)"/g)].map(match=>match[1]);
  for(const path of links)assert.ok(path==='/' || pagePaths.includes(path) || /\.(ico|png|css)$/.test(path),path);
  assert.doesNotMatch(home,/href="#(?:work|stack|about|experience|socials|home)"/);
  assert.match(pageDocument(home,'/work/test-delivery.html'),/CSV processing in Web Workers/);
  assert.throws(()=>pageDocument(home,'/missing.html'));
});

test('module fades symmetrically at viewport edges and stays readable in the middle',()=>{
  assert.equal(moduleVisibility(900,1200,900).opacity,0);
  assert.equal(moduleVisibility(100,800,900).opacity,1);
  assert.equal(moduleVisibility(-700,0,900).opacity,0);
  assert.equal(moduleVisibility(-200,1800,900).opacity,1);
  assert.equal(moduleVisibility(820,1100,900).opacity,.5);
  assert.equal(moduleVisibility(820,1100,900).offset,22);
  assert.equal(moduleVisibility(-300,80,900).offset,-22);
  assert.equal(moduleVisibility(-300,80,900).opacity,.5);
});
