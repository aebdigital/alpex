const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, {
      success: false,
      message: "Povolená je iba metóda POST.",
    });
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    return json(500, {
      success: false,
      message: "Kontaktný formulár nie je nakonfigurovaný.",
    });
  }

  let data;

  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, {
      success: false,
      message: "Neplatný formát formulára.",
    });
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const website = String(data.website || "").trim();

  if (website) {
    return json(200, {
      success: true,
      message: "Správa bola odoslaná.",
    });
  }

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    return json(400, {
      success: false,
      message: "Vyplňte prosím platné meno, email a správu.",
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const payload = {
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
  };

  try {
    const response = await fetch(SMTP2GO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.data?.error || result.error) {
      return json(502, {
        success: false,
        message: "Email sa nepodarilo odoslať. Skúste to prosím neskôr.",
      });
    }

    return json(200, {
      success: true,
      message: "Správa bola odoslaná. Ozveme sa vám čo najskôr.",
    });
  } catch {
    return json(502, {
      success: false,
      message: "Emailová služba momentálne neodpovedá. Skúste to prosím neskôr.",
    });
  }
};
