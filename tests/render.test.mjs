import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, safeUrl, renderSocials, renderMetrics } from '../src/render.ts';

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
