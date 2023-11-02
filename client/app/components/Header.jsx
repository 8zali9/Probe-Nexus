import Link from 'next/link'
import React from 'react'

export default function header() {
  return (
    <header className='header-links'>
      <li className='header'><Link href='/'>probe nexus</Link></li>
      <div className='links'>
        <li className='link'><Link href='/savedItems'>links on ice</Link></li>
        <p className='link-sep'>|</p>
        <li className='link'><Link href='/about'>in our midst</Link></li>
      </div>
    </header>
  )
}
