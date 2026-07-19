'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const JOKES = [
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything." },
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field." },
  { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts." },
  { setup: "What do you call fake spaghetti?", punchline: "An impasta." },
  { setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired." },
  { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear." },
  { setup: "Why can't you give Elsa a balloon?", punchline: "Because she'll let it go." },
  { setup: "Why did the coffee file a police report?", punchline: "It got mugged." },
  { setup: "How do you organize a space party?", punchline: "You planet." },
  { setup: "Why did the math book look sad?", punchline: "It had too many problems." },
  { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese." },
  { setup: "Why couldn't the leopard play hide and seek?", punchline: "Because he was always spotted." },
  { setup: "What did one wall say to the other?", punchline: "I'll meet you at the corner." },
  { setup: "Why did the golfer bring two pairs of pants?", punchline: "In case he got a hole in one." },
  { setup: "What do you call a fish with no eyes?", punchline: "A fsh." },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up." },
  { setup: "Why did the computer go to the doctor?", punchline: "It had a virus." },
  { setup: "What do you call a can opener that doesn't work?", punchline: "A can't opener." },
  { setup: "Why was six afraid of seven?", punchline: "Because seven eight nine." },
  { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved." },
  { setup: "Why did the cookie go to the doctor?", punchline: "Because it felt crumby." },
  { setup: "What do you call a dinosaur that crashes his car?", punchline: "Tyrannosaurus wrecks." },
  { setup: "Why did the stadium get hot after the game?", punchline: "All of the fans left." },
  { setup: "How does a penguin build its house?", punchline: "Igloos it together." },
  { setup: "What do you call a sleeping bull?", punchline: "A bulldozer." },
];

export default function RandomJokeGenerator() {
  const [joke, setJoke] = useState(JOKES[0]);
  const [revealed, setRevealed] = useState(false);

  const generate = () => {
    let next;
    do {
      next = JOKES[Math.floor(Math.random() * JOKES.length)];
    } while (next.setup === joke.setup && JOKES.length > 1);
    setJoke(next);
    setRevealed(false);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="min-h-[140px] rounded-xl border border-border bg-slate-50 p-6">
        <p className="text-lg font-medium text-slate-800">{joke.setup}</p>
        {revealed ? (
          <p className="mt-3 text-lg font-bold text-primary">{joke.punchline}</p>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="mt-3 text-sm font-medium text-slate-400 underline decoration-dotted hover:text-primary"
          >
            Tap to reveal punchline
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" /> New Joke
        </button>
        {revealed && <CopyButton value={`${joke.setup} ${joke.punchline}`} label="" />}
      </div>
    </div>
  );
}
