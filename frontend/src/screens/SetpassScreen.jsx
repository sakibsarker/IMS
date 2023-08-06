import React, { useEffect, useState } from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card,Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useProfileMutation} from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';


const SetpassScreen = () => {
   
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.auth);
    
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation();


    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Password do not match')
        }else{
            try{
                const res=await updateProfile({_id:userInfo._id,password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated')



            }catch(error){
                toast.error(error?.data?.message || error.error);

            }
        }
    }

  return (
   <>
      <h1>Set New password</h1>
      <Form onSubmit={submitHandler}>
            <Form.Group controlId='password' className='my-2'>
               <Form.Label>Password</Form.Label>
               <Form.Control type='password' placeholder='Enter password' value={password}
               onChange={(e)=>setPassword(e.target.value)}>
               </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmpassword' className='my-2'>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}>
               </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>Set Password</Button>
            {loadingUpdateProfile && <Loader/>}
        </Form>
        </>
  )
}

export default SetpassScreen



