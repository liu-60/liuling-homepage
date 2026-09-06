export interface Social { label: string; icon: string; url: string; pending?: boolean }
export interface Metric { value: number; label: string; suffix?: string; source: string }
export interface Project {
  title: string; subtitle: string; description: string; icon: string;
  tags: string[]; role: string; challenge: string; solution: string;
  image: string | null; url: string | null;
}
// Only add user-approved public assets. Empty sections are omitted at build time.
export const profile = { name: 'LIU LING', chineseName: '刘凌', role: 'AI / Full-stack Engineer', portrait: '/images/liu-ling-512.webp' as string | null };
// Only publish the email after the owner confirms it is public.
export const contactEmail: string | null = null;
export const socials: Social[] = [
  {label:'GitHub',icon:'github',url:'https://github.com/liu-60'},
  {label:'X',icon:'x',url:'',pending:true},
  {label:'小红书',icon:'xiaohongshu',url:'',pending:true},
  {label:'微信',icon:'wechat',url:'',pending:true},
];
export const metrics: Metric[] = [];
export const projects: Project[] = [
  { title: 'Test & Delivery Platform', subtitle: '测试与研发效能平台', description: '可视化测试编排与大规模结果渲染。', icon: 'terminal', tags: ['React', 'WebWorker', 'CI'], role: 'Platform engineer · Frontend', challenge: 'Handle complex test data and large result sets.', solution: 'CSV processing in Web Workers, visual test orchestration, virtual lists and continuous delivery.', image: null, url: null },
  { title: 'Travel Platform', subtitle: '旅行平台', description: 'SKU 计算、缓存与长列表性能优化。', icon: 'route', tags: ['React', 'Redux', 'Virtual Lists'], role: 'Frontend engineer', challenge: 'Keep data-heavy travel interfaces responsive.', solution: 'A Redux cache layer, virtualized lists and reusable mock workflows.', image: null, url: null },
  { title: 'Education Platform', subtitle: '职教平台', description: '课程、数据看板与页面性能优化。', icon: 'book', tags: ['Angular', 'TypeScript', 'ECharts'], role: 'Frontend engineer', challenge: 'Build a clear, usable interface for course and platform data.', solution: 'Course interfaces, interactive dashboards and page-loading improvements.', image: null, url: null },
];
export const experience = [
  { period: '2024.08 — Present', title: 'Independent Developer', company: 'AI applications & full-stack delivery', note: '工作流编排与端到端交付。', current: true },
  { period: '2019.05 — 2024.08', title: 'Platform Engineer', company: '易宝支付 · Frontend', note: '自动化测试与研发效能平台。', current: false },
  { period: '2017.12 — 2019.03', title: 'Frontend Engineer', company: '妙计旅行', note: '旅行平台与前端性能优化。', current: false },
  { period: '2016.08 — 2017.11', title: 'Frontend Engineer', company: '蒜墨科技', note: '教育平台与数据可视化。', current: false },
];
export const stack = [
  { title: 'React', note: 'Interfaces & platforms', icon: 'code', brand: 'react.svg', tone: 'blue' },
  { title: 'Vue', note: 'Web & cross-platform', icon: 'layers', brand: 'vue.svg', tone: 'green' },
  { title: 'TypeScript', note: 'Clarity by design', icon: 'terminal', brand: 'typescript.svg', tone: 'blue' },
  { title: 'Node.js', note: 'Services & integration', icon: 'cube', brand: 'nodejs.svg', tone: 'green' },
  { title: 'LLM Workflows', note: 'Prompt · Agent · AIGC', icon: 'workflow', tone: 'orange' },
  { title: 'Delivery', note: 'Build · Deploy · Verify', icon: 'briefcase', tone: 'purple' },
];
export const software = [
  {title:'Next.js',note:'React framework',brand:'nextjs.png',url:'https://nextjs.org/'},
  {title:'ChatGPT',note:'AI assistant',brand:'chatgpt.svg',url:'https://chatgpt.com/'},
  {title:'ima',note:'Knowledge workspace',brand:'ima.svg',url:'https://ima.qq.com/'},
  {title:'Mini Programs',note:'Weixin ecosystem',brand:'wechat-miniprogram.svg',url:'https://mp.weixin.qq.com/'},
  {title:'Tencent Cloud',note:'Cloud infrastructure',brand:'tencent-cloud.png',url:'https://cloud.tencent.com/'},
  {title:'Figma',note:'Design & prototyping',brand:'figma.svg',url:'https://www.figma.com/'},
];

export const projectPaths = ['/work/test-delivery.html','/work/travel.html','/work/education.html'];
