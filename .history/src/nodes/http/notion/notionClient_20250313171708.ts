// src/nodes/http/notionClient.ts
import { httpRequest, HttpMethod } from '../httpClient';

export interface NotionRequestParams {
  method: HttpMethod;
  path: string;               // "/v1/pages" や "/v1/databases/xxx/query" など
  body?: any;
  notionVersion?: string;     // バージョンを差し替えるケースに備えて任意化
}

/**
 * Notion API向けの共通リクエストラッパー
 * - ベースURL、認証ヘッダー、Notion-Versionを標準設定
 * - httpClientを内部で呼び出し、パラメータをまとめる
 *
 * @param params NotionRequestParams
 * @return レスポンスのJSON (型 T で指定可能)
 */
export async function notionRequest<T = any>(params: NotionRequestParams): Promise<T> {
  const {
    method,
    path,
    body,
    notionVersion = '2022-06-28', // デフォルト値
  } = params;

  // 環境変数 or 設定ファイルから Notion APIトークンを取得
  const token = process.env.NOTION_API_KEY;
  if (!token) {
    throw new Error('Notion API Key is not defined in environment variables');
  }

  const baseUrl = 'https://api.notion.com';

  return httpRequest<T>({
    method,
    url: `${baseUrl}${path}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': notionVersion,
    },
    body,
  });
}
