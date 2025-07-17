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
		
		title: 'AstralGame',
		components: {
			SocialIcons: './src/components/EmailLink.astro',
			PageSidebar: './src/components/PageSidebar.astro',
			Hero: './src/components/Hero.astro',
			Head: './src/components/Head.astro',
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
				],
			},
			{
				label: '🎮 游戏联机教程',
				items: [
					{ label: 'Minecraft', slug: 'tutorials/minecraft-multiplayer' },
					{ label: 'CS:GO 2', slug: 'tutorials/csgo2-guide' },
					{ label: 'Raft', slug: 'tutorials/raft-multiplayer' },
				],
			},
			{
				label: '🌐 服务器配置',
				items: [
					{ label: '服务器列表', slug: 'server-config/server-list' },
				],
			},
			{
				label: '🔧 故障排除',
				items: [
					{ label: '安装问题', slug: 'troubleshooting/installation-issues' },
					{ label: '连接问题', slug: 'troubleshooting/connection-issues' },
					{ label: 'NAT 类型说明', slug: 'troubleshooting/nat-types' },
					{ label: 'VM解决方案', slug: 'troubleshooting/vm-shi' },
				],
			},
		],
	}), sitemap()],
});