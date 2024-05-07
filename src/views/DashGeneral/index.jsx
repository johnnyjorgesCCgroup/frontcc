import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentDashGeneral from '../../components/dashGeneral/contentDashGeneral'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentDashGeneral />
        <Footer />
      </>
    </div>
  )
}

export default indexCut