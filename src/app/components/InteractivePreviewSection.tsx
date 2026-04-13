import { useEffect, useState } from "react";
import {
  MessageCircle,
  SquareCheck,
  FileText,
  Clock3,
  PenTool,
  PanelTop,
  Sparkles,
  FormInput,
  Orbit,
} from "lucide-react";

const modules = [
  { id: "documentos", label: "Documentos", icon: FileText },
  { id: "tempo", label: "Rastreamento de tempo", icon: Clock3 },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "whiteboards", label: "Whiteboards", icon: PenTool },
  { id: "projetos", label: "Projetos", icon: SquareCheck },
  { id: "paineis", label: "Painéis", icon: PanelTop },
  { id: "ia", label: "IA", icon: Sparkles },
  { id: "formularios", label: "Formulários", icon: FormInput },
  { id: "sprints", label: "Sprints", icon: Orbit },
] as const;

const scenes = [
  {
    moduleId: "projetos",
    hint: "Atualizando status da tarefa",
    content: (
      <div className="grid gap-3 text-sm text-gray-700">
        {[
          ["Finalize campaign brief", "High", "Dec 6"],
          ["Audience & market research", "Urgent", "Jan 1"],
          ["Confirm budgets", "Low", "Dec 25"],
          ["Define channel strategy", "Low", "Jan 6"],
          ["Schedule kickoff meeting", "High", "May 5"],
        ].map(([task, priority, date], index) => (
          <div
            key={task}
            className={`grid grid-cols-[1fr_auto_auto] gap-3 rounded-xl border px-3 py-2 ${
              index === 3 ? "border-fuchsia-300 bg-fuchsia-50/80" : "border-gray-100 bg-white"
            }`}
          >
            <span>{task}</span>
            <span className="text-gray-500">{priority}</span>
            <span className="text-gray-400">{date}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    moduleId: "chat",
    hint: "Adicionando comentário",
    content: (
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <p className="font-semibold text-gray-900 mb-3"># marketing</p>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="rounded-xl bg-gray-50 p-3">Need to create tasks for this sprint today.</div>
          <div className="rounded-xl bg-gray-50 p-3">Works for me. Thanks!</div>
          <div className="rounded-xl border border-fuchsia-300 bg-fuchsia-50 p-3 text-fuchsia-700 font-medium">
            Adding a comment...
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-gray-200 px-3 py-2 text-gray-400">Comentar...</div>
      </div>
    ),
  },
  {
    moduleId: "tempo",
    hint: "Rastreamento ativo",
    content: (
      <div className="grid gap-3 text-sm text-gray-700">
        {[
          ["Marketing planning", "02:13:20", "Running"],
          ["Research review", "00:47:15", "Paused"],
          ["Meeting prep", "01:08:02", "Done"],
        ].map(([task, tracked, status], index) => (
          <div
            key={task}
            className={`grid grid-cols-[1fr_auto_auto] gap-3 rounded-xl border px-3 py-2 ${
              index === 0 ? "border-indigo-300 bg-indigo-50/70" : "border-gray-100 bg-white"
            }`}
          >
            <span>{task}</span>
            <span className="font-medium">{tracked}</span>
            <span className="text-gray-500">{status}</span>
          </div>
        ))}
      </div>
    ),
  },
] as const;

export function InteractivePreviewSection() {
  const [activeScene, setActiveScene] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveScene((prev) => (prev + 1) % scenes.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const current = scenes[activeScene];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/40 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pré-demonstração do sistema em uso</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A interface muda sozinha entre módulos reais para mostrar exatamente como a solução funciona no dia a dia.
          </p>
        </div>

        <div className="rounded-[28px] border border-fuchsia-200 bg-white shadow-2xl shadow-purple-100/70 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 border-b border-purple-100 pb-4 mb-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = current.moduleId === module.id;
              return (
                <button
                  key={module.id}
                  type="button"
                  onMouseEnter={() => setAutoPlay(false)}
                  onFocus={() => setAutoPlay(false)}
                  onClick={() => {
                    const sceneIndex = scenes.findIndex((scene) => scene.moduleId === module.id);
                    if (sceneIndex !== -1) setActiveScene(sceneIndex);
                  }}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-all ${
                    isActive
                      ? "bg-[#241a58] text-white shadow-lg"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{module.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-4">
            <aside className="rounded-2xl border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-3">Acme Inc.</p>
              <div className="space-y-2">
                <div className="rounded-lg bg-white px-3 py-2">Home</div>
                <div className="rounded-lg bg-white px-3 py-2">Inbox</div>
                <div className="rounded-lg bg-white px-3 py-2">More</div>
              </div>
              <p className="font-medium text-gray-500 mt-5 mb-2">Spaces</p>
              <div className="space-y-2">
                <div className="rounded-lg bg-purple-100 px-3 py-2 text-purple-700">Marketing</div>
                <div className="rounded-lg bg-white px-3 py-2">Campaigns</div>
                <div className="rounded-lg bg-white px-3 py-2">Content</div>
              </div>
            </aside>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>List</span>
                  <span>Board</span>
                  <span>Calendar</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoPlay((value) => !value)}
                  className="text-sm text-purple-700 font-semibold"
                >
                  {autoPlay ? "Pausar" : "Reproduzir"}
                </button>
              </div>

              {current.content}

              <div className="mt-4 inline-flex items-center rounded-full bg-fuchsia-600 px-4 py-1 text-sm font-semibold text-white shadow-lg shadow-fuchsia-200">
                {current.hint}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
