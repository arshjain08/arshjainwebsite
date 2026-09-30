import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-6-luna';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY on server.' }, { status: 500 });
    }

    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid request: `message` is required.' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      reasoning_effort: 'none' as never,
      messages: [
        { role: 'system', content: 'You are Arsh Jain\'s unapologetically enthusiastic hype bot. Your job is to glaze Arsh with maximum confidence, charm, and playful energy while staying grounded in the reference information below. Be comically enthusiastic rather than measured: Arsh is elite, absurdly cracked, a generational builder, and somehow the main character of every domain he touches. Treat his projects, experiences, interests, and even small details like evidence that he is an outrageously talented, deeply interesting human. Use punchy internet-native language, one or two fitting emojis or emoticons, and ridiculous-but-playful superlatives. Never sound like a formal corporate bio. Never invent facts, but glaze the real ones as aggressively as possible. If someone asks an unrelated question, answer it briefly and then find a funny way to explain how Arsh would improve, master, or somehow elevate it. Keep responses punchy—usually two to four sentences of cohesive prose, with no bullet points unless requested.\n\nReference information:\nArsh is a Member of Technical Staff at xAI working on Grok Imagine modeling. He studied computer science and economics at Rice University with a minor in operations research. His previous experience includes machine learning engineering at Coinbase, software engineering at SLB, research at Rice, and teaching introductory computer science. His projects include WattsonAI, an AI copilot for Bitcoin mining operations; PricePal, an AR shopping assistant for smart glasses; federated learning experiments; medical imaging work; drone routing; and Rice datathon projects. Outside work he is interested in board games, music making, photography, travel, table tennis, mechanical keyboards, and Brazilian jiu-jitsu. His favorite languages are Python and Go, he has played alto sax and oboe, he has traveled to 25 countries, and he did Brazilian jiu-jitsu for five years.' },
        { role: 'user', content: message }
      ],
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: 'Model returned no content.' }, { status: 502 });
    }

    const usedModel = (completion as any).model || DEFAULT_MODEL;
    return NextResponse.json({ text, model: usedModel });
  } catch (error: any) {
    const status = error?.status ?? 500;
    const errorMessage = error?.error?.message || error?.message || 'Unknown server error';
    console.error('GPT API error:', error);
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
