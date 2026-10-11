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
      // Fallback default mentor check if DB is freshly created or matching admin
      if (cleanEmail === 'admin' || cleanEmail === 'admin@testriseacademy.com') {
        return {
          user: {
            email: 'admin@testriseacademy.com',
            passwordHash: 'admin@123',
            role: 'mentor',
            fullName: 'Test Rise Mentor',
            courseAssigned: '3',
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
        courseAssigned: (data.course_assigned || (data.access_level ? data.access_level.toString() : '1')),
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

      const assignedCourse = user.courseAssigned || '1';
      const numMatch = assignedCourse.match(/\d+/);
      const lvlNum = numMatch ? parseInt(numMatch[0]) : 1;

      const updateData: any = {
        full_name: user.fullName,
        course_assigned: lvlNum.toString(),
        access_level: lvlNum,
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

      const assignedCourse = user.courseAssigned || '1';
      const numMatch = assignedCourse.match(/\d+/);
      const lvlNum = numMatch ? parseInt(numMatch[0]) : 1;

      const { error: insertError } = await supabase.from('lms_users').insert([
        {
          email: cleanEmail,
          password_hash: user.passwordHash || 'TRA@1234',
          role: user.role || 'student',
          full_name: user.fullName || 'Student',
          course_assigned: lvlNum.toString(),
          access_level: lvlNum,
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
    if (levelOrStatus.courseAssigned !== undefined) {
      const match = levelOrStatus.courseAssigned.toString().match(/\d+/);
      const lvlNum = match ? parseInt(match[0]) : 1;
      updateData.course_assigned = lvlNum.toString();
      updateData.access_level = lvlNum;
    }
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
          (u.course_assigned || (u.access_level ? u.access_level.toString() : '1')),
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
  lessonType?: 'video' | 'youtube' | 'notes' | 'assignment';
  driveFileId?: string;
  notesContent?: string;
  attachmentUrl?: string;
  durationMinutes: number;
  orderIndex: number;
  order?: number;
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
    courseName: 'Software Testing Step-1',
    description: 'Manual Testing, SDLC/STLC, Test Cases, Defect Life Cycle, JIRA & SQL Backend Verification.',
    category: 'Step-1',
    mentorEmail: 'admin@testriseacademy.com',
    status: 'Published',
    order: 1,
  },
  {
    courseId: 'TRA-API-02',
    courseName: 'Software Testing Step-2',
    description: 'API Testing, Postman Collections, REST Assured Automation & ETL Data Pipeline Integrity.',
    category: 'Step-2',
    mentorEmail: 'admin@testriseacademy.com',
    status: 'Published',
    order: 2,
  },
  {
    courseId: 'TRA-AUTO-03',
    courseName: 'Software Testing Step-3',
    description: 'Python Automation, Selenium WebDriver, Page Object Model (POM), Pytest & CI/CD Jenkins.',
    category: 'Step-3',
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

// ==========================================
// COURSE, MODULE & LESSON OPERATIONS (SUPABASE)
// ==========================================

export function extractMediaSource(url: string): { type: 'drive' | 'youtube' | 'embed'; id: string } {
  if (!url) return { type: 'drive', id: '' };
  const trimmed = url.trim();

  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return { type: 'youtube', id: ytMatch[1] };
  }

  const driveMatch = trimmed.match(/(?:file\/d\/|id=)([\w-]{25,})/);
  if (driveMatch && driveMatch[1]) {
    return { type: 'drive', id: driveMatch[1] };
  }

  return { type: 'drive', id: trimmed };
}

export async function getAllCourses(): Promise<LMSCourse[]> {
  try {
    const { data, error } = await supabase
      .from('lms_courses')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((c) => ({
        courseId: c.course_id,
        courseName: c.course_name,
        description: c.description || '',
        category: c.category || '',
        mentorEmail: c.mentor_email || '',
        status: c.status || 'Published',
        order: c.order_index || 1,
        createdDate: c.created_at || '',
      }));
    }
  } catch (err) {
    console.error('getAllCourses error:', err);
  }
  return COURSES_DATA;
}

export async function getCourses(levelStr?: string): Promise<LMSCourse[]> {
  const allCourses = await getAllCourses();
  if (!levelStr) return allCourses;

  const rawStr = levelStr.toString().trim();
  if (rawStr.toLowerCase() === "all") return allCourses;

  // Extract number (e.g. "3", "Step-3", "Step 3" -> 3)
  const numMatch = rawStr.match(/\d+/);
  const maxLevel = numMatch ? parseInt(numMatch[0]) : 1;

  return allCourses.filter((c) => {
    // Unlocks all courses up to maxLevel (e.g. Step-1, Step-2, Step-3)
    if (c.order <= maxLevel) return true;
    if (c.category?.toLowerCase() === rawStr.toLowerCase()) return true;
    return false;
  });
}

export async function getModules(courseId: string): Promise<LMSModule[]> {
  try {
    const { data, error } = await supabase
      .from('lms_modules')
      .select('*')
      .eq('course_id', courseId)
      .neq('status', 'Deleted')
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((m) => ({
        moduleId: m.module_id,
        courseId: m.course_id,
        moduleName: m.module_name,
        orderIndex: m.order_index || 1,
        status: m.status || 'Published',
        requiredLevel: m.required_level || 1,
      }));
    }
  } catch (err) {
    console.error('getModules error:', err);
  }
  return MODULES_DATA.filter((m) => m.courseId === courseId);
}

export async function getLessons(moduleId: string): Promise<LMSLesson[]> {
  try {
    const { data, error } = await supabase
      .from('lms_lessons')
      .select('*')
      .eq('module_id', moduleId)
      .neq('status', 'Deleted')
      .order('order_index', { ascending: true })
      .order('id', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((l) => {
        let videoUrl = l.drive_file_id || '';
        if (l.lesson_type === 'youtube' && l.drive_file_id) {
          videoUrl = l.drive_file_id.startsWith('http')
            ? l.drive_file_id
            : `https://www.youtube.com/embed/${l.drive_file_id}`;
        } else if (l.lesson_type === 'video' && l.drive_file_id) {
          videoUrl = l.drive_file_id.startsWith('http')
            ? l.drive_file_id
            : `https://drive.google.com/file/d/${l.drive_file_id}/preview`;
        }

        return {
          lessonId: l.lesson_id,
          moduleId: l.module_id,
          lessonTitle: l.lesson_title,
          lessonType: (l.lesson_type || 'video') as any,
          driveFileId: l.drive_file_id || '',
          videoUrl: videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          notesContent: l.notes_content || '',
          notes: l.notes_content || '',
          attachmentUrl: l.attachment_url || '',
          durationMinutes: l.duration_minutes || 10,
          orderIndex: l.order_index || 1,
          order: l.order_index || 1,
          status: l.status || 'Published',
        };
      });
    }
  } catch (err) {
    console.error('getLessons error:', err);
  }
  return LESSONS_DATA.filter((l) => l.moduleId === moduleId);
}

export async function getLessonById(lessonId: string): Promise<LMSLesson | null> {
  try {
    const { data } = await supabase
      .from('lms_lessons')
      .select('*')
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (data) {
      return {
        lessonId: data.lesson_id,
        moduleId: data.module_id,
        lessonTitle: data.lesson_title,
        lessonType: (data.lesson_type || 'video') as any,
        driveFileId: data.drive_file_id || '',
        videoUrl: data.drive_file_id || '',
        notesContent: data.notes_content || '',
        notes: data.notes_content || '',
        attachmentUrl: data.attachment_url || '',
        durationMinutes: data.duration_minutes || 0,
        orderIndex: data.order_index || 1,
        order: data.order_index || 1,
        status: data.status || 'Published',
      };
    }
  } catch (err) {}
  return null;
}

export async function appendRow(sheetName: string, values: any[]): Promise<void> {
  if (sheetName === LMS_SHEETS.MODULES) {
    // values = [moduleId, courseId, moduleName, order, status]
    await supabase.from('lms_modules').insert([
      {
        module_id: values[0] || `MOD-${Date.now()}`,
        course_id: values[1],
        module_name: values[2],
        order_index: parseInt(values[3]) || 1,
        status: values[4] || 'Published',
      },
    ]);
  } else if (sheetName === LMS_SHEETS.LESSONS) {
    // values = [lessonId, moduleId, lessonTitle, lessonType, mediaId, notesContent, attachmentUrl, durationMinutes, order, status]
    await supabase.from('lms_lessons').insert([
      {
        lesson_id: values[0] || `LES-${Date.now()}`,
        module_id: values[1],
        lesson_title: values[2],
        lesson_type: values[3] || 'video',
        drive_file_id: values[4] || '',
        notes_content: values[5] || '',
        attachment_url: values[6] || '',
        duration_minutes: parseInt(values[7]) || 0,
        order_index: parseInt(values[8]) || 1,
        status: values[9] || 'Published',
      },
    ]);
  }
}

export async function deleteLessonById(lessonId: string): Promise<void> {
  await supabase.from('lms_lessons').update({ status: 'Deleted' }).eq('lesson_id', lessonId);
}

export async function updateLesson(
  lessonId: string,
  updates: {
    lessonTitle?: string;
    lessonType?: string;
    driveFileId?: string;
    notesContent?: string;
    attachmentUrl?: string;
    durationMinutes?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {};
    if (updates.lessonTitle !== undefined) updateData.lesson_title = updates.lessonTitle;
    if (updates.lessonType !== undefined) updateData.lesson_type = updates.lessonType;
    if (updates.driveFileId !== undefined) updateData.drive_file_id = updates.driveFileId;
    if (updates.notesContent !== undefined) updateData.notes_content = updates.notesContent;
    if (updates.attachmentUrl !== undefined) updateData.attachment_url = updates.attachmentUrl;
    if (updates.durationMinutes !== undefined) updateData.duration_minutes = updates.durationMinutes;

    const { error } = await supabase
      .from('lms_lessons')
      .update(updateData)
      .eq('lesson_id', lessonId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error('updateLesson error:', err);
    return { success: false, error: err.message };
  }
}

export async function swapLessonOrder(
  lessonIdA?: string,
  orderA?: number,
  lessonIdB?: string,
  orderB?: number,
  moduleId?: string,
  orderedLessonIds?: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    if (orderedLessonIds && Array.isArray(orderedLessonIds) && orderedLessonIds.length > 0) {
      for (let i = 0; i < orderedLessonIds.length; i++) {
        await supabase
          .from('lms_lessons')
          .update({ order_index: i + 1 })
          .eq('lesson_id', orderedLessonIds[i]);
      }
      return { success: true };
    }

    if (lessonIdA && lessonIdB && orderA !== undefined && orderB !== undefined) {
      await supabase.from('lms_lessons').update({ order_index: orderB }).eq('lesson_id', lessonIdA);
      await supabase.from('lms_lessons').update({ order_index: orderA }).eq('lesson_id', lessonIdB);
      return { success: true };
    }

    return { success: false, error: 'Invalid parameters provided for reordering.' };
  } catch (err: any) {
    console.error('swapLessonOrder error:', err);
    return { success: false, error: err.message };
  }
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
