import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
//import Post from "../../src/components/post/Post";
import Post from "/src/components/post/Post";
import { useSelector } from 'react-redux';
const MyPosts = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  // State to hold the posts data
  const [posts, setPosts] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error
  const [error, setError] = useState(null);
  const userId = useSelector(state => state.auth.userId);
  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //https://trading-post-backend-production.up.railway.app
        //http://localhost:3000
        const response = await fetch("https://trading-post-backend-production.up.railway.app/api/post/getOwnPosts", {
          method: 'POST', // Use POST method for retrieving own posts
          credentials: 'include', // Include credentials if you need cookies or authentication
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }) // Send userId in the request body
      });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data); // Set the posts data in the state
        console.log("posts");
        console.log(posts);
      } catch (error) {
        setError(error.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array means this runs once when the component mounts

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(posts);

  return (
    <div className="min-h-full h-full">
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Set the flex direction to column
          alignItems: "flex-start", // Optional: aligns children to the start of the container
          justifyContent: "flex-start", // Optional: aligns children at the start vertically
          gap: "1rem",
        }}
      >
        <h1>MY POSTS</h1>

        <button
          onClick={() => navigate("/createPost")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Post
        </button>

        <div

          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            width: "650px",
          }}
        >
          {posts.map((post, idx) => {
            console.log("POST");
            console.log(post);
            console.log("POST.WANTSIMGS");
            console.log(post.wantsImgs);
            return (
              <Post
                key={idx}
                cardApiId={post.cardApiId}
                cardFrontPicture={post.cardFrontPicture}
                wantsImgs={post.wantsImgs}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
