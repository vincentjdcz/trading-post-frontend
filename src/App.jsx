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
function App() {
  return (
    <>

        <div className="min-h-screen h-screen">
          <Header />
          <Sidebar />

          {/*<div className="ml-64 pt-20 pl-5 w-full h-full min-h-screen flex">*/}
          <div style={{ marginLeft: '16rem', paddingTop: '6rem', paddingLeft: '1.25rem', width: '100vw', height: '100%', minHeight: '100vh', display: 'flex' }}>
            {" "}
            {/* Margin left to avoid overlap with the sidebar and top padding for header */}
            {/* Main content goes here */}
            <Routes>
              <Route path="/" element={<ExplorePosts />} />
              <Route path="/explore" element={<ExplorePosts />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/createPost" element={<CreatePosts />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          {/* Other components or content */}
        </div>

    </>
  );
}

export default App;
