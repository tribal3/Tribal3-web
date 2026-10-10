// "use client";

// import { useState, useCallback } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// type ContentType = "product" | "portfolio";
// type Tab = "add" | "manage";

// interface ItemDoc {
//   _id: string;
//   type: ContentType;
//   title: string;
//   description: string;
//   imageUrl: string;
//   url: string;
//   order: number;
//   createdAt: string;
// }

// interface FormData {
//   title: string;
//   description: string;
//   imageUrl: string;
//   url: string;
// }

// const contentTypes: { value: ContentType; label: string }[] = [
//   { value: "product", label: "Products" },
//   { value: "portfolio", label: "Portfolio" },
// ];

// const emptyForm: FormData = { title: "", description: "", imageUrl: "", url: "" };

// export default function AdminPage() {
//   const [secretKey, setSecretKey] = useState("");
//   const [showLogin, setShowLogin] = useState(true);
//   const [contentType, setContentType] = useState<ContentType>("product");
//   const [tab, setTab] = useState<Tab>("add");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [items, setItems] = useState<ItemDoc[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
//   const [form, setForm] = useState<FormData>(emptyForm);
//   const [deleteTarget, setDeleteTarget] = useState<ItemDoc | null>(null);

//   const noun = contentType === "product" ? "Product" : "Portfolio Item";

//   const fetchItems = useCallback(async (type: ContentType) => {
//     try {
//       const res = await fetch(`/api/catalog?type=${type}`);
//       if (res.ok) {
//         const data = await res.json();
//         setItems(data.items);
//       }
//     } catch { /* ignore */ }
//   }, []);

//   const resetForm = () => {
//     setForm(emptyForm);
//     setEditingId(null);
//   };

//   const handleLogin = async () => {
//     const res = await fetch("/api/verify", {
//       method: "POST",
//       headers: { "x-admin-secret": secretKey },
//     });
//     if (res.ok) {
//       setShowLogin(false);
//       void fetchItems(contentType);
//     } else {
//       alert("Invalid password");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const payload = { ...form, type: contentType };
//       const url = editingId ? `/api/catalog/${editingId}` : "/api/catalog";
//       const method = editingId ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json", "x-admin-secret": secretKey },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setResult({ ok: true, msg: editingId ? `${noun} updated!` : `${noun} added!` });
//         resetForm();
//         void fetchItems(contentType);
//         setTab("manage");
//       } else {
//         const data = await res.json();
//         setResult({ ok: false, msg: data.error || "Request failed" });
//       }
//     } catch {
//       setResult({ ok: false, msg: "Network error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     try {
//       const res = await fetch(`/api/catalog/${deleteTarget._id}`, {
//         method: "DELETE",
//         headers: { "x-admin-secret": secretKey },
//       });
//       if (res.ok) {
//         setResult({ ok: true, msg: `${noun} deleted!` });
//         setDeleteTarget(null);
//         void fetchItems(contentType);
//       } else {
//         const data = await res.json();
//         setResult({ ok: false, msg: data.error || "Delete failed" });
//       }
//     } catch {
//       setResult({ ok: false, msg: "Network error" });
//     }
//   };

//   const startEdit = (item: ItemDoc) => {
//     setForm({
//       title: item.title,
//       description: item.description,
//       imageUrl: item.imageUrl || "",
//       url: item.url || "",
//     });
//     setEditingId(item._id);
//     setTab("add");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const switchType = (type: ContentType) => {
//     setContentType(type);
//     setEditingId(null);
//     setForm(emptyForm);
//     setTab("manage");
//     setResult(null);
//     void fetchItems(type);
//   };

//   if (showLogin) {
//     return (
//       <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
//         <div className="w-full max-w-sm">
//           <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
//           <input
//             type="password"
//             placeholder="Enter admin password"
//             value={secretKey}
//             onChange={(e) => setSecretKey(e.target.value)}
//             onKeyDown={(e) => { if (e.key === "Enter" && secretKey) void handleLogin(); }}
//             className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 mb-4"
//           />
//           <button
//             onClick={() => void handleLogin()}
//             disabled={!secretKey}
//             className="w-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl px-5 py-3.5 font-medium hover:bg-cyan-500/30 disabled:opacity-40"
//           >
//             Enter
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-dark-900 py-24 sm:py-28 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Content Management</h1>
//             <p className="text-gray-400 mt-1">Manage your products and portfolio</p>
//           </div>
//           <button
//             onClick={() => { setShowLogin(true); setSecretKey(""); }}
//             className="text-sm text-gray-400 hover:text-cyan-400 border border-dark-600 rounded-xl px-4 py-2 transition-colors"
//           >
//             Lock
//           </button>
//         </div>

