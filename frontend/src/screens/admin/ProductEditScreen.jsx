import React,{useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Button,Row,Col,Table,Form} from 'react-bootstrap';
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {useGetUsersQuery} from '../../slices/usersApiSlice';
import {useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation} from '../../slices/productsApiSlice';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Autosuggest from 'react-autosuggest';

const ProductEditScreen = () => {

    const {id:productId}=useParams();

    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');

    const {data:product,isLoading,refetch,error} =useGetProductDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdating}] =useUpdateProductMutation();

    const [uploadProductImage,{isLoading:loadingUpload}] =useUploadProductImageMutation();


// add
const [validationError, setValidationError] = useState(null);
    const {data:users, isLoading:usersLoading, error:usersError} = useGetUsersQuery();

    const [suggestions, setSuggestions] = useState([]);


    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : users.filter(user =>
            user.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const theme = {
        input: 'form-control',
        inputOpen: 'form-control',
        inputFocused: 'form-control',
        suggestionsContainer: 'dropdown',
        suggestionsContainerOpen: 'dropdown open',
        suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
        suggestion: 'dropdown-item',
        suggestionHighlighted: 'dropdown-item active'
      };

    // add



    const navigate=useNavigate();

    useEffect(()=>{
        if(product){
           setName(product.name);
           setPrice(product.price);
           setImage(product.image);
           setBrand(product.brand);
           setCategory(product.category);
           setCountInStock(product.countInStock);
           setDescription(product.description);
        }
    },[product]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        // add
        const userExists = users.find(user => user.name === name);

        // If it doesn't exist, set the validation error and return.
        if (!userExists) {
            setValidationError('Player name must be a username!');
            return;
        }
        //add
        const updatedProduct={
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result=await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Product updated');
            navigate('/admin/productlist');
        }

    }

    const uploadFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }


  return (
    <>
    <Link to="/admin/productlist" className='btn btn-light my-3'>
    GO Back
    </Link>
    <FormContainer>
        <h2>Edit Injury</h2>
        {loadingUpdating && <Loader/>}
        {
        
            isLoading?<Loader/>
            :error?<Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>player name</Form.Label>
                        <Autosuggest
                                    theme={theme}
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={({ value }) => {
                                        setSuggestions(getSuggestions(value));
                                    }}
                                    onSuggestionsClearRequested={() => {
                                        setSuggestions([]);
                                    }}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={getSuggestionValue}
                                    inputProps={{
                                        placeholder: 'Enter name',
                                        value: name,
                                        onChange: (_, { newValue }) => {
                                            setName(newValue);
                                        }
                                    }}
                                />
                                {validationError && <div className="invalid-feedback d-block">{validationError}</div>}
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control
                        type='data'
                        placeholder='Enter date'
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

{/* image */}
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e)=>setImage}
                        ></Form.Control>

                         <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader/>}


                    <Form.Group controlId='brand'>
                        <Form.Label>Injury Type</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cetegory'>
                        <Form.Label>Action taken</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter cetegory'
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Action needed</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter countInStock'
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    
                    {/* <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group> */}
                    <Button type='submit' value='primary' className='my-2'>Update</Button>
                </Form>
            )
        }
    </FormContainer>
    </>
  )
}

export default ProductEditScreen