import { useState } from 'react'
import Newsfeed from './components/Newsfeed'
import Navbar from './components/Navbar'
import Settings from './components/news/Settings'


export default function App() {
  return (
    <>
      <Navbar />
      <Newsfeed />
      <Settings />
    </>
  )
}
