import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://testriseacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Software Testing & Siemens Teamcenter PLM Training in Pune | Pay After Placement | Test Rise Academy",
    template: "%s | Test Rise Academy",
  },
  description:
    "Best Software Testing & Siemens Teamcenter PLM Training Institute in Pune. Learn Manual Testing, API, ETL, Python Automation & Teamcenter PLM (Admin, BMIDE, AWC). Pay After Placement — No Upfront Fees. 95% Placement Rate. Enroll Now!",
  keywords: [
    "Teamcenter PLM course in Pune",
    "Siemens Teamcenter training Pune",
    "PLM training institute Pune",
    "Teamcenter AWC training Pune",
    "BMIDE course Pune",
    "Software Testing course in Pune",
    "Software Testing training Pune",
    "Best Software Testing institute Pune",
    "Manual Testing course Pune",
    "API Testing training Pune",
    "ETL Testing course Pune",
    "Python Automation Testing course",
    "Selenium training Pune",
    "QA training institute Pune",
    "Pay After Placement IT course",
    "Pay After Placement testing course Pune",
    "Pay After Placement PLM course",
    "Software Testing career",
    "Test Rise Academy",
  ],
  authors: [{ name: "Test Rise Academy", url: SITE_URL }],
  creator: "Test Rise Academy",
  publisher: "Test Rise Academy",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "Software Testing Training in Pune | Pay After Placement | Test Rise Academy",
    description:
      "Best Software Testing Institute in Pune. Master Manual, API, ETL & Automation Testing. No prior experience needed. Pay After Placement. 95% placement rate.",
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Test Rise Academy",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Test Rise Academy — Software Testing Training in Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Software Testing Training in Pune | Pay After Placement | Test Rise Academy",
    description:
      "Best Software Testing Institute in Pune. No prior experience needed. Pay After Placement. 95% placement rate.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "AYfODfeiNjBDJYIm9INQudZSd8JWHWcz0jVjDcMeozA",
  },
  category: "Education",
};

// ── Structured Data (JSON-LD) ──────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "Test Rise Academy",
  alternateName: "TestRise Academy",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Best Software Testing Training Institute in Pune offering Manual Testing, API Testing, ETL Testing & Python Automation courses with Pay After Placement model.",
  foundingDate: "2024",
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "Country", name: "India" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "admissions",
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Testing Courses",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Software Testing Training Programs",
        itemListElement: [
          "Software Manual Testing & Backend Testing",
          "API Testing (Postman, REST Assured)",
          "ETL Testing (Data Warehouse Testing, SQL)",
          "Python Automation Testing (Selenium, Pytest)",
          "Siemens Teamcenter PLM (Admin, BMIDE, AWC)",
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "120",
    reviewCount: "95",
  },
};

const courseSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Software Manual Testing & Backend Testing Course",
    description:
      "Comprehensive Manual Testing training covering SDLC, STLC, test case design, defect management, backend testing with SQL, and real project experience. Best for freshers and graduates wanting to start a Software Testing career in Pune.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/courses/software-testing`,
    educationalLevel: "Beginner",
    coursePrerequisites: "No prior experience or coding knowledge required",
    teaches:
      "Manual Testing, Backend Testing, SQL, Test Case Design, Defect Management, SDLC, STLC, Agile Testing",
    inLanguage: "en",
    availableLanguage: ["English", "Hindi"],
    numberOfCredits: "0",
    occupationalCredentialAwarded: "Test Rise Academy Certification",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT40H",
      instructor: {
        "@type": "Person",
        name: "Industry Expert Mentors",
        description: "8+ years of testing experience in top IT companies",
      },
    },
    offers: {
      "@type": "Offer",
      category: "Pay After Placement",
      price: "0",
      priceCurrency: "INR",
      description:
        "Pay After Placement — No upfront fees. Pay 3 months salary after getting placed.",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "85",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "API Testing Course — Postman & REST Assured",
    description:
      "Learn API Testing with Postman and REST Assured. Covers REST APIs, HTTP methods, authentication, request-response validation, and API automation. Best API Testing course in Pune with Pay After Placement.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/courses/api-testing`,
    educationalLevel: "Intermediate",
    coursePrerequisites: "Basic understanding of testing concepts helpful but not required",
    teaches:
      "API Testing, Postman, REST Assured, REST APIs, HTTP Methods, JSON, Authentication, API Automation",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT30H",
    },
    offers: {
      "@type": "Offer",
      category: "Pay After Placement",
      price: "0",
      priceCurrency: "INR",
      description: "Pay After Placement — No upfront fees.",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "ETL Testing Course — Data Warehouse & SQL",
    description:
      "Master ETL Testing including Data Warehouse concepts, SQL queries, data validation, ETL pipelines, and data quality testing. Best ETL Testing training institute in Pune with placement support.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/courses/etl-testing`,
    educationalLevel: "Intermediate",
    coursePrerequisites: "No prior experience required. SQL taught from scratch.",
    teaches:
      "ETL Testing, SQL, Data Warehouse Testing, Data Validation, Data Quality, ETL Pipelines, Informatica basics",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT35H",
    },
    offers: {
      "@type": "Offer",
      category: "Pay After Placement",
      price: "0",
      priceCurrency: "INR",
      description: "Pay After Placement — No upfront fees.",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Python Automation Testing — Selenium & Pytest",
    description:
      "Learn Automation Testing with Python, Selenium WebDriver, and Pytest. Build test frameworks, write scripts, and automate web applications. Best Python Automation Testing course in Pune.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/courses/python-automation`,
    educationalLevel: "Intermediate",
    coursePrerequisites:
      "No prior programming experience required. Python taught from basics.",
    teaches:
      "Python, Selenium WebDriver, Pytest, Test Automation Framework, POM Design Pattern, Data-Driven Testing, CI/CD basics",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT45H",
    },
    offers: {
      "@type": "Offer",
      category: "Pay After Placement",
      price: "0",
      priceCurrency: "INR",
      description: "Pay After Placement — No upfront fees.",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Siemens Teamcenter PLM Course (Admin + BMIDE + AWC)",
    description:
      "Comprehensive Siemens Teamcenter PLM course covering 4-tier architecture, BMIDE data modeling, workflow automation, Active Workspace (AWC), and administration in Pune with Pay After Placement.",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/courses/teamcenter-plm`,
    educationalLevel: "Intermediate",
    coursePrerequisites:
      "Engineering graduates (Mechanical, CS, IT, Production) or IT freshers.",
    teaches:
      "Siemens Teamcenter, Active Workspace AWC, BMIDE Data Modeling, Workflow Designer, Access Manager, ITK basics",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT50H",
    },
    offers: {
      "@type": "Offer",
      category: "Pay After Placement",
      price: "0",
      priceCurrency: "INR",
      description: "Pay After Placement — No upfront fees.",
      availability: "https://schema.org/InStock",
    },
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Software Testing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Software Testing is the process of evaluating and verifying that a software application or product does what it is supposed to do. It involves finding bugs, defects, and errors to ensure the quality of the software before it reaches end users.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need coding knowledge to start a Software Testing course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, coding knowledge is NOT mandatory to start. You can begin with Manual Testing which requires logical thinking and attention to detail. As you grow, you can learn automation testing with Python/Selenium. At Test Rise Academy, we teach everything from scratch.",
      },
    },
    {
      "@type": "Question",
      name: "Who can join the Software Testing training program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BE/BTech Holders, BSc Graduates, Freshers, Experienced Professionals, Career Gap Candidates, Any Graduate with Good Communication Skills, Non-IT professionals looking to switch to IT, and Manual Testers wanting to upgrade skills.",
      },
    },
    {
      "@type": "Question",
      name: "What Software Testing courses does Test Rise Academy offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Test Rise Academy offers: 1) Software Manual Testing & Backend Testing, 2) API Testing (Postman, REST Assured), 3) ETL Testing (Data Warehouse Testing, SQL), 4) Python Automation Testing (Selenium, Pytest), and 5) Corporate Training Programs.",
      },
    },
    {
      "@type": "Question",
      name: "What is Pay After Placement model at Test Rise Academy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You complete your training first. After getting placed in a company, you pay the course fees from your salary — 3 months salary after placement. This model removes financial burden from students and parents, ensuring that financial limitations never stop you from building a successful career.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Software Testing training online or offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The complete training is conducted online. Attend live classes from your home — no need to relocate to expensive cities. Just like modern IT companies, interviews are also conducted online. You can complete your learning, projects, and placement process remotely.",
      },
    },
    {
      "@type": "Question",
      name: "Does Test Rise Academy provide placement support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide comprehensive placement support including Resume Building, Mock Interviews, Interview Preparation, Placement Assistance, and direct HR connections. Our team works with you until you land your dream QA job. 95% of our students get placed.",
      },
    },
    {
      "@type": "Question",
      name: "What testing tools will I learn at Test Rise Academy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You will learn Selenium WebDriver, Postman, REST Assured, Python, Pytest, SQL, JIRA, Git, Jenkins, and other industry-standard testing tools. Our curriculum covers everything you need to become a job-ready software tester.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Software Testing institute in Pune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Test Rise Academy is one of the best Software Testing training institutes in Pune, known for its industry-ready curriculum, hands-on project-based training, 95% placement rate, and unique Pay After Placement model where students pay fees only after getting a job.",
      },
    },
    {
      "@type": "Question",
      name: "Is Software Testing a good career in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Software Testing is one of the most in-demand IT careers. With growing digital products, companies need skilled QA professionals. Average fresher salary for Software Testers in India is ₹3.5–6 LPA, with experienced testers earning ₹8–20+ LPA. The demand for Manual, Automation, API, and ETL testers continues to grow rapidly.",
      },
    },
    {
      "@type": "Question",
      name: "What is the salary of a Software Tester in Pune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Freshers in Software Testing can expect ₹3–4.5 LPA in Pune. With 2–3 years of experience, testers earn ₹5–8 LPA. Automation testers and SDET roles command ₹8–15+ LPA. Test Rise Academy's Pay After Placement model ensures you start earning before paying your fees.",
      },
    },
    {
      "@type": "Question",
      name: "Does Test Rise Academy provide Siemens Teamcenter PLM training in Pune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Test Rise Academy offers industry-level Siemens Teamcenter PLM training in Pune covering BMIDE Data Modeling, Workflow Designer, Active Workspace (AWC), Administration, and ITK basics with Pay After Placement.",
      },
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Test Rise Academy",
  url: SITE_URL,
  description:
    "Best Software Testing Training Institute in Pune with Pay After Placement",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Courses",
      item: `${SITE_URL}/courses`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta
          name="google-site-verification"
          content="AYfODfeiNjBDJYIm9INQudZSd8JWHWcz0jVjDcMeozA"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Course Schemas */}
        {courseSchemas.map((schema, i) => (
          <script
            key={`course-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
