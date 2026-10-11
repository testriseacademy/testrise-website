const { Client } = require('pg');

async function setupDatabase() {
  const cs = 'postgresql://postgres.xxduckyebkultgnrwrjf:' + encodeURIComponent('Hrishi@123#') + '@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';
  const client = new Client({ connectionString: cs, ssl: { rejectUnauthorized: false } });

  console.log('Connecting to Supabase PostgreSQL...');
  await client.connect();
  console.log('Connected successfully!');

  const sql = `
    -- 1. LMS Users
    CREATE TABLE IF NOT EXISTS public.lms_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      course_assigned TEXT DEFAULT '1',
      access_level INT DEFAULT 1,
      roll_number INT,
      status TEXT DEFAULT 'Active',
      last_login TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 2. Student Applications
    CREATE TABLE IF NOT EXISTS public.student_applications (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      mobile TEXT NOT NULL,
      city TEXT,
      address TEXT,
      qualification TEXT,
      passout_year TEXT,
      current_status TEXT,
      selected_course TEXT DEFAULT 'Software Testing Masters',
      lead_source TEXT DEFAULT 'Website',
      referral_name TEXT,
      roll_number TEXT,
      status TEXT DEFAULT 'Pending',
      screening_score INT,
      screening_status TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 3. Student Inquiries
    CREATE TABLE IF NOT EXISTS public.student_inquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      mobile TEXT NOT NULL,
      course TEXT DEFAULT 'Software Testing',
      query TEXT,
      city TEXT,
      status TEXT DEFAULT 'Inquiry Submitted',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 4. LMS Progress
    CREATE TABLE IF NOT EXISTS public.lms_progress (
      id SERIAL PRIMARY KEY,
      student_email TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      status TEXT DEFAULT 'In Progress',
      watch_time INT DEFAULT 0,
      last_watched TIMESTAMPTZ DEFAULT NOW()
    );

    -- 5. Mock Topics & Questions
    CREATE TABLE IF NOT EXISTS public.mock_topics (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.mock_questions (
      id SERIAL PRIMARY KEY,
      topic_id INT REFERENCES public.mock_topics(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      expected_keywords TEXT,
      ideal_answer TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS public.student_mock_scores (
      id SERIAL PRIMARY KEY,
      student_email TEXT NOT NULL,
      topic_name TEXT NOT NULL,
      score INT NOT NULL,
      wpm INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Disable or configure RLS with public access for now
    ALTER TABLE public.lms_users ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_lms_users" ON public.lms_users;
    CREATE POLICY "public_lms_users" ON public.lms_users FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.student_applications ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_student_applications" ON public.student_applications;
    CREATE POLICY "public_student_applications" ON public.student_applications FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.student_inquiries ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_student_inquiries" ON public.student_inquiries;
    CREATE POLICY "public_student_inquiries" ON public.student_inquiries FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.lms_progress ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_lms_progress" ON public.lms_progress;
    CREATE POLICY "public_lms_progress" ON public.lms_progress FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.mock_topics ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_mock_topics" ON public.mock_topics;
    CREATE POLICY "public_mock_topics" ON public.mock_topics FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.mock_questions ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_mock_questions" ON public.mock_questions;
    CREATE POLICY "public_mock_questions" ON public.mock_questions FOR ALL USING (true) WITH CHECK (true);

    ALTER TABLE public.student_mock_scores ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "public_student_mock_scores" ON public.student_mock_scores;
    CREATE POLICY "public_student_mock_scores" ON public.student_mock_scores FOR ALL USING (true) WITH CHECK (true);

    -- Insert Default Mentor Admin user if not exists
    INSERT INTO public.lms_users (email, password_hash, full_name, role, status, course_assigned, access_level)
    VALUES ('admin@testriseacademy.com', 'mentor123', 'Test Rise Mentor', 'mentor', 'Active', '1', 3)
    ON CONFLICT (email) DO NOTHING;

    -- Seed Initial Screening / Mock Topics & Questions
    INSERT INTO public.mock_topics (id, name, description) VALUES
      (1, 'Self-Introduction & Background', 'Candidate personal and academic communication skills'),
      (2, 'Software Testing Fundamentals', 'Core SDLC, STLC, defect life cycle, and testing basics'),
      (3, 'API & Automation Concepts', 'Postman, REST APIs, and Selenium automation awareness')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.mock_questions (topic_id, question_text, expected_keywords, ideal_answer) VALUES
      (1, 'Introduce yourself: Explain your educational background, current focus, and why you want to transition into Software Testing.', 'education, degree, software testing, passion, career, growth', 'Hello mentor, my name is... I completed my graduation in... and I am motivated to build a QA career because testing ensures high quality and offers excellent growth.'),
      (2, 'What is the difference between Manual Testing and Automation Testing, and why are both important?', 'manual testing, automation, test cases, efficiency, regression, human eye', 'Manual testing involves executing test cases manually without tools to catch UX defects, while Automation testing uses scripts to run repetitive regression tests quickly.'),
      (3, 'Explain what happens during the Defect Life Cycle from bug discovery to closing.', 'new, assigned, open, fixed, retest, verified, closed, rejected', 'When a tester finds a defect, its logged as New, assigned to a developer, moved to Open, Fixed by the developer, Retested by QA, Verified and finally Closed.')
    ON CONFLICT DO NOTHING;
  `;

  await client.query(sql);
  console.log('Database tables, policies, default admin, and mock seed created successfully!');
  await client.end();
}

setupDatabase().catch(console.error);
