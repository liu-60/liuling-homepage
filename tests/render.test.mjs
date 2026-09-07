import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, safeUrl, renderSocials, renderMetrics, renderContact, renderPage } from '../src/render.ts';
import { existsSync, readFileSync } from 'node:fs';

test('text and attribute values cannot inject markup', () => {
  assert.equal(escapeHtml('<script>"a" & \'b\'</script>'), '&lt;script&gt;&quot;a&quot; &amp; &#39;b&#39;&lt;/script&gt;');
});
test('URLs only allow public HTTPS destinations', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,a', '//evil.test', 'https://user:secret@example.com', '']) assert.equal(safeUrl(value), '');
  assert.equal(safeUrl('https://github.com/liu-60'), 'https://github.com/liu-60');
});
test('unprovided social accounts do not render dummy controls', () => {
  assert.equal(renderSocials([]), '');
  assert.equal(renderSocials([{label:'X',icon:'globe',url:'javascript:alert(1)'}]), '');
});
test('provided social links have accessible names and escaped content', () => {
  const html = renderSocials([{label:'Code & work',icon:'github',url:'https://github.com/liu-60'}]);
  assert.match(html, /aria-label="Code &amp; work"/);
  assert.match(html, /href="https:\/\/github.com\/liu-60"/);
  assert.doesNotMatch(html, /target="_blank"/);
});
test('unconfirmed metrics leave no empty section', () => {
  assert.equal(renderMetrics([]), '');
});
test('metrics contain a static accessible final value and stable visual value', () => {
  const html = renderMetrics([{value:12,label:'Projects delivered',suffix:'+',source:'user-confirmed'}]);
  assert.match(html, /12\+/);
  assert.match(html, /data-count="12"/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /aria-live/);
});
test('unconfirmed or invalid numeric claims are suppressed', () => {
  assert.equal(renderMetrics([{value:12,label:'Projects',source:''}]), '');
  assert.equal(renderMetrics([{value:-1,label:'Projects',source:'confirmed'}]), '');
  assert.equal(renderMetrics([{value:Infinity,label:'Projects',source:'confirmed'}]), '');
});

test('explicit pending brands are labelled without dead links or focusable buttons', () => {
  const html = renderSocials([{label:'微信',icon:'wechat',url:'',pending:true}]);
  assert.match(html, /微信 · link pending/);
  assert.doesNotMatch(html, /<a\b|<button\b|tabindex/);
  assert.equal(renderSocials([{label:'X',icon:'x',url:'javascript:alert(1)',pending:true}]), '');
});

test('email rail requires an explicit safe public address', () => {
  assert.equal(renderContact(null), '');
  assert.equal(renderContact('person@example.com?bcc=other@example.com'), '');
  assert.equal(renderContact('person@example.com\nBcc:other@example.com'), '');
  assert.match(renderContact('hello@example.com'), /href="mailto:hello@example.com"/);
});

test('all portrait and brand assets exist locally and favicon is genuine ICO', () => {
  const html = Object.values(renderPage()).join('');
  const images = [...html.matchAll(/src="(\/[^" ]+)"/g)].map(match=>match[1]);
  assert.equal(images.length, 1);
  images.forEach(path=>assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path));
  const tiles=[...html.matchAll(/background-image:url\('(\/brands\/tiles\/[^']+)'\)/g)].map(match=>match[1]);
  assert.equal(tiles.length,12);
  tiles.forEach(path=>{
    const tile=readFileSync(new URL(`../public${path}`,import.meta.url),'utf8');
    assert.match(tile,/<rect[^>]+fill="#fff"/);
    assert.match(tile,/<image[^>]+href="data:image\//);
  });
  assert.deepEqual([...readFileSync(new URL('../public/favicon.ico',import.meta.url)).subarray(0,4)], [0,0,1,0]);
  assert.equal(renderPage().CONTACT, '');
});
