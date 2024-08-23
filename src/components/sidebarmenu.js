import {Link, useNavigate} from "react-router-dom"
export default function SidebarMenu () {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return <aside>
    <ul className='list-style-none text-white list-unstyled'>
    <li className='p-2 pointer-event'> <Link to ="/dash/profile" className="text-black text-md-white text-decoration-none">
        Profile
      </Link></li>
      <li className='p-2 pointer-event'> <Link to ="/dash/posts" className="text-black text-md-white text-decoration-none">
        Posts
      </Link></li>
      <li className='p-2'> <Link to ="/dash/create-post" className="text-black text-md-white text-decoration-none">Create post</Link></li>
      <li className='p-2 text-black text-md-white' onClick={logOut} style={{cursor: 'pointer'}}>
        Logout
      </li>
    </ul>
  </aside>
}