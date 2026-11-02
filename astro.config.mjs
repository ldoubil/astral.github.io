// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import giscusIntegration from './src/integrations/giscus-integration.js';
import starlightGiscus from 'starlight-giscus'
import starlightSiteGraph from 'starlight-site-graph'
import starlightImageZoom from 'starlight-image-zoom'
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
	site:'https://astral.fan',
	redirects: {
		'/preview/download': 'https://github.com/AstralNext/AstralGame/releases',
		'/preview/download/': 'https://github.com/AstralNext/AstralGame/releases',
		'/tutorials/raft-multiplayer': '/advanced/game-multiplayer/',
		'/tutorials/raft-multiplayer/': '/advanced/game-multiplayer/',
		'/tutorials/minecraft-multiplayer': '/advanced/game-multiplayer/',
		'/tutorials/minecraft-multiplayer/': '/advanced/game-multiplayer/',
		'/server-config/server-list': '/user-guide/server-management/',
		'/server-config/server-list/': '/user-guide/server-management/',
		'/public-servers/list': '/user-guide/server-management/',
		'/public-servers/list/': '/user-guide/server-management/',
	},
	integrations: [starlight({
		plugins: [
			starlightImageZoom(),
			starlightSiteGraph({
				// 站点图配置选项
				graph: true,
				backlinks: true,
			}),
			starlightGiscus({
				repo: 'ldoubil/astral.github.io',
				repoId: 'R_kgDOOsZWXQ',
				category: 'Announcements',
				categoryId: 'DIC_kwDOOsZWXc4Cr1fo',
				mapping: "pathname",
				reactions: true,
				inputPosition: "top",
			})
		],
		
		title: 'Astral Game',
		components: {
			SocialIcons: './src/components/EmailLink.astro',
			PageSidebar: './src/components/PageSidebar.astro',
			Hero: './src/components/Hero.astro',
			Head: './src/components/Head.astro',
		},
		// 动力学排印：Anybody 可变字体（wght 100-900 / wdth 50-150）+ 中文回退
		head: [
			{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.loli.net' } },
			{
				tag: 'link',
				attrs: {
					rel: 'stylesheet',
					href: 'https://fonts.loli.net/css2?family=Anybody:wdth,wght@50..150,100..900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap',
				},
			},
		],
		customCss: ['./src/styles/kinetic.css'],
		pagefind: false,
		social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/AstralNext' }],
		editLink: {
			baseUrl: 'https://github.com/ldoubil/astral.github.io/tree/main/',
		},
		lastUpdated: true,
		// 文档入口全部隐藏，但历史页面 URL 仍然保留可访问
		sidebar: [],
	}), sitemap()],
});