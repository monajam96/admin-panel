import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Outlet} from 'react-router-dom'
import SidebarMenu from "../components/sidebarmenu";
import {Col, Container, Row, Navbar } from "react-bootstrap";
import {List} from 'react-bootstrap-icons'
export default function Cp () {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return <Container fluid>
    <Row>
      <Col xs={12} className='d-md-none px-0'>
        <Navbar expand="md" className="bg-body-tertiary px-3">
          <Navbar.Brand href="#home">
            <Button variant="outline-dark" onClick={handleShow}>
              <List color={'black'}/>
            </Button>
          </Navbar.Brand>
        </Navbar>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <SidebarMenu/>
          </Offcanvas.Body>
        </Offcanvas>
      </Col>
      <Col xs={'auto'} className='p-0 position-relative d-none d-md-block' style={{flexBasis: '250px'}}>
        <nav className='dash-sidebar'>
          <SidebarMenu/>
        </nav>
      </Col>
      <Col className='flex-grow-1'>
        <Outlet/>
      </Col>
    </Row>
  </Container>
}