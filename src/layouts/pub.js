import {Outlet} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

export default function Pub () {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login')
  }, [])
  return <>
    <Outlet/>
  </>
}