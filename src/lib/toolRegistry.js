// Maps tool slugs to their functional React components.
// Tools not listed here render a "Coming Soon" placeholder.
import WordCounter from "@/components/tools/WordCounter";
import WordUnscrambler from "@/components/tools/WordUnscrambler";
import CharacterCounter from "@/components/tools/CharacterCounter";
import LetterCounter from "@/components/tools/LetterCounter";
import SentenceCounter from "@/components/tools/SentenceCounter";
import ReadingTime from "@/components/tools/ReadingTime";
import CaseConverter from "@/components/tools/CaseConverter";
import RemoveDuplicateLines from "@/components/tools/RemoveDuplicateLines";
import SortLines from "@/components/tools/SortLines";
import ReverseText from "@/components/tools/ReverseText";
import LoremIpsum from "@/components/tools/LoremIpsum";
import SlugGenerator from "@/components/tools/SlugGenerator";
import UrlEncoder from "@/components/tools/UrlEncoder";
import HtmlEncoder from "@/components/tools/HtmlEncoder";
import Base64Tool from "@/components/tools/Base64Tool";
import JsonFormatter from "@/components/tools/JsonFormatter";
import JsonValidator from "@/components/tools/JsonValidator";
import MarkdownPreview from "@/components/tools/MarkdownPreview";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import PasswordChecker from "@/components/tools/PasswordChecker";
import HashGenerator from "@/components/tools/HashGenerator";
import UuidGenerator from "@/components/tools/UuidGenerator";
import JwtDecoder from "@/components/tools/JwtDecoder";
import BmiCalculator from "@/components/tools/BmiCalculator";
import TipCalculator from "@/components/tools/TipCalculator";
import CompoundInterest from "@/components/tools/CompoundInterest";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import AgeCalculator from "@/components/tools/AgeCalculator";
import DateDifference from "@/components/tools/DateDifference";
import UnixTimestamp from "@/components/tools/UnixTimestamp";
import CountdownTimer from "@/components/tools/CountdownTimer";
import Stopwatch from "@/components/tools/Stopwatch";
import RegexTester from "@/components/tools/RegexTester";
import UuidValidator from "@/components/tools/UuidValidator";
import ColorConverter from "@/components/tools/ColorConverter";
import ColorPicker from "@/components/tools/ColorPicker";
import CssGradient from "@/components/tools/CssGradient";
import BoxShadow from "@/components/tools/BoxShadow";
import BorderRadius from "@/components/tools/BorderRadius";
import ContrastChecker from "@/components/tools/ContrastChecker";
import RandomNumber from "@/components/tools/RandomNumber";
import CoinFlip from "@/components/tools/CoinFlip";
import DiceRoller from "@/components/tools/DiceRoller";
import RomanNumeral from "@/components/tools/RomanNumeral";
import NumberToWords from "@/components/tools/NumberToWords";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";

// Batch 2: Text tools
import RandomTextGenerator from "@/components/tools/RandomTextGenerator";
import XmlFormatter from "@/components/tools/XmlFormatter";
import XmlValidator from "@/components/tools/XmlValidator";
import CsvToJson from "@/components/tools/CsvToJson";
import JsonToCsv from "@/components/tools/JsonToCsv";
import HtmlMinifier from "@/components/tools/HtmlMinifier";
import CssMinifier from "@/components/tools/CssMinifier";
import BbcodeToHtml from "@/components/tools/BbcodeToHtml";
import HtmlToMarkdown from "@/components/tools/HtmlToMarkdown";
import JsMinifier from "@/components/tools/JsMinifier";
import BeautifyCode from "@/components/tools/BeautifyCode";
import YamlFormatter from "@/components/tools/YamlFormatter";

// Batch 3: Security tools
import Md5Generator from "@/components/tools/Md5Generator";
import Sha1Generator from "@/components/tools/Sha1Generator";
import Sha256Generator from "@/components/tools/Sha256Generator";
import Sha512Generator from "@/components/tools/Sha512Generator";
import HmacGenerator from "@/components/tools/HmacGenerator";
import JwtGenerator from "@/components/tools/JwtGenerator";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";