//         {/* Content type switch */}
//         <div className="flex gap-1 bg-dark-800 rounded-xl p-1 mt-6 mb-6 border border-dark-700 w-fit">
//           {contentTypes.map((c) => (
//             <button
//               key={c.value}
//               onClick={() => switchType(c.value)}
//               className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
//                 contentType === c.value ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               {c.label}
//             </button>
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 bg-dark-800 rounded-xl p-1 mb-8 border border-dark-700 w-fit">
//           {(["add", "manage"] as Tab[]).map((t) => (
//             <button
//               key={t}
//               onClick={() => { setTab(t); if (t === "add") resetForm(); }}
//               className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
//                 tab === t ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-gray-400 hover:text-white"
//               }`}
//             >
//               {t === "add" ? (editingId ? `Edit ${noun}` : "Add New") : `Manage ${contentTypes.find((c) => c.value === contentType)?.label}`}
//             </button>
//           ))}
//         </div>

//         {/* Result banner */}
//         <AnimatePresence>
//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className={`mb-6 p-4 rounded-xl border ${
//                 result.ok ? "bg-green-500/10 border-green-400/30 text-green-300" : "bg-red-500/10 border-red-400/30 text-red-300"
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <span>{result.msg}</span>
//                 <button onClick={() => setResult(null)} className="text-white/50 hover:text-white ml-4">&times;</button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* === ADD / EDIT FORM === */}
//         {tab === "add" && (
//           <div className="max-w-2xl">
//             <h2 className="text-xl font-semibold text-white mb-5">
//               {editingId ? `Edit ${noun}` : `Add New ${noun}`}
//               {editingId && (
//                 <button onClick={resetForm} className="ml-4 text-sm text-gray-400 hover:text-cyan-400">
//                   (clear &amp; add new)
//                 </button>
//               )}
//             </h2>
//             <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   {contentType === "product" ? "Product Name" : "Project Title"}
//                 </label>
//                 <input
//                   type="text"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   required
//                   className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Description</label>
//                 <textarea
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                   required
//                   rows={4}
//                   className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-2">Image URL</label>
//                 <input
//                   type="url"
//                   value={form.imageUrl}
//                   onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//                   placeholder="https://example.com/image.png"
//                   className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50"
//                 />
//                 {form.imageUrl && (
//                   <div className="relative mt-3 w-full aspect-video rounded-lg overflow-hidden bg-dark-700">
//                     <Image src={form.imageUrl} alt="Preview" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Link URL (optional)</label>
//                 <input
//                   type="url"
//                   value={form.url}
//                   onChange={(e) => setForm({ ...form, url: e.target.value })}
//                   placeholder="https://example.com"
//                   className="w-full bg-dark-700 border border-dark-600 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl px-5 py-3.5 font-medium hover:bg-cyan-500/30 disabled:opacity-40 transition-colors"
//               >
//                 {loading ? "Saving..." : editingId ? `Update ${noun}` : `Add ${noun}`}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* === MANAGE / LIST === */}
//         {tab === "manage" && (
//           <div>
//             <h2 className="text-xl font-semibold text-white mb-5">
//               All {contentTypes.find((c) => c.value === contentType)?.label} ({items.length})
//             </h2>
//             {items.length === 0 ? (
//               <div className="glass-card rounded-xl p-12 text-center">
//                 <p className="text-gray-400">Nothing here yet.</p>
//                 <button onClick={() => { setTab("add"); resetForm(); }} className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm">
//                   Add your first {noun.toLowerCase()}
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {items.map((item) => (
//                   <div key={item._id} className="glass-card rounded-xl p-4 flex items-center gap-4 group">
//                     <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-dark-700">
//                       {item.imageUrl ? (
//                         <Image src={item.imageUrl} alt={item.title} fill className="object-contain" sizes="80px" />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-xs text-gray-600">No img</div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-white font-medium truncate">{item.title}</h3>
//                       <p className="text-gray-500 text-sm truncate">{item.description}</p>
//                     </div>
//                     <div className="flex gap-2 shrink-0">
//                       <button
//                         onClick={() => startEdit(item)}
//                         className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => setDeleteTarget(item)}
//                         className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition-colors"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Delete confirmation modal */}
//         <AnimatePresence>
//           {deleteTarget && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-dark-800 border border-dark-600 rounded-2xl p-6 max-w-sm w-full"
//               >
//                 <h3 className="text-lg font-semibold text-white mb-2">Delete {noun}</h3>
//                 <p className="text-gray-400 text-sm mb-1">Are you sure you want to delete:</p>
//                 <p className="text-cyan-400 font-medium mb-6">&ldquo;{deleteTarget.title}&rdquo;</p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setDeleteTarget(null)}
//                     className="flex-1 px-4 py-2.5 rounded-xl border border-dark-600 text-gray-300 hover:bg-dark-700 transition-colors text-sm"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => void handleDelete()}
//                     className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30 transition-colors text-sm font-medium"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
