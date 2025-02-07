document.querySelectorAll('.toc li').forEach(item => {
  if (item.querySelector('ul')) {
    const toggle = document.createElement('span');
    toggle.className = 'toc-toggle';
    toggle.innerHTML = '▶';
    item.prepend(toggle);
    
    toggle.addEventListener('click', () => {
      item.classList.toggle('collapsed');
      toggle.innerHTML = item.classList.contains('collapsed') ? '▼' : '▶';
    });
  }
});
