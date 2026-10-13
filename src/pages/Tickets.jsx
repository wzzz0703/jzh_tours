import { useLang } from '../i18n/LanguageContext.jsx'
import { tickets } from '../data/products.js'

function Tickets({ navigate }) {
  const { lang, t } = useLang()
  return (
    <div>
      <section className="section">
        <h2 className="section-title">{t('tickets_title')}</h2>
        <p className="section-sub">{t('tickets_sub')}</p>
        <div className="product-grid">
          {tickets.map(ticket => (
            <div key={ticket.id} className="product-card" onClick={() => navigate('detail', ticket.id)}>
              <div className="product-card-img">{ticket.image}</div>
              <div className="product-card-body">
                <div className="product-card-region">{t('nav_tickets')}</div>
                <div className="product-card-title">{ticket.title[lang]}</div>
                <div className="product-card-sub">{ticket.subtitle[lang]}</div>
                <div className="product-card-meta">
                  <span className="product-card-rating">★ {ticket.rating} ({ticket.reviewCount})</span>
                </div>
                <div className="product-card-footer">
                  <div className="product-card-price">${ticket.price} <small>{t('tours_per_person')}</small></div>
                  <button className="product-card-btn">{t('tours_view_details')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tickets
