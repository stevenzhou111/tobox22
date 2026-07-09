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
      </Route>
    </Routes>
  )
}
