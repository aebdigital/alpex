import { NextRequest, NextResponse } from "next/server";

const smtp2goEndpoint = "https://api.smtp2go.com/v3/email/send";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    return NextResponse.json(
      {
        success: false,
        message: "Kontaktný formulár nie je nakonfigurovaný.",
      },
      { status: 500 },
    );
  }

  let data: Record<string, unknown>;

  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Neplatný formát formulára.",
      },
      { status: 400 },
    );
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const website = String(data.website || "").trim();

  if (website) {
    return NextResponse.json({
      success: true,
      message: "Správa bola odoslaná.",
    });
  }

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json(
      {
        success: false,
        message: "Vyplňte prosím platné meno, email a správu.",
      },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    const response = await fetch(smtp2goEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        sender,
        to: [recipient],
        subject: `Nová správa z webu ALPEX od ${name}`,
        custom_headers: [
          {
            header: "Reply-To",
            value: email,
          },
        ],
        text_body: [
          "Nová správa z kontaktného formulára ALPEX",
          "",
          `Meno: ${name}`,
          `Email: ${email}`,
          "",
          "Správa:",
          message,
        ].join("\n"),
        html_body: `
          <h2>Nová správa z kontaktného formulára ALPEX</h2>
          <p><strong>Meno:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Správa:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    const result = (await response.json()) as {
      data?: { error?: string };
      error?: string;
    };

    if (!response.ok || result.data?.error || result.error) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sa nepodarilo odoslať. Skúste to prosím neskôr.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Správa bola odoslaná. Ozveme sa vám čo najskôr.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Emailová služba momentálne neodpovedá. Skúste to prosím neskôr.",
      },
      { status: 502 },
    );
  }
}
