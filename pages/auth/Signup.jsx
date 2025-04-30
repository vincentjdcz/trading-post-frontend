import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dev = false; //whether or not in dev mode - for testing
  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("in handleSignup");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter and a special character."
      );
      return;
    }
    try {
      const response = await fetch(
        dev
          ? "http://localhost:3000/api/auth/signup"
          : "https://trading-post-backend-production.up.railway.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName,
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      console.log("after fetch");
      console.log(response.status, data);
      if (!response.ok) {
        const errorData = data;
        console.log(errorData.message);

        throw new Error(errorData.message || "Signup failed");
      }

      // Show a success toast
      toast.success("Signup Successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 4000, // Show for 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000)
      
    } catch (error) {
      console.error("Signup error: ", error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setError("Invalid email format");
    } else {
      setError("");
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
        width: "100%",
        backgroundColor: "#f3f4f6",
        marginLeft: "-1.25rem",
        marginTop: "-6rem",
      }}
    >
      <ToastContainer />
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
          Sign Up
        </h2>

        <form onSubmit={handleSignup} style={{ width: "100%" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#4B5563",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.25rem",
              }}
              required
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
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
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

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
            Sign Up
          </button>
        </form>

        <p
          style={{ marginTop: "1.5rem", textAlign: "center", color: "#4B5563" }}
        >
          Already have an account?
          <a
            href="/login"
            style={{
              color: "#3B82F6",
              textDecoration: "underline",
              marginLeft: "0.25rem",
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
