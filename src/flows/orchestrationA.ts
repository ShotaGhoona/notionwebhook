// src/flow/orchestrationA.ts

import { getDailyRecord } from '../nodes/http/notion/getDailyRecord';
import { parseDailyRecord } from '../nodes/parser/notion/parseDailyRecord';

interface OrchestrationAResult {
  rawJson: any;                 // getDailyRecord の生データ
  parsed: {
    date: string | null;
    page_ID: string | null;
    person_ID: string | null;
    icon: string;
  };
}

/**
 * オーケストレーションA:
 * - step1: Notionから日報データを取得 (getDailyRecord)
 * - step2: パーサーで必要なフィールド抽出 (parseDailyRecord)
 * - 今後、さらにタスク取得や目標取得などのフローを追加し拡張していける。
 *
 * @param pageId Notionの日報ページID
 * @returns OrchestrationAResult
 */
export async function orchestrationA(pageId: string): Promise<OrchestrationAResult> {
  try {
    // 1. 日報データを取得
    const rawData = await getDailyRecord(pageId);

    // 2. データをパースして { date, page_ID, person_ID, icon } を抽出
    const parsedData = parseDailyRecord(rawData);

    // 結果をまとめて返す
    return {
      rawJson: rawData,
      parsed: parsedData,
    };
  } catch (error) {
    console.error('[orchestrationA] Error:', error);
    throw error; // 呼び出し元でハンドリング
  }
}
