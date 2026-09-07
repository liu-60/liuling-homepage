import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createMotionPreference } from '../src/motion-preference.ts';
test('motion stays enabled without storage or a system preference dependency',()=>{
  const preference=createMotionPreference();
  assert.equal(preference.matches,false);
  assert.doesNotThrow(()=>preference.addEventListener('change',()=>{}));
});
test('motion switch and link cursor morph are absent',()=>{
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const pointer=readFileSync(new URL('../src/pointer.ts',import.meta.url),'utf8');
  assert.doesNotMatch(html,/motion-toggle/);
  assert.doesNotMatch(pointer,/classList.toggle\('is-link'/);
});
