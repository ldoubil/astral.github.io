// Giscus集成 - 使用Astro内置钩子
export default function giscusIntegration() {
  return {
    name: 'giscus-integration',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        // 注入Giscus脚本到所有页面
        injectScript('page', `
          // 等待页面加载完成后注入Giscus
          document.addEventListener('DOMContentLoaded', function() {
            // 检查是否已经存在Giscus
            if (document.querySelector('.giscus-container')) {
              return;
            }
            
            // 创建Giscus容器
            const giscusContainer = document.createElement('div');
            giscusContainer.className = 'giscus-container';
            giscusContainer.style.cssText = 'margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--sl-color-gray-6); min-height: 200px;';
            
            // 创建Giscus脚本
            const giscusScript = document.createElement('script');
            giscusScript.src = 'https://giscus.app/client.js';
            giscusScript.setAttribute('data-repo', 'ldoubil/astral.github.io');
            giscusScript.setAttribute('data-repo-id', 'R_kgDOOsZWXQ');
            giscusScript.setAttribute('data-category', 'Announcements');
            giscusScript.setAttribute('data-category-id', 'DIC_kwDOOsZWXc4Cr1fo');
            giscusScript.setAttribute('data-mapping', 'pathname');
            giscusScript.setAttribute('data-strict', '0');
            giscusScript.setAttribute('data-reactions-enabled', '1');
            giscusScript.setAttribute('data-emit-metadata', '0');
            giscusScript.setAttribute('data-input-position', 'top');
            giscusScript.setAttribute('data-theme', 'preferred_color_scheme');
            giscusScript.setAttribute('data-lang', 'zh-CN');
            giscusScript.setAttribute('crossorigin', 'anonymous');
            giscusScript.async = true;
            
            // 找到合适的位置插入Giscus
            const selectors = [
              '.sl-content',
              'main',
              '.content',
              '[data-astro-cid]'
            ];
            
            let targetElement = null;
            for (const selector of selectors) {
              targetElement = document.querySelector(selector);
              if (targetElement) break;
            }
            
            if (targetElement) {
              targetElement.appendChild(giscusContainer);
              giscusContainer.appendChild(giscusScript);
              console.log('Giscus评论组件已加载');
            } else {
              console.warn('未找到合适的内容区域来放置Giscus组件');
            }
          });
        `);
      }
    }
  };
} 