// ==========================================
// Test Rise Academy - LMS Database Service (Supabase)
// ==========================================

import { supabase } from './supabase';

export interface LMSUser {
  email: string;
  passwordHash: string;
  role: 'student' | 'mentor' | 'admin';
  fullName: string;
  courseAssigned: string;
  lastLogin: string;
  status: string;
  createdDate: string;
  rollNumber?: number;
}

export const LMS_SHEETS = {
  USERS: 'Users',
  PROGRESS: 'Progress',
  MODULES: 'Modules',
  LESSONS: 'Lessons',
  COURSES: 'Courses',
};

/**
 * Format Roll Number consistently across the platform (e.g. TRA-2610-1201)
 */
export function formatRollNumber(num?: number | string | null): string {
  if (!num) return "-";
  const numStr = num.toString().trim();
  if (numStr.startsWith("TRA-")) return numStr;
  return `TRA-2610-${numStr}`;
}

/**
 * Find user by email from Supabase
 */
export async function findUserByEmail(email: string): Promise<{ user: LMSUser; rowIndex: number } | null> {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();

  try {
    const { data, error } = await supabase
      .from('lms_users')
      .select('*')
      .ilike('email', cleanEmail)
      .maybeSingle();

    if (error || !data) {
      // Fallback default mentor check if DB is freshly created
      if (cleanEmail === 'admin@testriseacademy.com') {
        return {
          user: {
            email: 'admin@testriseacademy.com',
            passwordHash: 'mentor123',
            role: 'mentor',
            fullName: 'Test Rise Mentor',
            courseAssigned: '1',
            lastLogin: '',
            status: 'Active',
            createdDate: new Date().toISOString(),
            rollNumber: 1201,
          },
          rowIndex: 1,
        };
      }
      return null;
    }

    return {
      user: {
        email: data.email,
        passwordHash: data.password_hash,
        role: data.role as any,
        fullName: data.full_name,
        courseAssigned: data.course_assigned || '1',
        lastLogin: data.last_login || '',
        status: data.status || 'Active',
        createdDate: data.created_at || '',
        rollNumber: data.roll_number,
      },
      rowIndex: data.id,
    };
  } catch (err) {
    console.error('Supabase findUserByEmail error:', err);
    return null;
  }
}

/**
 * Update user's last login timestamp in Indian Standard Time (IST)
 */
export async function updateLastLogin(rowIndex: number | string, email?: string): Promise<void> {
  const nowIst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  try {
    if (email) {
      await supabase
        .from('lms_users')
        .update({ last_login: nowIst })
        .ilike('email', email.trim());
    } else {
      await supabase
        .from('lms_users')
        .update({ last_login: nowIst })
        .eq('id', rowIndex);
    }
  } catch (err) {
    console.error('updateLastLogin error:', err);
  }
}

/**
 * Create or update student user directly from Mentor UI or Admission
 */
