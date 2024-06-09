import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentDashProductos from '../../components/dashProductos/contentDashProductos'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentDashProductos />
        <Footer />
      </>
    </div>
  )
}

export default indexCut