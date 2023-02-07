import React,{useState} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
const Form = styled.div`
  display:flex;
  flex-direction: column;
  width:50%;
  margin:auto;
  padding: 50px 300px;
  background-color: #666;
`;
const Edit = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age:''
  })

  const { name, age } = formData
  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const clickHandler = async (e)=>{
    e.preventDefault();
    try{
      await axios.put(`http://localhost:5000/Update/${id}`,formData);
      setSuccessMessage('User updated successfully');
    }catch(err){
      setErrorMessage(`User updation failed: ${err}`);
    }
}
  return (
    <Form>
        <input placeholder='Enter Name' name="name" value={name}onChange={onChange}/>
        <input placeholder='Enter Age' name="age" value={age}onChange={onChange}/>
        <button className='button'  onClick={clickHandler} >Submit</button>
        {errorMessage && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
           {successMessage && (
            <Alert severity="success">{successMessage}</Alert>
          )}
    </Form>
  )
}

export default Edit