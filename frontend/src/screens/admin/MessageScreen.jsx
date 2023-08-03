import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetMessageDetailsQuery } from '../../slices/contactSlice'

const MessageScreen = () => {
  const { id } = useParams()
  const { data: message, isLoading, error } = useGetMessageDetailsQuery(id)

  return isLoading ? (
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.message}</Message>
  ) : (
    <div>
      <h2>Email: {message.contactus.email}</h2>
      <h2>Message: {message.contactus.message}</h2>
    </div>
  )
}

export default MessageScreen
