import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { tours } from '../data/products.js'

function Tours({ navigate }) {
  const { lang, t } = useLang()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? tours : tours.filter(t => t.region === filter)
  const filters = [
    { key: 'all', label: t('tours_filter_all') },
    { key: 'shanghai', label: t('tours_filter_shanghai') },
    { key: 'jiangsu', label: t('tours_filter_jiangsu') },
    { key: 'zhejiang', label: t('tours_filter_zhejiang') },
  ]

  return (
    <div>
      <section className="section">
        <h2 className="section-title">{t('tours_title')}</h2>
        <p className="section-sub">{t('tours_sub')}</p>
        <div className="filter-bar">
          {filters.map(f => (
            <button key={f.key} className={`filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {filtered.map(tour => (
            <div key={tour.id} className="product-card" onClick={() => navigate('detail', tour.id)}>
              <div className="product-card-img">{tour.image}</div>
              <div className="product-card-body">
                <div className="product-card-region">{t(`tours_filter_${tour.region}`)}</div>
                <div className="product-card-title">{tour.title[lang]}</div>
                <div className="product-card-sub">{tour.subtitle[lang]}</div>
                <div className="product-card-meta">
                  <span>⏱ {tour.duration}</span>
                  <span>👥 {tour.groupSize}</span>
                  <span className="product-card-rating">★ {tour.rating} ({tour.reviewCount})</span>
                </div>
                <div className="product-card-footer">
                  <div className="product-card-price">${tour.price} <small>{t('tours_per_person')}</small></div>
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

export default Tours
