'use client'
import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { ToolTextarea } from '@/components/tools/ToolUI'

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog while the sun sets behind the distant mountains.",
  "Success is not final, failure is not fatal, it is the courage to continue that truly counts.",
  "Technology has changed the way people communicate, work, and even think about the world around them.",
  "A journey of a thousand miles begins with a single step taken with confidence and determination.",
  "The library was quiet except for the soft rustle of pages and the occasional whisper between friends.",
  "Coding is not just about writing instructions for a computer, it is about solving problems creatively.",
  "The old clock tower chimed twelve times as the town below slowly drifted off to sleep.",
  "Every great achievement was once considered impossible until someone believed it could actually be done.",
  "Rain tapped gently against the window while she read the last chapter of her favorite novel.",
  "The scientist adjusted her microscope, hoping this experiment would finally confirm her long-held theory.",
  "Practice does not make perfect, but consistent and deliberate practice makes steady improvement possible.",
  "Mountains have a way of making people feel both incredibly small and profoundly connected to nature.",
  "The chef carefully plated the dish, knowing that presentation mattered almost as much as taste.",
  "A good habit, repeated daily, can quietly reshape a life more than any single grand gesture.",
  "The astronauts watched the earth slowly rotate beneath them, a blue marble suspended in darkness.",
  "Curiosity is the engine of discovery, pushing people to ask questions no one thought to ask before.",
  "The garden bloomed with color each spring, a quiet reward for months of patient tending.",
  "Music has the strange power to carry us back to moments we thought we had forgotten.",
  "The detective studied the room carefully, certain that every clue told part of a larger story.",
  "Innovation rarely happens in isolation, it usually grows from years of shared ideas and failed attempts.",
  "The river carved its path through solid rock, patient and unstoppable across countless centuries.",
  "Learning a new language opens a door to an entirely different way of seeing the world.",
  "The old bookstore smelled of dust and ink, each shelf holding stories waiting to be found.",
  "Teamwork often accomplishes what individual effort alone could never hope to achieve on its own.",
  "The marathon runner focused on her breathing, one step at a time, mile after mile.",
  "Snow fell silently over the sleeping village, covering every rooftop in a soft white blanket.",
  "Great leaders listen more than they speak, and act only after they truly understand the problem.",
  "The violinist closed her eyes, letting the music guide her hands across the strings effortlessly.",
  "Every sunrise offers a quiet reminder that yesterday is finished and today is still unwritten.",
  "The engineers tested the bridge design repeatedly, knowing that safety allowed no room for error.",
]

export default function TypingSpeedTest() {
  const [passage, setPassage] = useState(PASSAGES[0]);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const reset = () => {
    const next = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
    setPassage(next);
    setInput("");
    setStartTime(null);
    setFinished(false);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleChange = (val) => {
    if (finished) return

    if (!startTime) setStartTime(Date.now())

    setInput(val)

    if (val.length >= passage.length) {
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const wordsTyped = passage.trim().split(/\s+/).length;
      const wpm = Math.round(wordsTyped / Math.max(elapsedMinutes, 0.001));

      let correctChars = 0;
      for (let i = 0; i < passage.length; i++) {
        if (val[i] === passage[i]) correctChars++;
      }
      const accuracy = Math.round((correctChars / passage.length) * 100);

      setResult({ wpm, accuracy, time: (Date.now() - startTime) / 1000 });
      setFinished(true);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const renderPassage = () => {
    return passage.split("").map((char, i) => {
      let cls = "text-slate-400";
      if (i < input.length) {
        cls = input[i] === char ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50";
      } else if (i === input.length) {
        cls = "text-slate-800 bg-primary/10 border-b-2 border-primary";
      }
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-slate-50 p-4 font-mono text-base leading-relaxed">
        {renderPassage()}
      </div>

      <ToolTextarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={finished}
        rows={3}
        placeholder="Start typing here to begin the test"
      />

      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-slate-50 p-3 text-center">
            <div className="text-xs text-slate-400">Speed</div>
            <div className="text-xl font-bold text-primary">{result.wpm}</div>
            <div className="text-xs text-slate-400">WPM</div>
          </div>
          <div className="rounded-xl border border-border bg-slate-50 p-3 text-center">
            <div className="text-xs text-slate-400">Accuracy</div>
            <div className="text-xl font-bold text-primary">{result.accuracy}%</div>
          </div>
          <div className="rounded-xl border border-border bg-slate-50 p-3 text-center">
            <div className="text-xs text-slate-400">Time</div>
            <div className="text-xl font-bold text-primary">{result.time.toFixed(1)}s</div>
          </div>
        </div>
      )}

      <button onClick={reset} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">
        <RefreshCw className="h-4 w-4" /> {finished ? "Try Another Passage" : "New Passage"}
      </button>
    </div>
  );
}
