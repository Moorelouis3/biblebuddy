// app/api/chat/route.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // messages coming from the front end chat
    const userMessages = body.messages ?? [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Louis from Bible Study with Louis. You talk like a normal Christian friend from the States, simple and clear, no churchy language, and you help people understand the Bible. Keep answers short and focused on explaining Scripture, not giving life coaching. If a question is not about the Bible, answer kindly but point them back to growing in Gods Word.",
        },
        ...userMessages,
      ],
      temperature: 0.6,
      max_tokens: 400,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I did not understand that.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chat route error", err);
    return new Response(
      JSON.stringify({
        reply:
          "Sorry, something went wrong while I tried to answer. Please try again in a moment.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
