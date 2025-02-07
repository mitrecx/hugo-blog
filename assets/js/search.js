const fuse = new Fuse(data, {
  useExtendedSearch: true,    // 启用扩展搜索语法
  ignoreLocation: true,       // 匹配任意位置
  includeScore: true,
  threshold: 0.3,
  keys: [
    { name: 'title', weight: 2 },  // 提升标题权重
    { name: 'content', weight: 1 }
  ],
  // 中文搜索优化
  tokenize: true,
  matchAllTokens: true,
  distance: 10
})
// 显示详细匹配信息
fuse.search('search').forEach(result => {
  console.log('匹配文章:', result.item.title)
  console.log('匹配分数:', result.score) // 分数越接近0匹配度越高
  console.log('匹配位置:', result.matches)
})

// 在搜索结果处理逻辑中添加过滤
const results = fuse.search('search')
  .filter(result => result.score < 0.4)  // 只保留高匹配度结果
  .slice(0, 10);                         // 限制结果数量


document.addEventListener('DOMContentLoaded', () => {
  const search = new FlexSearch({
    threshold: 0.3,         // 匹配敏感度 (0=精确, 1=宽松)
    keys: ['title', 'content', 'tags'], // 搜索字段
    includeMatches: true    // 显示匹配片段
  });
  // 加载索引数据
  fetch('/index.json').then(res => res.json()).then(data => {
    search.add(data);
  });
});
