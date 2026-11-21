import type { Metadata } from "next";
import Link from "next/link";
import {
  Bug,
  Settings,
  Database,
  Code2,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Briefcase,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

// ── Course Data ────────────────────────────────────────────────────────

interface CourseData {
  slug: string;
  icon: LucideIcon;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroHighlight: string;
  tagline: string;
  description: string;
  duration: string;
  level: string;
  mode: string;
  tools: string[];
  syllabus: { module: string; topics: string[] }[];
  whoIsThisFor: string[];
  careerRoles: string[];
  schemaDescription: string;
}

const coursesData: Record<string, CourseData> = {
  "software-testing": {
    slug: "software-testing",
    icon: Bug,
    title: "Software Manual Testing & Backend Testing",
    metaTitle:
      "Software Testing Course in Pune | Manual Testing Training | Pay After Placement",
    metaDescription:
      "Best Software Testing course in Pune. Learn Manual Testing, Backend Testing, SQL, SDLC, STLC. Pay After Placement — no upfront fees. 95% placement rate. Enroll at Test Rise Academy!",
    keywords: [
      "Software Testing course in Pune",
      "Manual Testing training Pune",
      "Best Software Testing institute in Pune",
      "Software Testing course for freshers",
      "Manual Testing course fees Pune",
      "QA testing training Pune",
      "Software Testing placement Pune",
      "STLC SDLC training",
      "Backend Testing course",
      "Pay After Placement testing course",
    ],
    heroTitle: "Software Testing Course",
    heroHighlight: "in Pune",
    tagline:
      "Best Manual Testing & Backend Testing Training — Pay After Placement",
    description:
      "Start your IT career with our comprehensive Software Manual Testing course. Learn SDLC, STLC, test case design, defect management, backend testing with SQL, and work on real industry projects. No prior coding experience required. Our Pay After Placement model means you pay fees only after getting a job.",
    duration: "8–10 Weeks",
    level: "Beginner — No experience needed",
    mode: "100% Online — Live Classes",
    tools: ["JIRA", "SQL", "Git", "Test Management Tools", "Bugzilla"],
    syllabus: [
      {
        module: "Testing Fundamentals",
        topics: [
          "Introduction to Software Testing",
          "SDLC & STLC lifecycle",
          "Types of Testing (Functional, Non-Functional)",
          "Testing Levels (Unit, Integration, System, UAT)",
          "V-Model & Agile methodology",
        ],
      },
      {
        module: "Test Design & Execution",
        topics: [
          "Test Case Design Techniques",
          "Equivalence Partitioning & Boundary Value Analysis",
          "Decision Table & State Transition",
          "Test Plan & Test Strategy",
          "Defect Lifecycle & Bug Reporting",
        ],
      },
      {
        module: "Backend Testing & SQL",
        topics: [
          "Database fundamentals",
          "SQL queries for testers (SELECT, JOIN, GROUP BY)",
          "Data validation & integrity checks",
          "Stored Procedures basics",
          "Backend vs Frontend testing",
        ],
      },
      {
        module: "Agile & Tools",
        topics: [
          "Agile & Scrum fundamentals",
          "JIRA for defect tracking",
          "Git version control basics",
          "Test documentation best practices",
          "Real project execution",
        ],
      },
    ],
    whoIsThisFor: [
      "Fresh graduates (BE/BTech/BSc/Any degree)",
      "Career gap candidates returning to work",
      "Non-IT professionals switching to IT",
      "Anyone wanting to start an IT career",
      "Graduates with no coding experience",
    ],
    careerRoles: [
      "Software Tester",
      "QA Analyst",
      "Test Engineer",
      "Manual Tester",
      "QA Executive",
    ],
    schemaDescription:
      "Comprehensive Software Manual Testing course in Pune covering SDLC, STLC, test case design, defect management, backend testing with SQL, and real project work. Pay After Placement model. Best for freshers.",
  },
  "api-testing": {
    slug: "api-testing",
    icon: Settings,
    title: "API Testing — Postman & REST Assured",
    metaTitle:
      "API Testing Course in Pune | Postman & REST Assured Training | Pay After Placement",
    metaDescription:
      "Best API Testing course in Pune. Master Postman, REST Assured, REST APIs, HTTP methods, authentication & API automation. Pay After Placement. Enroll at Test Rise Academy!",
    keywords: [
      "API Testing course Pune",
      "Postman training Pune",
      "REST Assured course Pune",
      "API Testing training institute Pune",
      "REST API Testing course",
      "API automation testing",
      "Best API Testing course in Pune",
      "Web services testing Pune",
      "Pay After Placement API Testing",
    ],
    heroTitle: "API Testing Course",
    heroHighlight: "in Pune",
    tagline: "Master Postman & REST Assured — Best API Testing Training in Pune",
    description:
      "Learn API Testing from scratch. Master Postman for manual API testing and REST Assured for automation. Understand REST APIs, HTTP methods, authentication mechanisms, and build automated API test suites. High-demand skill for modern QA professionals.",
    duration: "6–8 Weeks",
    level: "Beginner to Intermediate",
    mode: "100% Online — Live Classes",
    tools: ["Postman", "REST Assured", "Swagger/OpenAPI", "JSON", "Git", "Newman"],
    syllabus: [
      {
        module: "API Fundamentals",
        topics: [
          "What are APIs and why test them",
          "REST API architecture",
          "HTTP methods (GET, POST, PUT, DELETE, PATCH)",
          "Status codes & headers",
          "JSON & XML data formats",
        ],
      },
      {
        module: "Postman Mastery",
        topics: [
          "Postman setup & interface",
          "Collections & environments",
          "Variables & data-driven testing",
          "Pre-request scripts & tests",
          "Newman for CI/CD integration",
        ],
      },
      {
        module: "REST Assured & Automation",
        topics: [
          "REST Assured library setup",
          "Writing API test scripts",
          "Response validation & assertions",
          "Authentication (OAuth, JWT, API keys)",
          "End-to-end API test suites",
        ],
      },
      {
        module: "Advanced API Testing",
        topics: [
          "API performance testing basics",
          "API security testing concepts",
          "Swagger/OpenAPI documentation",
          "Mock servers & virtualization",
          "Real project: API test automation",
        ],
      },
    ],
    whoIsThisFor: [
      "Manual Testers wanting to upgrade",
      "Developers interested in testing",
      "Fresh graduates with basic testing knowledge",
      "QA professionals adding API skills",
      "Anyone interested in backend testing",
    ],
    careerRoles: [
      "API Tester",
      "QA Engineer",
      "Test Automation Engineer",
      "SDET",
      "Backend QA Analyst",
    ],
    schemaDescription:
      "API Testing course in Pune covering Postman, REST Assured, REST APIs, HTTP methods, authentication, and API automation. Pay After Placement.",
  },
  "etl-testing": {
    slug: "etl-testing",
    icon: Database,
    title: "ETL Testing — Data Warehouse & SQL",
    metaTitle:
      "ETL Testing Course in Pune | Data Warehouse Testing Training | Pay After Placement",
    metaDescription:
      "Best ETL Testing course in Pune. Learn Data Warehouse concepts, SQL, data validation, ETL pipelines & data quality testing. Pay After Placement. High-demand niche. Enroll now!",
    keywords: [
      "ETL Testing course Pune",
      "ETL Testing training Pune",
      "Data Warehouse testing course",
      "Best ETL Testing institute Pune",
      "SQL for ETL Testing",
      "Data quality testing course",
      "ETL Testing course for freshers",
      "Pay After Placement ETL Testing",
      "Data validation testing Pune",
    ],
    heroTitle: "ETL Testing Course",
    heroHighlight: "in Pune",
    tagline:
      "Master Data Warehouse Testing & SQL — Best ETL Testing Course in Pune",
    description:
      "Become a Data Quality specialist. Learn ETL Testing including Data Warehouse concepts, SQL queries, data validation, ETL pipelines, and data quality testing. A high-demand niche with excellent salary prospects and less competition.",
    duration: "6–8 Weeks",
    level: "Beginner to Intermediate",
    mode: "100% Online — Live Classes",
    tools: ["SQL", "Informatica basics", "Excel", "Data Validation Tools"],
    syllabus: [
      {
        module: "Data Warehouse Fundamentals",
        topics: [
          "What is a Data Warehouse",
          "OLTP vs OLAP systems",
          "Star Schema & Snowflake Schema",
          "Fact tables & Dimension tables",
          "ETL process overview",
        ],
      },
      {
        module: "SQL for ETL Testers",
        topics: [
          "SQL fundamentals (SELECT, WHERE, JOIN)",
          "Advanced SQL (Subqueries, Window Functions)",
          "Aggregate functions & GROUP BY",
          "Data type handling",
          "Stored procedures basics",
        ],
      },
      {
        module: "ETL Testing Techniques",
        topics: [
          "Source-to-target mapping",
          "Data completeness validation",
          "Data transformation verification",
          "Incremental load testing",
          "Duplicate & null checks",
        ],
      },
      {
        module: "Advanced ETL & Projects",
        topics: [
          "ETL defect patterns",
          "Data quality metrics & reporting",
          "Informatica basics for testers",
          "Performance considerations",
          "Real project: End-to-end ETL testing",
        ],
      },
    ],
    whoIsThisFor: [
      "Fresh graduates (BE/BTech/BSc/MCA)",
      "Manual Testers expanding to data testing",
      "SQL-comfortable professionals",
      "Anyone interested in data quality roles",
      "Career changers targeting niche QA roles",
    ],
    careerRoles: [
      "ETL Tester",
      "Data Quality Analyst",
      "Data Warehouse Tester",
      "BI Tester",
      "Data Validation Engineer",
    ],
    schemaDescription:
      "ETL Testing course in Pune covering Data Warehouse concepts, SQL, data validation, ETL pipelines, and data quality testing. Pay After Placement.",
  },
  "python-automation": {
    slug: "python-automation",
    icon: Code2,
    title: "Python Automation Testing — Selenium & Pytest",
    metaTitle:
      "Python Automation Testing Course in Pune | Selenium Training | Pay After Placement",
    metaDescription:
      "Best Automation Testing course in Pune. Learn Python, Selenium WebDriver, Pytest, POM framework, CI/CD. Pay After Placement. Become an SDET. Enroll at Test Rise Academy!",
    keywords: [
      "Automation Testing course Pune",
      "Selenium training Pune",
      "Python Automation Testing course",
      "Selenium WebDriver course Pune",
      "Pytest training Pune",
      "Best Automation Testing institute Pune",
      "SDET course Pune",
      "Test Automation framework course",
      "Pay After Placement Automation Testing",
      "Python Selenium course Pune",
    ],
    heroTitle: "Python Automation Testing",
    heroHighlight: "Course in Pune",
    tagline:
      "Master Selenium & Pytest — Build Test Automation Frameworks from Scratch",
    description:
      "Learn Automation Testing with Python, Selenium WebDriver, and Pytest. Build professional test automation frameworks, write automated test scripts, and integrate with CI/CD pipelines. The most in-demand skill for SDET and Senior QA roles.",
    duration: "10–12 Weeks",
    level: "Beginner to Advanced",
    mode: "100% Online — Live Classes",
    tools: [
      "Python",
      "Selenium WebDriver",
      "Pytest",
      "Jenkins",
      "Git",
      "Allure Reports",
    ],
    syllabus: [
      {
        module: "Python Programming",
        topics: [
          "Python basics & data types",
          "Control flow & functions",
          "OOP concepts (Classes, Inheritance)",
          "File handling & exceptions",
          "Python libraries for testing",
        ],
      },
      {
        module: "Selenium WebDriver",
        topics: [
          "Selenium architecture & setup",
          "Locators (ID, CSS, XPath)",
          "Handling web elements",
          "Waits (Implicit, Explicit, Fluent)",
          "Actions & interactions",
        ],
      },
      {
        module: "Test Framework & Design",
        topics: [
          "Pytest framework fundamentals",
          "Fixtures & parameterization",
          "Page Object Model (POM) design",
          "Data-Driven Testing",
          "Keyword-Driven Testing basics",
        ],
      },
      {
        module: "Advanced Automation & CI/CD",
        topics: [
          "Cross-browser testing",
          "Parallel test execution",
          "Allure reporting",
          "Jenkins CI/CD integration",
          "Real project: Full automation framework",
        ],
      },
    ],
    whoIsThisFor: [
      "Manual Testers upgrading to Automation",
      "Fresh graduates (BE/BTech/MCA)",
      "QA professionals learning SDET skills",
      "Developers interested in test automation",
      "Anyone wanting high-paying QA roles",
    ],
    careerRoles: [
      "Automation Test Engineer",
      "SDET",
      "QA Automation Lead",
      "Test Architect",
      "Senior QA Engineer",
    ],
    schemaDescription:
      "Python Automation Testing course in Pune covering Selenium WebDriver, Pytest, POM framework, data-driven testing, and CI/CD integration. Pay After Placement.",
  },
  "teamcenter-plm": {
    slug: "teamcenter-plm",
    icon: Layers,
    title: "Siemens Teamcenter PLM (Admin + BMIDE + AWC)",
    metaTitle:
      "Siemens Teamcenter PLM Course in Pune | Administration & AWC Training | Pay After Placement",
    metaDescription:
      "Best Siemens Teamcenter PLM course in Pune. Learn Teamcenter Architecture, BMIDE Data Modeling, Workflow Designer, Active Workspace (AWC) & ITK. Pay After Placement. Enroll now!",
    keywords: [
      "Teamcenter PLM course in Pune",
      "Siemens Teamcenter training Pune",
      "PLM training institute Pune",
      "Teamcenter AWC training Pune",
      "BMIDE course Pune",
      "Teamcenter Admin course Pune",
      "Siemens PLM course with placement",
      "Pay After Placement PLM course",
      "Teamcenter customization training",
      "PLM jobs Pune freshers",
    ],
    heroTitle: "Siemens Teamcenter PLM",
    heroHighlight: "Course in Pune",
    tagline:
      "Master Administration, BMIDE & Active Workspace (AWC) — Pay After Placement",
    description:
      "Launch your career in Product Lifecycle Management (PLM) with India's most in-depth Siemens Teamcenter course. Learn 4-tier architecture, BMIDE data modeling, workflow automation, Active Workspace Client (AWC), organization management, and ITK customization basics. Huge demand in automotive, aerospace, and IT service companies in Pune.",
    duration: "10–12 Weeks",
    level: "Beginner to Intermediate",
    mode: "100% Online — Live Classes",
    tools: [
      "Siemens Teamcenter",
      "Active Workspace (AWC)",
      "BMIDE",
      "Workflow Designer",
      "Access Manager",
      "SQL",
      "ITK / RAC",
    ],
    syllabus: [
      {
        module: "PLM & Teamcenter Architecture",
        topics: [
          "What is PLM & Product Lifecycle stages",
          "Teamcenter 2-tier vs 4-tier architecture",
          "Rich Application Client (RAC) overview",
          "Active Workspace Client (AWC) interface",
          "Data Organization: Workspace, Folders, Items & Revisions",
        ],
      },
      {
        module: "Data Modeling with BMIDE",
        topics: [
          "BMIDE fundamentals & project setup",
          "Creating Business Objects (Item, Form, Dataset)",
          "Properties, Lovs (List of Values) & Naming Rules",
          "Relation Rules & GRM Rules",
          "Packaging & deploying BMIDE templates",
        ],
      },
      {
        module: "Teamcenter Administration & Workflows",
        topics: [
          "Organization setup: Groups, Roles & Users",
          "Access Manager & Rule Tree configuration",
          "Workflow Designer: Tasks, Handlers & Triggers",
          "Change Management (ECR, ECO, ECN processes)",
          "Preferences, Utilities & Volume Management",
        ],
      },
      {
        module: "AWC & Customization Fundamentals",
        topics: [
          "Active Workspace (AWC) architecture & tile configuration",
          "Declarative UI & Gateway configuration",
          "ITK (Integration Toolkit) C/C++ basics & server exits",
          "Teamcenter Integration with CAD (NX, CATIA)",
          "Real-world automotive/engineering PLM project",
        ],
      },
    ],
    whoIsThisFor: [
      "Mechanical, Automobile, Production & Industrial Engineers",
      "Computer Science & IT graduates entering enterprise software",
      "CAD/Design engineers wanting to transition to PLM",
      "Freshers seeking high-demand enterprise IT roles",
      "Professionals wanting ₹5–15+ LPA career growth",
    ],
    careerRoles: [
      "Teamcenter PLM Administrator",
      "PLM Consultant / Analyst",
      "Teamcenter Developer / Customizer",
      "AWC Specialist",
      "PLM Support Engineer",
    ],
    schemaDescription:
      "Siemens Teamcenter PLM training course in Pune covering 4-tier architecture, BMIDE data modeling, workflow automation, Active Workspace (AWC), and administration. Pay After Placement model.",
  },
};

// ── Generate Static Params ─────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(coursesData).map((slug) => ({ slug }));
}

