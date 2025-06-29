import Script from "next/script";

export const AnalyticsGoogle = () => {
  const isDevelopmentMode = process.env.NODE_ENV === "development";

  // We do not want analytics to run in development
  if (isDevelopmentMode) return null;

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0JCXZBYRKQ"
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0JCXZBYRKQ');
        `}
      </Script>
    </>
  );
};
