'use client'
import { useState, useEffect } from "react";
import { Plus, X, Check } from "lucide-react";
import { ToolInput } from '@/components/tools/ToolUI'

const FILTERS = ["All", "Active", "Completed"];
const STORAGE_KEY = "todo-list-items";
const PERSIST_KEY = "todo-list-persist-enabled";

export default function TodoList() {
  const [persistEnabled, setPersistEnabled] = useState(false);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // On first mount: check whether persistence was previously enabled, and if so, load saved todos.
  useEffect(() => {
    try {
      const savedPersist = localStorage.getItem(PERSIST_KEY) === "true";
      setPersistEnabled(savedPersist);
      if (savedPersist) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setTodos(JSON.parse(saved));
      }
    } catch {
      // localStorage unavailable (private browsing, disabled, etc.) — fall back silently to in-memory only
    } finally {
      setHydrated(true);
    }
  }, []);

  // Whenever todos change AND persistence is on, save. Skip the very first render before hydration
  // completes, so we don't overwrite saved data with the temporary default state.
  useEffect(() => {
    if (!hydrated || !persistEnabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // storage full or blocked — fail silently, list still works in-memory
    }
  }, [todos, persistEnabled, hydrated]);

  const togglePersist = () => {
    const next = !persistEnabled;
    setPersistEnabled(next);
    try {
      localStorage.setItem(PERSIST_KEY, String(next));
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((t) => [...t, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggle = (id) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const remove = (id) => setTodos((t) => t.filter((x) => x.id !== id));
  const clearCompleted = () => setTodos((t) => t.filter((x) => !x.done));

  const startEdit = (todo) => { setEditingId(todo.id); setEditText(todo.text); };
  const saveEdit = (id) => {
    const text = editText.trim();
    if (text) setTodos((t) => t.map((x) => (x.id === id ? { ...x, text } : x)));
    setEditingId(null);
  };

  const filtered = todos.filter((t) => (filter === "Active" ? !t.done : filter === "Completed" ? t.done : true));
  const activeCount = todos.filter((t) => !t.done).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="space-y-4">
      <label className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2 text-xs">
        <span className="text-slate-500">Save my list on this device (localStorage)</span>
        <input type="checkbox" checked={persistEnabled} onChange={togglePersist} className="accent-primary" />
      </label>

      <div className="flex gap-2">
        <div className='flex-1'>
          <ToolInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a task…"
          />
        </div>

        <button onClick={addTodo} className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                filter === f ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400">{activeCount} active · {completedCount} done</span>
      </div>

      <div className="space-y-1.5">
        {filtered.length === 0 && (
          <div className="rounded-lg border border-border bg-slate-50 p-6 text-center text-sm text-slate-400">
            {todos.length === 0 ? "No tasks yet — add one above" : "Nothing here"}
          </div>
        )}
        {filtered.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
            <button
              onClick={() => toggle(todo.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                todo.done ? "border-primary bg-primary" : "border-slate-300"
              }`}
            >
              {todo.done && <Check className="h-3 w-3 text-white" />}
            </button>

            {editingId === todo.id ? (
              <input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                onBlur={() => saveEdit(todo.id)}
                className="flex-1 rounded border border-primary px-1.5 py-0.5 text-sm outline-none"
              />
            ) : (
              <span
                onDoubleClick={() => startEdit(todo)}
                className={`flex-1 cursor-text text-sm ${todo.done ? "text-slate-400 line-through" : "text-slate-700"}`}
              >
                {todo.text}
              </span>
            )}

            <button onClick={() => remove(todo.id)} className="shrink-0 rounded p-1 text-slate-300 hover:text-rose-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {completedCount > 0 && (
        <button onClick={clearCompleted} className="w-full rounded-lg border border-dashed border-border py-2 text-xs text-slate-400 hover:border-rose-300 hover:text-rose-500">
          Clear {completedCount} completed task{completedCount !== 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
}
