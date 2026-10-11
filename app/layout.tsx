import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Rise Academy | Become a Certified Software Testing Professional",
  description:
    "Launch your IT career with India's most practical Software Testing Training. Master Manual Testing, API Testing, ETL Testing & Python Automation. Pay After Placement. 95% Placement Success Rate.",
  keywords: [
    "Software Testing Training",
    "Manual Testing Course",
    "API Testing Course",
    "ETL Testing Training",
    "Python Automation Testing",
    "Selenium Training",
    "QA Training",
    "Pay After Placement",
    "Software Testing Academy",
    "Test Rise Academy",
    "Testing Career",
    "QA Engineer Training",
  ],
  authors: [{ name: "Test Rise Academy" }],
  openGraph: {
    title: "Test Rise Academy | Become a Certified Software Testing Professional",
    description:
      "Launch your IT career with practical Software Testing Training. No Prior Experience Required. Pay After Placement.",
    type: "website",
    locale: "en_IN",
    siteName: "Test Rise Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test Rise Academy | Software Testing Training",
    description:
      "No Prior Experience Required. Pay After Placement. 95% Placement Success.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Test Rise Academy",
              description:
                "India's practical Software Testing Training Academy for aspiring QA professionals",
              url: "https://testriseacademy.com",
              telephone: "+91-99999-99999",
              email: "info@testriseacademy.com",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