// ── Generate Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesData[slug];
  if (!course) return {};

  return {
    title: course.metaTitle,
    description: course.metaDescription,
    keywords: course.keywords,
    alternates: {
      canonical: `https://testriseacademy.com/courses/${slug}`,
    },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
      url: `https://testriseacademy.com/courses/${slug}`,
      type: "website",
    },
  };
}

// ── Page Component ─────────────────────────────────────────────────────

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = coursesData[slug];

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-navy mb-4">
            Course Not Found
          </h1>
          <Link href="/courses" className="text-brand-primary hover:underline">
            ← View All Courses
          </Link>
        </div>
      </main>
    );
  }

  const CourseIcon = course.icon;

  // Per-page JSON-LD
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.schemaDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: "Test Rise Academy",
      url: "https://testriseacademy.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    url: `https://testriseacademy.com/courses/${slug}`,
    educationalLevel: course.level.split("—")[0].trim(),
    coursePrerequisites: "No prior experience required",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `PT${parseInt(course.duration) * 5}H`,
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
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://testriseacademy.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: "https://testriseacademy.com/courses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `https://testriseacademy.com/courses/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white font-sans antialiased text-brand-navy">
        {/* Hero */}
        <section className="relative bg-brand-navy pt-28 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-main relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/courses"
                className="hover:text-white/70 transition-colors"
              >
                Courses
              </Link>
              <span>/</span>
              <span className="text-white/70">{course.title}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center">
                  <CourseIcon className="w-7 h-7 text-brand-primary-light" />
                </div>
                <span className="text-brand-primary-light font-semibold text-sm uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                {course.heroTitle}{" "}
                <span className="text-brand-primary-light">
                  {course.heroHighlight}
                </span>
              </h1>
              <p className="text-brand-primary-light/80 font-medium text-lg mt-4">
                {course.tagline}
              </p>
              <p className="text-white/60 text-lg mt-4 max-w-3xl leading-relaxed">
                {course.description}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mt-8">
                <span className="flex items-center gap-2 bg-white/[0.08] text-white/80 text-sm px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4" /> {course.duration}
                </span>
                <span className="flex items-center gap-2 bg-white/[0.08] text-white/80 text-sm px-4 py-2 rounded-xl">
                  <BookOpen className="w-4 h-4" /> {course.mode}
                </span>
                <span className="flex items-center gap-2 bg-brand-primary/20 text-brand-primary-light text-sm font-semibold px-4 py-2 rounded-xl">
                  <Briefcase className="w-4 h-4" /> Pay After Placement
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl text-base"
                >
                  Apply Now — Pay After Placement
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Syllabus */}
        <section className="py-20 md:py-28">
          <div className="container-main">
            <div className="text-center mb-16">
              <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                Complete Curriculum
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight">
                Course Syllabus
              </h2>
              <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Industry-designed curriculum that prepares you for real job
                interviews and workplace challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {course.syllabus.map((mod, idx) => (
                <div
                  key={mod.module}
                  className="bg-white rounded-2xl p-8 border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center text-brand-primary font-bold text-sm">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-brand-navy">
                      {mod.module}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {mod.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-sm text-brand-gray-500"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-brand-gray-50">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-brand-navy text-center mb-8">
              Tools & Technologies You&apos;ll Master
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {course.tools.map((tool) => (
                <span
                  key={tool}
                  className="bg-white border border-brand-gray-200 text-brand-navy font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Who Is This For + Career Roles */}
        <section className="py-20">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Who Is This For */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-brand-primary" />
                  <h2 className="text-2xl font-bold text-brand-navy">
                    Who Is This Course For?
                  </h2>
                </div>
                <ul className="space-y-4">
                  {course.whoIsThisFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-brand-gray-500"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Roles */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-brand-primary" />
                  <h2 className="text-2xl font-bold text-brand-navy">
                    Career Roles After This Course
                  </h2>
                </div>
                <ul className="space-y-4">
                  {course.careerRoles.map((role) => (
                    <li
                      key={role}
                      className="flex items-start gap-3 text-brand-gray-500"
                    >
                      <Briefcase className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-brand-navy text-center">
          <div className="container-main">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Start Your{" "}
              <span className="text-brand-primary-light">Testing Career</span>?
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
              Apply now. Train with industry experts. Pay only after you get
              placed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl text-base"
              >
                Apply Now — Pay After Placement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
              >
                <ArrowLeft className="w-5 h-5" /> View All Courses
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