// Batch 4: Image tools
import ImageCompressor from "@/components/tools/ImageCompressor";
import ResizeImage from "@/components/tools/ResizeImage";
import ImageToBase64 from "@/components/tools/ImageToBase64";
import ImageConverter from "@/components/tools/ImageConverter";
import JpgToPng from "@/components/tools/JpgToPng";
import PngToJpg from "@/components/tools/PngToJpg";
import WebpConverter from "@/components/tools/WebpConverter";
import BlurImage from "@/components/tools/BlurImage";
import WatermarkImage from "@/components/tools/WatermarkImage";
import RotateImage from "@/components/tools/RotateImage";
import SvgOptimizer from "@/components/tools/SvgOptimizer";
import ColorPaletteGenerator from "@/components/tools/ColorPaletteGenerator";

// Batch 5: Calculators
import LoanCalculator from "@/components/tools/LoanCalculator";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import VatCalculator from "@/components/tools/VatCalculator";
import SalesTaxCalculator from "@/components/tools/SalesTaxCalculator";
import DiscountCalculator from "@/components/tools/DiscountCalculator";
import UnitConverter from "@/components/tools/UnitConverter";
import FuelCostCalculator from "@/components/tools/FuelCostCalculator";
import PregnancyCalculator from "@/components/tools/PregnancyCalculator";
import CalorieCalculator from "@/components/tools/CalorieCalculator";

// Batch 6: Date & Time
import AddDays from "@/components/tools/AddDays";
import BusinessDays from "@/components/tools/BusinessDays";
import WeekNumber from "@/components/tools/WeekNumber";
import TimeZoneConverter from "@/components/tools/TimeZoneConverter";
import RandomDateGenerator from "@/components/tools/RandomDateGenerator";

// Batch 7: Developer tools
import RegexGenerator from "@/components/tools/RegexGenerator";
import TextDiff from "@/components/tools/TextDiff";
import JsonDiff from "@/components/tools/JsonDiff";
import CodeDiff from "@/components/tools/CodeDiff";
import SqlFormatter from "@/components/tools/SqlFormatter";
import SqlMinifier from "@/components/tools/SqlMinifier";
import HexToRgb from "@/components/tools/HexToRgb";
import RgbToHex from "@/components/tools/RgbToHex";
import RgbToHsl from "@/components/tools/RgbToHsl";
import GradientGenerator from "@/components/tools/GradientGenerator";
import AccessibilityChecker from "@/components/tools/AccessibilityChecker";

// Batch 8: SEO tools
import RobotsTxtGenerator from "@/components/tools/RobotsTxtGenerator";
import SitemapGenerator from "@/components/tools/SitemapGenerator";
import OpenGraphPreview from "@/components/tools/OpenGraphPreview";
import TwitterCardPreview from "@/components/tools/TwitterCardPreview";
import KeywordDensityChecker from "@/components/tools/KeywordDensityChecker";
import SerpSnippetPreview from "@/components/tools/SerpSnippetPreview";
import UrlParser from "@/components/tools/UrlParser";

// Batch 9: Domain & Website
import UserAgentParser from "@/components/tools/UserAgentParser";

// Batch 10: Color tools
import ColorBlindnessSimulator from "@/components/tools/ColorBlindnessSimulator";
import TailwindColorGenerator from "@/components/tools/TailwindColorGenerator";

// Batch 11: Random generators
import RandomNameGenerator from "@/components/tools/RandomNameGenerator";
import RandomPassword from "@/components/tools/RandomPassword";
import RandomColor from "@/components/tools/RandomColor";
import RandomEmoji from "@/components/tools/RandomEmoji";
import RandomCountry from "@/components/tools/RandomCountry";
import RandomAddress from "@/components/tools/RandomAddress";
import FakeUserGenerator from "@/components/tools/FakeUserGenerator";
import UuidGeneratorRandom from "@/components/tools/UuidGeneratorRandom";
import Magic8Ball from '@/components/tools/Magic8Ball'
import YesNoDecisionMaker from '@/components/tools/YesNoDecisionMaker'
import RandomPlayingCard from '@/components/tools/RandomPlayingCard'
import RandomQuoteGenerator from '@/components/tools/RandomQuoteGenerator'
import RandomJokeGenerator from '@/components/tools/RandomJokeGenerator'
import WheelSpinnerRandomPicker from '@/components/tools/WheelSpinnerRandomPicker'
import LotteryNumberGenerator from '@/components/tools/LotteryNumberGenerator'

