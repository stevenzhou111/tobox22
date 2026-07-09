import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const JsonFormatter = lazy(() => import('./pages/JsonFormatter'))
const Base64Tool = lazy(() => import('./pages/Base64Tool'))
const UrlEncoder = lazy(() => import('./pages/UrlEncoder'))
const TimestampTool = lazy(() => import('./pages/TimestampTool'))
const ColorConverter = lazy(() => import('./pages/ColorConverter'))
const TextDiff = lazy(() => import('./pages/TextDiff'))
const RegexTester = lazy(() => import('./pages/RegexTester'))
const PasswordGen = lazy(() => import('./pages/PasswordGen'))
const WordCount = lazy(() => import('./pages/WordCount'))
const CaseConverter = lazy(() => import('./pages/CaseConverter'))
const TextReverse = lazy(() => import('./pages/TextReverse'))
const RemoveEmptyLines = lazy(() => import('./pages/RemoveEmptyLines'))
const TextReplace = lazy(() => import('./pages/TextReplace'))
const NumberBase = lazy(() => import('./pages/NumberBase'))
const RandomNumber = lazy(() => import('./pages/RandomNumber'))
const HashGenerator = lazy(() => import('./pages/HashGenerator'))
const QRCode = lazy(() => import('./pages/QRCode'))
const MarkdownPreview = lazy(() => import('./pages/MarkdownPreview'))
const UnitConverter = lazy(() => import('./pages/UnitConverter'))
const TextExtract = lazy(() => import('./pages/TextExtract'))
const WordFrequency = lazy(() => import('./pages/WordFrequency'))
const UnicodeConverter = lazy(() => import('./pages/UnicodeConverter'))
const MorseCode = lazy(() => import('./pages/MorseCode'))
const RomanNumeral = lazy(() => import('./pages/RomanNumeral'))
const Pomodoro = lazy(() => import('./pages/Pomodoro'))
const CoinFlip = lazy(() => import('./pages/CoinFlip'))
const JWTParser = lazy(() => import('./pages/JWTParser'))
const ImageCompress = lazy(() => import('./pages/ImageCompress'))
const ImageBase64 = lazy(() => import('./pages/ImageBase64'))
const DrawingBoard = lazy(() => import('./pages/DrawingBoard'))
const CSVJSON = lazy(() => import('./pages/CSVJSON'))
const ColorPicker = lazy(() => import('./pages/ColorPicker'))
const BarChart = lazy(() => import('./pages/BarChart'))
const PieChart = lazy(() => import('./pages/PieChart'))
const LineChart = lazy(() => import('./pages/LineChart'))
const ImageResize = lazy(() => import('./pages/ImageResize'))
const ImageFilter = lazy(() => import('./pages/ImageFilter'))
const TextSplit = lazy(() => import('./pages/TextSplit'))
const TextToBinary = lazy(() => import('./pages/TextToBinary'))
const TextToHex = lazy(() => import('./pages/TextToHex'))
const TextToAscii = lazy(() => import('./pages/TextToAscii'))
const NumberConvert = lazy(() => import('./pages/NumberConvert'))
const PasswordStrength = lazy(() => import('./pages/PasswordStrength'))
const TextStatistics = lazy(() => import('./pages/TextStatistics'))
const JsonConverter = lazy(() => import('./pages/JsonConverter'))
const TextEncrypt = lazy(() => import('./pages/TextEncrypt'))
const JsonYaml = lazy(() => import('./pages/JsonYaml'))
const CsvViewer = lazy(() => import('./pages/CsvViewer'))
const JsonToTable = lazy(() => import('./pages/JsonToTable'))
const ExcelPreview = lazy(() => import('./pages/ExcelPreview'))
const XmlConverter = lazy(() => import('./pages/XmlConverter'))
const LoremIpsum = lazy(() => import('./pages/LoremIpsum'))
const Calculator = lazy(() => import('./pages/Calculator'))
const PercentageCalc = lazy(() => import('./pages/PercentageCalc'))
const TipCalculator = lazy(() => import('./pages/TipCalculator'))
const BmiCalculator = lazy(() => import('./pages/BmiCalculator'))
const AgeCalculator = lazy(() => import('./pages/AgeCalculator'))
const LoanCalculator = lazy(() => import('./pages/LoanCalculator'))
const UuidGenerator = lazy(() => import('./pages/UuidGenerator'))
const RandomString = lazy(() => import('./pages/RandomString'))
const HtmlEncoder = lazy(() => import('./pages/HtmlEncoder'))
const ColorPalette = lazy(() => import('./pages/ColorPalette'))
const FibonacciGenerator = lazy(() => import('./pages/FibonacciGenerator'))
const PrimeChecker = lazy(() => import('./pages/PrimeChecker'))
const GcdLcm = lazy(() => import('./pages/GcdLcm'))
const Factorial = lazy(() => import('./pages/Factorial'))
const TextSlug = lazy(() => import('./pages/TextSlug'))
const TextSort = lazy(() => import('./pages/TextSort'))
const GradientGenerator = lazy(() => import('./pages/GradientGenerator'))
const ShadowGenerator = lazy(() => import('./pages/ShadowGenerator'))
const RegexGenerator = lazy(() => import('./pages/RegexGenerator'))
const NumberToWords = lazy(() => import('./pages/NumberToWords'))
const TextWrap = lazy(() => import('./pages/TextWrap'))
const TextLineNumbers = lazy(() => import('./pages/TextLineNumbers'))
const MarkdownHtml = lazy(() => import('./pages/MarkdownHtml'))
const Base32 = lazy(() => import('./pages/Base32'))
const Rot13 = lazy(() => import('./pages/Rot13'))
const Atbash = lazy(() => import('./pages/Atbash'))
const ImageInfo = lazy(() => import('./pages/ImageInfo'))
const CsvToTable = lazy(() => import('./pages/CsvToTable'))
const JsonToYamlTool = lazy(() => import('./pages/JsonToYamlTool'))
const SoftwareDownloads = lazy(() => import('./pages/SoftwareDownloads'))
const HexColor = lazy(() => import('./pages/HexColor'))
const NumberConverter = lazy(() => import('./pages/NumberConverter'))
const TextCounter = lazy(() => import('./pages/TextCounter'))
const TextTransformer = lazy(() => import('./pages/TextTransformer'))
const TextDifference = lazy(() => import('./pages/TextDifference'))
const CronExpression = lazy(() => import('./pages/CronExpression'))
const NumberWords = lazy(() => import('./pages/NumberWords'))
const Base64Image = lazy(() => import('./pages/Base64Image'))
const TextCounterAdvanced = lazy(() => import('./pages/TextCounterAdvanced'))

