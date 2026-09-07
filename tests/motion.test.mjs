import test from 'node:test';
import assert from 'node:assert/strict';
import { createMotionPreference } from '../src/motion-preference.ts';

function environment(reduced=true, saved=null, blocked=false) {
  const system = Object.assign(new EventTarget(),{matches:reduced});
  const values=new Map(saved ? [['portfolio-motion',saved]] : []);
  const storage={getItem:key=>{if(blocked)throw Error('blocked');return values.get(key)??null},setItem:(key,value)=>{if(blocked)throw Error('blocked');values.set(key,value)}};
  return {system,storage,values};
}
test('explicit motion choice overrides reduced system preference and survives navigation',()=>{
  const env=environment(); const preference=createMotionPreference(env.system,env.storage);
  assert.equal(preference.matches,true);
  let changes=0;preference.addEventListener('change',()=>changes++);
  preference.setEnabled(true);
  assert.equal(preference.matches,false);assert.equal(changes,1);
  assert.equal(createMotionPreference(env.system,env.storage).matches,false);
  preference.setEnabled(false);assert.equal(preference.matches,true);assert.equal(changes,2);
});
test('system preference remains the default and reacts to changes',()=>{
  const env=environment(false);const preference=createMotionPreference(env.system,env.storage);
  assert.equal(preference.matches,false);env.system.matches=true;env.system.dispatchEvent(new Event('change'));
  assert.equal(preference.matches,true);
});
test('blocked storage never prevents an in-page choice',()=>{
  const env=environment(true,null,true);const preference=createMotionPreference(env.system,env.storage);
  assert.doesNotThrow(()=>preference.setEnabled(true));assert.equal(preference.matches,false);
});
