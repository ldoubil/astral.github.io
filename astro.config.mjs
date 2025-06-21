// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Astral',
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
