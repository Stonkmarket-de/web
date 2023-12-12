import { useState } from 'react'
import Newsfeed from './components/news/Newsfeed'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Settings from './components/news/Settings'
import RiskFreeRate from './components/riskfree/RiskFreeRate'
import Plus500 from './components/plus500/Plus500'


export default function App() {
  return (
    <>
      <Navbar />
      <RiskFreeRate />
      <Plus500 />
      <section className='md:flex'>
        <Newsfeed />
      </section>
      <Footer />
    </>
  )
}
