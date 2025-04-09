import React from 'react'
import logo from '/Logopic.png'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")

  return (
    <div className='welcomeSection'>
        <h2>Welcome <br/> {firmName}</h2>
        <div className="landingImage">
          <img src={logo} alt='welcome'  width='160px' style={{opacity: "0.5"}}/>
        </div>
    </div>
  )
}

export default Welcome