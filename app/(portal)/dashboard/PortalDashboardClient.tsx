"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    LogOut, FolderOpen, CheckCircle2, Clock, AlertCircle,
    FileText, MessageSquare, Download, ExternalLink,
    ChevronRight, BarChart3, Calendar, Globe, Send,
    ArrowRight, User, Bell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

/* ─── Types ──────────────────────────────────────────────────── */
type Client = {
    id: string; name: string; email: string;
    company?: string; phone?: string;
};

type Milestone = {
    id: string; title: string; description?: string;
    due_date?: string; completed: boolean;
};

type ProjectFile = {
    id: string; name: string; type: string;
    url: string; size_kb?: number; created_at: string;
};

type Message = {
    id: string; sender: "client" | "solvara"; sender_name: string;
    body: string; read: boolean; created_at: string;
};

type Project = {
    id: string; name: string; description?: string;
    status: string; progress: number;
    start_date?: string; due_date?: string;
    url?: string; budget?: number; paid?: number;
    milestones: Milestone[];
    project_files: ProjectFile[];
    project_messages: Message[];
};

/* ─── Status config ──────────────────────────────────────────── */
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    discovery:   { label: "Discovery",   color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  icon: AlertCircle  },
    design:      { label: "Design",      color: "#9B59B6", bg: "rgba(155,89,182,0.12)",  icon: FolderOpen   },
    development: { label: "Development", color: "#0D518C", bg: "rgba(13,81,140,0.12)",   icon: BarChart3    },
    review:      { label: "In Review",   color: "#F97316", bg: "rgba(249,115,22,0.12)",  icon: Clock        },
    completed:   { label: "Completed",   color: "#2ECC71", bg: "rgba(46,204,113,0.12)",  icon: CheckCircle2 },
    paused:      { label: "Paused",      color: "#6B7280", bg: "rgba(107,114,128,0.12)", icon: Clock        },
};

const FILE_ICONS: Record<string, string> = {
    invoice: "🧾", design: "🎨", document: "📄", deliverable: "📦", other: "📎",
};

/* ─── Sign out ───────────────────────────────────────────────── */
function useSignOut() {
    const router = useRouter();
    return async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/portal");
    };
}

/* ─── Send message ───────────────────────────────────────────── */
async function sendMessage(projectId: string, body: string, clientName: string) {
    const supabase = createClient();
    await supabase.from("project_messages").insert({
        project_id:  projectId,
        sender:      "client",
        sender_name: clientName,
        body,
    });
}

/* ─── Components ─────────────────────────────────────────────── */
function ProgressBar({ value, color }: { value: number; color: string }) {
    return (
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
            />
        </div>
    );
}

function ProjectCard({
                         project, isActive, onClick,
                     }: { project: Project; isActive: boolean; onClick: () => void }) {
    const cfg    = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.discovery;
    const CfgIcon   = cfg.icon;
    const unread = project.project_messages.filter((m) => m.sender === "solvara" && !m.read).length;

    return (
        <button
            onClick={onClick}
            className="w-full text-left p-4 rounded-2xl transition-all duration-200"
            style={{
                background: isActive ? "rgba(13,81,140,0.2)" : "rgba(255,255,255,0.03)",
                border: isActive ? "1px solid rgba(13,81,140,0.4)" : "1px solid #1A2540",
            }}
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                    <div className="text-white font-bold text-sm leading-tight">{project.name}</div>
                    {project.description && (
                        <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">{project.description}</div>
                    )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                    {unread > 0 && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                              style={{ background: "#E74C3C", color: "#fff" }}>{unread}</span>
                    )}
                    <div className="px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1"
                         style={{ background: cfg.bg, color: cfg.color }}>
                        <CfgIcon size={10} /> {cfg.label}
                    </div>
                </div>
            </div>
            <div className="mb-1.5">
                <ProgressBar value={project.progress} color={cfg.color} />
            </div>
            <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {project.progress}% complete
                {project.due_date && ` · Due ${new Date(project.due_date).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}`}
            </div>
        </button>
    );
}

