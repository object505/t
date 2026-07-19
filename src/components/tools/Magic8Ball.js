'use client'
import { useState } from "react";
import { ToolInput } from '@/components/tools/ToolUI'

const ANSWERS = [
  { text: "It is certain", tone: "yes" },
  { text: "Without a doubt", tone: "yes" },
  { text: "Yes, definitely", tone: "yes" },
  { text: "You may rely on it", tone: "yes" },
  { text: "As I see it, yes", tone: "yes" },
  { text: "Most likely", tone: "yes" },
  { text: "Outlook good", tone: "yes" },
  { text: "Signs point to yes", tone: "yes" },
  { text: "Reply hazy, try again", tone: "maybe" },
  { text: "Ask again later", tone: "maybe" },
  { text: "Better not tell you now", tone: "maybe" },
  { text: "Cannot predict now", tone: "maybe" },
  { text: "Concentrate and ask again", tone: "maybe" },
  { text: "Don't count on it", tone: "no" },
  { text: "My reply is no", tone: "no" },
  { text: "My sources say no", tone: "no" },
  { text: "Outlook not so good", tone: "no" },
  { text: "Very doubtful", tone: "no" },
];

const TONE_STYLES = {
  yes: "bg-emerald-500",
  maybe: "bg-amber-500",
  no: "bg-rose-500",
};

export default function MagicEightBall() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [history, setHistory] = useState([]);

  const shake = () => {
    if (shaking) return;
    setShaking(true);
    setAnswer(null);
    setTimeout(() => {
      const result = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
      setAnswer(result);
      setHistory((h) => [{ q: question.trim(), a: result }, ...h].slice(0, 6));
      setShaking(false);
    }, 900);
  };

  return (
    <div className="space-y-4 text-center">
      <ToolInput
        label="Ask a yes/no question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && shake()}
        className='text-center'
      />

      <div className="flex justify-center">
        <div
          onClick={shake}
          className={`relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-slate-900 shadow-xl transition-transform ${
            shaking ? "animate-[wiggle_0.15s_ease-in-out_infinite]" : "hover:scale-105"
          }`}
        >
          <style>{`
            @keyframes wiggle {
              0%, 100% { transform: rotate(-4deg); }
              50% { transform: rotate(4deg); }
            }
          `}</style>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            {shaking ? (
              <span className="text-2xl">🎱</span>
            ) : answer ? (
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${TONE_STYLES[answer.tone]} p-2 text-center text-[10px] font-bold leading-tight text-white`}>
                {answer.text}
              </div>
            ) : (
              <span className="text-2xl font-bold text-slate-900">8</span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={shake}
        disabled={shaking}
        className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
      >
        {shaking ? "Shaking…" : "Shake the Ball"}
      </button>

      {history.length > 0 && (
        <div className="space-y-1.5 border-t border-border pt-3 text-left">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Recent</div>
          {history.map((h, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${TONE_STYLES[h.a.tone]}`} />
              <div>
                {h.q && <div className="text-slate-500">{h.q}</div>}
                <div className="font-medium text-slate-700">{h.a.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
