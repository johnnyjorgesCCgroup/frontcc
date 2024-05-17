import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentDashVentasIncidencias from '../../components/dashVentasIncidencias/contentDashVentasIncidencias'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentDashVentasIncidencias />
        <Footer />
      </>
    </div>
  )
}

export default indexCut