import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import DashboardEstados from '../../components/dashboard/contentDashboardEstados'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <DashboardEstados />
        <Footer />
      </>
    </div>
  )
}

export default indexCut