import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactElement
}

export default function Layout({ children }: Props): React.ReactElement {
  const location = useLocation()
  if (['/editor', '/login', '/register'].includes(location.pathname)) {
    return children
  }
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
