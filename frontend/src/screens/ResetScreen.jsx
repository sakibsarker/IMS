import React,{useState,useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ResetScreen = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [login,{isLoading}]=useLoginMutation();
  
  const {userInfo}=useSelector((state)=>state.auth);

//re direct after login shipping
  const {search}=useLocation();
  const sp=new URLSearchParams(search);
  const redirect=sp.get('redirect')||'/dashboard';
  
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo,redirect,navigate])

  const submitHandler=async(e)=>{
    e.preventDefault()
    try{
      const res=await login({email,password}).unwrap();
      dispatch(setCredentials({...res,}));
      navigate(redirect);

    }catch(error){
      toast.error(error?.data?.message||error.error)

    }
  }

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          
          >

          </Form.Control>
        </Form.Group>

      

        <Button type='submit' value='primary' className='mt-2' disabled={isLoading}>Send Email</Button>
        {isLoading && <Loader/>}
      </Form>
      <Row className='py-3'>
        <Col>
        New Customer? <Link to={redirect?`/register?redirect=${redirect}`:`/register`}>Register</Link>
        </Col>
        <Col>
        <Link to={`/setpassword`}>New Password</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default ResetScreen