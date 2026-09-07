export const paths: Record<string, string> = {
  x: '<path d="M4 3h4l12 18h-4zM20 3l-7 8M4 21l7-8"/>',
  xiaohongshu: '<text x="12" y="15.8" text-anchor="middle" font-family="Arial, Microsoft YaHei, sans-serif" font-size="8" font-weight="800" fill="currentColor" stroke="none">小红书</text>',
  wechat: '<path d="M15 10c0-4-3-6-7-6S1 6 1 10c0 2 1 4 3 5l-1 3 4-2h2M23 15c0-3-3-5-6-5s-6 2-6 5 3 5 6 5h2l3 2-1-3c1-1 2-2 2-4Z"/><path d="M5 9h.01M10 9h.01M15 14h.01M19 14h.01"/>',
  mail: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1z"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M8 7v14M16 7v14"/>',
  wrench: '<path d="M14 6a6 6 0 0 0-7 7l-4 4a2.8 2.8 0 0 0 4 4l4-4a6 6 0 0 0 7-7l-4 4-4-4z"/>',
  edit: '<path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7M16 3l5 5M10 14l-1 4 4-1L22 8a2 2 0 0 0-5-5z"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
  up: '<path d="m6 10 6-6 6 6M12 4v16"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  window: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4M13 16h5"/>',
  route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h7a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h7"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1v16"/>',
  code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><rect x="3" y="15" width="6" height="6" rx="1.5"/><path d="M6 9v6M9 6h9v9"/>',
  cube: '<path d="m12 2 10 5v10l-10 5-10-5V7zM2 7l10 5 10-5M12 12v10"/>',
  github: '<path d="M9 19c-5 1-5-3-7-3m14 5v-4a3.5 3.5 0 0 0-1-3c3-.4 6-1.5 6-6a5 5 0 0 0-1.4-3.5A4.5 4.5 0 0 0 19.5 1S18 1 15 3a12 12 0 0 0-6 0C6 1 4.5 1 4.5 1a4.5 4.5 0 0 0-.1 3.5A5 5 0 0 0 3 8c0 4.5 3 5.6 6 6a3.5 3.5 0 0 0-1 3v4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
  video: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  flame: '<path d="M12 3c0 4-5 5-5 11a5 5 0 0 0 10 0c0-3-2-5-3-6 0 3-1 4-2 4-2-2 1-4 0-9Z"/>',
};
export function icon(name: string): string {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.globe}</svg>`;
}
