import { useLang } from '../i18n/LanguageContext.jsx'
import { getOrderById } from '../data/orders.js'

function OrderConfirmation({ navigate, orderId }) {
  const { lang, t } = useLang()
  const order = orderId ? getOrderById(orderId) : null

  if (!order) {
    return (
      <div className="section">
        <p>Order not found.</p>
        <button className="back-btn" onClick={() => navigate('home')}>← {t('confirm_back_home')}</button>
      </div>
    )
  }

  return (
    <div className="order-confirm">
      <div className="confirm-check">✓</div>
      <h1 className="confirm-title">{t('confirm_title')}</h1>
      <p className="confirm-thanks">{t('confirm_thank_you')}</p>

      <div className="confirm-card">
        <div className="confirm-order-id">
          <span className="confirm-label">{t('confirm_order_id')}</span>
          <span className="confirm-order-number">{order.id}</span>
        </div>

        <div className="confirm-section">
          <h3>{t('confirm_product_info')}</h3>
          <div className="confirm-row">
            <span>{order.productTitle[lang]}</span>
            <span>×{order.quantity}</span>
          </div>
          <div className="confirm-row confirm-amount">
            <span>{t('confirm_amount_paid')}</span>
            <span>${order.totalAmount}</span>
          </div>
        </div>

        <div className="confirm-section">
          <h3>{t('confirm_customer_info')}</h3>
          <div className="confirm-row"><span>{t('booking_full_name')}</span><span>{order.customer.fullName}</span></div>
          <div className="confirm-row"><span>{t('booking_email')}</span><span>{order.customer.email}</span></div>
          <div className="confirm-row"><span>{t('booking_passport')}</span><span>{order.customer.passportNumber}</span></div>
          <div className="confirm-row"><span>{t('booking_nationality')}</span><span>{order.customer.nationality}</span></div>
          <div className="confirm-row"><span>{t('booking_travel_date')}</span><span>{order.customer.travelDate}</span></div>
          {order.customer.specialRequests && (
            <div className="confirm-row"><span>{t('booking_special_requests')}</span><span>{order.customer.specialRequests}</span></div>
          )}
        </div>

        <div className="confirm-status">
          <span className="status-badge status-pending">{t('confirm_status_pending')}</span>
        </div>
      </div>

      <div className="confirm-actions">
        <button className="hero-btn hero-btn-primary" onClick={() => navigate('myorders')}>{t('confirm_view_orders')}</button>
        <button className="hero-btn hero-btn-secondary" onClick={() => navigate('home')}>{t('confirm_back_home')}</button>
      </div>
    </div>
  )
}

export default OrderConfirmation