/* ─── Main Dashboard ─────────────────────────────────────────── */
export default function PortalDashboardClient({
                                                  client, projects, userEmail,
                                              }: { client: Client; projects: Project[]; userEmail: string }) {
    const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? "");
    const [activeTab,       setActiveTab]       = useState<"overview" | "files" | "messages" | "milestones">("overview");
    const [msgBody,         setMsgBody]         = useState("");
    const [sending,         setSending]         = useState(false);
    const signOut = useSignOut();

    const project = projects.find((p) => p.id === activeProjectId);
    const cfg = STATUS_CONFIG[project?.status ?? "discovery"] ?? STATUS_CONFIG.discovery;

    const handleSendMessage = async () => {
        if (!msgBody.trim() || !project) return;
        setSending(true);
        await sendMessage(project.id, msgBody.trim(), client.name);
        setMsgBody("");
        setSending(false);
        // Note: in production, add optimistic update or router.refresh() here
    };

    return (
        <div style={{ background: "#0A0E1A", minHeight: "100vh" }}>

            {/* ── Top navbar ── */}
            <div className="sticky top-0 z-40"
                 style={{ background: "rgba(15,22,41,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1A2540" }}>
                <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                                 style={{ background: "linear-gradient(135deg,#0D518C,#2ECC71)" }}>S</div>
                            <span className="text-white font-black text-sm hidden sm:block">SOLVARA</span>
                        </Link>
                        <ChevronRight size={14} className="text-gray-600 hidden sm:block" />
                        <span className="text-gray-400 text-sm hidden sm:block">Client Portal</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                                 style={{ background: "#0D518C" }}>
                                {client.name[0].toUpperCase()}
                            </div>
                            <span className="text-white text-sm font-semibold hidden sm:block">{client.name}</span>
                        </div>
                        <button onClick={signOut}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:brightness-125"
                                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540", color: "#9CA3AF" }}>
                            <LogOut size={13} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* ── Left sidebar: project list ── */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-4">

                        {/* Client summary card */}
                        <div className="rounded-2xl p-5" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl"
                                     style={{ background: "linear-gradient(135deg,#0D518C,#1A6BB5)" }}>
                                    {client.name[0].toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-white font-bold">{client.name}</div>
                                    {client.company && <div className="text-gray-400 text-xs">{client.company}</div>}
                                    <div className="text-gray-600 text-xs">{userEmail}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-3" style={{ borderTop: "1px solid #1A2540" }}>
                                {[
                                    { label: "Projects",   value: projects.length },
                                    { label: "Active",     value: projects.filter((p) => !["completed","paused"].includes(p.status)).length },
                                    { label: "Done",       value: projects.filter((p) => p.status === "completed").length },
                                ].map((s) => (
                                    <div key={s.label} className="text-center">
                                        <div className="text-white font-black text-lg" style={{ color: "#2ECC71" }}>{s.value}</div>
                                        <div className="text-gray-500 text-[10px]">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects list */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                                Your Projects ({projects.length})
                            </p>
                            {projects.length === 0 ? (
                                <div className="text-center py-8 rounded-2xl" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                    <FolderOpen size={32} className="mx-auto mb-2 text-gray-700" />
                                    <p className="text-gray-500 text-sm">No projects yet</p>
                                    <Link href="/book"
                                          className="inline-flex items-center gap-1 text-xs font-semibold mt-2 transition-colors"
                                          style={{ color: "#2ECC71" }}>
                                        Book a consultation <ArrowRight size={10} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {projects.map((p) => (
                                        <ProjectCard key={p.id} project={p}
                                                     isActive={p.id === activeProjectId}
                                                     onClick={() => { setActiveProjectId(p.id); setActiveTab("overview"); }} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Help */}
                        <div className="rounded-2xl p-4 text-center"
                             style={{ background: "linear-gradient(135deg,rgba(13,81,140,0.2),rgba(46,204,113,0.08))", border: "1px solid rgba(46,204,113,0.15)" }}>
                            <p className="text-white font-bold text-sm mb-1">Need help?</p>
                            <p className="text-gray-400 text-xs mb-3">Reach your project team directly</p>
                            <a href="https://wa.me/254707528980" target="_blank" rel="noopener noreferrer"
                               className="flex items-center justify-center gap-2 font-bold py-2 rounded-xl text-xs transition-all hover:scale-105"
                               style={{ background: "#25A85E", color: "#fff" }}>
                                💬 WhatsApp Team
                            </a>
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <main className="flex-1 min-w-0">
                        {!project ? (
                            <div className="flex items-center justify-center h-64 rounded-2xl"
                                 style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                <div className="text-center">
                                    <FolderOpen size={48} className="text-gray-700 mx-auto mb-3" />
                                    <p className="text-gray-500">Select a project to view details</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Project header */}
                                <div className="rounded-2xl p-6 mb-5"
                                     style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <h2 className="text-white font-black text-2xl">{project.name}</h2>
                                                <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
                                                     style={{ background: cfg!.bg, color: cfg!.color }}>
                                                    <cfg.icon size={12} /> {cfg!.label}
                                                </div>
                                            </div>
                                            {project.description && (
                                                <p className="text-gray-400 text-sm">{project.description}</p>
                                            )}
                                        </div>
                                        {project.url && (
                                            <a href={project.url} target="_blank" rel="noopener noreferrer"
                                               className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 shrink-0"
                                               style={{ background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.25)", color: "#2ECC71" }}>
                                                <Globe size={14} /> View Live Site <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-xs font-semibold">Overall Progress</span>
                                            <span className="text-white font-black text-sm">{project.progress}%</span>
                                        </div>
                                        <ProgressBar value={project.progress} color={cfg!.color} />
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {project.start_date && (
                                            <span className="flex items-center gap-1.5">
                        <Calendar size={11} style={{ color: cfg!.color }} />
                        Started {new Date(project.start_date).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                                        )}
                                        {project.due_date && (
                                            <span className="flex items-center gap-1.5">
                        <Clock size={11} style={{ color: cfg!.color }} />
                        Due {new Date(project.due_date).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                                        )}
                                        {project.budget && (
                                            <span className="flex items-center gap-1.5">
                        <BarChart3 size={11} style={{ color: cfg!.color }} />
                        Budget: KES {project.budget.toLocaleString("en-KE")}
                                                {project.paid ? ` · Paid: KES ${project.paid.toLocaleString("en-KE")}` : ""}
                      </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-1 mb-5 flex-wrap">
                                    {(["overview", "milestones", "files", "messages"] as const).map((tab) => {
                                        const counts: Record<string, number> = {
                                            milestones: project.milestones.length,
                                            files:      project.project_files.length,
                                            messages:   project.project_messages.filter((m) => m.sender === "solvara" && !m.read).length,
                                        };
                                        return (
                                            <button key={tab} onClick={() => setActiveTab(tab)}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
                                                    style={activeTab === tab
                                                        ? { background: "#0D518C", color: "#fff" }
                                                        : { background: "rgba(255,255,255,0.04)", color: "#9CA3AF", border: "1px solid #1A2540" }}>
                                                {tab}
                                                {counts[tab] > 0 && (
                                                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                                                          style={{ background: tab === "messages" ? "#E74C3C" : "rgba(255,255,255,0.15)", color: "#fff" }}>
                            {counts[tab]}
                          </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Tab content */}
                                <AnimatePresence mode="wait">
                                    <motion.div key={activeTab}
                                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}>

                                        {/* ── Overview ── */}
                                        {activeTab === "overview" && (
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {/* Next milestone */}
                                                <div className="rounded-2xl p-5" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Calendar size={15} style={{ color: "#2ECC71" }} />
                                                        <span className="text-white font-bold text-sm">Next Milestone</span>
                                                    </div>
                                                    {project.milestones.filter((m) => !m.completed)[0] ? (
                                                        <div>
                                                            <p className="text-white font-semibold">{project.milestones.filter((m) => !m.completed)[0].title}</p>
                                                            {project.milestones.filter((m) => !m.completed)[0].description && (
                                                                <p className="text-gray-400 text-xs mt-1">{project.milestones.filter((m) => !m.completed)[0].description}</p>
                                                            )}
                                                            {project.milestones.filter((m) => !m.completed)[0].due_date && (
                                                                <p className="text-xs mt-2" style={{ color: "#F59E0B" }}>
                                                                    Due: {new Date(project.milestones.filter((m) => !m.completed)[0].due_date!).toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long" })}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">All milestones complete 🎉</p>
                                                    )}
                                                </div>

                                                {/* Recent file */}
                                                <div className="rounded-2xl p-5" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <FileText size={15} style={{ color: "#2ECC71" }} />
                                                        <span className="text-white font-bold text-sm">Latest File</span>
                                                    </div>
                                                    {project.project_files[0] ? (
                                                        <a href={project.project_files[0].url} target="_blank" rel="noopener noreferrer"
                                                           className="flex items-center gap-3 group">
                                                            <span className="text-2xl">{FILE_ICONS[project.project_files[0].type] ?? "📎"}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-white text-sm font-semibold truncate group-hover:text-[#2ECC71] transition-colors">
                                                                    {project.project_files[0].name}
                                                                </p>
                                                                <p className="text-gray-500 text-xs">{project.project_files[0].type}</p>
                                                            </div>
                                                            <Download size={14} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                                                        </a>
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">No files yet</p>
                                                    )}
                                                </div>

                                                {/* Milestone progress */}
                                                <div className="sm:col-span-2 rounded-2xl p-5" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <CheckCircle2 size={15} style={{ color: "#2ECC71" }} />
                                                        <span className="text-white font-bold text-sm">
                              Milestones — {project.milestones.filter((m) => m.completed).length}/{project.milestones.length} done
                            </span>
                                                    </div>
                                                    {project.milestones.length === 0 ? (
                                                        <p className="text-gray-500 text-sm">No milestones set yet</p>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {project.milestones.slice(0, 5).map((m) => (
                                                                <div key={m.id} className="flex items-center gap-3">
                                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                                         style={{ background: m.completed ? "rgba(46,204,113,0.15)" : "#1A2540", border: `2px solid ${m.completed ? "#2ECC71" : "#2A3550"}` }}>
                                                                        {m.completed && <CheckCircle2 size={12} style={{ color: "#2ECC71" }} />}
                                                                    </div>
                                                                    <span className="text-sm" style={{ color: m.completed ? "#9CA3AF" : "#fff", textDecoration: m.completed ? "line-through" : "none" }}>
                                    {m.title}
                                  </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* ── Milestones ── */}
                                        {activeTab === "milestones" && (
                                            <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                {project.milestones.length === 0 ? (
                                                    <div className="text-center py-12">
                                                        <Calendar size={36} className="mx-auto mb-3 text-gray-700" />
                                                        <p className="text-gray-500">No milestones added yet</p>
                                                    </div>
                                                ) : (
                                                    <div className="divide-y" style={{ borderColor: "#1A2540" }}>
                                                        {project.milestones.map((m, i) => (
                                                            <div key={m.id} className="flex items-start gap-4 p-5">
                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
                                                                     style={m.completed
                                                                         ? { background: "rgba(46,204,113,0.15)", color: "#2ECC71" }
                                                                         : { background: "#1A2540", color: "#6B7280" }}>
                                                                    {m.completed ? <CheckCircle2 size={16} style={{ color: "#2ECC71" }} /> : i + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <p className="text-white font-semibold" style={{ textDecoration: m.completed ? "line-through" : "none", opacity: m.completed ? 0.6 : 1 }}>
                                                                            {m.title}
                                                                        </p>
                                                                        {m.completed && (
                                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                                                  style={{ background: "rgba(46,204,113,0.12)", color: "#2ECC71" }}>
                                        Complete
                                      </span>
                                                                        )}
                                                                    </div>
                                                                    {m.description && <p className="text-gray-400 text-xs mt-1">{m.description}</p>}
                                                                    {m.due_date && (
                                                                        <p className="text-xs mt-1" style={{ color: m.completed ? "#6B7280" : "#F59E0B" }}>
                                                                            {m.completed ? "Completed" : "Due"}: {new Date(m.due_date).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* ── Files ── */}
                                        {activeTab === "files" && (
                                            <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                {project.project_files.length === 0 ? (
                                                    <div className="text-center py-12">
                                                        <FileText size={36} className="mx-auto mb-3 text-gray-700" />
                                                        <p className="text-gray-500">No files uploaded yet</p>
                                                    </div>
                                                ) : (
                                                    <div className="divide-y" style={{ borderColor: "#1A2540" }}>
                                                        {project.project_files.map((f) => (
                                                            <a key={f.id} href={f.url} target="_blank" rel="noopener noreferrer"
                                                               className="flex items-center gap-4 p-5 group hover:bg-white/[0.02] transition-colors">
                                                                <span className="text-2xl shrink-0">{FILE_ICONS[f.type] ?? "📎"}</span>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-white font-semibold group-hover:text-[#2ECC71] transition-colors truncate">{f.name}</p>
                                                                    <p className="text-gray-500 text-xs">
                                                                        {f.type} · {f.size_kb ? `${(f.size_kb / 1024).toFixed(1)} MB` : "—"} · {new Date(f.created_at).toLocaleDateString("en-KE")}
                                                                    </p>
                                                                </div>
                                                                <Download size={16} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* ── Messages ── */}
                                        {activeTab === "messages" && (
                                            <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                                                {/* Message thread */}
                                                <div className="p-5 space-y-4 max-h-96 overflow-y-auto"
                                                     style={{ scrollbarWidth: "thin", scrollbarColor: "#1A2540 transparent" }}>
                                                    {project.project_messages.length === 0 ? (
                                                        <div className="text-center py-8">
                                                            <MessageSquare size={32} className="mx-auto mb-3 text-gray-700" />
                                                            <p className="text-gray-500 text-sm">No messages yet. Send us a message below!</p>
                                                        </div>
                                                    ) : (
                                                        project.project_messages.map((m) => (
                                                            <div key={m.id} className={`flex gap-3 ${m.sender === "client" ? "flex-row-reverse" : "flex-row"}`}>
                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5"
                                                                     style={{ background: m.sender === "solvara" ? "#0D518C" : "#2ECC71" }}>
                                                                    {m.sender === "solvara" ? "S" : client.name[0].toUpperCase()}
                                                                </div>
                                                                <div className={`max-w-[75%] ${m.sender === "client" ? "items-end" : "items-start"} flex flex-col`}>
                                                                    <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                                                                         style={m.sender === "solvara"
                                                                             ? { background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)", color: "#E2E8F0", borderTopLeftRadius: 4 }
                                                                             : { background: "#2ECC71", color: "#0A0E1A", borderTopRightRadius: 4 }}>
                                                                        {m.body}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-600 mt-1 px-1">
                                                                        {m.sender_name} · {new Date(m.created_at).toLocaleString("en-KE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>

                                                {/* Message input */}
                                                <div className="p-4 flex gap-3" style={{ borderTop: "1px solid #1A2540" }}>
                                                    <input
                                                        value={msgBody}
                                                        onChange={(e) => setMsgBody(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                                                        placeholder="Type a message to the Solvara team..."
                                                        className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 outline-none"
                                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540" }}
                                                    />
                                                    <button onClick={handleSendMessage} disabled={sending || !msgBody.trim()}
                                                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40"
                                                            style={{ background: msgBody.trim() ? "#2ECC71" : "#1A2540" }}>
                                                        {sending
                                                            ? <div className="w-4 h-4 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                                                            : <Send size={16} style={{ color: msgBody.trim() ? "#0A0E1A" : "#6B7280" }} />}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}