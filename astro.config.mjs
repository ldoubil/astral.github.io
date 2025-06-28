// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import giscusIntegration from './src/integrations/giscus-integration.js';
import starlightGiscus from 'starlight-giscus'
import starlightSiteGraph from 'starlight-site-graph'
// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			 plugins: [
				starlightSiteGraph({  
				}),
       starlightGiscus({
           repo: 'ldoubil/astral.github.io',
           repoId: 'R_kgDOOsZWXQ',
           category: 'Announcements',
           categoryId: 'DIC_kwDOOsZWXc4Cr1fo',
		mapping:"pathname",
		reactions:true,
		inputPosition:"top",
		
		

       })
     ],
			title: 'Astral',
			components:{
				SocialIcons: './src/components/EmailLink.astro',
			},
			logo: {
				light: './src/assets/亮色.svg',
				dark: './src/assets/暗色.svg',
				replacesTitle: true,
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ldoubil/astral' }],
			editLink: {
				baseUrl: 'https://github.com/ldoubil/astral.github.io/tree/main/',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: '开始',
					items: [
						{ label: '简介', slug: '开始/简介' },
						{ label: '下载', slug: '开始/下载' },
						{ label: '安装', slug: '开始/安装' },
						{ label: '使用', slug: '开始/使用' },
					],
				},
				{
					label: '指南',
					autogenerate: { directory: '指南' },
				},
{
					label: '教程',
					autogenerate: { directory: '教程' },
				},
				{
					label: '公共服务器',
					autogenerate: { directory: '公共服务器' },
				},
				{
					label: '常见问题',
					autogenerate: { directory: 'FAQ' },
				},
			
			],
		}),
	],
});
