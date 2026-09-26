"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDoc {
  _id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string[];
  category: "top-notch" | "standard";
  ownerHighlight: string | null;
  order: number;
  createdAt: string;
}

interface FormData {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string;
  category: "top-notch" | "standard";
  ownerHighlight: string;
}

type Tab = "add" | "manage";

export default function HiddenPostElement() {
  const [secretKey, setSecretKey] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [tab, setTab] = useState<Tab>("add");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [form, setForm] = useState<FormData>({
    title: "", description: "", url: "", imageUrl: "",
    techStack: "", category: "top-notch", ownerHighlight: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<ProjectDoc | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      }
    } catch { /* ignore */ }
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", url: "", imageUrl: "", techStack: "", category: "top-notch", ownerHighlight: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        ownerHighlight: form.ownerHighlight || null,
      };

      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-secret": secretKey },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setResult({ ok: true, msg: editingId ? "Project updated!" : "Project added!" });
        resetForm();
        fetchProjects();
        setTab("manage");
      } else {
        const data = await res.json();
        setResult({ ok: false, msg: data.error || "Request failed" });
      }
    } catch {
      setResult({ ok: false, msg: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/projects/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secretKey },
      });
      if (res.ok) {
        setResult({ ok: true, msg: "Project deleted!" });
        setDeleteTarget(null);
        fetchProjects();
      } else {
        const data = await res.json();
        setResult({ ok: false, msg: data.error || "Delete failed" });
      }
    } catch {
      setResult({ ok: false, msg: "Network error" });
    }
  };

  const startEdit = (p: ProjectDoc) => {
    setForm({
      title: p.title,
      description: p.description,
      url: p.url,
      imageUrl: p.imageUrl || "",
      techStack: p.techStack.join(", "),
      category: p.category,
      ownerHighlight: p.ownerHighlight || "",
    });
    setEditingId(p._id);
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 mb-4"
          />
          <button
            onClick={async () => {
              const res = await fetch("/api/verify", {
                method: "POST",
                headers: { "x-admin-secret": secretKey },
              });
              if (res.ok) {
                setShowLogin(false);
                void fetchProjects();
              } else {
                alert("Invalid secret key");
              }
            }}
            disabled={!secretKey}
            className="w-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl px-5 py-3.5 font-medium hover:bg-cyan-500/30 disabled:opacity-40"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
        <p className="text-gray-400 mb-8">Manage your portfolio projects</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-800 rounded-xl p-1 mb-8 border border-dark-700 w-fit">
          {(["add", "manage"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); if (t === "add") resetForm(); }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-gray-400 hover:text-white"
              }`}
            >
              {t === "add" ? (editingId ? "Edit Project" : "Add New") : "Manage Projects"}
            </button>
          ))}
        </div>

        {/* Result banner */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-xl border ${
                result.ok ? "bg-green-500/10 border-green-400/30 text-green-300" : "bg-red-500/10 border-red-400/30 text-red-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{result.msg}</span>
                <button onClick={() => setResult(null)} className="text-white/50 hover:text-white ml-4">&times;</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === ADD / EDIT FORM === */}
        {tab === "add" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-5">
              {editingId ? "Edit Project" : "Add New Project"}
              {editingId && (
                <button onClick={resetForm} className="ml-4 text-sm text-gray-400 hover:text-cyan-400">
                  (clear & add new)
                </button>
              )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
              </div>

              {/* Project image */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Image URL</label>
                <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://example.com/projects/image.png"
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50" />
                {form.imageUrl && (
                  <div className="relative mt-3 w-full aspect-video rounded-lg overflow-hidden bg-dark-700">
                    <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Tech Stack (comma separated)</label>
                <input type="text" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as FormData["category"] })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-cyan-400/50">
                    <option value="top-notch">Top Notch (Featured)</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Owner Highlight</label>
                  <select value={form.ownerHighlight} onChange={(e) => setForm({ ...form, ownerHighlight: e.target.value })}
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-cyan-400/50">
                    <option value="">None</option>
                    <option value="owner1">Owner 1</option>
                    <option value="owner2">Owner 2</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl px-5 py-3.5 font-medium hover:bg-cyan-500/30 disabled:opacity-40 transition-colors">
                {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>
        )}

        {/* === MANAGE / LIST === */}
        {tab === "manage" && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-5">All Projects ({projects.length})</h2>
            {projects.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <p className="text-gray-400">No projects in the database yet.</p>
                <button onClick={() => setTab("add")} className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm">Add your first project</button>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p._id} className="glass-card rounded-xl p-4 flex items-center gap-4 group">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-dark-700">
                      {p.imageUrl ? (
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-600">No img</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{p.title}</h3>
                      <p className="text-gray-500 text-sm truncate">{p.description}</p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          p.category === "top-notch" ? "bg-cyan-500/20 text-cyan-300" : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {p.category === "top-notch" ? "Featured" : "Standard"}
                        </span>
                        {p.ownerHighlight && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">{p.ownerHighlight}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(p)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => setDeleteTarget(p)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete confirmation modal */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-800 border border-dark-600 rounded-2xl p-6 max-w-sm w-full"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Delete Project</h3>
                <p className="text-gray-400 text-sm mb-1">Are you sure you want to delete:</p>
                <p className="text-cyan-400 font-medium mb-6">&ldquo;{deleteTarget.title}&rdquo;</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-dark-600 text-gray-300 hover:bg-dark-700 transition-colors text-sm">
                    Cancel
                  </button>
                  <button onClick={handleDelete}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30 transition-colors text-sm font-medium">
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
