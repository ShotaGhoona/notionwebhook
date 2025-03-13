// tests/nodes/parser/parseDailyRecord.test.ts
console.log('*** parseDailyRecord.test.ts loaded ***');
import { parseDailyRecord } from '../../../src/nodes/parser/notion/parseDailyRecord';

describe('parseDailyRecord', () => {
  it('should correctly parse valid daily record JSON', () => {
    // テスト用のサンプルJSONを用意
    const sampleBody = {
      results: [
        {
          id: '1b4c1c8d-2b53-80c7-958e-ccb73033aa15',
          properties: {
            '日付': {
              date: { start: '2025-03-12', end: null },
            },
            'ユーザー': {
              people: [
                {
                  id: '19ed872b-594c-81de-a574-0002538bfb68',
                  name: '🛺 YamashitaShota',
                },
              ],
            },
          },
        },
      ],
    };

    const result = parseDailyRecord(sampleBody);

    expect(result).toEqual({
      date: '2025-03-12',
      page_ID: '1b4c1c8d-2b53-80c7-958e-ccb73033aa15',
      person_ID: '19ed872b-594c-81de-a574-0002538bfb68',
      icon: '🛺',
    });
  });

  it('should return 🍎 if the first character of name is alphanumeric', () => {
    const sampleBody = {
      results: [
        {
          id: 'dummy-page-id',
          properties: {
            '日付': {
              date: { start: '2025-03-12' },
            },
            'ユーザー': {
              people: [
                {
                  id: 'dummy-person-id',
                  name: 'A123 Person',
                },
              ],
            },
          },
        },
      ],
    };

    const result = parseDailyRecord(sampleBody);

    expect(result.icon).toBe('🍎');
    expect(result.date).toBe('2025-03-12');
    expect(result.page_ID).toBe('dummy-page-id');
    expect(result.person_ID).toBe('dummy-person-id');
  });

  it('should throw error if no results are present', () => {
    const emptyBody = { results: [] };

    // 例: parseDailyRecord の実装内で
    // if (!body?.results || body.results.length === 0) {
    //   throw new Error('No results found');
    // }
    expect(() => parseDailyRecord(emptyBody)).toThrow('No results found');
  });
});