// Batch 12: Social media
import YoutubeThumbnailDownloader from "@/components/tools/YoutubeThumbnailDownloader";
import InstagramCaptionFormatter from "@/components/tools/InstagramCaptionFormatter";
import HashtagGenerator from "@/components/tools/HashtagGenerator";
import TweetCharacterCounter from "@/components/tools/TweetCharacterCounter";
import EmojiSearch from "@/components/tools/EmojiSearch";

// Batch 13: File conversion
import JpgToPngConvert from "@/components/tools/JpgToPngConvert";
import PngToWebp from "@/components/tools/PngToWebp";
import WebpToJpg from "@/components/tools/WebpToJpg";
import XmlToJson from "@/components/tools/XmlToJson";

// Batch 14: Business
import BusinessNameGenerator from "@/components/tools/BusinessNameGenerator";
import QrMenuGenerator from "@/components/tools/QrMenuGenerator";

// Batch 15: Educational
import GpaCalculator from "@/components/tools/GpaCalculator";
import GradeCalculator from "@/components/tools/GradeCalculator";
import ScientificCalculator from "@/components/tools/ScientificCalculator";
import WordsToNumber from "@/components/tools/WordsToNumber";

// Batch 16: Finance
import CryptoProfitCalculator from "@/components/tools/CryptoProfitCalculator";
import InvestmentCalculator from "@/components/tools/InvestmentCalculator";
import RetirementCalculator from "@/components/tools/RetirementCalculator";
import InflationCalculator from "@/components/tools/InflationCalculator";
import SavingsCalculator from "@/components/tools/SavingsCalculator";

// Batch 17: Utility
import QrCodeGeneratorUtility from "@/components/tools/QrCodeGeneratorUtility";
import ClipboardHistory from "@/components/tools/ClipboardHistory";
import TextCompare from "@/components/tools/TextCompare";

