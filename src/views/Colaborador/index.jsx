import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentColaborador from '../../components/colaborador/contentColaborador'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentColaborador />
        <Footer />
      </>
    </div>
  )
}

export default indexCut