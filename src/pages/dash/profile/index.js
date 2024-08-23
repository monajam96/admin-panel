import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import http from "../../../components/utils/interceptor";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await http.get('/auth/me')
        setProfileData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const {
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    phone,
    birthDate,
  } = profileData;

  return (
    <>
      <Card className="mt-2">
        <CardHeader>User information</CardHeader>
        <CardBody>
          <p>Id: {id}</p>
          <p>Name: {firstName}</p>
          <p>Family: {lastName}</p>
          <p>Maiden Name: {maidenName}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Birth Date: {birthDate}</p>
        </CardBody>
      </Card>
    </>
  );
}
