import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { stack, software } from '../src/content.ts';
import { icon } from '../src/icons.ts';

// Bundle the white tile and original mark into one self-contained background image.
const root=new URL('../public/brands/',import.meta.url);
mkdirSync(new URL('tiles/',root),{recursive:true});
for(const item of [...stack,...software]) {
  const key=item.brand ? item.brand.replace(/\.[^.]+$/,'') : item.icon;
  let bytes, mime;
  if(item.brand) {
    bytes=readFileSync(new URL(item.brand,root));
    mime=item.brand.endsWith('.svg')?'image/svg+xml':'image/png';
  } else {
    bytes=Buffer.from(icon(item.icon).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replaceAll('currentColor','#252321'));
    mime='image/svg+xml';
  }
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52"><rect width="52" height="52" rx="11" fill="#fff"/><image x="10" y="10" width="32" height="32" preserveAspectRatio="xMidYMid meet" href="data:${mime};base64,${bytes.toString('base64')}"/></svg>`;
  writeFileSync(new URL(`tiles/${key}.svg`,root),svg);
}
