import React from 'react';
import { Container, Row, Col,Table } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
const HomeScreen = () => {

  const {pageNumber,keyword}=useParams();
  
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});


  return (
    <>
    {/* {!keyword?(<ProductCarousel/>):(<Link to='/' className='btn btn-light'>Go Back</Link>)} */}
    {isLoading?(<><Loader/></>):error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>):(
    <>
    <>
    <h1 style={{color:'black',textAlign:'center'}}>New Injury</h1>
    
        {data.product.map((productt) => (
          <Col striped hover responsive className='table-sm w-100' key={productt._id} sm={12} md={6} lg={4} xl={3}>
            <Product prduct={productt}/>
          </Col>
        ))}
   </>
      <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:''}/>
    </>)}
    </>
  );
};

export default HomeScreen;
