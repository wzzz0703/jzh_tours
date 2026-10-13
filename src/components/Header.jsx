import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { languages } from '../i18n/translations.js'

function Header({ navigate, page }) {
  const { lang, setLang, t } = useLang()
  const [langOpen, setLangOpen] = useState(false)

  const currentLang = languages.find(l => l.code === lang)
  const navItems = [
    { key: 'home', label: t('nav_home') },
    { key: 'tours', label: t('nav_tours') },
    { key: 'tickets', label: t('nav_tickets') },
    { key: 'about', label: t('nav_about') },
    { key: 'contact', label: t('nav_contact') },
  ]

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('home')}>
        East China <span>Tours</span>
      </div>
      <nav className="header-nav">
        {navItems.map(item => (
          <a key={item.key} className={page === item.key ? 'active' : ''} onClick={() => navigate(item.key)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-right">
        <div className="lang-switcher">
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
            {currentLang.flag} {currentLang.name}
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {languages.map(l => (
                <button key={l.code} className={l.code === lang ? 'active' : ''} onClick={() => { setLang(l.code); setLangOpen(false) }}>
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="book-btn" onClick={() => navigate('tours')}>{t('nav_book')}</button>
      </div>
    </header>
  )
}

export default Header
