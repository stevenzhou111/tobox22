import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function XmlConverter() {
  const { t } = useTranslation()
  const [xml, setXml] = useState('')
  const [json, setJson] = useState('')
  const [yaml, setYaml] = useState('')
  const [error, setError] = useState('')

  const xmlToJson = () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, 'text/xml')
      const parseError = doc.querySelector('parsererror')
      if (parseError) {
        setError(t('xmlconvert.errorXml'))
        return
      }
      const nodeToJson = (node: Element): any => {
        const obj: any = {}
        if (node.attributes.length > 0) {
          obj['@attributes'] = {}
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i]
            obj['@attributes'][attr.name] = attr.value
          }
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i]
          if (child.nodeType === 1) {
            const childObj = nodeToJson(child as Element)
            if (obj[child.nodeName]) {
              if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]
              obj[child.nodeName].push(childObj)
            } else {
              obj[child.nodeName] = childObj
            }
          } else if (child.nodeType === 3) {
            const text = child.textContent?.trim()
            if (text) obj['#text'] = text
          }
        }
        return obj
      }

      const result = nodeToJson(doc.documentElement)
      setJson(JSON.stringify(result, null, 2))
      setError('')
    } catch {
      setError(t('xmlconvert.errorParse'))
    }
  }

  const jsonToXml = () => {
    try {
      const data = JSON.parse(json)
      const toXml = (obj: any, indent = 0): string => {
        const prefix = '  '.repeat(indent)
        let xmlStr = ''
        for (const [key, val] of Object.entries(obj)) {
          if (key === '@attributes') continue
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            xmlStr += `${prefix}<${key}>\n${toXml(val, indent + 1)}${prefix}</${key}>\n`
          } else if (Array.isArray(val)) {
            val.forEach((item) => {
              if (typeof item === 'object') {
                xmlStr += `${prefix}<${key}>\n${toXml(item, indent + 1)}${prefix}</${key}>\n`
              } else {
                xmlStr += `${prefix}<${key}>${item}</${key}>\n`
              }
            })
          } else {
            xmlStr += `${prefix}<${key}>${val}</${key}>\n`
          }
        }
        return xmlStr
      }

      const rootKey = Object.keys(data)[0]
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootKey}>\n${toXml(data[rootKey], 1)}</${rootKey}>`
      setXml(xmlContent)
      setError('')
    } catch {
      setError(t('xmlconvert.errorJson'))
    }
  }

  const xmlToYaml = () => {
    xmlToJson()
    // Simple conversion after JSON is set
    setTimeout(() => {
      try {
        const data = JSON.parse(json)
        const toYaml = (obj: any, indent = 0): string => {
          const prefix = '  '.repeat(indent)
          return Object.entries(obj)
            .map(([key, val]) => {
              if (typeof val === 'object' && val !== null) {
                return `${prefix}${key}:\n${toYaml(val, indent + 1)}`
              }
              return `${prefix}${key}: ${val}`
            })
            .join('\n')
        }
        setYaml(toYaml(data))
      } catch { /* ignore */ }
    }, 100)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('xmlconvert.title')}</h2>
      <p className="text-[#909399] mb-6">{t('xmlconvert.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">XML</label>
        <textarea
          className="input-field h-48 font-mono text-sm resize-y"
          value={xml}
          onChange={(e) => setXml(e.target.value)}
          placeholder={'<root>\n  <item>\n    <name>John</name>\n  </item>\n</root>'}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={xmlToJson} className="btn-primary">XML → JSON</button>
        <button onClick={jsonToXml} className="btn-primary">JSON → XML</button>
      </div>

      {error && <div className="text-[#f56c6c] text-sm mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">JSON</label>
        <textarea
          className="input-field h-48 font-mono text-sm resize-y"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='{"root":{"item":{"name":"John"}}}'
        />
      </div>
    </div>
  )
}
