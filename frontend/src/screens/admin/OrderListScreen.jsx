import React,{useEffect,useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Row,Col,Table} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetContactDetailsQuery} from '../../slices/contactSlice';
import {Link,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const OrderListScreen = () => {

  const {data:message,isLoading,error}=useGetContactDetailsQuery();
  console.log(message)


  return <>
  <h1>Contact Us List</h1>
  {isLoading?<Loader/>
  :error?<Message variant="Danger">{error?.data?.message||error.message}</Message>
  :(
  <Table striped hover responsive className='table-sm'>
     <thead>
        <tr>
           <th>Date and Time</th>
           <th>Email</th>
           <th>Message</th>
        </tr>
    </thead>
    <tbody>

      {message.map((sms)=>(
            <tr key={sms._id}>
              <td>{sms._id}</td>
              <td>{sms.contactus.email}</td>
              <td>{sms.contactus.message}</td>
              <td>
              <td>
          <Link to={`/admin/message/${sms._id}`}>View</Link>
        </td>
              </td>
            </tr>
          ))
             
          }
    </tbody>
  </Table>
 )}
  </>
}

export default OrderListScreen


     {/* <td>
                <LinkContainer to={`/admin/product/${productt._id}/edit`}>
               <Button variant='light' className='btn-sm mx-2'><FaEdit color='green'/> Edit</Button>
                </LinkContainer>
                <Button variant='light' className='btn-sm mx-2' onClick={()=>deleteHandler(productt._id)}><FaTrash color='red'/></Button>
              </td> */}