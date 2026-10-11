import { supabase } from './supabase';

export interface MockTopic {
  id: number;
  name: string;
  description: string;
  questionCount?: number;
  createdAt: string;
}

export interface MockQuestion {
  id: number;
  topicId: number;
  questionText: string;
  expectedKeywords: string;
  idealAnswer?: string;
  createdAt: string;
}

export interface StudentMockScore {
  id: number;
  studentEmail: string;
  topicName: string;
  score: number;
  wpm: number;
  createdAt: string;
}

export interface MentorStudentMockStats {
  studentEmail: string;
  studentName: string;
  totalMocks: number;
  overallAverage: number;
  last5Scores: {
    id: number;
    topicName: string;
    score: number;
    date: string;
  }[];
}

export async function getTopics(): Promise<MockTopic[]> {
  try {
    const { data: topicsData } = await supabase
      .from('mock_topics')
      .select('*')
      .order('id', { ascending: true });

    if (!topicsData) return [];

    const { data: questionsData } = await supabase
      .from('mock_questions')
      .select('topic_id');

    const counts: Record<number, number> = {};
    questionsData?.forEach((q) => {
      counts[q.topic_id] = (counts[q.topic_id] || 0) + 1;
    });

    return topicsData.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description || '',
      questionCount: counts[t.id] || 0,
      createdAt: t.created_at,
    }));
  } catch {
    return [];
  }
}

export async function getQuestions(topicId: number): Promise<MockQuestion[]> {
  try {
    const { data } = await supabase
      .from('mock_questions')
      .select('*')
      .eq('topic_id', topicId)
      .order('id', { ascending: true });

    if (!data) return [];
    return data.map((q) => ({
      id: q.id,
      topicId: q.topic_id,
      questionText: q.question_text,
      expectedKeywords: q.expected_keywords || '',
      idealAnswer: q.ideal_answer || '',
      createdAt: q.created_at,
    }));
  } catch {
    return [];
  }
}

export async function addTopic(name: string, description: string): Promise<MockTopic | null> {
  try {
    const { data, error } = await supabase
      .from('mock_topics')
      .insert([{ name, description }])
      .select()
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      questionCount: 0,
      createdAt: data.created_at,
    };
  } catch {
    return null;
  }
}

export async function addQuestion(
  topicId: number,
  questionText: string,
  expectedKeywords: string,
  idealAnswer?: string
): Promise<MockQuestion | null> {
  try {
    const { data, error } = await supabase
      .from('mock_questions')
      .insert([
        {
          topic_id: topicId,
          question_text: questionText,
          expected_keywords: expectedKeywords,
          ideal_answer: idealAnswer,
        },
      ])
      .select()
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      topicId: data.topic_id,
      questionText: data.question_text,
      expectedKeywords: data.expected_keywords,
      idealAnswer: data.ideal_answer,
      createdAt: data.created_at,
    };
  } catch {
    return null;
  }
}

export async function deleteQuestion(questionId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('mock_questions')
      .delete()
      .eq('id', questionId);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteTopic(topicId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('mock_topics')
      .delete()
      .eq('id', topicId);
    return !error;
  } catch {
    return false;
  }
}

export async function saveMockScore(
  studentEmail: string,
  topicName: string,
  score: number,
  wpm: number
): Promise<boolean> {
  try {
    const { error } = await supabase.from('student_mock_scores').insert([
      {
        student_email: studentEmail.toLowerCase().trim(),
        topic_name: topicName,
        score,
        wpm,
      },
    ]);
    return !error;
  } catch {
    return false;
  }
}

export async function getStudentScores(studentEmail: string): Promise<StudentMockScore[]> {
  try {
    const { data } = await supabase
      .from('student_mock_scores')
      .select('*')
      .ilike('student_email', studentEmail.toLowerCase().trim())
      .order('created_at', { ascending: false });

    if (!data) return [];
    return data.map((d) => ({
      id: d.id,
      studentEmail: d.student_email,
      topicName: d.topic_name,
      score: d.score,
      wpm: d.wpm,
      createdAt: d.created_at,
    }));
  } catch {
    return [];
  }
}
