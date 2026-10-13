import { useLang } from '../i18n/LanguageContext.jsx'
import { allProducts } from '../data/products.js'

function ProductDetail({ navigate, productId }) {
  const { lang, t } = useLang()
  const product = allProducts.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="section">
        <p>Product not found.</p>
        <button className="back-btn" onClick={() => navigate('home')}>← {t('detail_back')}</button>
      </div>
    )
  }

  const isTour = product.type === 'tour'

  return (
    <div>
      <div className="detail-hero">{product.image}</div>
      <div className="detail-body">
        <div className="back-btn" onClick={() => navigate(isTour ? 'tours' : 'tickets')}>← {t('detail_back')}</div>
        <h1 className="detail-title">{product.title[lang]}</h1>
        <p className="detail-sub">{product.subtitle[lang]}</p>

        <div className="detail-meta">
          {isTour && <div className="detail-meta-item"><span className="detail-meta-label">{t('detail_duration')}</span><span className="detail-meta-value">{product.duration}</span></div>}
          {isTour && <div className="detail-meta-item"><span className="detail-meta-label">{t('detail_group')}</span><span className="detail-meta-value">{product.groupSize}</span></div>}
          <div className="detail-meta-item"><span className="detail-meta-label">{t('detail_language')}</span><span className="detail-meta-value">EN · FR · IT · ES</span></div>
          <div className="detail-meta-item"><span className="detail-meta-label">{t('detail_price')}</span><span className="detail-meta-value">${product.price}</span></div>
          <div className="detail-meta-item"><span className="detail-meta-label">Rating</span><span className="detail-meta-value">★ {product.rating} ({product.reviewCount})</span></div>
        </div>

        <div className="detail-section">
          <h3>{t('detail_overview')}</h3>
          <p>{product.overview[lang]}</p>
        </div>

        {isTour && product.itinerary && (
          <div className="detail-section">
            <h3>{t('detail_itinerary')}</h3>
            {product.itinerary.map((item, i) => (
              <div key={i} className="itinerary-item">
                <span className="itinerary-time">{item.time}</span>
                <span>{item[lang]}</span>
              </div>
            ))}
          </div>
        )}

        {product.attractions && (
          <div className="detail-section">
            <h3>{t('detail_attractions')}</h3>
            {product.attractions.map((attr, i) => (
              <div key={i} className="attraction-item">
                <div className="attraction-name">{attr.name[lang]}</div>
                <div className="attraction-desc">{attr.desc[lang]}</div>
              </div>
            ))}
          </div>
        )}

        {product.includes && (
          <div className="detail-section">
            <h3>{t('detail_includes')}</h3>
            <ul className="includes-list">
              {product.includes[lang].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        {product.excludes && (
          <div className="detail-section">
            <h3>{t('detail_excludes')}</h3>
            <ul className="excludes-list">
              {product.excludes[lang].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        {product.ticketTypes && (
          <div className="detail-section">
            <h3>{t('tickets_type')}</h3>
            {product.ticketTypes.map((tt, i) => (
              <div key={i} className="attraction-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="attraction-name">{tt.name[lang]}</div>
                  <div className="attraction-desc">{tt.validity[lang]}</div>
                </div>
                <div className="detail-price">${tt.price}</div>
              </div>
            ))}
          </div>
        )}

        <div className="detail-section">
          <h3>{t('detail_meeting')}</h3>
          <p>{product.meeting[lang]}</p>
        </div>

        <div className="detail-booking">
          <div className="detail-price">${product.price} <small>{t('tours_per_person')}</small></div>
          <button className="detail-book-btn" onClick={() => navigate('booking', product.id)}>{t('detail_book_now')}</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
