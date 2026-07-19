'use client'
import { useState, useMemo } from "react";

const STATUS_CODES = [
  { code: 100, text: "Continue", category: "1xx", desc: "The initial part of a request has been received and the client should continue." },
  { code: 101, text: "Switching Protocols", category: "1xx", desc: "The server is switching protocols as requested by the client (e.g. to WebSocket)." },
  { code: 102, text: "Processing", category: "1xx", desc: "WebDAV: the server has received the request and is still processing it." },
  { code: 103, text: "Early Hints", category: "1xx", desc: "Used to return some response headers before the final HTTP message." },

  { code: 200, text: "OK", category: "2xx", desc: "The request succeeded." },
  { code: 201, text: "Created", category: "2xx", desc: "The request succeeded and a new resource was created." },
  { code: 202, text: "Accepted", category: "2xx", desc: "The request was accepted for processing, but processing isn't complete." },
  { code: 203, text: "Non-Authoritative Information", category: "2xx", desc: "The returned metadata isn't exactly from the origin server, but a copy or transformation." },
  { code: 204, text: "No Content", category: "2xx", desc: "The request succeeded but there is no content to send back." },
  { code: 205, text: "Reset Content", category: "2xx", desc: "The client should reset the document view that sent this request." },
  { code: 206, text: "Partial Content", category: "2xx", desc: "Only part of the resource was delivered, due to a range header." },
  { code: 207, text: "Multi-Status", category: "2xx", desc: "WebDAV: conveys info about multiple resources in situations where multiple status codes apply." },
  { code: 208, text: "Already Reported", category: "2xx", desc: "WebDAV: members of a DAV binding have already been enumerated in a previous reply." },
  { code: 226, text: "IM Used", category: "2xx", desc: "The server fulfilled a GET request and the response is a representation of instance manipulations applied." },

  { code: 300, text: "Multiple Choices", category: "3xx", desc: "The request has more than one possible response; the user agent should choose one." },
  { code: 301, text: "Moved Permanently", category: "3xx", desc: "The resource has been permanently moved to a new URL." },
  { code: 302, text: "Found", category: "3xx", desc: "The resource temporarily resides at a different URL." },
  { code: 303, text: "See Other", category: "3xx", desc: "The response can be found under a different URL using GET." },
  { code: 304, text: "Not Modified", category: "3xx", desc: "The resource hasn't changed since the last request (cache is valid)." },
  { code: 305, text: "Use Proxy", category: "3xx", desc: "Deprecated: the requested response must be accessed through a proxy." },
  { code: 306, text: "(Unused)", category: "3xx", desc: "No longer used; originally meant 'Switch Proxy'." },
  { code: 307, text: "Temporary Redirect", category: "3xx", desc: "Like 302, but the request method must not change." },
  { code: 308, text: "Permanent Redirect", category: "3xx", desc: "Like 301, but the request method must not change." },

  { code: 400, text: "Bad Request", category: "4xx", desc: "The server can't process the request due to a client error." },
  { code: 401, text: "Unauthorized", category: "4xx", desc: "Authentication is required and has failed or not been provided." },
  { code: 402, text: "Payment Required", category: "4xx", desc: "Reserved for future use; occasionally used for APIs requiring payment." },
  { code: 403, text: "Forbidden", category: "4xx", desc: "The client doesn't have permission to access this resource." },
  { code: 404, text: "Not Found", category: "4xx", desc: "The server can't find the requested resource." },
  { code: 405, text: "Method Not Allowed", category: "4xx", desc: "The request method isn't supported for this resource." },
  { code: 406, text: "Not Acceptable", category: "4xx", desc: "No content matching the client's Accept headers was found." },
  { code: 407, text: "Proxy Authentication Required", category: "4xx", desc: "Authentication with a proxy is required before the request can proceed." },
  { code: 408, text: "Request Timeout", category: "4xx", desc: "The server timed out waiting for the request." },
  { code: 409, text: "Conflict", category: "4xx", desc: "The request conflicts with the current state of the server." },
  { code: 410, text: "Gone", category: "4xx", desc: "The resource is no longer available and won't be available again." },
  { code: 411, text: "Length Required", category: "4xx", desc: "The server requires a Content-Length header that wasn't provided." },
  { code: 412, text: "Precondition Failed", category: "4xx", desc: "A precondition in the request headers evaluated to false." },
  { code: 413, text: "Payload Too Large", category: "4xx", desc: "The request body is larger than the server is willing to process." },
  { code: 414, text: "URI Too Long", category: "4xx", desc: "The requested URI is longer than the server is willing to interpret." },
  { code: 415, text: "Unsupported Media Type", category: "4xx", desc: "The media format of the request body isn't supported by the server." },
  { code: 416, text: "Range Not Satisfiable", category: "4xx", desc: "The requested range can't be fulfilled given the size of the resource." },
  { code: 417, text: "Expectation Failed", category: "4xx", desc: "The expectation in an Expect header couldn't be met." },
  { code: 418, text: "I'm a Teapot", category: "4xx", desc: "An April Fools' RFC joke status code; some servers use it playfully." },
  { code: 421, text: "Misdirected Request", category: "4xx", desc: "The request was directed at a server that can't produce a response." },
  { code: 422, text: "Unprocessable Entity", category: "4xx", desc: "The request was well-formed but contains semantic errors." },
  { code: 423, text: "Locked", category: "4xx", desc: "WebDAV: the resource being accessed is locked." },
  { code: 424, text: "Failed Dependency", category: "4xx", desc: "WebDAV: the request failed due to failure of a previous request." },
  { code: 425, text: "Too Early", category: "4xx", desc: "The server is unwilling to process a request that might be replayed." },
  { code: 426, text: "Upgrade Required", category: "4xx", desc: "The server refuses to perform the request using the current protocol." },
  { code: 428, text: "Precondition Required", category: "4xx", desc: "The origin server requires the request to be conditional." },
  { code: 429, text: "Too Many Requests", category: "4xx", desc: "The user has sent too many requests in a given time (rate limiting)." },
  { code: 431, text: "Request Header Fields Too Large", category: "4xx", desc: "The server is unwilling to process the request because header fields are too large." },
  { code: 451, text: "Unavailable For Legal Reasons", category: "4xx", desc: "The resource is unavailable for legal reasons (e.g. censorship)." },

  { code: 500, text: "Internal Server Error", category: "5xx", desc: "A generic error occurred on the server." },
  { code: 501, text: "Not Implemented", category: "5xx", desc: "The server doesn't support the functionality required." },
  { code: 502, text: "Bad Gateway", category: "5xx", desc: "The server, acting as a gateway, got an invalid response upstream." },
  { code: 503, text: "Service Unavailable", category: "5xx", desc: "The server isn't ready to handle the request (overloaded or down)." },
  { code: 504, text: "Gateway Timeout", category: "5xx", desc: "The server, acting as a gateway, didn't get a response in time." },
  { code: 505, text: "HTTP Version Not Supported", category: "5xx", desc: "The HTTP version used in the request isn't supported by the server." },
  { code: 506, text: "Variant Also Negotiates", category: "5xx", desc: "The server has an internal configuration error involving content negotiation." },
  { code: 507, text: "Insufficient Storage", category: "5xx", desc: "WebDAV: the server can't store the representation needed to complete the request." },
  { code: 508, text: "Loop Detected", category: "5xx", desc: "WebDAV: the server detected an infinite loop while processing the request." },
  { code: 510, text: "Not Extended", category: "5xx", desc: "Further extensions to the request are required for the server to fulfill it." },
  { code: 511, text: "Network Authentication Required", category: "5xx", desc: "The client needs to authenticate to gain network access (e.g. captive portal)." },
];

const CATEGORY_STYLES = {
  "1xx": "bg-slate-100 text-slate-600",
  "2xx": "bg-emerald-100 text-emerald-700",
  "3xx": "bg-blue-100 text-blue-700",
  "4xx": "bg-amber-100 text-amber-700",
  "5xx": "bg-rose-100 text-rose-700",
};

export default function HttpStatusLookup() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STATUS_CODES.filter((s) => {
      const matchesFilter = filter === "All" || s.category === filter;
      const matchesQuery =
        !q || String(s.code).includes(q) || s.text.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code or name (e.g. 404, timeout)"
        className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      />

      <div className="flex flex-wrap gap-1.5">
        {["All", "1xx", "2xx", "3xx", "4xx", "5xx"].map((f) => (
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

      <div className="text-xs text-slate-400">{filtered.length} of {STATUS_CODES.length} status codes</div>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">No matching status codes</div>
        )}
        {filtered.map((s) => (
          <div key={s.code} className="rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold ">{s.code}</span>
              <span className="text-sm font-medium">{s.text}</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_STYLES[s.category]}`}>{s.category}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
