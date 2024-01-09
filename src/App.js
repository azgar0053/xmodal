import { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [formData, setFormData]= useState({
    username:'',
    email:'',
    phone:'',
    dob:''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openForm=()=>{
    setIsModalOpen(true)
    }

    const closeForm=()=>{
      setIsModalOpen(false)
    }

    const handleSubmit=(e)=>{
      const currentDate= new Date()
      const enteredDate = new Date(formData.dob);
      const isFutureDate =
        enteredDate.getFullYear() > currentDate.getFullYear() ||
        (enteredDate.getFullYear() === currentDate.getFullYear() &&
          enteredDate.getMonth() > currentDate.getMonth()) ||
        (enteredDate.getFullYear() === currentDate.getFullYear() &&
          enteredDate.getMonth() === currentDate.getMonth() &&
          enteredDate.getDate() > currentDate.getDate());
      
      if(formData.phone.length!==10){
        console.log(formData.phone.length)
        alert('Invalid phone number. Please enter a 10-digit phone number.')
      }
      if(isFutureDate){
        alert('Invalid date of birth. Date of Birth cannot be in future')
      }
      setIsModalOpen(false)
    }

    const formatDate=(inputDate)=>{
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`
    }

    const handleChange=(e)=>{
      const {name , value}= e.target;

      const updatedValue = name === 'dob' ? formatDate(value) : value;
      setFormData((prev)=> ({...prev, [name]: updatedValue}))
        }


  return (
    <div className="App">
      {isModalOpen&&<div className='overlay' onClick={closeForm}></div>}
      <h1>User Details Modal</h1>
      <button onClick={openForm}>Open Form</button>
      {isModalOpen&&<Modal handleSubmit={handleSubmit} handleChange={handleChange}/>}
    </div>
  );
}

export default App;
