import React from 'react'
import {IoIosAdd} from 'react-icons/io'

const Form = () => {
  return (
    <>
        <div className='inputUserContainer'>
          <h1>New Lead</h1>
          <form action="">
            <div className='inputSection'>
              <div className='inputContainer'>
                <input type="text" placeholder='Name *' required className='input' />
                <input type="text" placeholder='Phone *' required className='input' />
                <input type="text" placeholder='Email' className='input' />
                <input type="text" placeholder='Age' className='input' />
              </div>
              <div className='inputContainer'>
                <input type="text" placeholder='School' className='input' />
                <input type="text" placeholder='Course' className='input' />
                <input type="text" placeholder='Batch Detail' className='input' />
                <input type="text" placeholder='Source *' required className='input' />
              </div>
            </div>
            <button className='button'><IoIosAdd size={25} color='white' />Create Lead</button>
          </form>
        </div>
    </>
  )
}

export default Form