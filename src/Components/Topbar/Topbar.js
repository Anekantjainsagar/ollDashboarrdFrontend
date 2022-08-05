import React from 'react'
import Form from './Form'
import SearchSection from './SearchSection'

const Topbar = () => {
  return (
    <>
        <div style={{display: 'flex',justifyContent:'space-between'}}>
            <Form/>
            <SearchSection/>
        </div>
    </>
  )
}

export default Topbar