import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {useGetProductDetailsQuery,useCreateReviewMutation} from '../slices/productsApiSlice'
import {addToCart} from '../slices/cartSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Meta from '../components/Meta';

const ProductScreen = () => {


  const{id:productId}=useParams()

  const dispatch=useDispatch();
  const nagivate=useNavigate();

  const [qty,setQty]=useState(1);

  const [rating,setRating]=useState(0);

  const [comment,setComment]=useState('')

  const {data:products,isLoading,refetch,error}=useGetProductDetailsQuery(productId)

  const [ createReview,{isLoading:loadingReview}]=useCreateReviewMutation()

  const {userInfo}=useSelector((state)=>state.auth);


  const addToCartHandler=()=>{
    dispatch(addToCart({...products,qty}))
    nagivate('/cart')
  }

  const createReviewHandaler=async(e)=>{
    e.preventDefault()
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
      
    } catch (error) {
      toast.error(error?.data?.message||error.error);
    }
  }

  return (
    <>
     <Link className='btn btn-white my-2' to='/'>
        Go Back</Link>
    {isLoading?(<Loader/>):error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>)
    :(
    <>

    {/* add */}
    
<Form >
<Image src={`http://localhost:5000${products.image}`} alt={products.name} fluid style={{height:'50px'}}/>
          {/* <Image src={products.image} alt={products.image} fluid/> */}
  <Form.Group controlId='name'>
    <Form.Label>player name</Form.Label>
    <Form.Control
    type='text'
    value={products.name}
    readOnly>
    </Form.Control>
  </Form.Group>

  <Form.Group controlId='name'>
    <Form.Label>Date of birth</Form.Label>
    <Form.Control
    type='text'
    value={products.price}
    readOnly>
    </Form.Control>
  </Form.Group>

  <Form.Group controlId='name'>
    <Form.Label>Injury Type</Form.Label>
    <Form.Control
    type='text'
    value={products.brand}
    readOnly>
    </Form.Control>
  </Form.Group>


  <Form.Group controlId='name'>
    <Form.Label>Action Taken</Form.Label>
    <Form.Control
    type='text'
    value={products.category}
    readOnly>
    </Form.Control>
  </Form.Group>


  <Form.Group controlId='name'>
    <Form.Label>Action Needed</Form.Label>
    <Form.Control
    type='text'
    value={products.countInStock}
    readOnly>
    </Form.Control>
  </Form.Group>

  <Form.Group controlId='name'>
    <Form.Label>Description</Form.Label>
    <Form.Control
    type='text'
    value={products.description}
    readOnly>
    </Form.Control>
  </Form.Group>

</Form>

{/* remove */}

    <Meta title={products.name}/>
        <Row>
          <Col md={5} style={{margin:'20px'}}>
          <Rating value={products.rating} text={`${products.numReviews} reviews`}/>
          </Col>
         
        </Row>
        <Row className='review'>
          <Col md={6}>

          {products.reviews.length===0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {products.reviews.map((review)=>(
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating}/>
                <p>{review.createdAt.substring(0.10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>

              <h2>Write a customer review</h2>
              {loadingReview && <Loader/>}

              {
                userInfo?(
                  <Form onSubmit={createReviewHandaler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e)=>setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1- Poor</option>
                        <option value='2'>2- Fair</option>
                        <option value='3'>3- Good</option>
                        <option value='4'>4- Very Good</option>
                        <option value='5'>5- Excellent</option>


                      </Form.Control>
                    </Form.Group>
                    <Form.Group className='py-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e)=>setComment(e.target.value)}
                      >
                      </Form.Control>
                    </Form.Group>
                    <Button
                    disabled={loadingReview}
                    type='submit'
                    variant='primary'
                    >Submit</Button>
                  </Form>

                ):(<Message variant='danger'> Please <Link to='/login'>Sign in</Link> to write</Message>)
              }
            </ListGroup.Item>
          </ListGroup>
          </Col>
        </Row>
        {/* <Button className='btn-block' type='button' disabled={products.countInStock===0}
                        onClick={addToCartHandler}>
                          Add To Cart
        </Button> */}
    </>
    )}
     
    </>
  )
}

export default ProductScreen