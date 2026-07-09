import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MetaTagGenerator() {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [author, setAuthor] = useState('')
  const [ogTitle, setOgTitle] = useState('')
  const [ogDesc, setOgDesc] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [twitterCard, setTwitterCard] = useState('summary_large_image')

  const generate = () => {
    let tags = '<!-- Basic Meta Tags -->\n'
    if (title) tags += `<title>${title}</title>\n`
    tags += `<meta charset="UTF-8">\n`
    tags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`
    if (description) tags += `<meta name="description" content="${description}">\n`
    if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`
    if (author) tags += `<meta name="author" content="${author}">\n`
    tags += '\n<!-- Open Graph / Facebook -->\n'
    tags += `<meta property="og:type" content="website">\n`
    if (ogTitle || title) tags += `<meta property="og:title" content="${ogTitle || title}">\n`
    if (ogDesc || description) tags += `<meta property="og:description" content="${ogDesc || description}">\n`
    if (ogImage) tags += `<meta property="og:image" content="${ogImage}">\n`
    tags += '\n<!-- Twitter -->\n'
    tags += `<meta name="twitter:card" content="${twitterCard}">\n`
    if (ogTitle || title) tags += `<meta name="twitter:title" content="${ogTitle || title}">\n`
    if (ogDesc || description) tags += `<meta name="twitter:description" content="${ogDesc || description}">\n`
    if (ogImage) tags += `<meta name="twitter:image" content="${ogImage}">\n`
    return tags
  }

  const result = generate()

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('metatag.title')}</h2>
      <p className="text-[#909399] mb-6">{t('metatag.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="input-field" placeholder={t('metatag.titlePlaceholder')} value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input-field h-20 text-sm resize-y" placeholder={t('metatag.descPlaceholder')} value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="input-field" placeholder={t('metatag.keywordsPlaceholder')} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
          <input className="input-field" placeholder={t('metatag.authorPlaceholder')} value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className="input-field" placeholder={t('metatag.ogImagePlaceholder')} value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
          <select className="input-field" value={twitterCard} onChange={(e) => setTwitterCard(e.target.value)}>
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
          </select>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[#909399]">HTML</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-sm text-[#409eff] hover:underline">{t('copy')}</button>
          </div>
          <pre className="bg-[#f5f7fa] rounded-lg p-4 font-mono text-xs overflow-auto max-h-[500px]">{result}</pre>
        </div>
      </div>
    </div>
  )
}
