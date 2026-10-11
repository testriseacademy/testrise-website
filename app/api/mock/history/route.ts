import { NextRequest, NextResponse } from "next/server";
import {
  getTopics,
  getQuestions,
  addTopic,
  addQuestion,
  deleteTopic,
  deleteQuestion,
  getStudentScores,
} from "@/lib/mock-db";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "topics") {
      const topics = await getTopics();
      return NextResponse.json({ topics });
    }

    if (type === "questions") {
      const topicId = parseInt(searchParams.get("topicId") || "1");
      const questions = await getQuestions(topicId);
      return NextResponse.json({ questions });
    }

    if (type === "all_scores") {
      const { data } = await supabase
        .from("student_mock_scores")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      const scores =
        data?.map((d) => ({
          id: d.id,
          studentEmail: d.student_email,
          topicName: d.topic_name,
          score: d.score,
          wpm: d.wpm,
          createdAt: d.created_at,
        })) || [];

      return NextResponse.json({ scores });
    }

    if (type === "student_scores") {
      const email = searchParams.get("email") || "";
      const scores = await getStudentScores(email);
      return NextResponse.json({ scores });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "add_topic") {
      const { name, description } = body;
      const topic = await addTopic(name, description);
      return NextResponse.json({ topic });
    }

    if (action === "add_question") {
      const { topicId, questionText, expectedKeywords, idealAnswer } = body;
      const question = await addQuestion(
        topicId,
        questionText,
        expectedKeywords,
        idealAnswer
      );
      return NextResponse.json({ question });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0");
    const type = searchParams.get("type");

    if (type === "question") {
      const success = await deleteQuestion(id);
      return NextResponse.json({ success });
    }

    if (type === "topic") {
      const success = await deleteTopic(id);
      return NextResponse.json({ success });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
