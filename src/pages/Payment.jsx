import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { createOrder } from '../data/orders.js'

function Payment({ navigate, productId, bookingData, setOrderId }) {
  const { lang, t } = useLang()
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardholder, setCardholder] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  if (!bookingData) {
    return (
      <div className="section">
        <p>{t('payment_no_booking')}</p>
        <button className="back-btn" onClick={() => navigate('home')}>← {t('confirm_back_home')}</button>
      </div>
    )
  }

  const total = bookingData.productPrice * bookingData.quantity

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handlePay = (e) => {
    e.preventDefault()
    setError('')

    const digits = cardNumber.replace(/\s/g, '')
    if (digits.length < 16) {
      setError(t('payment_invalid_card'))
      return
    }
    if (expiry.length < 5) {
      setError(t('payment_invalid_expiry'))
      return
    }
    if (cvc.length < 3) {
      setError(t('payment_invalid_cvc'))
      return
    }
    if (!cardholder.trim()) {
      setError(t('payment_invalid_cardholder'))
      return
    }

    setProcessing(true)
    setTimeout(() => {
      const order = createOrder({
        ...bookingData,
        cardLast4: digits.slice(-4),
      })
      setOrderId(order.id)
      setProcessing(false)
      navigate('confirmation')
    }, 1500)
  }

  return (
    <div className="payment-body">
      <div className="back-btn" onClick={() => navigate('booking')}>← {t('detail_back')}</div>
      <h1 className="section-title">{t('payment_title')}</h1>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handlePay}>
          <div className="payment-card-icon">💳</div>
          <div className="form-group">
            <label>{t('payment_card_number')}</label>
            <input
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              maxLength="19"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('payment_expiry')}</label>
              <input
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>{t('payment_cvc')}</label>
              <input
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength="4"
              />
            </div>
          </div>
          <div className="form-group">
            <label>{t('payment_cardholder')}</label>
            <input
              value={cardholder}
              onChange={e => setCardholder(e.target.value)}
              placeholder="JOHN DOE"
            />
          </div>

          {error && <div className="form-error-banner">{error}</div>}

          <div className="payment-demo-note">🔒 {t('payment_demo_note')}</div>

          <button type="submit" className="booking-submit" disabled={processing}>
            {processing ? t('payment_processing') : `${t('payment_pay_now')} $${total}`}
          </button>
        </form>

        <div className="booking-summary">
          <div className="booking-summary-title">{bookingData.productTitle[lang]}</div>
          <div className="booking-summary-row">
            <span>{t('booking_quantity')}</span>
            <span>×{bookingData.quantity}</span>
          </div>
          <div className="booking-summary-line" />
          <div className="booking-summary-row booking-summary-total">
            <span>{t('booking_total')}</span>
            <span>${total}</span>
          </div>
          <div className="booking-summary-line" />
          <div className="booking-summary-row">
            <span>{t('booking_full_name')}</span>
            <span>{bookingData.fullName}</span>
          </div>
          <div className="booking-summary-row">
            <span>{t('booking_travel_date')}</span>
            <span>{bookingData.travelDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
