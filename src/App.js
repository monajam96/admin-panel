import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/login";
import Pub from "./layouts/pub";
import Cp from "./layouts/cp";
import Posts from "./pages/dash/posts";
import CreatePost from "./pages/dash/posts/create";
import EditPost from "./pages/dash/posts/edit";
import Profile from "./pages/dash/profile";
import PrivateRoute from "./components/utils/privateRoute";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pub />}>
          <Route path="/login" element={<Login/>} />
        </Route>
        <Route path='/dash' element={
          <PrivateRoute>
            <Cp/>
          </PrivateRoute>
        }>
            <Route path="profile" element={<Profile/>} />
            <Route path='posts' element={<Posts/>}/>
            <Route path='create-post' element={<CreatePost/>}/>
            <Route path='edit-post/:id' element={<EditPost/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

function NotFound () {
  return <div> page not found !!</div>
}

export default App;
