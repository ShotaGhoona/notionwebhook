// tests/nodes/http/getDailyRecord.test.ts
import { getDailyRecord } from '../../../src/nodes/http/notion/getDailyRecord';

/**
 * 実行すると、Notion APIを呼び出し、JSONが返ってくるかどうかを
 * シンプルに確認するテスト。
 */
test('should fetch JSON data from Notion using getDailyRecord', async () => {
  const pageId = process.env.TEST_DAILY_RECORD_PAGE_ID;
  if (!pageId) {
    throw new Error('TEST_DAILY_RECORD_PAGE_ID is not set in environment variables');
  }

  const data = await getDailyRecord(pageId);
  console.log('Notion data:', data);

  // とりあえず "data" がオブジェクトかどうかを見るだけ
  expect(typeof data).toBe('object');
  // 具体的なプロパティをチェックしたいなら、下記のように可能
  // expect(data.id).toBeDefined();
  // expect(data.object).toBe('page');
});
