import { useLang } from '../i18n/LanguageContext.jsx'
import { tours, tickets } from '../data/products.js'

function Home({ navigate }) {
  const { lang, t } = useLang()
  const featured = [...tours.slice(0, 3), ...tickets.slice(0, 3)]

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>{t('hero_title')}</h1>
          <p>{t('hero_subtitle')}</p>
          <div className="hero-cta">
            <button className="hero-btn hero-btn-primary" onClick={() => navigate('tours')}>{t('hero_cta')}</button>
            <button className="hero-btn hero-btn-secondary" onClick={() => navigate('tickets')}>{t('hero_cta2')}</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{t('home_featured')}</h2>
        <p className="section-sub">{t('home_featured_sub')}</p>
        <div className="product-grid">
          {featured.map(p => (
            <div key={p.id} className="product-card" onClick={() => navigate('detail', p.id)}>
              <div className="product-card-img">{p.image}</div>
              <div className="product-card-body">
                <div className="product-card-region">{p.type === 'tour' ? t('nav_tours') : t('nav_tickets')}</div>
                <div className="product-card-title">{p.title[lang]}</div>
                <div className="product-card-sub">{p.subtitle[lang]}</div>
                <div className="product-card-meta">
                  {p.duration && <span>⏱ {p.duration}</span>}
                  <span className="product-card-rating">★ {p.rating} ({p.reviewCount})</span>
                </div>
                <div className="product-card-footer">
                  <div className="product-card-price">${p.price} <small>{t('tours_per_person')}</small></div>
                  <button className="product-card-btn">{t('tours_view_details')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{t('home_categories')}</h2>
        <div className="categories" style={{ marginTop: 32 }}>
          <div className="category-card" onClick={() => navigate('tours')}>
            <div className="category-icon">🗺️</div>
            <div className="category-title">{t('home_cat_tours')}</div>
            <div className="category-desc">{t('home_cat_tours_desc')}</div>
          </div>
          <div className="category-card" onClick={() => navigate('tickets')}>
            <div className="category-icon">🎟️</div>
            <div className="category-title">{t('home_cat_tickets')}</div>
            <div className="category-desc">{t('home_cat_tickets_desc')}</div>
          </div>
          <div className="category-card" onClick={() => navigate('contact')}>
            <div className="category-icon">✨</div>
            <div className="category-title">{t('home_cat_private')}</div>
            <div className="category-desc">{t('home_cat_private_desc')}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="stats-bar">
          <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">{t('home_stats_tours')}</div></div>
          <div className="stat-item"><div className="stat-number">15K+</div><div className="stat-label">{t('home_stats_travelers')}</div></div>
          <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">{t('home_stats_years')}</div></div>
          <div className="stat-item"><div className="stat-number">4.8★</div><div className="stat-label">{t('home_stats_rating')}</div></div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{t('home_why')}</h2>
        <div className="why-grid" style={{ marginTop: 40 }}>
          <div className="why-card"><div className="why-icon">🎓</div><div className="why-title">{t('home_why1_title')}</div><div className="why-desc">{t('home_why1_desc')}</div></div>
          <div className="why-card"><div className="why-icon">👥</div><div className="why-title">{t('home_why2_title')}</div><div className="why-desc">{t('home_why2_desc')}</div></div>
          <div className="why-card"><div className="why-icon">💰</div><div className="why-title">{t('home_why3_title')}</div><div className="why-desc">{t('home_why3_desc')}</div></div>
          <div className="why-card"><div className="why-icon">↩️</div><div className="why-title">{t('home_why4_title')}</div><div className="why-desc">{t('home_why4_desc')}</div></div>
        </div>
      </section>
    </div>
  )
}

export default Home
