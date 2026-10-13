import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { getOrdersByEmail } from '../data/orders.js'

function MyOrders({ navigate }) {
  const { lang, t } = useLang()
  const [email, setEmail] = useState('')
  const [searched, setSearched] = useState(false)
  const [orders, setOrders] = useState([])
  const [expandedId, setExpandedId] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    const results = getOrdersByEmail(email.trim())
    setOrders(results)
    setSearched(true)
  }

  const statusClass = (status) => `status-badge status-${status}`

  const statusLabel = (status) => {
    const map = {
      pending: t('admin_status_pending'),
      confirmed: t('admin_status_confirmed'),
      completed: t('admin_status_completed'),
      cancelled: t('admin_status_cancelled'),
    }
    return map[status] || status
  }

  return (
    <div className="myorders-body">
      <h1 className="section-title">{t('myorders_title')}</h1>
      <p className="section-sub">{t('myorders_enter_email')}</p>

      <form className="myorders-search" onSubmit={handleSearch}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="john@example.com"
          required
        />
        <button type="submit">{t('myorders_search')}</button>
      </form>

      {searched && orders.length === 0 && (
        <div className="myorders-empty">{t('myorders_no_orders')}</div>
      )}

      {orders.length > 0 && (
        <div className="myorders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
              <div className="order-card-header">
                <div className="order-card-id">{order.id}</div>
                <span className={statusClass(order.status)}>{statusLabel(order.status)}</span>
              </div>
              <div className="order-card-body">
                <div className="order-card-product">{order.productTitle[lang]}</div>
                <div className="order-card-meta">
                  <span>📅 {order.customer.travelDate}</span>
                  <span>👥 ×{order.quantity}</span>
                  <span className="order-card-amount">${order.totalAmount}</span>
                </div>
              </div>
              {expandedId === order.id && (
                <div className="order-card-detail">
                  <div className="confirm-row"><span>{t('booking_full_name')}</span><span>{order.customer.fullName}</span></div>
                  <div className="confirm-row"><span>{t('booking_email')}</span><span>{order.customer.email}</span></div>
                  <div className="confirm-row"><span>{t('booking_passport')}</span><span>{order.customer.passportNumber}</span></div>
                  <div className="confirm-row"><span>{t('booking_nationality')}</span><span>{order.customer.nationality}</span></div>
                  {order.customer.phone && <div className="confirm-row"><span>{t('booking_phone')}</span><span>{order.customer.phone}</span></div>}
                  {order.customer.specialRequests && <div className="confirm-row"><span>{t('booking_special_requests')}</span><span>{order.customer.specialRequests}</span></div>}
                  <div className="confirm-row"><span>{t('myorders_date')}</span><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!searched && (
        <div className="myorders-hint">
          <p>📬 {t('myorders_hint')}</p>
        </div>
      )}
    </div>
  )
}

export default MyOrders
