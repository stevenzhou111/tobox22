import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import Base64Tool from './pages/Base64Tool'
import UrlEncoder from './pages/UrlEncoder'
import TimestampTool from './pages/TimestampTool'
import ColorConverter from './pages/ColorConverter'
import TextDiff from './pages/TextDiff'
import RegexTester from './pages/RegexTester'
import PasswordGen from './pages/PasswordGen'
import WordCount from './pages/WordCount'
import CaseConverter from './pages/CaseConverter'
import TextReverse from './pages/TextReverse'
import RemoveEmptyLines from './pages/RemoveEmptyLines'
import TextReplace from './pages/TextReplace'
import NumberBase from './pages/NumberBase'
import RandomNumber from './pages/RandomNumber'
import HashGenerator from './pages/HashGenerator'
import QRCode from './pages/QRCode'
import MarkdownPreview from './pages/MarkdownPreview'
import UnitConverter from './pages/UnitConverter'
import TextExtract from './pages/TextExtract'
import WordFrequency from './pages/WordFrequency'
import UnicodeConverter from './pages/UnicodeConverter'
import MorseCode from './pages/MorseCode'
import RomanNumeral from './pages/RomanNumeral'
import Pomodoro from './pages/Pomodoro'
import CoinFlip from './pages/CoinFlip'
import JWTParser from './pages/JWTParser'
import ImageCompress from './pages/ImageCompress'
import ImageBase64 from './pages/ImageBase64'
import DrawingBoard from './pages/DrawingBoard'
import CSVJSON from './pages/CSVJSON'
import ColorPicker from './pages/ColorPicker'
import BarChart from './pages/BarChart'
import PieChart from './pages/PieChart'
import LineChart from './pages/LineChart'
import ImageResize from './pages/ImageResize'
import ImageFilter from './pages/ImageFilter'
import TextSplit from './pages/TextSplit'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
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
      </Route>
    </Routes>
  )
}
