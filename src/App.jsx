import { useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import Tickets from './pages/Tickets.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [productId, setProductId] = useState(null)

  const navigate = (target, id = null) => {
    setProductId(id)
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
        </main>
        <Footer navigate={navigate} />
      </div>
    </LanguageProvider>
  )
}

export default App
