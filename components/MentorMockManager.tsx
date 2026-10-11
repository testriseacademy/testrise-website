"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  BookOpen,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { MockTopic, MockQuestion, StudentMockScore } from "@/lib/mock-db";

export default function MentorMockManager() {
  const [activeTab, setActiveTab] = useState<"questions" | "analytics">("questions");

  // Topics & Questions state
  const [topics, setTopics] = useState<MockTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<MockTopic | null>(null);
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // New topic modal
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");
  const [savingTopic, setSavingTopic] = useState(false);

  // Question modal
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [expectedKeywords, setExpectedKeywords] = useState("");
  const [idealAnswer, setIdealAnswer] = useState("");
  const [savingQuestion, setSavingQuestion] = useState(false);

  // Recent scores
  const [recentScores, setRecentScores] = useState<StudentMockScore[]>([]);
  const [loadingScores, setLoadingScores] = useState(false);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const res = await fetch("/api/mock/history?type=topics");
      if (res.ok) {
        const data = await res.json();
        setTopics(data.topics || []);
        if (data.topics?.length > 0 && !selectedTopic) {
          setSelectedTopic(data.topics[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchQuestions = async (topicId: number) => {
    setLoadingQuestions(true);
    try {
      const res = await fetch(`/api/mock/history?type=questions&topicId=${topicId}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const fetchScores = async () => {
    setLoadingScores(true);
    try {
      const res = await fetch("/api/mock/history?type=all_scores");
      if (res.ok) {
        const data = await res.json();
        setRecentScores(data.scores || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingScores(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchQuestions(selectedTopic.id);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchScores();
    }
  }, [activeTab]);

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    setSavingTopic(true);
    try {
      const res = await fetch("/api/mock/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_topic",
          name: newTopicName,
          description: newTopicDesc,
        }),
      });
      if (res.ok) {
        setNewTopicName("");
        setNewTopicDesc("");
        setShowAddTopicModal(false);
        fetchTopics();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingTopic(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !questionText.trim()) return;
    setSavingQuestion(true);
    try {
      const res = await fetch("/api/mock/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_question",
          topicId: selectedTopic.id,
          questionText,
          expectedKeywords,
          idealAnswer,
        }),
      });
      if (res.ok) {
        setQuestionText("");
        setExpectedKeywords("");
        setIdealAnswer("");
        setShowQuestionModal(false);
        fetchQuestions(selectedTopic.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    try {
      const res = await fetch(`/api/mock/history?id=${id}&type=question`, {
        method: "DELETE",
      });
      if (res.ok && selectedTopic) {
        fetchQuestions(selectedTopic.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            AI Mock & Screening Interview Engine
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Configure interview questions, scoring criteria, and track candidate communication scores.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "questions"
                ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Questions & Topics
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "analytics"
                ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Candidate Scores
          </button>
        </div>
      </div>

      {activeTab === "questions" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topics List */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Topics ({topics.length})
              </h3>
              <button
                onClick={() => setShowAddTopicModal(true)}
                className="text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Topic
              </button>
            </div>

            {loadingTopics ? (
              <div className="py-8 text-center text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                Loading topics...
              </div>
            ) : (
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedTopic?.id === topic.id
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-md"
                        : "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{topic.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {topic.description || "No description"}
                      </p>
                    </div>
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 font-mono text-slate-400 shrink-0">
                      {topic.questionCount} Qs
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Questions for Selected Topic */}
          <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {selectedTopic ? selectedTopic.name : "Select a topic"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedTopic?.description}
                </p>
              </div>

              {selectedTopic && (
                <button
                  onClick={() => setShowQuestionModal(true)}
                  className="text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-md shadow-emerald-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Question
                </button>
              )}
            </div>

            {loadingQuestions ? (
              <div className="py-12 text-center text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                Loading questions...
              </div>
            ) : questions.length === 0 ? (
              <div className="py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                No questions added to this topic yet.
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-white leading-relaxed">
                            {q.questionText}
                          </p>
                          {q.expectedKeywords && (
                            <p className="text-[11px] text-amber-400/90 mt-2 font-mono bg-amber-400/5 px-2 py-1 rounded border border-amber-400/10">
                              Keywords: {q.expectedKeywords}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Candidate Scores Tab */
        <div>
          {loadingScores ? (
            <div className="py-12 text-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
              Loading scores...
            </div>
          ) : recentScores.length === 0 ? (
            <div className="py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
              No mock assessment scores recorded yet. Candidates taking `/apply/screening` will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Student / Candidate</th>
                    <th className="py-3 px-4 font-semibold">Topic Tested</th>
                    <th className="py-3 px-4 font-semibold">Score</th>
                    <th className="py-3 px-4 font-semibold">Speed (WPM)</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentScores.map((score) => (
                    <tr key={score.id} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">{score.studentEmail}</td>
                      <td className="py-3 px-4 text-slate-300">{score.topicName}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                            score.score >= 70
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {score.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{score.wpm || 0}</td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(score.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add Topic Modal */}
      {showAddTopicModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Interview Topic</h3>
            <form onSubmit={handleAddTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Name</label>
                <input
                  type="text"
                  required
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g. API Testing & Postman"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  placeholder="Short description of this topic"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingTopic}
                  className="px-4 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-600 disabled:opacity-50"
                >
                  {savingTopic ? "Saving..." : "Create Topic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">
              Add Question to {selectedTopic?.name}
            </h3>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question Text
                </label>
                <textarea
                  rows={3}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. Explain how you would write a test case for user authentication."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expected Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={expectedKeywords}
                  onChange={(e) => setExpectedKeywords(e.target.value)}
                  placeholder="e.g. status code, payload, happy path, boundary value"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="px-4 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-600 disabled:opacity-50"
                >
                  {savingQuestion ? "Saving..." : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
