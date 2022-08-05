import React from 'react'
import {BsWhatsapp} from 'react-icons/bs'

const User = () => {
  return (
    <>
        <div className='user'>
          <p className="idValue">213</p>
          <p className="inquiryDateValue">5:12 PM, 13/6/22</p>
          <p className="nameValue">Shreyaan Daga</p>
          <p className="phoneValue">9699188188</p> 
          <p className="offerDetailsValue">Coding Design Animation - 3123</p>
          <p className="statusValue">
            <select name="" id=""  onchange="this.className=this.options[this.selectedIndex].className" className='new'>
              <option className='new'  value="new">New</option>
              <option className='follow'  value="follow">Follow Up</option>
              <option className='noCourse'  value="noCourse">! No Course</option>
              <option  className='noBatch' value="noBatch">No Batch</option>
              <option className='started'  value="started">Started</option>
            </select>
          </p>
          <p className="actionsValue">
            <div className='btn'><BsWhatsapp size={20} style={{marginRight:'0.3rem'}} color={'#0ac032'} />Template</div>
            <div className='btn'>Comment</div>
          </p>
          <p className="sourceValue">Vidushi</p>
          <p className="stageValue">
            <select name="" id="" onchange="this.className=this.options[this.selectedIndex].className" className='hot'>
              <option className='hot' value="hot">Hot</option>
              <option className='warm' value="warm">Warm</option>
              <option className='cold' value="cold">Cold</option>
              <option className='won' value="won">Won</option>
            </select>
          </p>
        </div>
    </>
  )
}

export default User