function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-[#909399]">Loading...</div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/json" element={<JsonFormatter />} />
          <Route path="/base64" element={<Base64Tool />} />
          <Route path="/url" element={<UrlEncoder />} />
          <Route path="/timestamp" element={<TimestampTool />} />
          <Route path="/color" element={<ColorConverter />} />
          <Route path="/diff" element={<TextDiff />} />
          <Route path="/regex" element={<RegexTester />} />
          <Route path="/password" element={<PasswordGen />} />
          <Route path="/wordcount" element={<WordCount />} />
          <Route path="/case" element={<CaseConverter />} />
          <Route path="/textreverse" element={<TextReverse />} />
          <Route path="/removeempty" element={<RemoveEmptyLines />} />
          <Route path="/textreplace" element={<TextReplace />} />
          <Route path="/numberbase" element={<NumberBase />} />
          <Route path="/random" element={<RandomNumber />} />
          <Route path="/hash" element={<HashGenerator />} />
          <Route path="/qrcode" element={<QRCode />} />
          <Route path="/markdown" element={<MarkdownPreview />} />
          <Route path="/unit" element={<UnitConverter />} />
          <Route path="/extract" element={<TextExtract />} />
          <Route path="/wordfreq" element={<WordFrequency />} />
          <Route path="/unicode" element={<UnicodeConverter />} />
          <Route path="/morse" element={<MorseCode />} />
          <Route path="/roman" element={<RomanNumeral />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/coin" element={<CoinFlip />} />
          <Route path="/jwt" element={<JWTParser />} />
          <Route path="/imgcompress" element={<ImageCompress />} />
          <Route path="/imgbase64" element={<ImageBase64 />} />
          <Route path="/drawboard" element={<DrawingBoard />} />
          <Route path="/csvjson" element={<CSVJSON />} />
          <Route path="/colorpicker" element={<ColorPicker />} />
          <Route path="/barchart" element={<BarChart />} />
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/linechart" element={<LineChart />} />
          <Route path="/imgresize" element={<ImageResize />} />
          <Route path="/imgfilter" element={<ImageFilter />} />
          <Route path="/textsplit" element={<TextSplit />} />
          <Route path="/textbinary" element={<TextToBinary />} />
          <Route path="/texthex" element={<TextToHex />} />
          <Route path="/textascii" element={<TextToAscii />} />
          <Route path="/numconvert" element={<NumberConvert />} />
          <Route path="/passwordstrength" element={<PasswordStrength />} />
          <Route path="/textstats" element={<TextStatistics />} />
          <Route path="/jsonconvert" element={<JsonConverter />} />
          <Route path="/textencrypt" element={<TextEncrypt />} />
          <Route path="/jsonyaml" element={<JsonYaml />} />
          <Route path="/csvviewer" element={<CsvViewer />} />
          <Route path="/jsontotable" element={<JsonToTable />} />
          <Route path="/excelpreview" element={<ExcelPreview />} />
          <Route path="/xmlconvert" element={<XmlConverter />} />
          <Route path="/lorem" element={<LoremIpsum />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/percentage" element={<PercentageCalc />} />
          <Route path="/tip" element={<TipCalculator />} />
          <Route path="/bmi" element={<BmiCalculator />} />
          <Route path="/age" element={<AgeCalculator />} />
          <Route path="/loan" element={<LoanCalculator />} />
          <Route path="/uuid" element={<UuidGenerator />} />
          <Route path="/randomstr" element={<RandomString />} />
          <Route path="/htmlencode" element={<HtmlEncoder />} />
          <Route path="/palette" element={<ColorPalette />} />
          <Route path="/fibonacci" element={<FibonacciGenerator />} />
          <Route path="/prime" element={<PrimeChecker />} />
          <Route path="/gcdlcm" element={<GcdLcm />} />
          <Route path="/factorial" element={<Factorial />} />
          <Route path="/slug" element={<TextSlug />} />
          <Route path="/textsort" element={<TextSort />} />
          <Route path="/gradient" element={<GradientGenerator />} />
          <Route path="/shadow" element={<ShadowGenerator />} />
          <Route path="/regextool" element={<RegexGenerator />} />
          <Route path="/numwords" element={<NumberToWords />} />
          <Route path="/textwrap" element={<TextWrap />} />
          <Route path="/linenumbers" element={<TextLineNumbers />} />
          <Route path="/mdhtml" element={<MarkdownHtml />} />
          <Route path="/base32" element={<Base32 />} />
          <Route path="/rot13" element={<Rot13 />} />
          <Route path="/atbash" element={<Atbash />} />
          <Route path="/imginfo" element={<ImageInfo />} />
          <Route path="/csvtable" element={<CsvToTable />} />
          <Route path="/json2yaml" element={<JsonToYamlTool />} />
          <Route path="/software" element={<SoftwareDownloads />} />
          <Route path="/hexcolor" element={<HexColor />} />
          <Route path="/numconv2" element={<NumberConverter />} />
          <Route path="/textcounter" element={<TextCounter />} />
          <Route path="/texttransform" element={<TextTransformer />} />
          <Route path="/textdiff2" element={<TextDifference />} />
          <Route path="/cron" element={<CronExpression />} />
          <Route path="/numwords2" element={<NumberWords />} />
          <Route path="/base64img" element={<Base64Image />} />
          <Route path="/textcounteradv" element={<TextCounterAdvanced />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
