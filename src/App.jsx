import Newsfeed from './components/news/Newsfeed'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RiskFreeRate from './components/riskfree/RiskFreeRate'
import Earnings from './components/earnings/Earnings'
import Plus500 from './components/plus500/Plus500'
import Cookie from './components/Cookie'


export default function App() {
  return (
    <>
      <Navbar />
      <RiskFreeRate />
      <Plus500 />
      <Earnings />
      <section className='md:flex'>
        <Newsfeed />
      </section>
      <Footer />
      <Cookie />
    </>
  )
}
