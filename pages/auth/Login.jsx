import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "/redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDev = false;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  console.log("isLoggedIn: ", isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      console.log("in if for isloggedin");
      navigate("/explore");
    }
  }, [isLoggedIn, navigate]);
  const handleLogin = async (event) => {
    setLoginError("");
    event.preventDefault();
    try {
        console.log("attempting to login");
        //https://trading-post-backend-production.up.railway.app
        //http://localhost:3000
        const devURL = "http://localhost:3000";
        const prodURL = "https://trading-post-backend-production.up.railway.app"
        const response = await fetch(`${isDev ? devURL : prodURL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        console.log("Sent request");
        // Check if the response is okay
        if (!response.ok) {
          console.log("Error logging in");
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed"); // Throw an error with the server message
        }
        console.log("about to await data");
        const data = await response.json();
        console.log("Data: ");
        console.log(data);


        dispatch(loginSuccess({ userId: data.userId, userName: data.userName, profilePicture: data.profilePicture }));
        window.location.reload();
        
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(error);
      }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        width: "100%",
        marginLeft: "-1.25rem",
        marginTop: "-6rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.375rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "24rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#4B5563",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.25rem",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#4B5563",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.25rem",
              }}
              required
            />
          </div>
          {(loginError !== "") && (<p className="text-red-500">{loginError.message}</p>)}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
          >
            Login
          </button>
        </form>

        <p
          style={{ marginTop: "1.5rem", textAlign: "center", color: "#4B5563" }}
        >
          Don’t have an account?
          <a
            href="/signup"
            style={{
              color: "#3B82F6",
              textDecoration: "underline",
              marginLeft: "0.25rem",
            }}
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
