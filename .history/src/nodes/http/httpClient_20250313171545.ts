// src/nodes/http/httpClient.ts

/** 利用可能な HTTP メソッド一覧 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** HTTP リクエストを行う際に必要なパラメータ */
export interface HttpRequestParams {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: any; // JSONオブジェクトなど
}

/**
 * 汎用的な HTTP リクエスト関数
 * - JSONレスポンスを想定
 * - fetch のエラーやステータスコードを簡易的に処理
 *
 * @param params HttpRequestParams
 * @return レスポンスの JSON (型パラメータ T で型指定可能)
 */
export async function httpRequest<T = any>(params: HttpRequestParams): Promise<T> {
  const { method, url, headers = {}, body } = params;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    // ステータスコードが 2xx 以外の場合はエラーとみなす
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }

  // JSONとしてパース（テキスト返すAPIの場合は要変更）
  const data = (await response.json()) as T;
  return data;
}
