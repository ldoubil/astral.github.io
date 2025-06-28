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
						{ label: '什么是 Astral？', slug: '快速入门/什么是Astral' },
						{ label: '下载与安装', slug: '快速入门/下载安装' },
						{ label: '基础设置', slug: '快速入门/基础设置' },
						{ label: '创建房间', slug: '快速入门/创建房间' },
						{ label: '加入房间', slug: '快速入门/加入房间' },
					],
				},
				{
					label: '📖 用户指南',
					items: [
						{ label: '服务器管理', slug: '用户指南/服务器管理' },
						{ label: '房间管理', slug: '用户指南/房间管理' },
						{ label: '网络设置', slug: '用户指南/网络设置' },
					],
				},
				{
					label: '🎯 进阶教程',
					items: [
						{ label: '游戏联机指南', slug: '进阶教程/游戏联机' },
						{ label: '远程办公应用', slug: '进阶教程/远程办公' },
					],
				},
				{
					label: '🌐 服务器配置',
					items: [
						{ label: '服务器列表', slug: '服务器配置/服务器列表' },
						{ label: '搭建指南', slug: '服务器配置/搭建指南' },
					],
				},
				{
					label: '🔧 故障排除',
					items: [
						{ label: '安装问题', slug: '故障排除/安装问题' },
						{ label: '连接问题', slug: '故障排除/连接问题' },
						{ label: 'NAT 类型说明', slug: '故障排除/NAT类型' },
					],
				},
			],
		}),
	],
});