export async function createUserOrUpdate(user: Partial<LMSUser>): Promise<{ success: boolean; error?: string; rollNumber?: number }> {
  if (!user.email) return { success: false, error: "Email is required." };
  const cleanEmail = user.email.toLowerCase().trim();

  try {
    const { data: existing, error: findError } = await supabase
      .from('lms_users')
      .select('id, roll_number')
      .ilike('email', cleanEmail)
      .maybeSingle();

    if (findError) {
      return { success: false, error: `Find failed: ${findError.message}` };
    }

    let assignedRoll = user.rollNumber;

    if (existing) {
      assignedRoll = existing.roll_number || user.rollNumber;
      if (!assignedRoll) {
        const { data: maxLms } = await supabase
          .from('lms_users')
          .select('roll_number')
          .order('roll_number', { ascending: false })
          .not('roll_number', 'is', null)
          .limit(1)
          .maybeSingle();

        const highest = maxLms?.roll_number || 0;
        assignedRoll = highest >= 1201 ? highest + 1 : 1201;
      }

      const updateData: any = {
        full_name: user.fullName,
        course_assigned: user.courseAssigned || '1',
        status: user.status || 'Active',
        roll_number: assignedRoll,
      };

      if (user.passwordHash) {
        updateData.password_hash = user.passwordHash;
      }

      const { error: updateError } = await supabase
        .from('lms_users')
        .update(updateData)
        .eq('id', existing.id);

      if (updateError) {
        return { success: false, error: `Update failed: ${updateError.message}` };
      }
    } else {
      if (!assignedRoll) {
        const { data: maxLms } = await supabase
          .from('lms_users')
          .select('roll_number')
          .order('roll_number', { ascending: false })
          .not('roll_number', 'is', null)
          .limit(1)
          .maybeSingle();

        const highest = maxLms?.roll_number || 0;
        assignedRoll = highest >= 1201 ? highest + 1 : 1201;
      }

      const { error: insertError } = await supabase.from('lms_users').insert([
        {
          email: cleanEmail,
          password_hash: user.passwordHash || 'TRA@1234',
          role: user.role || 'student',
          full_name: user.fullName || 'Student',
          course_assigned: user.courseAssigned || '1',
          status: user.status || 'Active',
          roll_number: assignedRoll,
        },
      ]);

      if (insertError) {
        return { success: false, error: `Insert failed: ${insertError.message}` };
      }
    }
    return { success: true, rollNumber: assignedRoll };
  } catch (err: any) {
    console.error('createUserOrUpdate error:', err);
    return { success: false, error: err.message || "Exception occurred." };
  }
}

/**
 * Update student access level (1, 2, 3) or status (Active/Inactive) from Mentor UI
 */
