import { useLang } from '../i18n/LanguageContext.jsx'

function About() {
  const { t } = useLang()
  return (
    <div className="about-body">
      <h1 className="section-title">{t('about_title')}</h1>
      <p>{t('about_p1')}</p>
      <p>{t('about_p2')}</p>
      <p>{t('about_p3')}</p>
      <h3 style={{ marginTop: 40, marginBottom: 16, fontSize: 22, color: '#1a1a2e' }}>{t('about_values')}</h3>
      <ul className="about-values">
        <li>✓ {t('about_v1')}</li>
        <li>✓ {t('about_v2')}</li>
        <li>✓ {t('about_v3')}</li>
        <li>✓ {t('about_v4')}</li>
      </ul>
    </div>
  )
}

export default About
