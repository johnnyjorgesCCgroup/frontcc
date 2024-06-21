import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentSubirImagenMoto from '../../components/subirImagenMoto/contentSubirImagenMoto'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentSubirImagenMoto />
        <Footer />
      </>
    </div>
  )
}

export default indexCut