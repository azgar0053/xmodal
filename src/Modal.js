import React from 'react'

const Modal = (props) => {

const handleSubmit=(e)=>{
    props.handleSubmit(e)
}


  return (
    <div className="modal" style={{display:'block'}}>
        <div className="modal-content">
            <h1>Fill Details</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input id='username' type='text' required value={props.username} onChange={props.handleChange} name='username'/><br/>
                <label htmlFor='email'>Email Address:</label>
                <input id='email' type='email' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required value={props.email} onChange={props.handleChange} name='email'/><br/>
                <label htmlFor='phone'>Phone Number:</label>
                <input id='phone' type='tel' required value={props.phone} onChange={props.handleChange} name='phone'/><br/>
                <label htmlFor='dob'>Date of Birth:</label>
                <input id='dob' type='date' required value={props.dob} onChange={props.handleChange} name='dob'/><br/>
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
</div>
  )
}

export default Modal