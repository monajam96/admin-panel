import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import http from "../../../components/utils/interceptor";
export default function EditPost() {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const { id } = useParams();
  const handleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await http.put(
        `/posts/${id}`,
        {
          title: updatedTitle,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  return (
    <>
      <Card justify="space-around" align="middle" style={{ margin: "100px" }}>
        <CardHeader>Edit Title</CardHeader>
        <CardBody>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              htmlType="submit"
              onClick={handleSubmit}
              className="w-100"
            >
              Edit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
