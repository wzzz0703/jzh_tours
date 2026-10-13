import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { getOrders, updateOrderStatus, getOrderStats } from '../data/orders.js'
import { allProducts } from '../data/products.js'

const ADMIN_PASSWORD = 'admin2026'

function Admin({ navigate }) {
  const { lang, t } = useLang()
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('all')

  const refresh = () => {
    setOrders(getOrders())
    setStats(getOrderStats())
  }

  useEffect(() => {
    if (loggedIn) refresh()
  }, [loggedIn])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError(t('admin_wrong_password'))
    }
  }

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus)
    refresh()
  }

  const statusLabel = (status) => {
    const map = {
      pending: t('admin_status_pending'),
      confirmed: t('admin_status_confirmed'),
      completed: t('admin_status_completed'),
      cancelled: t('admin_status_cancelled'),
    }
    return map[status] || status
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const productTitle = (productId) => {
    const p = allProducts.find(p => p.id === productId)
    return p ? p.title[lang] : productId
  }

  if (!loggedIn) {
    return (
      <div className="admin-login-body">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h1>{t('admin_title')}</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>{t('admin_password')}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
              />
              {error && <span className="form-error">{error}</span>}
            </div>
            <button type="submit" className="booking-submit">{t('admin_login_btn')}</button>
          </form>
          <div className="admin-login-hint">{t('admin_login_hint')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-body">
      <div className="admin-header">
        <h1 className="section-title">{t('admin_dashboard')}</h1>
        <div className="admin-header-right">
          <button className="admin-logout" onClick={() => navigate('home')}>{t('admin_back_home')}</button>
        </div>
      </div>

      {stats && (
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">💰</div>
            <div className="admin-stat-value">${stats.totalRevenue}</div>
            <div className="admin-stat-label">{t('admin_total_revenue')}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">📦</div>
            <div className="admin-stat-value">{stats.totalOrders}</div>
            <div className="admin-stat-label">{t('admin_total_orders')}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">⏳</div>
            <div className="admin-stat-value">{stats.pending}</div>
            <div className="admin-stat-label">{t('admin_pending')}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">✅</div>
            <div className="admin-stat-value">{stats.completed}</div>
            <div className="admin-stat-label">{t('admin_completed')}</div>
          </div>
        </div>
      )}

      {stats && stats.topProducts.length > 0 && (
        <div className="admin-section">
          <h3>{t('admin_top_products')}</h3>
          <div className="admin-top-products">
            {stats.topProducts.map((p, i) => (
              <div key={p.id} className="admin-top-product">
                <span className="admin-rank">#{i + 1}</span>
                <span className="admin-top-name">{productTitle(p.id)}</span>
                <span className="admin-top-count">{p.count} {t('admin_orders')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="admin-section">
        <div className="admin-orders-header">
          <h3>{t('admin_orders')} ({filtered.length})</h3>
          <div className="admin-filter-bar">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
              <button
                key={s}
                className={`filter-btn ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s === 'all' ? t('admin_filter_all') : statusLabel(s)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="myorders-empty">{t('admin_no_orders')}</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('admin_order_id')}</th>
                  <th>{t('admin_product')}</th>
                  <th>{t('admin_customer')}</th>
                  <th>{t('booking_travel_date')}</th>
                  <th>{t('admin_amount')}</th>
                  <th>{t('admin_status')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id}>
                    <td className="admin-td-id">{order.id}</td>
                    <td>{order.productTitle[lang]}</td>
                    <td>
                      <div>{order.customer.fullName}</div>
                      <div className="admin-td-sub">{order.customer.email}</div>
                    </td>
                    <td>{order.customer.travelDate}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <select
                        className={`status-select status-${order.status}`}
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">{t('admin_status_pending')}</option>
                        <option value="confirmed">{t('admin_status_confirmed')}</option>
                        <option value="completed">{t('admin_status_completed')}</option>
                        <option value="cancelled">{t('admin_status_cancelled')}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
