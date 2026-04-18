# SMTP2GO Contact Form Setup

The contact form posts to `/.netlify/functions/contact`. The Netlify function validates the submitted name, email and message, then sends the email through the SMTP2GO API.

## Required Environment Variables

Set these in the Netlify dashboard under **Site configuration > Environment variables**:

```bash
CONTACT_FORM_RECIPIENT=servis@alpex.sk
SMTP2GO_API_KEY=your-smtp2go-api-key
SMTP2GO_SENDER="ALPEX Autoservis <noreply@alpex.sk>"
NEXT_PUBLIC_SITE_URL=https://alpex.sk
```

`SMTP2GO_SENDER` must be a sender identity or domain that is verified in SMTP2GO.

## Files

- `netlify/functions/contact.js` handles form validation and SMTP2GO email delivery.
- `components/ContactForm.tsx` handles the browser-side AJAX submission, loading state and success/error messages.
- `app/api/contact/route.ts` mirrors the same behavior for local Next.js development when the Netlify function endpoint is not available.
- `netlify.toml` configures the Netlify build, functions directory, Next.js plugin, redirects and security headers.
- `.env.example` documents all environment variables.

## Local Testing

For Next.js-only development:

```bash
npm run dev
```

The form first tries the Netlify function path and falls back to `/api/contact` locally.

For full Netlify function testing, use Netlify Dev:

```bash
netlify dev
```

Make sure the environment variables are available locally before testing real email delivery.

## Deployment Notes

1. Add the environment variables in Netlify.
2. Deploy the repository.
3. Submit the contact form from the live site.
4. If delivery fails, confirm that the SMTP2GO sender is verified and that the API key has email sending permissions.
