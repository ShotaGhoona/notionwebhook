// src/nodes/http/getDailyRecord.ts
import { notionRequest } from './notionClient';

/**
 * 日報DB から指定のページ情報を取得
 * - pageId: 取得したいページのID
 * - この例では GET "/v1/pages/:pageId" を呼ぶ想定
 */

interface DailyRecordResponse {
  object: string;
  id: string;
  properties: Record<string, any>;
  // ... 他にも必要なフィールドがあれば定義
}

export async function getDailyRecord(pageId: string): Promise<DailyRecordResponse> {
  // Notion API の "/v1/pages/:id" エンドポイントを呼び出す
  const path = `/v1/pages/${pageId}`;

  return notionRequest<DailyRecordResponse>({
    method: 'GET',
    path,
  });
}
