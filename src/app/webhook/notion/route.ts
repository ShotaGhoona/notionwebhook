// src/app/api/webhook/notion/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Notion が送ってくるイベント情報をログに表示
    console.log('Received Notion Webhook:', body);

    // TODO: ここで必要な処理を行う (DB保存・通知など)

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
