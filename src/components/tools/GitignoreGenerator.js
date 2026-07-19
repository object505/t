'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

const TEMPLATES = {
  Node: `node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
dist/
build/
.env
.env.local
.env.*.local
coverage/
*.tsbuildinfo`,
  Python: `__pycache__/
*.py[cod]
*.egg-info/
.eggs/
.venv/
venv/
env/
.env
dist/
build/
*.log
.pytest_cache/
.mypy_cache/
.coverage
htmlcov/`,
  PHP: `vendor/
composer.phar
composer.lock
.env
.env.backup
.phpunit.result.cache
*.log
/build/
/cache/
/tmp/`,
  React: `node_modules/
build/
dist/
.env
.env.local
.env.production
npm-debug.log*
yarn-debug.log*
yarn-error.log*
coverage/`,
  "Next.js": `node_modules/
.next/
out/
build/
.env*.local
.vercel
*.tsbuildinfo
next-env.d.ts`,
  Laravel: `/vendor/
node_modules/
/public/hot
/public/storage
/storage/*.key
/.env
/.env.backup
/.phpunit.result.cache
/bootstrap/cache/*.php
Homestead.json
Homestead.yaml
/storage/framework/cache/data/*
/storage/framework/sessions/*
/storage/framework/views/*
/storage/logs/*
.idea
.vscode`,
  Java: `*.class
*.jar
*.war
target/
.gradle/
build/
out/
*.iml
.idea/
.settings/
.classpath
.project`,
  Go: `*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
go.sum`,
  Ruby: `*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/tmp/
.env
.bundle/
vendor/bundle`,
  macOS: `.DS_Store
.AppleDouble
.LSOverride
Icon
._*
.Spotlight-V100
.Trashes`,
  Windows: `Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.lnk`,
  "VS Code": `.vscode/*
!.vscode/settings.json
!.vscode/extensions.json`,
  "JetBrains (IDEA/WebStorm)": `.idea/
*.iml
*.iws
out/`,
};

const CATEGORIES = {
  Languages: ["Node", "Python", "PHP", "Java", "Go", "Ruby"],
  Frameworks: ["React", "Next.js", "Laravel"],
  "OS / Editors": ["macOS", "Windows", "VS Code", "JetBrains (IDEA/WebStorm)"],
};

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState(["Node", "React", "macOS", "VS Code"]);

  const toggle = (name) => {
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));
  };

  const output = selected
    .map((name) => `# ${name}\n${TEMPLATES[name]}`)
    .join("\n\n");

  return (
    <div className="space-y-4">
      {Object.entries(CATEGORIES).map(([cat, names]) => (
        <div key={cat}>
          <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{cat}</div>
          <div className="flex flex-wrap gap-1.5">
            {names.map((name) => (
              <button
                key={name}
                onClick={() => toggle(name)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selected.includes(name) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      ))}

      {selected.length === 0 ? (
        <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">
          Select at least one template above
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">.gitignore preview</span>
            <CopyButton value={output} label="Copy all" />
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
