"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDoc {
  _id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  imageKitUrl: string;
  imageKitFileId: string;
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

interface ImageState {
  status: "idle" | "uploading" | "done" | "error";
  url: string;
  fileId: string;
  previewUrl: string;
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
  const [image, setImage] = useState<ImageState>({
    status: "idle", url: "", fileId: "", previewUrl: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<ProjectDoc | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setImage({ status: "idle", url: "", fileId: "", previewUrl: "" });
    setEditingId(null);
  };

  const uploadToImageKit = useCallback(async (fileOrBase64: File | string, fileName: string) => {
    setImage((prev) => ({ ...prev, status: "uploading" }));
    try {
      const fd = new FormData();
      if (typeof fileOrBase64 === "string") fd.append("pasteData", fileOrBase64);
      else fd.append("file", fileOrBase64);
      fd.append("fileName", fileName.replace(/[^a-zA-Z0-9-_]/g, "-"));

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "x-admin-secret": secretKey },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setImage({ status: "done", url: data.url, fileId: data.fileId, previewUrl: data.url });
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    } catch {
      setImage((prev) => ({ ...prev, status: "error" }));
    }
  }, [secretKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage((prev) => ({ ...prev, previewUrl: URL.createObjectURL(file) }));
    uploadToImageKit(file, file.name);
  };

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    for (const item of e.clipboardData.items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) continue;
        setImage((prev) => ({ ...prev, previewUrl: URL.createObjectURL(file) }));
        await uploadToImageKit(file, `pasted-${Date.now()}`);
        return;
      }
    }
  }, [uploadToImageKit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        ownerHighlight: form.ownerHighlight || null,
        imageKitFileId: image.fileId,
        imageKitUrl: image.url,
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
      imageUrl: p.imageKitUrl || p.imageUrl || "",
      techStack: p.techStack.join(", "),
      category: p.category,
      ownerHighlight: p.ownerHighlight || "",
    });
    setImage({
      status: p.imageKitUrl ? "done" : "idle",
      url: p.imageKitUrl || "",
      fileId: p.imageKitFileId || "",
      previewUrl: p.imageKitUrl || p.imageUrl || "",
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

              {/* Image upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project Image</label>
                <div
                  onPaste={handlePaste}
                  tabIndex={0}
                  className="relative border-2 border-dashed border-dark-600 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-colors focus:outline-none focus:border-cyan-400/50"
                >
                  {image.previewUrl ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                      <Image src={image.previewUrl} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      <button type="button" onClick={() => { setImage({ status: "idle", url: "", fileId: "", previewUrl: "" }); setForm((p) => ({ ...p, imageUrl: "" })); }}
                        className="absolute top-2 right-2 bg-red-500/80 text-white w-7 h-7 rounded-full text-sm hover:bg-red-600">x</button>
                    </div>
                  ) : (
                    <div className="py-6">
                      <svg className="mx-auto w-10 h-10 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-400 text-sm mb-1"><span className="text-cyan-400">Click to upload</span> or paste an image (Ctrl+V)</p>
                      <p className="text-gray-600 text-xs">PNG, JPG, WebP up to 10MB</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="hidden" />
                  {!image.previewUrl && (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">Browse Files</button>
                  )}
                </div>
                {image.status === "uploading" && (
                  <div className="flex items-center gap-2 mt-2 text-cyan-400 text-sm">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Uploading to ImageKit...
                  </div>
                )}
                {image.status === "error" && <p className="text-red-400 text-sm mt-2">Upload failed. Try again.</p>}
                {image.status === "done" && <p className="text-green-400 text-sm mt-2">Uploaded to ImageKit</p>}
                <div className="mt-3">
                  <label className="block text-xs text-gray-500 mb-1">Or paste an image URL directly:</label>
                  <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://ik.imagekit.io/your-id/projects/image.png"
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50" />
                </div>
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
                      {(p.imageKitUrl || p.imageUrl) ? (
                        <Image src={p.imageKitUrl || p.imageUrl} alt={p.title} fill className="object-cover" sizes="80px" />
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
