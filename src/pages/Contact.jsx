import { useLang } from '../i18n/LanguageContext.jsx'

function Contact() {
  const { t } = useLang()
  return (
    <div className="contact-body">
      <h1 className="section-title">{t('contact_title')}</h1>
      <p className="section-sub">{t('contact_sub')}</p>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-info-label">{t('contact_address')}</div>
            <div className="contact-info-value">{t('contact_addr_val')}</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">{t('contact_phone')}</div>
            <div className="contact-info-value">{t('contact_phone_val')}</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">Email</div>
            <div className="contact-info-value">{t('contact_email_val')}</div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-label">{t('contact_hours')}</div>
            <div className="contact-info-value">{t('contact_hours_val')}</div>
          </div>
        </div>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input placeholder={t('contact_name')} required />
          <input type="email" placeholder={t('contact_email')} required />
          <textarea rows="5" placeholder={t('contact_message')} required />
          <button type="submit">{t('contact_send')}</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
