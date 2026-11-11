// 构建前从 next.astral.fan 同步下载列表与游戏列表，保持两个站点同源。
// 任何拉取或校验失败都会直接中止构建，避免静默产出空列表。
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BASE_URL = (process.env.NEXT_DATA_BASE_URL ?? 'https://next.astral.fan').replace(/\/+$/, '');
const TIMEOUT_MS = 30_000;

const SOURCES = [
  { url: `${BASE_URL}/gamerules.json`, dest: 'src/data/games.json', kind: 'games' },
  { url: `${BASE_URL}/downloads.json`, dest: 'public/downloads-game.json', kind: 'downloads' },
  { url: `${BASE_URL}/downloads-astral.json`, dest: 'public/downloads-astral.json', kind: 'downloads' },
];

function fail(message, cause) {
  const detail = cause ? `: ${cause.message ?? cause}` : '';
  console.error(`[sync-next-data] 失败：${message}${detail}`);
  process.exit(1);
}

function toText(value, fallback = '') {
  return value === undefined || value === null ? fallback : String(value);
}

function normalizeGame(game, index) {
  if (!game || typeof game !== 'object') {
    throw new Error(`games[${index}] 不是对象`);
  }
  const id = toText(game.id).trim();
  const name = toText(game.name).trim();
  if (!id) throw new Error(`games[${index}] 缺少 id`);
  if (!name) throw new Error(`games[${index}] (${id}) 缺少 name`);

  const sort = Number(game.sort);
  // 保留源数据里的其余字段（如 sgdb_game_id），只对站点必需的字段做校验与归一。
  return {
    ...game,
    id,
    name,
    name_zh: toText(game.name_zh, name).trim() || name,
    show_in_picker: game.show_in_picker !== false,
    sort: Number.isFinite(sort) ? sort : 999,
  };
}

function normalizeDownloads(list, label) {
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error(`${label} 不是非空数组`);
  }
  return list.map((item, index) => {
    const url = toText(item?.url).trim();
    if (!url) throw new Error(`${label}[${index}] 缺少 url`);
    return {
      version: toText(item.version),
      date: toText(item.date),
      url,
    };
  });
}

function normalize(payload, kind, label) {
  if (!payload || typeof payload !== 'object') {
    throw new Error(`${label} 不是 JSON 对象/数组`);
  }
  if (kind === 'games') {
    if (!Array.isArray(payload.games) || payload.games.length === 0) {
      throw new Error(`${label} 的 games 不是非空数组`);
    }
    return {
      version: payload.version ?? null,
      games: payload.games.map(normalizeGame),
    };
  }
  return normalizeDownloads(payload, label);
}

async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error(`请求 ${url} 失败`, { cause: error });
  }
  if (!res.ok) {
    throw new Error(`请求 ${url} 返回 HTTP ${res.status}`);
  }
  try {
    return await res.json();
  } catch (error) {
    throw new Error(`${url} 返回的不是合法 JSON`, { cause: error });
  }
}

async function main() {
  // 先全部拉取并校验，再统一写入，避免半途失败留下不一致的数据。
  const results = [];
  for (const source of SOURCES) {
    const payload = await fetchJson(source.url);
    results.push({ ...source, data: normalize(payload, source.kind, source.url) });
  }

  const games = results.find((r) => r.kind === 'games').data;
  const visible = games.games.filter((g) => g.show_in_picker && g.id !== 'other').length;
  if (visible === 0) {
    throw new Error('游戏列表没有可见条目');
  }

  for (const result of results) {
    const target = join(ROOT, result.dest);
    const next = `${JSON.stringify(result.data, null, 2)}\n`;
    let current = null;
    try {
      current = await readFile(target, 'utf8');
    } catch {
      // 文件不存在时直接写入
    }
    await mkdir(dirname(target), { recursive: true });
    if (current === next) {
      console.log(`[sync-next-data] 未变化：${result.dest}`);
      continue;
    }
    await writeFile(target, next, 'utf8');
    console.log(`[sync-next-data] 已更新：${result.dest}`);
  }

  console.log(
    `[sync-next-data] 完成：游戏 ${visible} 款可见 / 共 ${games.games.length} 条（version ${games.version}），` +
      `游戏版下载 ${results.find((r) => r.dest.includes('downloads-game'))?.data.length} 条，` +
      `通用版下载 ${results.find((r) => r.dest.includes('downloads-astral'))?.data.length} 条`,
  );
}

main().catch((error) => fail('同步 next.astral.fan 数据时出错', error));
