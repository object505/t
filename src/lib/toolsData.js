// Full catalog of utility tools — all client-side, all functional.
// Each tool: { name, slug, category, description }

export const CATEGORIES = [
  { name: "Text", slug: 'text', icon: "Type" },
  { name: "Password & Security", slug: 'password-security', icon: "ShieldCheck" },
  { name: "Image", slug: 'image', icon: "Image" },
  { name: "Calculators", slug: 'calculators', icon: "Calculator" },
  { name: "Date & Time", slug: 'date-time', icon: "Clock" },
  { name: "Developer", slug: 'developer', icon: "Code2" },
  { name: "SEO", slug: 'seo', icon: "Search" },
  { name: "Color", slug: 'color', icon: "Palette" },
  { name: "Random Generators", slug: 'random-generators', icon: "Dices" },
  { name: "Social Media", slug: 'social-media', icon: "Share2" },
  { name: "File Conversion", slug: 'file-conversion', icon: "FileOutput" },
  { name: "Business", slug: 'business', icon: "Briefcase" },
  { name: "Educational", slug: 'educational', icon: "GraduationCap" },
  { name: "Finance", slug: 'finance', icon: "TrendingUp" },
  { name: "Utility", slug: 'utility', icon: "Wrench" },
];

export const TOOLS = [
  // ---- Text ----
  { name: "Word Counter", slug: "word-counter", category: "Text", description: "Count words, sentences, paragraphs and characters in any text instantly." },
  { name: "Word Unscrambler", slug: "word-unscrambler", category: "Text", description: "Instantly unscramble jumbled letters into valid words, perfect for word games, crosswords, anagrams, Wordle, and Scrabble." },
  { name: "Character Counter", slug: "character-counter", category: "Text", description: "Count characters with and without spaces in real time." },
  { name: "Letter Counter", slug: "letter-counter", category: "Text", description: "Count only the letters in your text, ignoring numbers and symbols." },
  { name: "Sentence Counter", slug: "sentence-counter", category: "Text", description: "Count the number of sentences in your text." },
  { name: "Reading Time Calculator", slug: "reading-time", category: "Text", description: "Estimate how long it takes to read a passage of text." },
  { name: "Case Converter", slug: "case-converter", category: "Text", description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase and more." },
  { name: "Remove Duplicate Lines", slug: "remove-duplicate-lines", category: "Text", description: "Remove duplicate lines from a list, keeping only unique entries." },
  { name: "Sort Lines Alphabetically", slug: "sort-lines", category: "Text", description: "Sort lines alphabetically, A–Z or Z–A, ascending or descending." },
  { name: "Reverse Text", slug: "reverse-text", category: "Text", description: "Reverse characters, words, or entire lines of text." },
  { name: "Random Text Generator", slug: "random-text-generator", category: "Text", description: "Generate random text strings of any length." },
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator", category: "Text", description: "Generate placeholder Lorem Ipsum paragraphs, sentences or words." },
  { name: "Slug Generator", slug: "slug-generator", category: "Text", description: "Create URL-friendly slugs from any title or heading." },
  { name: "URL Encoder/Decoder", slug: "url-encoder-decoder", category: "Text", description: "Encode or decode URLs and query parameters safely." },
  { name: "HTML Encoder/Decoder", slug: "html-encoder-decoder", category: "Text", description: "Encode text to HTML entities or decode entities back to text." },
  { name: "Base64 Encode/Decode", slug: "base64-encode-decode", category: "Text", description: "Encode text to Base64 or decode Base64 back to plain text." },
  { name: "JSON Formatter", slug: "json-formatter", category: "Text", description: "Beautify, minify and validate JSON with one click." },
  { name: "JSON Validator", slug: "json-validator", category: "Text", description: "Validate JSON syntax and pinpoint errors instantly." },
  { name: "XML Formatter", slug: "xml-formatter", category: "Text", description: "Beautify and minify XML documents." },
  { name: "XML Validator", slug: "xml-validator", category: "Text", description: "Check XML for well-formedness and syntax errors." },
  { name: "YAML Formatter", slug: "yaml-formatter", category: "Text", description: "Format and validate YAML configuration files." },
  { name: "CSV to JSON", slug: "csv-to-json", category: "Text", description: "Convert CSV data into structured JSON arrays." },
  { name: "JSON to CSV", slug: "json-to-csv", category: "Text", description: "Convert JSON arrays into flat CSV data." },
  { name: "Markdown Preview", slug: "markdown-preview", category: "Text", description: "Write Markdown and see a live rendered preview." },
  { name: "BBCode to HTML", slug: "bbcode-to-html", category: "Text", description: "Convert BBCode markup into clean HTML." },
  { name: "HTML to Markdown", slug: "html-to-markdown", category: "Text", description: "Convert HTML content into Markdown syntax." },
  { name: "HTML Minifier", slug: "html-minifier", category: "Text", description: "Minify HTML by removing whitespace and comments." },
  { name: "CSS Minifier", slug: "css-minifier", category: "Text", description: "Compress CSS by stripping unnecessary characters." },
  { name: "JS Minifier", slug: "js-minifier", category: "Text", description: "Minify JavaScript to reduce file size." },
  { name: "Beautify HTML/CSS/JS", slug: "beautify-code", category: "Text", description: "Format and beautify HTML, CSS, or JavaScript code." },

  // ---- Password & Security ----
  { name: "Password Generator", slug: "password-generator", category: "Password & Security", description: "Generate strong, random passwords with custom rules." },
  { name: "Strong Password Checker", slug: "password-checker", category: "Password & Security", description: "Evaluate password strength and find weaknesses." },
  { name: "Hash Generator", slug: "hash-generator", category: "Password & Security", description: "Generate SHA-1, SHA-256, SHA-512 and other hashes." },
  { name: "MD5 Generator", slug: "md5-generator", category: "Password & Security", description: "Generate MD5 hashes from any text input." },
  { name: "SHA1", slug: "sha1-generator", category: "Password & Security", description: "Compute SHA-1 hash values from text." },
  { name: "SHA256", slug: "sha256-generator", category: "Password & Security", description: "Compute SHA-256 hash values from text." },
  { name: "SHA512", slug: "sha512-generator", category: "Password & Security", description: "Compute SHA-512 hash values from text." },
  { name: "HMAC Generator", slug: "hmac-generator", category: "Password & Security", description: "Generate HMAC signatures with a secret key." },
  { name: "UUID Generator", slug: "uuid-generator", category: "Password & Security", description: "Generate random UUID v4 identifiers in bulk." },
  { name: "JWT Decoder", slug: "jwt-decoder", category: "Password & Security", description: "Decode JWT tokens and inspect header and payload." },
  { name: "JWT Generator", slug: "jwt-generator", category: "Password & Security", description: "Create signed JWT tokens from a payload." },
  { name: "QR Code Generator", slug: "qr-code-generator", category: "Password & Security", description: "Generate downloadable QR codes from any text or URL." },

  // ---- Image ----
  { name: "Image Compressor", slug: "image-compressor", category: "Image", description: "Compress images to reduce file size." },
  { name: "Resize Image", slug: "resize-image", category: "Image", description: "Resize images to custom dimensions." },
  { name: "Rotate Image", slug: "rotate-image", category: "Image", description: "Rotate images by any angle." },
  { name: "Convert JPG to PNG", slug: "jpg-to-png", category: "Image", description: "Convert JPG images to PNG format." },
  { name: "PNG to JPG", slug: "png-to-jpg", category: "Image", description: "Convert PNG images to JPG format." },
  { name: "WebP Converter", slug: "webp-converter", category: "Image", description: "Convert images to and from WebP format." },
  { name: "SVG Optimizer", slug: "svg-optimizer", category: "Image", description: "Optimize and minify SVG files." },
  { name: "Blur Image", slug: "blur-image", category: "Image", description: "Apply a blur effect to images." },
  { name: "Watermark Image", slug: "watermark-image", category: "Image", description: "Add a text watermark to images." },
  { name: "Color Picker", slug: "color-picker", category: "Image", description: "Pick colors and get HEX, RGB, and HSL values." },
  { name: "Color Palette Generator", slug: "color-palette-generator", category: "Image", description: "Generate harmonious color palettes." },
  { name: "Image to Base64", slug: "image-to-base64", category: "Image", description: "Convert images to Base64 data URIs." },

  // ---- Calculators ----
  { name: "BMI Calculator", slug: "bmi-calculator", category: "Calculators", description: "Calculate Body Mass Index from height and weight." },
  { name: "Loan Calculator", slug: "loan-calculator", category: "Calculators", description: "Estimate monthly loan payments." },
  { name: "Mortgage Calculator", slug: "mortgage-calculator", category: "Calculators", description: "Calculate mortgage payments and interest." },
  { name: "VAT Calculator", slug: "vat-calculator", category: "Calculators", description: "Add or remove VAT from a price." },
  { name: "Sales Tax Calculator", slug: "sales-tax-calculator", category: "Calculators", description: "Calculate sales tax on purchases." },
  { name: "Tip Calculator", slug: "tip-calculator", category: "Calculators", description: "Split bills and calculate tips." },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator", category: "Calculators", description: "Project compound interest growth over time." },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "Calculators", description: "Calculate percentages, increases, and decreases." },
  { name: "Discount Calculator", slug: "discount-calculator", category: "Calculators", description: "Find the final price after a discount." },
  { name: "Unit Converter", slug: "unit-converter", category: "Calculators", description: "Convert length, mass, temperature and more." },
  { name: "Fuel Cost Calculator", slug: "fuel-cost-calculator", category: "Calculators", description: "Estimate fuel costs for trips." },
  { name: "Age Calculator", slug: "age-calculator", category: "Calculators", description: "Calculate exact age from a birth date." },
  { name: "Pregnancy Calculator", slug: "pregnancy-calculator", category: "Calculators", description: "Estimate due date and pregnancy week." },
  { name: "Calorie Calculator", slug: "calorie-calculator", category: "Calculators", description: "Estimate daily calorie needs." },

  // ---- Date & Time ----
  { name: "Date Difference", slug: "date-difference", category: "Date & Time", description: "Calculate the difference between two dates." },
  { name: "Add Days", slug: "add-days", category: "Date & Time", description: "Add or subtract days from a date." },
  { name: "Business Days Calculator", slug: "business-days", category: "Date & Time", description: "Count working days between dates." },
  { name: "Week Number", slug: "week-number", category: "Date & Time", description: "Find the ISO week number of any date." },
  { name: "Unix Timestamp Converter", slug: "unix-timestamp-converter", category: "Date & Time", description: "Convert Unix timestamps to human dates and back." },
  { name: "Time Zone Converter", slug: "time-zone-converter", category: "Date & Time", description: "Convert times across world time zones." },
  { name: "Countdown Timer", slug: "countdown-timer", category: "Date & Time", description: "Count down to any date or event." },
  { name: "Stopwatch", slug: "stopwatch", category: "Date & Time", description: "A precise stopwatch with lap support." },
  { name: "Random Date Generator", slug: "random-date-generator", category: "Date & Time", description: "Generate random dates within a range." },

  // ---- Developer ----
  { name: "Regex Tester", slug: "regex-tester", category: "Developer", description: "Test and debug regular expressions with live matches." },
  { name: "Regex Generator", slug: "regex-generator", category: "Developer", description: "Generate regex from plain-English descriptions." },
  { name: "JSON Diff", slug: "json-diff", category: "Developer", description: "Compare two JSON objects and highlight differences." },
  { name: "Text Diff", slug: "text-diff", category: "Developer", description: "Compare two text blocks line by line." },
  { name: "Code Diff", slug: "code-diff", category: "Developer", description: "Diff code snippets with syntax awareness." },
  { name: "SQL Formatter", slug: "sql-formatter", category: "Developer", description: "Format and beautify SQL queries." },
  { name: "SQL Minifier", slug: "sql-minifier", category: "Developer", description: "Minify SQL queries into one line." },
  { name: "UUID Validator", slug: "uuid-validator", category: "Developer", description: "Validate UUIDs and detect their version." },
  { name: "Color Converter", slug: "color-converter", category: "Developer", description: "Convert between HEX, RGB, and HSL color formats." },
  { name: "HEX to RGB", slug: "hex-to-rgb", category: "Developer", description: "Convert HEX color codes to RGB values." },
  { name: "RGB to HEX", slug: "rgb-to-hex", category: "Developer", description: "Convert RGB values to HEX color codes." },
  { name: "RGB to HSL", slug: "rgb-to-hsl", category: "Developer", description: "Convert RGB values to HSL format." },
  { name: "CSS Gradient Generator", slug: "css-gradient-generator", category: "Developer", description: "Design CSS gradients with a visual editor." },
  { name: "Box Shadow Generator", slug: "box-shadow-generator", category: "Developer", description: "Create CSS box shadows visually." },
  { name: "Border Radius Generator", slug: "border-radius-generator", category: "Developer", description: "Generate CSS border-radius values visually." },
  { name: "User Agent Parser", slug: "user-agent-parser", category: "Developer", description: "Parse user agent strings into browser, OS, and device details." },

  // ---- SEO ----
  { name: "Meta Tag Generator", slug: "meta-tag-generator", category: "SEO", description: "Generate SEO meta tags for your pages." },
  { name: "Robots.txt Generator", slug: "robots-txt-generator", category: "SEO", description: "Create robots.txt rules for your site." },
  { name: "Sitemap Generator", slug: "sitemap-generator", category: "SEO", description: "Generate XML sitemaps for search engines." },
  { name: "OpenGraph Preview", slug: "opengraph-preview", category: "SEO", description: "Preview how your page looks when shared." },
  { name: "Twitter Card Preview", slug: "twitter-card-preview", category: "SEO", description: "Preview Twitter card metadata." },
  { name: "Keyword Density Checker", slug: "keyword-density-checker", category: "SEO", description: "Analyze keyword density in content." },
  { name: "SERP Snippet Preview", slug: "serp-snippet-preview", category: "SEO", description: "Preview your Google search result snippet." },
  { name: "URL Parser", slug: "url-parser", category: "SEO", description: "Break down URLs into their components." },

  // ---- Color ----
  { name: "Contrast Checker", slug: "contrast-checker", category: "Color", description: "Check color contrast for WCAG accessibility." },
  { name: "Accessibility Checker", slug: "accessibility-checker", category: "Color", description: "Audit color combinations for accessibility." },
  { name: "Color Blindness Simulator", slug: "color-blindness-simulator", category: "Color", description: "Simulate how colors appear with color blindness." },
  { name: "Tailwind Color Generator", slug: "tailwind-color-generator", category: "Color", description: "Generate Tailwind CSS color shades." },
  { name: "Gradient Generator", slug: "gradient-generator", category: "Color", description: "Build beautiful CSS gradients." },

  // ---- Random Generators ----
  { name: "Random Name Generator", slug: "random-name-generator", category: "Random Generators", description: "Generate random first and last names." },
  { name: "Random Number Generator", slug: "random-number-generator", category: "Random Generators", description: "Generate random numbers within a range." },
  { name: "Random Password", slug: "random-password", category: "Random Generators", description: "Generate random secure passwords." },
  { name: "Random Color", slug: "random-color", category: "Random Generators", description: "Generate random colors with codes." },
  { name: "Random Emoji", slug: "random-emoji", category: "Random Generators", description: "Pick a random emoji." },
  { name: "Random Country", slug: "random-country", category: "Random Generators", description: "Get a random country from around the world." },
  { name: "Random Address", slug: "random-address", category: "Random Generators", description: "Generate random fake addresses." },
  { name: "Fake User Generator", slug: "fake-user-generator", category: "Random Generators", description: "Generate fake user profiles for testing." },
  { name: "Dice Roller", slug: "dice-roller", category: "Random Generators", description: "Roll dice with custom sides and count." },
  { name: "Coin Flip", slug: "coin-flip", category: "Random Generators", description: "Flip a virtual coin for heads or tails." },
  { name: "UUID Generator", slug: "uuid-generator-random", category: "Random Generators", description: "Generate random UUIDs for any use." },
  { name: "Magic 8 Ball", slug: "magic-8-ball", category: "Random Generators", description: "Ask any yes-or-no question and get a fun, random answer, just like the classic fortune-telling toy." },
  { name: "Yes/No Decision Maker", slug: "yes-no-decision-maker", category: "Random Generators", description: "Get a quick, random \"Yes\" or \"No\" answer to help with simple decisions when you're feeling undecided." },
  { name: "Random Playing Card", slug: "random-playing-card", category: "Random Generators", description: "Draw a random playing card from a standard 52-card deck instantly." },
  { name: "Random Quote Generator", slug: "random-quote-generator", category: "Random Generators", description: "Discover inspiring, motivational, and thought-provoking quotes at random." },
  { name: "Random Joke Generator", slug: "random-joke-generator", category: "Random Generators", description: "Get a random joke instantly to brighten your day." },
  { name: "Wheel Spinner / Random Picker", slug: "wheel-spinner-random-picker", category: "Random Generators", description: "Make random selections with a fun spinning wheel." },
  { name: "Lottery Number Generator", slug: "lottery-number-generator", category: "Random Generators", description: "Generate random lottery numbers instantly for games, draws, or fun experiments." },

  // ---- Social Media ----
  { name: "YouTube Thumbnail Downloader", slug: "youtube-thumbnail-downloader", category: "Social Media", description: "Download YouTube video thumbnails." },
  { name: "Instagram Caption Formatter", slug: "instagram-caption-formatter", category: "Social Media", description: "Format captions with line breaks and spacing." },
  { name: "Hashtag Generator", slug: "hashtag-generator", category: "Social Media", description: "Generate hashtags from keywords." },
  { name: "Tweet Character Counter", slug: "tweet-character-counter", category: "Social Media", description: "Count characters for tweets." },
  { name: "Emoji Search", slug: "emoji-search", category: "Social Media", description: "Search and copy emojis." },

  // ---- File Conversion ----
  { name: "JPG → PNG", slug: "jpg-to-png-convert", category: "File Conversion", description: "Convert JPG files to PNG." },
  { name: "PNG → WebP", slug: "png-to-webp", category: "File Conversion", description: "Convert PNG files to WebP." },
  { name: "WebP → JPG", slug: "webp-to-jpg", category: "File Conversion", description: "Convert WebP files to JPG." },
  { name: "XML → JSON", slug: "xml-to-json", category: "File Conversion", description: "Convert XML data to JSON." },

  // ---- Business ----
  { name: "QR Menu Generator", slug: "qr-menu-generator", category: "Business", description: "Create QR-code restaurant menus." },
  { name: "Business Name Generator", slug: "business-name-generator", category: "Business", description: "Generate creative business name ideas." },

  // ---- Educational ----
  { name: "GPA Calculator", slug: "gpa-calculator", category: "Educational", description: "Calculate grade point average." },
  { name: "Grade Calculator", slug: "grade-calculator", category: "Educational", description: "Calculate final grades from assignments." },
  { name: "Scientific Calculator", slug: "scientific-calculator", category: "Educational", description: "Advanced scientific calculations." },
  { name: "Roman Numeral Converter", slug: "roman-numeral-converter", category: "Educational", description: "Convert between numbers and Roman numerals." },
  { name: "Number to Words", slug: "number-to-words", category: "Educational", description: "Convert numbers into written words." },
  { name: "Words to Number", slug: "words-to-number", category: "Educational", description: "Convert written numbers into digits." },
  { name: "Multiplication Table Generator", slug: "multiplication-table-generator", category: "Educational", description: "Generate multiplication tables for any number." },
  { name: "Prime Number Checker", slug: "prime-number-checker", category: "Educational", description: "Check whether a number is prime." },
  { name: "Fibonacci Sequence Generator", slug: "fibonacci-sequence-generator", category: "Educational", description: "Generate the Fibonacci sequence up to any length or limit." },
  { name: "Factorial Calculator", slug: "factorial-calculator", category: "Educational", description: "Calculate the factorial of any non-negative integer." },
  { name: "GCD / LCM Calculator", slug: "gcd-lcm-calculator", category: "Educational", description: "Find the greatest common divisor (GCD) and least common multiple (LCM) of two or more numbers." },
  { name: "Quadratic Equation Solver", slug: "quadratic-equation-solver", category: "Educational", description: "Solve quadratic equations instantly and find real or complex roots with ease." },
  { name: "Typing Speed Test", slug: "typing-speed-test", category: "Educational", description: "Test your typing speed and accuracy in real time." },

  // ---- Finance ----
  { name: "Crypto Profit Calculator", slug: "crypto-profit-calculator", category: "Finance", description: "Calculate crypto trading profits." },
  { name: "Investment Calculator", slug: "investment-calculator", category: "Finance", description: "Project investment returns." },
  { name: "Retirement Calculator", slug: "retirement-calculator", category: "Finance", description: "Plan retirement savings goals." },
  { name: "Inflation Calculator", slug: "inflation-calculator", category: "Finance", description: "Adjust prices for inflation." },
  { name: "Savings Calculator", slug: "savings-calculator", category: "Finance", description: "Calculate savings growth over time." },

  // ---- Utility ----
  { name: "QR Code Generator (Utility)", slug: "qr-code-generator-utility", category: "Utility", description: "Generate QR codes for any data." },
  { name: "Clipboard History", slug: "clipboard-history", category: "Utility", description: "Track your clipboard history." },
  { name: "Text Compare", slug: "text-compare", category: "Utility", description: "Compare two blocks of text." },
];

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolsByCategory(category) {
  return TOOLS.filter((t) => t.category === category);
}