export async function updateStudentAccess(email: string, levelOrStatus: { courseAssigned?: string; status?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {};
    if (levelOrStatus.courseAssigned !== undefined) updateData.course_assigned = levelOrStatus.courseAssigned;
    if (levelOrStatus.status !== undefined) updateData.status = levelOrStatus.status;

    const { error } = await supabase
      .from('lms_users')
      .update(updateData)
      .ilike('email', email.trim());

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('updateStudentAccess error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Reader for Mentor Dashboard Roster
 */
export async function readSheet(sheetName: string): Promise<string[][]> {
  if (sheetName === LMS_SHEETS.USERS) {
    try {
      const { data } = await supabase.from('lms_users').select('*').order('id', { ascending: true });
      if (data && data.length > 0) {
        return data.map((u) => [
          u.email,
          u.password_hash,
          u.role,
          u.full_name,
          u.course_assigned || '1',
          u.last_login || '',
          u.status || 'Active',
          u.created_at || '',
          (u.roll_number || '').toString(),
        ]);
      }
    } catch {}

    return [
      ['admin@testriseacademy.com', 'mentor123', 'mentor', 'Test Rise Mentor', '3', '', 'Active', '2026-10-12', '1201'],
    ];
  }

  if (sheetName === LMS_SHEETS.PROGRESS) {
    try {
      const { data } = await supabase.from('lms_progress').select('*');
      if (data) {
        return data.map((p) => [
          p.student_email,
          p.lesson_id,
          p.status,
          (p.watch_time || 0).toString(),
          p.last_watched || '',
        ]);
      }
    } catch {}
    return [];
  }

  return [];
}

// ==========================================
// COURSE & SYLLABUS DATA
// ==========================================

export interface LMSCourse {
  courseId: string;
  courseName: string;
  description: string;
  category: string;
  mentorEmail: string;
  status: string;
  order: number;
}

export interface LMSModule {
  moduleId: string;
  courseId: string;
  moduleName: string;
  orderIndex: number;
  status: string;
  requiredLevel: number;
}

export interface LMSLesson {
  lessonId: string;
  moduleId: string;
  lessonTitle: string;
  videoUrl: string;
  durationMinutes: number;
  orderIndex: number;
  status: string;
  notes?: string;
}

export interface StudentProgress {
  studentEmail: string;
  lessonId: string;
  status: string;
  watchTimeSeconds: number;
  lastWatched: string;
}

const COURSES_DATA: LMSCourse[] = [
  {
    courseId: 'TRA-QA-01',
    courseName: 'Software Manual Testing & Backend Testing',
    description: 'Master SDLC, STLC, test cases design, defect tracking with JIRA, and SQL backend data verification.',
    category: 'Level 1: Foundation',
    mentorEmail: 'admin@testriseacademy.com',
    status: 'Published',
    order: 1,
  },
  {
    courseId: 'TRA-API-02',
    courseName: 'API & ETL Data Pipeline Testing',
    description: 'Postman, REST Assured automation, JSON verification, ETL validation, and data warehouse integrity checks.',
    category: 'Level 2: Intermediate',
    mentorEmail: 'admin@testriseacademy.com',
    status: 'Published',
    order: 2,
  },
  {
    courseId: 'TRA-AUTO-03',
    courseName: 'Python Automation Testing & Enterprise QA',
    description: 'Selenium WebDriver, Pytest framework, CI/CD with Git & Jenkins, and live enterprise projects.',
    category: 'Level 3: Advanced',
    mentorEmail: 'admin@testriseacademy.com',
    status: 'Published',
    order: 3,
  },
];

const MODULES_DATA: LMSModule[] = [
  // Course 1 Modules
  { moduleId: 'MOD-101', courseId: 'TRA-QA-01', moduleName: 'SDLC, STLC & Testing Concepts', orderIndex: 1, status: 'Published', requiredLevel: 1 },
  { moduleId: 'MOD-102', courseId: 'TRA-QA-01', moduleName: 'Test Design, Traceability & JIRA', orderIndex: 2, status: 'Published', requiredLevel: 1 },
  { moduleId: 'MOD-103', courseId: 'TRA-QA-01', moduleName: 'Backend Database Testing with SQL', orderIndex: 3, status: 'Published', requiredLevel: 1 },
  // Course 2 Modules
  { moduleId: 'MOD-201', courseId: 'TRA-API-02', moduleName: 'REST API Architecture & Postman', orderIndex: 1, status: 'Published', requiredLevel: 2 },
  { moduleId: 'MOD-202', courseId: 'TRA-API-02', moduleName: 'REST Assured & API Automation', orderIndex: 2, status: 'Published', requiredLevel: 2 },
  { moduleId: 'MOD-203', courseId: 'TRA-API-02', moduleName: 'ETL Pipeline & Data Warehouse Testing', orderIndex: 3, status: 'Published', requiredLevel: 2 },
  // Course 3 Modules
  { moduleId: 'MOD-301', courseId: 'TRA-AUTO-03', moduleName: 'Python Fundamentals for Testers', orderIndex: 1, status: 'Published', requiredLevel: 3 },
  { moduleId: 'MOD-302', courseId: 'TRA-AUTO-03', moduleName: 'Selenium WebDriver & POM Framework', orderIndex: 2, status: 'Published', requiredLevel: 3 },
  { moduleId: 'MOD-303', courseId: 'TRA-AUTO-03', moduleName: 'CI/CD, Live Project & Placement Mock', orderIndex: 3, status: 'Published', requiredLevel: 3 },
];

const LESSONS_DATA: LMSLesson[] = [
  // MOD-101
  { lessonId: 'LES-101-1', moduleId: 'MOD-101', lessonTitle: 'Introduction to Software Testing & IT Ecosystem', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 35, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-101-2', moduleId: 'MOD-101', lessonTitle: 'SDLC vs STLC Models (Agile & Scrum)', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 42, orderIndex: 2, status: 'Published' },
  { lessonId: 'LES-101-3', moduleId: 'MOD-101', lessonTitle: 'Black Box & White Box Testing Techniques', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 40, orderIndex: 3, status: 'Published' },
  // MOD-102
  { lessonId: 'LES-102-1', moduleId: 'MOD-102', lessonTitle: 'Writing Effective Test Scenarios & Test Cases', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 45, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-102-2', moduleId: 'MOD-102', lessonTitle: 'Defect Life Cycle & Logging Bugs in JIRA', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 50, orderIndex: 2, status: 'Published' },
  // MOD-103
  { lessonId: 'LES-103-1', moduleId: 'MOD-103', lessonTitle: 'Relational Databases & SQL Queries for Testers', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 55, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-103-2', moduleId: 'MOD-103', lessonTitle: 'Complex Joins, Aggregations & Data Integrity', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 60, orderIndex: 2, status: 'Published' },
  // MOD-201
  { lessonId: 'LES-201-1', moduleId: 'MOD-201', lessonTitle: 'HTTP Protocol, Status Codes & JSON Payloads', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 40, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-201-2', moduleId: 'MOD-201', lessonTitle: 'Postman Collections, Variables & Test Scripts', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 52, orderIndex: 2, status: 'Published' },
  // MOD-202
  { lessonId: 'LES-202-1', moduleId: 'MOD-202', lessonTitle: 'Automated API Testing with REST Assured', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 58, orderIndex: 1, status: 'Published' },
  // MOD-203
  { lessonId: 'LES-203-1', moduleId: 'MOD-203', lessonTitle: 'ETL Architecture, Extraction & Transformation Checks', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 48, orderIndex: 1, status: 'Published' },
  // MOD-301
  { lessonId: 'LES-301-1', moduleId: 'MOD-301', lessonTitle: 'Python Data Structures, Functions & OOP Basics', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 50, orderIndex: 1, status: 'Published' },
  // MOD-302
  { lessonId: 'LES-302-1', moduleId: 'MOD-302', lessonTitle: 'Selenium WebDriver Setup, Locators & XPath', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 65, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-302-2', moduleId: 'MOD-302', lessonTitle: 'Building Page Object Model (POM) with Pytest', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 70, orderIndex: 2, status: 'Published' },
  // MOD-303
  { lessonId: 'LES-303-1', moduleId: 'MOD-303', lessonTitle: 'Git Version Control, Jenkins CI/CD & HTML Reports', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 55, orderIndex: 1, status: 'Published' },
  { lessonId: 'LES-303-2', moduleId: 'MOD-303', lessonTitle: 'Live Enterprise Project Execution & Mock Rounds', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', durationMinutes: 60, orderIndex: 2, status: 'Published' },
];

export async function getAllCourses(): Promise<LMSCourse[]> {
  return COURSES_DATA;
}

export async function getCourses(levelStr?: string): Promise<LMSCourse[]> {
  const level = parseInt(levelStr || '1');
  return COURSES_DATA.filter((c) => c.order <= Math.max(level, 1));
}

export async function getModules(courseId: string): Promise<LMSModule[]> {
  return MODULES_DATA.filter((m) => m.courseId === courseId);
}

export async function getLessons(moduleId: string): Promise<LMSLesson[]> {
  return LESSONS_DATA.filter((l) => l.moduleId === moduleId);
}

export async function getStudentProgress(email: string): Promise<StudentProgress[]> {
  if (!email) return [];
  try {
    const { data } = await supabase
      .from('lms_progress')
      .select('*')
      .ilike('student_email', email.toLowerCase().trim());

    if (!data) return [];
    return data.map((d) => ({
      studentEmail: d.student_email,
      lessonId: d.lesson_id,
      status: d.status,
      watchTimeSeconds: d.watch_time || 0,
      lastWatched: d.last_watched,
    }));
  } catch {
    return [];
  }
}

export async function saveProgress(
  email: string,
  lessonId: string,
  status: string,
  watchTimeSeconds: number
): Promise<{ success: boolean }> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data: existing } = await supabase
      .from('lms_progress')
      .select('id, watch_time')
      .ilike('student_email', cleanEmail)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('lms_progress')
        .update({
          status,
          watch_time: Math.max(existing.watch_time || 0, watchTimeSeconds),
          last_watched: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('lms_progress').insert([
        {
          student_email: cleanEmail,
          lesson_id: lessonId,
          status,
          watch_time: watchTimeSeconds,
          last_watched: new Date().toISOString(),
        },
      ]);
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}
