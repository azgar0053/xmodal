import { useState, useEffect } from 'react';
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


  // const openForm=()=>{
  //   setIsModalOpen(true)

  //   }

  const openForm = () => {
    setIsModalOpen(true);
  };
  

    const closeForm=()=>{
      setIsModalOpen(false)
    }

    const handleSubmit=(e)=>{
      console.log('submit btn clicked')
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
        return;
      }
      if(isFutureDate){
        alert('Invalid date of birth. Date of Birth cannot be in future')
        return;
      }
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

        const handleOutsideClick = (e) => {
          const modalContent = document.querySelector('.modal-content');
          const openFormButton = document.querySelector('button');
        
          if (
            isModalOpen &&
            modalContent &&
            !modalContent.contains(e.target) &&
            openFormButton &&
            !openFormButton.contains(e.target)
          ) {
            closeForm();
          }
        };
        

        useEffect(() => {
          document.addEventListener('click', handleOutsideClick);
      
          return () => {
            document.removeEventListener('click', handleOutsideClick);
          };
        }, [isModalOpen]);

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={()=>openForm()}>Open Form</button>
      {isModalOpen&&(
            <div className={`modal ${isModalOpen? 'open':''}`}>
            <div className='modal-content'> 
                      <h1>Fill Details</h1>
                 < form onSubmit={handleSubmit} >
                  <label htmlFor='username'>Username:</label>
                  <input id='username' type='text' required value={formData.username} onChange={handleChange} name='username'/><br/>
                  <label htmlFor='email'>Email Address:</label>
                  <input id='email' type='email' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required value={formData.email} onChange={handleChange} name='email'/><br/>
                  <label htmlFor='phone'>Phone Number:</label>
                  <input id='phone' type='tel' required value={formData.phone} onChange={handleChange} name='phone'/><br/>
                  <label htmlFor='dob'>Date of Birth:</label>
                  <input id='dob' type='date' required value={formData.dob} onChange={handleChange} name='dob'/><br/>
                  <button type='submit' className='submit-button'>Submit</button>
              </form>
          </div>
  
      </div>
      )}
    </div>
  );
}

export default App;
