export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS Preflight for /api/contact
    if (url.pathname === '/api/contact' && request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // Handle /api/contact requests via Edge Worker
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
        };

        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
          return new Response(
            JSON.stringify({ error: 'Missing required fields (name, email, message)' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            }
          );
        }

        const apiKey = env.RESEND_API_KEY;
        if (!apiKey) {
          console.warn('RESEND_API_KEY is not configured in Cloudflare environment.');
          return new Response(
            JSON.stringify({ error: 'Email service is currently offline. Please use direct email.' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            }
          );
        }

        const toEmail = env.CONTACT_RECEIVER_EMAIL || 'belalwaheed000@gmail.com';
        const fromEmail = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: `Portfolio Inquiry <${fromEmail}>`,
            to: [toEmail],
            reply_to: email,
            subject: `[Portfolio] ${subject || 'New Contact Request'} - from ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #18181b; background-color: #fafafa;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px;">
                  <h2 style="margin-top: 0; color: #047857;">New Message from Portfolio</h2>
                  <hr style="border: 0; border-top: 1px solid #f4f4f5; margin: 16px 0;" />
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
                  <hr style="border: 0; border-top: 1px solid #f4f4f5; margin: 24px 0 16px 0;" />
                  <p style="font-size: 12px; color: #71717a; margin: 0;">Sent automatically from Belal Waheed Portfolio Website (Cloudflare Edge)</p>
                </div>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const errorData = (await resendRes.json().catch(() => ({}))) as { message?: string };
          return new Response(
            JSON.stringify({ error: errorData.message || 'Failed to send email via Resend' }),
            {
              status: resendRes.status,
              headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
            }
          );
        }

        const data = (await resendRes.json().catch(() => ({}))) as { id?: string };
        return new Response(JSON.stringify({ success: true, id: data.id }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Internal server error';
        return new Response(JSON.stringify({ error: errorMsg }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }
    }

    // Serve all frontend assets and SPA routes via static asset binding with edge caching
    const response = await env.ASSETS.fetch(request);
    
    if (response.ok) {
      const newHeaders = new Headers(response.headers);
      if (url.pathname.startsWith('/assets/')) {
        newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (url.pathname.match(/\.(webp|webm|mp4|png|jpg|jpeg|svg|pdf|ico)$/i)) {
        newHeaders.set('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
      } else if (url.pathname.match(/\.(txt|xml)$/i)) {
        newHeaders.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
      }
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    return response;
  },
};
