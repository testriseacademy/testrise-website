import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Bug,
  Code2,
  Database,
  Settings,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  Briefcase,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Software Testing Courses in Pune — Pay After Placement",
  description:
    "Explore our Software Testing courses: Manual Testing, API Testing, ETL Testing, Python Automation. All courses with Pay After Placement. Best testing training institute in Pune. Enroll now!",
  keywords: [
    "Software Testing courses Pune",
    "Manual Testing course Pune",
    "API Testing course Pune",
    "ETL Testing course Pune",
    "Python Automation Testing course",
    "Selenium course Pune",
    "Best Software Testing courses in Pune",
    "Pay After Placement courses",
  ],
  alternates: {
    canonical: "https://testriseacademy.com/courses",
  },
  openGraph: {
    title: "Software Testing Courses — Pay After Placement | Test Rise Academy",
    description:
      "Manual Testing, API Testing, ETL Testing, Python Automation. All courses with Pay After Placement model. No prior experience needed.",
    url: "https://testriseacademy.com/courses",
  },
};

const courses = [
  {
    slug: "software-testing",
    icon: Bug,
    title: "Software Manual Testing & Backend Testing",
    tagline: "Best Software Testing Course in Pune — Start Your QA Career",
    description:
      "Complete Manual Testing training covering SDLC, STLC, test case design, defect management, backend testing with SQL, and real project experience. Perfect for freshers and graduates.",
    duration: "8–10 Weeks",
    level: "Beginner — No experience needed",
    tools: ["JIRA", "SQL", "Test Management Tools", "Git"],
    topics: [
      "SDLC & STLC fundamentals",
      "Test case design techniques",
      "Defect lifecycle management",
      "Backend Testing with SQL",
      "Agile & Scrum methodology",
      "Real industry project work",
    ],
  },
  {
    slug: "api-testing",
    icon: Settings,
    title: "API Testing — Postman & REST Assured",
    tagline: "Best API Testing Course in Pune — Master REST API Validation",
    description:
      "Learn API Testing with Postman and REST Assured. Covers REST APIs, HTTP methods, authentication, request-response validation, and API automation. High-demand skill for QA professionals.",
    duration: "6–8 Weeks",
    level: "Beginner to Intermediate",
    tools: ["Postman", "REST Assured", "Swagger", "JSON", "Git"],
    topics: [
      "REST API fundamentals",
      "HTTP methods & status codes",
      "Postman collections & variables",
      "REST Assured with Java/Python",
      "Authentication (OAuth, JWT, API keys)",
      "API automation scripts",
    ],
  },
  {
    slug: "etl-testing",
    icon: Database,
    title: "ETL Testing — Data Warehouse & SQL",
    tagline: "Best ETL Testing Course in Pune — Data Quality Specialist",
    description:
      "Master ETL Testing including Data Warehouse concepts, SQL queries, data validation, ETL pipelines, and data quality testing. High-demand niche with excellent salary prospects.",
    duration: "6–8 Weeks",
    level: "Beginner to Intermediate",
    tools: ["SQL", "Informatica basics", "Excel", "Data Validation Tools"],
    topics: [
      "Data Warehouse fundamentals",
      "ETL process & pipelines",
      "SQL for data validation",
      "Data quality & completeness checks",
      "Source-to-target mapping",
      "ETL defect patterns",
    ],
  },
  {
    slug: "python-automation",
    icon: Code2,
    title: "Python Automation Testing — Selenium & Pytest",
    tagline:
      "Best Python Automation Testing Course in Pune — Build Test Frameworks",
    description:
      "Learn Automation Testing with Python, Selenium WebDriver, and Pytest. Build test frameworks, write scripts, and automate web applications. Most in-demand skill for SDET roles.",
    duration: "10–12 Weeks",
    level: "Beginner to Advanced",
    tools: ["Python", "Selenium WebDriver", "Pytest", "Jenkins", "Git"],
    topics: [
      "Python programming fundamentals",
      "Selenium WebDriver setup & usage",
      "Page Object Model (POM) design",
      "Pytest framework & fixtures",
      "Data-driven testing",
      "CI/CD integration with Jenkins",
    ],
  },
];

export default function CoursesPage() {
  return (
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
        <div className="container-main relative text-center">
          <span className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-primary-light rounded-full px-5 py-2 text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" /> Our Training Programs
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Software Testing{" "}
            <span className="text-brand-primary-light">Courses in Pune</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Industry-ready training programs with Pay After Placement. No prior
            experience needed. 95% placement rate.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-primary-light" /> Pay
              After Placement
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-primary-light" /> 100%
              Online
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-primary-light" /> Industry
              Expert Mentors
            </span>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="space-y-16">
            {courses.map((course, idx) => (
              <article
                key={course.slug}
                id={course.slug}
                className="group bg-white rounded-3xl border border-brand-gray-100 hover:border-brand-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Left — Info */}
                  <div className="lg:col-span-3 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center">
                        <course.icon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <span className="text-xs font-semibold text-brand-primary bg-brand-primary/[0.08] px-3 py-1 rounded-full uppercase tracking-wider">
                        Course {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">
                      {course.title}
                    </h2>
                    <p className="text-brand-primary font-medium text-sm mt-2">
                      {course.tagline}
                    </p>
                    <p className="text-brand-gray-500 text-base mt-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mt-6 text-sm">
                      <span className="flex items-center gap-2 text-brand-gray-500">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-2 text-brand-gray-500">
                        <BookOpen className="w-4 h-4 text-brand-primary" />
                        {course.level}
                      </span>
                      <span className="flex items-center gap-2 text-brand-gray-500">
                        <Briefcase className="w-4 h-4 text-brand-primary" />
                        Pay After Placement
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <Link
                        href="/apply"
                        className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-7 py-3 rounded-xl transition-all duration-300 hover:shadow-lg text-sm"
                      >
                        Apply Now — Pay After Placement
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-gray-200 hover:border-brand-primary text-brand-navy font-semibold px-7 py-3 rounded-xl transition-all duration-300 text-sm"
                      >
                        View Full Syllabus
                      </Link>
                    </div>
                  </div>

                  {/* Right — Topics & Tools */}
                  <div className="lg:col-span-2 bg-brand-gray-50 p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-brand-gray-100">
                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4">
                        What You&apos;ll Learn
                      </h3>
                      <ul className="space-y-3">
                        {course.topics.map((topic) => (
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
                    <div>
                      <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4">
                        Tools & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {course.tools.map((tool) => (
                          <span
                            key={tool}
                            className="bg-white border border-brand-gray-200 text-brand-navy text-xs font-medium px-3 py-1.5 rounded-lg"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-brand-gray-50 border-t border-brand-gray-100">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">
            Not Sure Which Course is Right for You?
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Talk to our mentors. We&apos;ll help you pick the best path based on
            your background and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl text-base"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-brand-gray-200 hover:border-brand-primary text-brand-navy font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
            >
              <Users className="w-5 h-5" /> Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
