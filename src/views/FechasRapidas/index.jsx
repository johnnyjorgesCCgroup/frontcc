import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentFechasRapidas from '../../components/fechasRapidas/contentFechasRapidas'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentFechasRapidas />
        <Footer />
      </>
    </div>
  )
}

export default indexCut