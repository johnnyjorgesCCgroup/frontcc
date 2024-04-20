import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import ContentRegisterMotorizado from '../../components/registerMotorizado/contentRegisterMotorizado'
const indexCut = () => {
  return (
    <div className="wrapper">
      <Menu />
      <>
        <Header />
        <ContentRegisterMotorizado />
        <Footer />
      </>
    </div>
  )
}

export default indexCut