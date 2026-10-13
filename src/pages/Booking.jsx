import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { allProducts } from '../data/products.js'

function Booking({ navigate, productId, bookingData, setBookingData }) {
  const { lang, t } = useLang()
  const product = allProducts.find(p => p.id === productId)
  const [quantity, setQuantity] = useState(bookingData?.quantity || 1)
  const [errors, setErrors] = useState({})

  if (!product) {
    return (
      <div className="section">
        <p>Product not found.</p>
        <button className="back-btn" onClick={() => navigate('home')}>← {t('detail_back')}</button>
      </div>
    )
  }

  const total = product.price * quantity

  const validate = (data) => {
    const e = {}
    if (!data.fullName?.trim()) e.fullName = t('booking_required')
    if (!data.email?.trim()) e.email = t('booking_required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t('booking_invalid_email')
    if (!data.passportNumber?.trim()) e.passportNumber = t('booking_required')
    else if (data.passportNumber.length < 5) e.passportNumber = t('booking_invalid_passport')
    if (!data.nationality?.trim()) e.nationality = t('booking_required')
    if (!data.travelDate) e.travelDate = t('booking_required')
    else if (new Date(data.travelDate) < new Date(new Date().toDateString())) e.travelDate = t('booking_past_date')
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
      quantity,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      passportNumber: formData.get('passportNumber'),
      nationality: formData.get('nationality'),
      travelDate: formData.get('travelDate'),
      specialRequests: formData.get('specialRequests'),
    }
    const e2 = validate(data)
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setBookingData(data)
    navigate('payment')
  }

  return (
    <div className="booking-body">
      <div className="back-btn" onClick={() => navigate('detail', product.id)}>← {t('detail_back')}</div>
      <h1 className="section-title">{t('booking_title')}</h1>
      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>{t('booking_full_name')} *</label>
              <input name="fullName" defaultValue={bookingData?.fullName} placeholder="John Doe" />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label>{t('booking_email')} *</label>
              <input name="email" type="email" defaultValue={bookingData?.email} placeholder="john@example.com" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('booking_phone')}</label>
              <input name="phone" defaultValue={bookingData?.phone} placeholder="+1 555 123 4567" />
            </div>
            <div className="form-group">
              <label>{t('booking_passport')} *</label>
              <input name="passportNumber" defaultValue={bookingData?.passportNumber} placeholder="P12345678" />
              {errors.passportNumber && <span className="form-error">{errors.passportNumber}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('booking_nationality')} *</label>
              <input name="nationality" defaultValue={bookingData?.nationality} placeholder="United States" />
              {errors.nationality && <span className="form-error">{errors.nationality}</span>}
            </div>
            <div className="form-group">
              <label>{t('booking_travel_date')} *</label>
              <input name="travelDate" type="date" defaultValue={bookingData?.travelDate} min={new Date().toISOString().split('T')[0]} />
              {errors.travelDate && <span className="form-error">{errors.travelDate}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('booking_quantity')} *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="20"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>
          <div className="form-group">
            <label>{t('booking_special_requests')}</label>
            <textarea name="specialRequests" rows="3" defaultValue={bookingData?.specialRequests} placeholder={t('booking_special_placeholder')} />
          </div>
          <button type="submit" className="booking-submit">{t('booking_continue')} →</button>
        </form>

        <div className="booking-summary">
          <div className="booking-summary-img">{product.image}</div>
          <div className="booking-summary-title">{product.title[lang]}</div>
          <div className="booking-summary-sub">{product.subtitle[lang]}</div>
          <div className="booking-summary-line" />
          <div className="booking-summary-row">
            <span>{t('detail_price')}</span>
            <span>${product.price}</span>
          </div>
          <div className="booking-summary-row">
            <span>{t('booking_quantity')}</span>
            <span>×{quantity}</span>
          </div>
          <div className="booking-summary-line" />
          <div className="booking-summary-row booking-summary-total">
            <span>{t('booking_total')}</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
