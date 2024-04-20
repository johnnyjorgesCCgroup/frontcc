import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentInventory from '../../components/inventory/contentInventory'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentInventory />
        <Footer />
      </>
    </div>
  )
}

export default indexCut