export const TOOL_COMPONENTS = {
  // Original 45
  "word-counter": WordCounter,
  "word-unscrambler": WordUnscrambler,
  "character-counter": CharacterCounter,
  "letter-counter": LetterCounter,
  "sentence-counter": SentenceCounter,
  "reading-time": ReadingTime,
  "case-converter": CaseConverter,
  "remove-duplicate-lines": RemoveDuplicateLines,
  "sort-lines": SortLines,
  "reverse-text": ReverseText,
  "lorem-ipsum-generator": LoremIpsum,
  "slug-generator": SlugGenerator,
  "url-encoder-decoder": UrlEncoder,
  "html-encoder-decoder": HtmlEncoder,
  "base64-encode-decode": Base64Tool,
  "json-formatter": JsonFormatter,
  "json-validator": JsonValidator,
  "markdown-preview": MarkdownPreview,
  "password-generator": PasswordGenerator,
  "password-checker": PasswordChecker,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "jwt-decoder": JwtDecoder,
  "bmi-calculator": BmiCalculator,
  "tip-calculator": TipCalculator,
  "compound-interest-calculator": CompoundInterest,
  "percentage-calculator": PercentageCalculator,
  "age-calculator": AgeCalculator,
  "date-difference": DateDifference,
  "unix-timestamp-converter": UnixTimestamp,
  "countdown-timer": CountdownTimer,
  "stopwatch": Stopwatch,
  "regex-tester": RegexTester,
  "uuid-validator": UuidValidator,
  "color-converter": ColorConverter,
  "color-picker": ColorPicker,
  "css-gradient-generator": CssGradient,
  "box-shadow-generator": BoxShadow,
  "border-radius-generator": BorderRadius,
  "contrast-checker": ContrastChecker,
  "random-number-generator": RandomNumber,
  "coin-flip": CoinFlip,
  "dice-roller": DiceRoller,
  "roman-numeral-converter": RomanNumeral,
  "number-to-words": NumberToWords,
  "meta-tag-generator": MetaTagGenerator,

  // Text tools
  "random-text-generator": RandomTextGenerator,
  "xml-formatter": XmlFormatter,
  "xml-validator": XmlValidator,
  "yaml-formatter": YamlFormatter,
  "csv-to-json": CsvToJson,
  "json-to-csv": JsonToCsv,
  "bbcode-to-html": BbcodeToHtml,
  "html-to-markdown": HtmlToMarkdown,
  "html-minifier": HtmlMinifier,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "beautify-code": BeautifyCode,

  // Security
  "md5-generator": Md5Generator,
  "sha1-generator": Sha1Generator,
  "sha256-generator": Sha256Generator,
  "sha512-generator": Sha512Generator,
  "hmac-generator": HmacGenerator,
  "jwt-generator": JwtGenerator,
  "qr-code-generator": QrCodeGenerator,

  // Image
  "image-compressor": ImageCompressor,
  "resize-image": ResizeImage,
  "image-to-base64": ImageToBase64,
  "jpg-to-png": JpgToPng,
  "png-to-jpg": PngToJpg,
  "webp-converter": WebpConverter,
  "blur-image": BlurImage,
  "watermark-image": WatermarkImage,
  "rotate-image": RotateImage,
  "svg-optimizer": SvgOptimizer,
  "color-palette-generator": ColorPaletteGenerator,

  // Calculators
  "loan-calculator": LoanCalculator,
  "mortgage-calculator": MortgageCalculator,
  "vat-calculator": VatCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "discount-calculator": DiscountCalculator,
  "unit-converter": UnitConverter,
  "fuel-cost-calculator": FuelCostCalculator,
  "pregnancy-calculator": PregnancyCalculator,
  "calorie-calculator": CalorieCalculator,

  // Date & Time
  "add-days": AddDays,
  "business-days": BusinessDays,
  "week-number": WeekNumber,
  "time-zone-converter": TimeZoneConverter,
  "random-date-generator": RandomDateGenerator,

  // Developer
  "regex-generator": RegexGenerator,
  "json-diff": JsonDiff,
  "text-diff": TextDiff,
  "code-diff": CodeDiff,
  "sql-formatter": SqlFormatter,
  "sql-minifier": SqlMinifier,
  "hex-to-rgb": HexToRgb,
  "rgb-to-hex": RgbToHex,
  "rgb-to-hsl": RgbToHsl,
  "gradient-generator": GradientGenerator,
  "accessibility-checker": AccessibilityChecker,

  // SEO
  "robots-txt-generator": RobotsTxtGenerator,
  "sitemap-generator": SitemapGenerator,
  "opengraph-preview": OpenGraphPreview,
  "twitter-card-preview": TwitterCardPreview,
  "keyword-density-checker": KeywordDensityChecker,
  "serp-snippet-preview": SerpSnippetPreview,
  "url-parser": UrlParser,

  // Domain & Website
  "user-agent-parser": UserAgentParser,

  // Color
  "color-blindness-simulator": ColorBlindnessSimulator,
  "tailwind-color-generator": TailwindColorGenerator,

  // Random generators
  "random-name-generator": RandomNameGenerator,
  "random-password": RandomPassword,
  "random-color": RandomColor,
  "random-emoji": RandomEmoji,
  "random-country": RandomCountry,
  "random-address": RandomAddress,
  "fake-user-generator": FakeUserGenerator,
  "uuid-generator-random": UuidGeneratorRandom,
  "magic-8-ball": Magic8Ball,
  "yes-no-decision-maker": YesNoDecisionMaker,
  "random-playing-card": RandomPlayingCard,
  "random-quote-generator": RandomQuoteGenerator,
  "random-joke-generator": RandomJokeGenerator,
  "wheel-spinner-random-picker": WheelSpinnerRandomPicker,
  "lottery-number-generator": LotteryNumberGenerator,

  // Social media
  "youtube-thumbnail-downloader": YoutubeThumbnailDownloader,
  "instagram-caption-formatter": InstagramCaptionFormatter,
  "hashtag-generator": HashtagGenerator,
  "tweet-character-counter": TweetCharacterCounter,
  "emoji-search": EmojiSearch,

  // File conversion
  "jpg-to-png-convert": JpgToPngConvert,
  "png-to-webp": PngToWebp,
  "webp-to-jpg": WebpToJpg,
  "xml-to-json": XmlToJson,

  // Business
  "business-name-generator": BusinessNameGenerator,
  "qr-menu-generator": QrMenuGenerator,

  // Educational
  "gpa-calculator": GpaCalculator,
  "grade-calculator": GradeCalculator,
  "scientific-calculator": ScientificCalculator,
  "words-to-number": WordsToNumber,

  // Finance
  "crypto-profit-calculator": CryptoProfitCalculator,
  "investment-calculator": InvestmentCalculator,
  "retirement-calculator": RetirementCalculator,
  "inflation-calculator": InflationCalculator,
  "savings-calculator": SavingsCalculator,

  // Utility
  "qr-code-generator-utility": QrCodeGeneratorUtility,
  "clipboard-history": ClipboardHistory,
  "text-compare": TextCompare,
}
