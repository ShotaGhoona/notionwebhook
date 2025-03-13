// tests/nodes/http/getDailyRecord.test.ts

import { getDailyRecord } from '../../../src/nodes/http/notion/getDailyRecord';

describe('getDailyRecord node', () => {
  const pageId = process.env.TEST_DAILY_RECORD_PAGE_ID; 
  // ↑ .env.test や .env にて 「TEST_DAILY_RECORD_PAGE_ID=xxx-xxx-xxx」 を指定しておく
  
  it('should retrieve the daily record from Notion API', async () => {
    if (!pageId) {
      throw new Error('No test pageId set in TEST_DAILY_RECORD_PAGE_ID');
    }

    // 実際に Notion API を叩く
    const data = await getDailyRecord(pageId);
    expect(data).toBeDefined();

    // Notionの返却データが想定通りかどうか簡易チェック
    expect(data.id).toBe(pageId.replaceAll('-', '')); // NotionのページIDはハイフン削除で一致する場合あり
    expect(data.object).toBe('page');

    // 必要に応じて properties や other fields もチェック
    // console.log('Retrieved data:', JSON.stringify(data, null, 2));
  });
});
