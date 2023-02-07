import React from 'react'
import { useState,useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import { Link} from 'react-router-dom';
const Form = styled.div`
  display:flex;
  flex-direction: column;
  width:50%;
  margin:auto;
  padding: 50px 300px;
  background-color: #666;
`;


function Add() {
  const [User,setUser] = useState([]);
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
  const clickHandler = async (e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/Add",formData)
      setSuccessMessage('User added successfully');
    }catch(err){
      setErrorMessage(`User already exists: ${err}`);
    }
}
//delete user from database and frontend
const removeContactHandler = async (id) => {
      try{
        await axios.delete(`http://localhost:5000/Delete/${id}`)
        const newUser = User.filter((usr) => {
          return usr._id !== id;
        });
        setUser(newUser);
      }catch(err){
      }
  }

  
  useEffect(()=>{
  const getAll = async()=>{
    try{
      const get = await axios.get("http://localhost:5000/Read")
      setUser(get.data)
    }catch(err){
    }
  }
  getAll()
},[User])
  return (
    <>
      <Form>
        <input placeholder='Enter Name' name="name" value={name}onChange={onChange}/>
        <input placeholder='Enter Age' name="age" value={age}onChange={onChange}/>
        <button className='button' onClick={clickHandler}>Submit</button>
        {errorMessage && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
           {successMessage && (
            <Alert severity="success">{successMessage}</Alert>
          )}

      </Form>
        {User.map((user)=>
                    (<ul className='list' key={user._id}>
                    <li>{user.name}</li>
                    <li>{user.age}</li> 
                    <li>{user._id}</li> 
                    <Link to={`${user._id}`}>
                      <DeleteIcon style={{cursor:"pointer"}} onClick={()=>removeContactHandler(user._id)} /> 
                    </Link> 
                    <Link to={`/edit/${user._id}`}>
                      <EditIcon style={{cursor:"pointer"}} />
                    </Link>
                  </ul>)
                  
        )}
   
    </>
  );
}

export default Add;
