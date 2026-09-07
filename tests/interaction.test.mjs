import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const effects=readFileSync(new URL('../src/effects.tsx',import.meta.url),'utf8');
const scroll=readFileSync(new URL('../src/scroll-motion.ts',import.meta.url),'utf8');

test('horizon has a shaped initial state and a separate hover border transition',()=>{
  assert.match(css,/@keyframes horizon-deform/);
  assert.match(css,/\.horizon-effect::before/);
  assert.match(css,/\.horizon-footer:hover \.horizon-effect::after/);
  assert.match(css,/border-color 260ms/);
});

test('hover lifecycle remains explicit and does not run continuously on desktop',()=>{
  assert.match(effects,/region\.addEventListener\('pointerenter'/);
  assert.match(effects,/region\.addEventListener\('pointerleave'/);
  assert.match(effects,/root\.enabled=false/);
});

test('the initial deformation starts when the footer enters the viewport',()=>{
  assert.match(scroll,/classList\.toggle\('is-in-view'/);
  assert.match(css,/.horizon-footer\.is-in-view \.horizon-effect::before/);
});
