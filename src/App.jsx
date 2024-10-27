import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";

//import Header from './components/header/Header'
import Sidebar from "./components/sidebar/Sidebar";
import ExplorePosts from "../pages/posts/ExplorePosts";
import MyPosts from "../pages/posts/MyPosts";
import CreatePosts from "../pages/posts/CreatePost";
function App() {
  return (
    <>

        <div className="min-h-screen h-screen">
          <Header />
          <Sidebar />

          <div className="ml-64 pt-20 pl-5 w-full h-full min-h-screen flex">
            {" "}
            {/* Margin left to avoid overlap with the sidebar and top padding for header */}
            {/* Main content goes here */}
            <Routes>
              <Route path="/" element={<ExplorePosts />} />
              <Route path="/explore" element={<ExplorePosts />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/createPost" element={<CreatePosts />} />
            </Routes>
          </div>
          {/* Other components or content */}
        </div>

    </>
  );
}

export default App;
