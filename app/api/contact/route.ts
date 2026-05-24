import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "moeezislammalik@gmail.com";

type Payload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  msgSubject?: string;
};

function formspreeFormId(): string | null {
  const id = process.env.FORMSPREE_FORM_ID?.trim();
  if (!id || id.includes("PASTE") || id.length < 4) return null;
  return id;
}

function buildSubject(p: Payload): string {
  return p.msgSubject
    ? `[${p.msgSubject}] Portfolio message from ${p.name}${p.company ? ` at ${p.company}` : ""}`
    : `Portfolio message from ${p.name}${p.company ? ` at ${p.company}` : ""}`;
}

async function sendViaFormspree(p: Payload): Promise<{ ok: true } | { ok: false; error: string }> {
  const formId = formspreeFormId();
  if (!formId) {
    return { ok: false, error: "FORMSPREE_FORM_ID is not configured." };
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: p.name,
        email: p.email,
        company: p.company || "(not provided)",
        message: p.message,
        category: p.msgSubject || "General",
        _replyto: p.email,
        _subject: buildSubject(p),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      errors?: Array<{ message: string }>;
    };

    if (!res.ok) {
      const detail =
        data.error ||
        data.errors?.map((e) => e.message).join(", ") ||
        `Formspree responded ${res.status}`;
      return { ok: false, error: detail };
    }

    if (data.ok === false) {
      return { ok: false, error: data.error || "Formspree rejected the submission." };
    }

    return { ok: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return { ok: false, error: msg };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, subject: msgSubject } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    if (!formspreeFormId()) {
      console.error("[Contact] FORMSPREE_FORM_ID missing or placeholder");
      return NextResponse.json(
        {
          ok: false,
          error: "Contact form is not configured yet.",
          fallback: "mailto",
          recipient: RECIPIENT,
        },
        { status: 503 },
      );
    }

    const result = await sendViaFormspree({ name, email, company, message, msgSubject });

    if (!result.ok) {
      console.error("[Contact] Formspree failed:", result.error);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send your message right now.",
          fallback: "mailto",
          recipient: RECIPIENT,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, via: "formspree" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error.", fallback: "mailto", recipient: RECIPIENT },
      { status: 500 },
    );
  }
}
