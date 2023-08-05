import React from 'react'
import { Card,Table,Image } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
import Rating from './Rating'
const Product = ({prduct}) => {
  return (

<Table striped hover responsive className='table-sm w-100'>
<thead>
<tr>
  <th>Picture</th>
  <th>Player Name</th>
  <th>Date of Birth</th>
  <th>Injury Type</th>
  <th>Action Taken</th>
  <th>Action Needed</th>
  <th></th>
  
</tr>
</thead>
<tbody>

    <tr key={prduct._id}>
      <td><Image src={`http://localhost:5000${prduct.image}`} style={{height:"40px",width: "40px",borderRadius:'50px' }}/></td>
      <td>{prduct.name}</td>
      <td>{prduct.price}</td>
      <td>{prduct.category}</td>
      <td>{prduct.brand}</td>
      <td>{prduct.countInStock}</td>
      <td><Link to={`/product/${prduct._id}`}>View</Link></td>
    </tr>
    
</tbody>
</Table>
    
  )
}




export default Product

// {/* <><Card className="my-3 p-3 rounded">
//         <Link to={`/product/${prduct._id}`}>
//             {/* <Card.Img src={prduct.image} variant="top"/> */}
//             <Card.Img src={`http://localhost:5000${prduct.image}`} variant="top"/>
//         </Link>
//         <Card.Body>
//             <Link to={`/product/${prduct._id}`}>
//                 <Card.Title as="div" className='product-title'>
//                     <strong>{prduct.name}</strong>
//                 </Card.Title>
//             </Link>
//             <Card.Text as="div">
//                 <Rating value={prduct.rating} text={`${prduct.numReviews} reviews`}/>
//             </Card.Text>
//             <Card.Text as="h5">
//                 ${prduct.price}
//             </Card.Text>
           
//          </Card.Body>
//     </Card></> */}

