import { useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import Tickets from './pages/Tickets.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Booking from './pages/Booking.jsx'
import Payment from './pages/Payment.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import MyOrders from './pages/MyOrders.jsx'
import Admin from './pages/Admin.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [productId, setProductId] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [orderId, setOrderId] = useState(null)

  const navigate = (target, id = null) => {
    if (target !== 'detail' && target !== 'booking') {
      // keep productId for booking→detail navigation, but clear on other pages
    }
    if (target === 'booking') {
      setProductId(id)
    }
    if (target === 'detail') {
      setProductId(id)
    }
    setPage(target)
    window.scrollTo(0, 0)
  }

  return (
    <LanguageProvider>
      <div className="app">
        <Header navigate={navigate} page={page} />
        <main>
          {page === 'home' && <Home navigate={navigate} />}
          {page === 'tours' && <Tours navigate={navigate} />}
          {page === 'tickets' && <Tickets navigate={navigate} />}
          {page === 'detail' && <ProductDetail navigate={navigate} productId={productId} />}
          {page === 'about' && <About />}
          {page === 'contact' && <Contact />}
          {page === 'booking' && (
            <Booking
              navigate={navigate}
              productId={productId}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          )}
          {page === 'payment' && (
            <Payment
              navigate={navigate}
              productId={productId}
              bookingData={bookingData}
              setOrderId={setOrderId}
            />
          )}
          {page === 'confirmation' && (
            <OrderConfirmation navigate={navigate} orderId={orderId} />
          )}
          {page === 'myorders' && <MyOrders navigate={navigate} />}
          {page === 'admin' && <Admin navigate={navigate} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </LanguageProvider>
  )
}

export default App
