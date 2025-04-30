import { Route, Routes } from "react-router-dom";
//import "./App.css";
import "/src/App.css";
//import Header from "./components/header/header";
import Header from "/src/components/header/Header";

//import Header from './components/header/Header'

//import Sidebar from "./components/sidebar/Sidebar";
import Sidebar from "/src/components/sidebar/Sidebar";
//import ExplorePosts from "../pages/posts/ExplorePosts";
import ExplorePosts from "/pages/posts/ExplorePosts";
//import MyPosts from "../pages/posts/MyPosts";
import MyPosts from "/pages/posts/MyPosts";
//import CreatePosts from "../pages/posts/CreatePost";
import CreatePosts from "/pages/posts/CreatePost";
import Login from "../pages/auth/Login";
import { useState } from "react";
import CreateAccount from "../pages/auth/Signup";
import Signup from "../pages/auth/Signup";
import MyProfile from "../pages/profile/MyProfile";
import PostDetails from "../pages/posts/PostDetails";
import OfferDetails from "../pages/offer/OfferDetails";
function App() {

  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => setIsSideBarOpen(!isSidebarOpen)
  return (
    <>
        
        <div className="min-h-screen h-full">
          <Header onToggleSidebar={toggleSidebar} />
          <div className="flex h-full">
          <Sidebar isOpen={isSidebarOpen} />

            {/*<div className="ml-64 pt-20 pl-5 w-full h-full min-h-screen flex">*/}
            <div style={{paddingTop: '6rem', paddingLeft: '1.25rem', width: '100vw', height: '100%', minHeight: '100vh', display: 'flex' }}>
              {" "}
              {/* Margin left to avoid overlap with the sidebar and top padding for header */}
              {/* Main content goes here */}
              <Routes>
                <Route path="/" element={<ExplorePosts />} />
                <Route path="/explore" element={<ExplorePosts />} />
                <Route path="/my-posts" element={<MyPosts />} />
                <Route path="/createPost" element={<CreatePosts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myProfile" element={<MyProfile/>} />
                <Route path="/postDetails/:postId" element={<PostDetails/>} />
                <Route path="/offerDetails/:offerId" element={<OfferDetails/>} />
              </Routes>
            </div>
          </div>
          
          {/* Other components or content */}
        </div>

    </>
  );
}

export default App;
