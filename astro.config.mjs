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
					label: '🚀 快速入门',
					items: [
						{ label: '什么是 Astral？', slug: 'quick-start/what-is-astral' },
						{ label: '下载与安装', slug: 'quick-start/download-install' },
						{ label: '基础设置', slug: 'quick-start/basic-settings' },
						{ label: '创建房间', slug: 'quick-start/create-room' },
						{ label: '加入房间', slug: 'quick-start/join-room' },
					],
				},
				{
					label: '📖 用户指南',
					items: [
						{ label: '服务器管理', slug: 'user-guide/server-management' },
						{ label: '房间管理', slug: 'user-guide/room-management' },
						{ label: '网络设置', slug: 'user-guide/network-settings' },
					],
				},
				{
					label: '🎯 进阶教程',
					items: [
						{ label: '游戏联机指南', slug: 'advanced/game-multiplayer' },
						{ label: '远程办公应用', slug: 'advanced/remote-work' },
					],
				},
				{
					label: '🌐 服务器配置',
					items: [
						{ label: '服务器列表', slug: 'server-config/server-list' },
						{ label: '搭建指南', slug: 'server-config/setup-guide' },
					],
				},
				{
					label: '🔧 故障排除',
					items: [
						{ label: '安装问题', slug: 'troubleshooting/installation-issues' },
						{ label: '连接问题', slug: 'troubleshooting/connection-issues' },
						{ label: 'NAT 类型说明', slug: 'troubleshooting/nat-types' },
					],
				},
			],
		}),
	],
});
