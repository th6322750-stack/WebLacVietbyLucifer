import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Renders nothing until a real GA4 property exists — `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset
 * in every environment today, so this is inert in dev, preview, and production alike. Lucifer
 * drops the ID into `.env.local` (and the matching Vercel env var) once a property is created;
 * no code change needed on that day, same as GOOGLE_SHEETS_WEBHOOK_URL / TELEGRAM_BOT_TOKEN. */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
