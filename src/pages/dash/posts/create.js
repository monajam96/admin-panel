import { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import http from "../../../components/utils/interceptor";
export default function AddPost() {
  const [addPost, setAddPost] = useState({
    title: "",
    userId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({
      ...addPost,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!addPost.title) {
      newErrors.title = "Title is required";
    }

    if (!addPost.userId) {
      newErrors.userId = "User ID is required";
    } else if (isNaN(addPost.userId) || addPost.userId <= 0) {
      newErrors.userId = "User ID must be a positive number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await http.post(
          "/posts/add",
          {
            title: addPost.title,
            userId: parseInt(addPost.userId, 10), // Convert userId to a number
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };
  return (
    <>
      <Card style={{ margin: "100px" }}>
        <CardHeader> Add a New Post</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={addPost.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                name="userId"
                value={addPost.userId}
                onChange={handleChange}
                isInvalid={!!errors.userId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userId}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px" }}
              className="w-100"
            >
              Add
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
