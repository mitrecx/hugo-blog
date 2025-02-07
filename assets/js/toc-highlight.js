document.addEventListener('DOMContentLoaded', () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4');
  const tocLinks = document.querySelectorAll('.toc a');
  
  // 交叉观察器监听标题位置
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.hash === `#${id}`) {
            link.classList.add('active');
            // 自动滚动TOC容器
            const tocSidebar = document.querySelector('.toc-sidebar');
            const linkTop = link.offsetTop;
            const sidebarHeight = tocSidebar.offsetHeight;
            if (linkTop > sidebarHeight / 2) {
              tocSidebar.scrollTop = linkTop - sidebarHeight / 2;
            }
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  headings.forEach(heading => observer.observe(heading));
});
