"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Software Testing?",
    answer:
      "Software Testing is the process of evaluating and verifying that a software application or product does what it is supposed to do. It involves finding bugs, defects, and errors to ensure the quality of the software before it reaches end users.",
  },
  {
    question: "Do I need coding knowledge to start?",
    answer:
      "No, coding knowledge is NOT mandatory to start. You can begin with Manual Testing which requires logical thinking and attention to detail. As you grow, you can learn automation testing with Python/Selenium. We teach everything from scratch.",
  },
  {
    question: "Who can join this program?",
    answer:
      "BE/BTech Holders, BSc Graduates, Freshers, Experienced Professionals, Career Gap Candidates, Any Graduate with Good Communication Skills, Non-IT professionals looking to switch to IT, and Manual Testers wanting to upgrade skills.",
  },
  {
    question: "What courses do you offer?",
    answer:
      "We offer: 1) Software Manual Testing & Backend Testing, 2) API Testing (Postman, REST Assured), 3) ETL Testing (Data Warehouse Testing, SQL), 4) Python Automation Testing (Selenium, Pytest), and 5) Corporate Training Programs.",
  },
  {
    question: "What is Pay After Placement?",
    answer:
      "You complete your training first. After getting placed in a company, you pay the course fees from your salary — 3 months salary after placement. This model removes financial burden from students and parents, ensuring that financial limitations never stop you from building a successful career.",
  },
  {
    question: "What is the training mode?",
    answer:
      "The complete training is conducted online. Attend live classes from your home — no need to relocate to expensive cities. Just like modern IT companies, interviews are also conducted online. You can complete your learning, projects, and placement process remotely.",
  },
  {
    question: "Will I get placement support?",
    answer:
      "Yes. We provide comprehensive placement support including Resume Building, Mock Interviews, Interview Preparation, Placement Assistance, and direct HR connections. Our team works with you until you land your dream QA job.",
  },
  {
    question: "What tools will I learn?",
    answer:
      "You will learn Selenium WebDriver, Postman, REST Assured, Python, Pytest, SQL, JIRA, Git, Jenkins, and other industry-standard testing tools. Our curriculum covers everything you need to become a job-ready software tester.",
  },
  {
    question: "What about after placement support?",
    answer:
      "Always welcome! We provide continuous career support even after placement. Whether you need help switching jobs, career advice, or upskilling guidance — our mentors are always available to help.",
  },
];

export default function FAQ() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Everything you need to know about our software testing training
            programs.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <AccordionItem
                  value={i}
                  className="bg-white rounded-xl mb-3 border border-brand-gray-100 px-6 hover:border-brand-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-brand-navy font-semibold text-[0.95rem] py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-gray-500 text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
