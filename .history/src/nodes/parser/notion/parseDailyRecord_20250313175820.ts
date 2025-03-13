// src/parse/notion/parseDailyRecord.ts

/** Python版と同等の処理を行い、下記データを返す */
export interface ParsedDailyRecord {
    date: string | null;
    page_ID: string | null;
    person_ID: string | null;
    icon: string;
  }
  
  /**
   * 日報DBのクエリ結果 (Notion JSON) から、
   * 「date, page_ID, person_ID, icon」を抽出する関数。
   *
   * @param body Notionから返されるJSON (例: getDailyRecordの戻り値)
   * @returns ParsedDailyRecord
   */
  export function parseDailyRecord(body: any): ParsedDailyRecord {
    // Python版: body["results"][0]["properties"]["日付"]["date"]["start"] など
  
    // 1. 結果が存在するかチェック
    if (!body?.results || body.results.length === 0) {
      throw new Error('No results found in JSON');
    }
  
    const firstResult = body.results[0];
  
    // 2. 各値を抽出 (オプショナルチェーンで安全に参照)
    const date: string | null =
      firstResult?.properties?.['日付']?.date?.start ?? null;
  
    const person_ID: string | null =
      firstResult?.properties?.['ユーザー']?.people?.[0]?.id ?? null;
  
    const page_ID: string | null = firstResult?.id ?? null;
  
    // 3. ユーザー名を取得してアイコンを決定
    const userName: string =
      firstResult?.properties?.['ユーザー']?.people?.[0]?.name || '';
  
    // 最初の1文字を取得（なければ空文字）
    const firstChar = userName ? userName[0] : '';
    // 1文字目が英数字でない場合それをアイコンに、そうであれば「🍎」
    const icon = firstChar && !/^[a-zA-Z0-9]$/.test(firstChar) ? firstChar : '🍎';
  
    // 4. 整形したデータを返却
    return {
      date,
      page_ID,
      person_ID,
      icon,
    };
  }
  