import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { FaEnvelope, FaList, FaPhone } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MainScreen = () => {
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="admin/orderlist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <FaPhone size={50} />
              <Card.Title>Contact List</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/admin/orderlist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <FaList size={50} />
              <Card.Title>List</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/admin/orderlist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <FaEnvelope size={50} />
              <Card.Title>Message</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  )
}

export default MainScreen
