import { defineConfig, type Plugin } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Local development serverless mock plugin for /api/contact
function contactApiDevPlugin(): Plugin {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/contact" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              const parsed = JSON.parse(body || "{}");
              const { name, email, subject, message } = parsed;

              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(
                  JSON.stringify({ error: "Missing required fields (name, email, message)" })
                );
              }

              const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
              if (apiKey) {
                const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "belalwaheed000@gmail.com";
                const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

                const resendRes = await fetch("https://api.resend.com/emails", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    from: `Portfolio Dev <${fromEmail}>`,
                    to: [toEmail],
                    reply_to: email,
                    subject: `[Portfolio Local] ${subject || "New Inquiry"} - from ${name}`,
                    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`,
                  }),
                });

                const data = await resendRes.json();
                res.statusCode = resendRes.status;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify(data));
              }

              // Simulated local development response when RESEND_API_KEY is not in .env
              console.log("\x1b[32m%s\x1b[0m", "[Dev Contact API] Received contact form submission (simulated 200 OK):");
              console.log({ name, email, subject, message });

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.end(
                JSON.stringify({
                  success: true,
                  id: `local_dev_${Date.now()}`,
                  message: "Simulated dispatch in local development mode",
                })
              );
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Internal error";
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: msg }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

// Inline critical CSS into index.html to eliminate 100% of render-blocking stylesheets
function inlineCssPlugin(): Plugin {
  return {
    name: "inline-css",
    enforce: "post",
    generateBundle(_, bundle) {
      const cssFileName = Object.keys(bundle).find((name) => name.endsWith(".css"));
      const htmlFile = bundle["index.html"];
      if (cssFileName && htmlFile && "source" in htmlFile) {
        const cssAsset = bundle[cssFileName];
        if (cssAsset && "source" in cssAsset) {
          const cssContent = cssAsset.source.toString();
          let html = htmlFile.source.toString();
          html = html.replace(
            new RegExp(`<link[^>]*href="[^"]*${path.basename(cssFileName)}"[^>]*>`, "i"),
            `<style>${cssContent}</style>`
          );
          htmlFile.source = html;
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    contactApiDevPlugin(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
    inlineCssPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) {
              return "router";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) {
              return "react-core";
            }
            if (id.includes("lenis")) {
              return "lenis";
            }
            if (id.includes("gsap")) {
              return "gsap";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
