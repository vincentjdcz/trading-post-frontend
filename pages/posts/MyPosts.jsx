import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MyPosts = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  // State to hold the posts data
  const [posts, setPosts] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error
  const [error, setError] = useState(null);

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post/getPosts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data); // Set the posts data in the state
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
      <h1>MY POSTS</h1>

      <button
        onClick={() => navigate("/createPost")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Post
      </button>

      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.cardApiId}</li> // Assuming each post has a unique _id and cardName
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
