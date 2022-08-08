import React,{useRef,useState,useEffect} from 'react'
import {AiOutlineClose,AiOutlineMail,AiOutlineCopy,AiOutlineRight} from 'react-icons/ai'
import {BiUpArrowAlt} from 'react-icons/bi'
import {FaGripLines} from 'react-icons/fa'
import {BsWhatsapp} from 'react-icons/bs'
import {ImPhone} from 'react-icons/im'

function useOutsideAlerter(ref,show,setShow) {
    useEffect(() => {
      if (show) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setShow(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref,show,setShow]);
}

const FloatingUserData = ({details,setDetails,data}) => {

    const {name, phone, email, age, school,course,batchDetails,source,id,comment,status,stage,inqDate} = data

  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const sideRef = useRef(null);

  const [iconType, setIconType] = useState(0)

  const [number, setNumber] = useState(phone)
  const [emailName, setemailName] = useState(email)
  const [schoolName, setschoolName] = useState(school)
  const [userAge,setuserAge] = useState(age)
  const [address, setaddress] = useState((batchDetails)?(batchDetails.address):null)
  const [cCode, setcCode] = useState('+91')
  const [courseName, setCourseName] = useState(course)
  const [day, setDay] = useState('Mon, Wed, Fri')
  const [time, settime] = useState('5:00PM - 6:00PM')
  const [NoSessions, setNoSessions] = useState((batchDetails)?(`${batchDetails.sessionsCount} Sessions`):null)
  const [price, setprice] = useState('Rs. 850/hour')
  const [mode, setmode] = useState((batchDetails)?(batchDetails.mode):null)
  const [modeType, setmodeType] = useState((batchDetails)?(batchDetails.type):null)
  const [sourcePlatform, setsourcePlatform] = useState(source)
  const [sourceTime, setsourceTime] = useState('12:05:02 PM')

  useOutsideAlerter(sideRef,details,setDetails)

  return (
    <>
        <div ref={sideRef} onClick={(e)=>e.stopPropagation()} className={(details)?"animate offerDetailContainer":"null offerDetailContainer"}>
            <div className="header">
                <p>OLL - 214</p>
                <div style={{display:'flex'}}>
                    <div style={{marginRight:'1rem',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    {
                        (iconType===0)?
                        <BiUpArrowAlt size={20} color={"rgba(242, 115, 115, 1)"} />
                        :((iconType===1)?
                            <BiUpArrowAlt size={20} color={"rgba(255, 161, 74, 1)"} style={{transform:"rotate(-45deg)"}} />
                            :(iconType===2)?
                                <FaGripLines size={20} color={"rgba(255, 245, 0, 1)"} />:<FaGripLines size={20} color={"rgba(0, 255, 56, 1)"} />)
                    }
                    <p style={{fontSize:'1rem'}}>
                    {(iconType===0)?"URG":((iconType===1)?"High":(iconType===2)?"Med.":"Low")}
                    </p>
                    </div>
                    <select name="" id="" ref={statusRef} className='new' onChange={()=>{statusRef.current.className=statusRef.current.options[statusRef.current.options.selectedIndex].className;
                    setIconType(stageRef.current.options.selectedIndex)}} >
                        <option className='new'  value="new">New</option>
                        <option className='follow'  value="follow">Follow Up</option>
                        <option className='noCourseName'  value="noCourse">! No Course</option>
                        <option className='started'  value="started">Started</option>
                        <option  className='noBatch' value="noBatch">! No Batch</option>
                    </select>
                </div>
                <select style={{width:'19%'}} name="" ref={stageRef} id="" onChange={()=>(stageRef.current.className=stageRef.current.options[stageRef.current.options.selectedIndex].className)} className='hot'>
                    <option className='hot' value="hot">Hot</option>
                    <option className='warm' value="warm">Warm</option>
                    <option className='cold' value="cold">Cold</option>
                    <option className='won' value="won">Won</option>
                </select>
                <AiOutlineClose size={18} color="white" onClick={()=>setDetails(!details)} style={{cursor: 'pointer'}} />
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
                <p style={{fontSize:'2.2rem',fontWeight:'700',marginTop:"2rem ",marginBottom:'0.75rem'}}>{name}</p>
                <button className='button'>Save changes</button>
            </div>
            <div className='contactInfo'>
                <div className="container">
                    <input type="text" style={{width:"17%"}} value={cCode} onChange={(e)=>setcCode(e.target.value)} />
                    <input type="text" style={{width:"35%"}} value={number} onChange={(e)=>setNumber(e.target.value)} />
                    <input type="text" style={{width:"44%"}} value={emailName} onChange={(e)=>setemailName(e.target.value)} />
                </div>
                <div className="container">
                    <input type="number" style={{width:"17%"}} value={userAge} max={20} min={1} onChange={(e)=>setuserAge(e.target.value)} />
                    <input type="text" style={{width:"36%"}} value={schoolName} onChange={(e)=>setschoolName(e.target.value)} />
                    <input type="text" style={{width:"43%"}} value={address} onChange={(e)=>setaddress(e.target.value)} />
                </div>
            </div>
            <div className="contactContainer">
                <p>Contact</p>
                <div className='container'>
                    <ImPhone size={30} color={'white'} className='iconStyle' />
                    <AiOutlineMail size={30} color={'white'} className='iconStyle' />
                    <AiOutlineCopy size={30} color={'white'} className='iconStyle' />
                    <div className='btn'><BsWhatsapp size={20} style={{marginRight:'0.3rem'}} color={'#0ac032'} />Template</div>
                    <div className='btn'><BsWhatsapp size={20} style={{marginRight:'0.3rem'}} color={'#0ac032'} />History</div>
                </div>
            </div>
            <div className="inqDetailsContainer">
                <p className='head'>Inquiry Details</p>
                <div>
                    <p>Course :</p>
                    <input type="text" style={{width: '78%'}} value={courseName} onChange={(e)=>{setCourseName(e.target.value)}} />
                </div>
                <div>
                    <p>Time :</p>
                    <div style={{display:'flex',justifyContent:'end',width:'78%'}}>
                        <input type="text" style={{width: '50%',marginRight:'1rem'}} value={day} onChange={(e)=>{setDay(e.target.value)}} />
                        <input type="text" style={{width: '50%'}} value={time} onChange={(e)=>{settime(e.target.value)}} />
                    </div>
                </div>
                <div>
                    <p>Sessions :</p>
                    <div style={{display:'flex',justifyContent:'end',width:'78%'}} >
                        <input type="text" style={{width:'50%',marginRight:'1rem'}} value={NoSessions} onChange={(e)=>{setNoSessions(e.target.value)}} />
                        <input type="text" style={{width:"50%"}} value={price} onChange={(e)=>{setprice(e.target.value)}} />
                    </div>
                </div>
                <div>
                    <p>Online :</p>
                    <div style={{display:'flex',justifyContent:'end',width:'78%'}} >
                        <input type="text" style={{width:'50%',marginRight:'1rem'}} value={mode} onChange={(e)=>{setmode(e.target.value)}} />
                        <input type="text" style={{width:"50%"}} value={modeType} onChange={(e)=>{setmodeType(e.target.value)}} />
                    </div>
                </div>
                <div>
                    <p>Source :</p>
                    <div style={{display:'flex',justifyContent:'end',width:'78%'}} >
                        <input type="text" style={{width:'50%',marginRight:'1rem'}} value={sourcePlatform} onChange={(e)=>{setsourcePlatform(e.target.value)}} />
                        <input type="text" style={{width:"50%"}} value={sourceTime} onChange={(e)=>{setsourceTime(e.target.value)}} />
                    </div>
                </div>
            </div>
            <div className="commentContainer">
                <p>Comments</p>
                <input type="text" placeholder='Add Comment'/>
                <AiOutlineRight size={19} className='icon'  />
            </div>
            <div className="commentsDisplay">
                <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=463" alt="Profile" />
                <h6>Lorem impsum dolor sit etc lnfo foin aoddkjn fruh oo fh</h6>
                <p>5:00 PM</p>
            </div>
            <div className="inqReports">
                <div className='header'>
                    <p className='head'>Inquiry Reports</p>
                    <button className="btn">SHARE</button>
                </div>
                <div className='content'>
                    <div className='container1'>
                        <p>Start Time : </p>
                        <p>Due Time : </p>
                    </div>
                    <div className='container2'>
                        <p>End Time : </p>
                        <p>Assignee : </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FloatingUserData