import { useState } from 'react'
import Newsfeed from './components/Newsfeed'
import Navbar from './components/Navbar'
import Settings from './components/news/Settings'


export default function App() {
  return (
    <>
      <Navbar />
      <section className='md:flex'>
        <Newsfeed />
        <Settings />
      </section>

    </>
  )
}
