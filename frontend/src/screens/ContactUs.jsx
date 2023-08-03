import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  return (
    <>
     <Form >
     <Form.Group controlId='name'>
    <Form.Label>Your email</Form.Label>
    <Form.Control
    type='text'
    placeholder='Enter your email'
    // value={products.name}
    >
    </Form.Control>
  </Form.Group>
                    
                    <Form.Group className='py-2'>
                      <Form.Label>Your Message</Form.Label>
                      <Form.Control
                      as='textarea'
                      row='3'
                      placeholder='Type your message'
                    
                      >
                      </Form.Control>
                    </Form.Group>
                    <Button
                    
                    type='submit'
                    variant='primary'
                    >Send Message</Button>
                  </Form>
    </>
  )
}

export default ContactUs