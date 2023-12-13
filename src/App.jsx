import Newsfeed from './components/news/Newsfeed'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RiskFreeRate from './components/riskfree/RiskFreeRate'
import Earnings from './components/earnings/Earnings'
import Dividends from './components/dividends/Dividends'
import Plus500 from './components/plus500/Plus500'
import Economics from './components/economics/Economics'
import Cookie from './components/Cookie'


export default function App() {
  return (
    <>
      <Navbar />
      <RiskFreeRate />

      <Dividends />
      <Earnings />
      <section className='md:flex'>
        <Newsfeed />
      </section>
      <Plus500 />
      <Economics />
      <Footer />
      <Cookie />
    </>
  )
}
