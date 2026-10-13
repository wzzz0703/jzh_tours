import { useLang } from '../i18n/LanguageContext.jsx'

function Footer({ navigate }) {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">East China <span>Tours</span></div>
          <p className="footer-desc">{t('footer_about_desc')}</p>
        </div>
        <div className="footer-col">
          <h4>{t('footer_links')}</h4>
          <a onClick={() => navigate('home')}>{t('nav_home')}</a>
          <a onClick={() => navigate('tours')}>{t('nav_tours')}</a>
          <a onClick={() => navigate('tickets')}>{t('nav_tickets')}</a>
          <a onClick={() => navigate('about')}>{t('nav_about')}</a>
        </div>
        <div className="footer-col">
          <h4>{t('footer_contact')}</h4>
          <p>{t('contact_phone_val')}</p>
          <p>{t('contact_email_val')}</p>
          <p>{t('contact_addr_val')}</p>
        </div>
        <div className="footer-col">
          <h4>{t('footer_follow')}</h4>
          <a>Facebook</a>
          <a>Instagram</a>
          <a>TripAdvisor</a>
          <a>WeChat</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t('footer_rights')}</span>
        <span>{t('footer_licensed')}</span>
      </div>
    </footer>
  )
}

export default Footer
