'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw, Quote } from "lucide-react";

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did do.", author: "Mark Twain" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
];

export default function RandomQuoteGenerator() {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [favorites, setFavorites] = useState([]);

  const generate = () => {
    let next;
    do {
      next = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    } while (next.text === quote.text && QUOTES.length > 1);
    setQuote(next);
  };

  const isFav = favorites.some((f) => f.text === quote.text);
  const toggleFavorite = () => {
    setFavorites((f) => (isFav ? f.filter((q) => q.text !== quote.text) : [...f, quote]));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-slate-50 p-6 text-center">
        <Quote className="mx-auto mb-2 h-6 w-6 text-primary/40" />
        <p className="text-lg font-medium leading-relaxed text-slate-800">{quote.text}</p>
        <p className="mt-3 text-sm text-slate-500">— {quote.author}</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" /> New Quote
        </button>
        <button
          onClick={toggleFavorite}
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${isFav ? "border-rose-300 bg-rose-50 text-rose-600" : "border-border text-slate-500 hover:border-slate-300"}`}
        >
          {isFav ? "★ Favorited" : "☆ Favorite"}
        </button>
        <CopyButton value={`"${quote.text}" — ${quote.author}`} label="" />
      </div>

      {favorites.length > 0 && (
        <div className="space-y-2 border-t border-border pt-3">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Favorites ({favorites.length})</div>
          <div className="space-y-1.5">
            {favorites.map((f, i) => (
              <div key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-left text-xs text-slate-600">
                "{f.text}" <span className="text-slate-400">— {f.author}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
