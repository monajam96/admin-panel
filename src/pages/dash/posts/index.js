import React, { useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import {Col, Container, Spinner } from "react-bootstrap";
import {Pencil, Plus } from "react-bootstrap-icons";
import DeleteConfirmation from "../../../components/deleteConfirmation";
import http from './../../../components/utils/interceptor'
export default function Posts () {
  const [post, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)
    const fetchPosts = async () => {
      try {
        const response = await http.get("/posts");
        setPosts(response.data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    };

    fetchPosts();
  }, []);

  const refreshData = (deletedItemId) => {
    setPosts(post.filter((post) => post.id !== deletedItemId))
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="text-center pt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return <div>
    <Container fluid>
      <Row justify="space-around" align="middle">
        <Col xs={12} className='d-flex justify-content-start py-2'>
          <Button
            variant="success"
            onClick={() => navigate("/dash/create-post")}
            size="large"
          >
            Add a post
            <Plus size={25}/>
          </Button>
        </Col>
        <Col xs={12}>
          <Table striped bordered hover responsive style={{overflowX: 'auto'}} responsive="sm">
            <thead>
              <tr>
                <th style={{minWidth: 60}}>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
            {post.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <span className="d-none d-md-block">
                    {post.body}
                  </span>
                  <span className="d-md-none">
                    {post.body.substring(0, 30)}...
                  </span>
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/dash/edit-post/:id')}
                    style={{ margin: 10 }}
                  >
                    <Pencil/>

                  </Button>
                  <DeleteConfirmation
                   itemId={post.id} 
                   endpoint='/posts'
                   refreshData={refreshData}
                   />
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  </div>
}