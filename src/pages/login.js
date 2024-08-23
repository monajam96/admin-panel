import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../components/utils/interceptor";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }else if (formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        setLoading(true)
        // const response = await axios.post("https://dummyjson.com/auth/login", {
        //   username: formData.username,
        //   password: formData.password,
        // });
        const response = await http.post("/auth/login", {
          username: formData.username,
          password: formData.password
        })
        localStorage.setItem("token", response.data.token);
        navigate("/dash/profile");

      } catch (error) {
        console.error('There was an error!', error);
        setErrors({ api: "Invalid username or password" });
      } finally {
        setLoading(false)
      }
    }
  };

  return (
    <div style={{ height: '100vh' }} className='d-flex align-content-center align-items-center justify-content-center'>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} md={5}>
            <h3>
              Template admin panel
            </h3>
            <Alert variant={'info'}>
              <strong>
                Note!! This admin panel uses free api.
              </strong>
              <div>
                The username is : emilys and the password is : emilyspass
              </div>
            </Alert>
            <Form className='bg-body-secondary p-4'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              {errors.api && (
                <div className="text-danger mb-3">
                  {errors.api}
                </div>
              )}
              <Form.Group controlId="exampleForm.ControlInput3">
                <Button variant='success' className='w-100' onClick={handleSubmit} disabled={loading}>
                  Login
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
